package controllers

import akka.actor.ActorRef
import codegen.CustomTyper
import com.typesafe.config.Config
import database.generated.public.UserAccount
import graphql._
import graphql.backoffice.{BackofficeContext, BackofficeSchemaDefinition, BackofficeSecurityMiddleware}
import graphql.player.{PlayerContext, PlayerSchemaDefinition, PlayerSecurityMiddleware}
import io.circe.Json
import io.circe.generic.auto._
import io.getquill.codegen.jdbc.ComposeableTraitsJdbcCodegen
import io.getquill.codegen.model.{NameParser, SnakeCaseNames}
import play.api.{Environment, Mode}
import play.api.libs.circe._
import play.api.mvc._
import sangria.execution._
import sangria.marshalling.circe._
import sangria.parser.{QueryParser, SyntaxError}
import sangria.renderer.SchemaRenderer
import sangria.schema.Schema
import services._
import utils._

import javax.inject.{Inject, Named}
import scala.concurrent.{ExecutionContext, Future}
import scala.util.{Failure, Success}

class MainController @Inject() (
    controllerComponents: ControllerComponents,
    applicationConfiguration: ApplicationConfiguration,
    config: Config,
    environment: Environment,
    @Named("websocket-manager") websocketManager: ActorRef,
    optionUserAction: OptionUserAction,
    backofficeSchemaDefinition: BackofficeSchemaDefinition,
    playerSchemaDefinition: PlayerSchemaDefinition,
    storage: Storage,
    mailing: Mailing,
    binaryFileService: BinaryFileService,
    chatMessageService: ChatMessageService,
    codingModelService: CodingModelService,
    codingDimensionService: CodingDimensionService,
    codingItemService: CodingItemService,
    codingCriterionService: CodingCriterionService,
    directoryService: DirectoryService,
    emailService: EmailService,
    erpComponentErpProductService: ErpComponentErpProductService,
    erpComponentService: ErpComponentService,
    erpCustomerService: ErpCustomerService,
    erpEmployeeService: ErpEmployeeService,
    erpInvoiceService: ErpInvoiceService,
    erpOrderItemService: ErpOrderItemService,
    erpOrderService: ErpOrderService,
    erpProductService: ErpProductService,
    erpSupplierService: ErpSupplierService,
    erpService: ErpService,
    fileService: FileService,
    freetextQuestionCodingCriterionService: FreetextQuestionCodingCriterionService,
    freetextQuestionRatingService: FreetextQuestionRatingService,
    freetextQuestionRatingCriterionSelectionService: FreetextQuestionRatingCriterionSelectionService,
    interventionService: InterventionService,
    projectService: ProjectService,
    projectModuleService: ProjectModuleService,
    projectUserAccountService: ProjectUserAccountService,
    questionnaireAnswerService: QuestionnaireAnswerService,
    questionnaireQuestionService: QuestionnaireQuestionService,
    questionnaireService: QuestionnaireService,
    questionnaireSurveyResultsService: QuestionnaireSurveyResultsService,
    rScriptService: RScriptService,
    ratingService: RatingService,
    referenceBookChapterService: ReferenceBookChapterService,
    referenceBookArticleService: ReferenceBookArticleService,
    referenceBookContentService: ReferenceBookContentService,
    referenceBookChapterScenarioService: ReferenceBookChapterScenarioService,
    rScriptEvaluation: RScriptEvaluation,
    runtimeSurveyResultsService: RuntimeSurveyResultsService,
    sampleCompanyService: SampleCompanyService,
    scenarioCodingAutomatedCriterionService: ScenarioCodingAutomatedCriterionService,
    scenarioDocumentsService: ScenarioDocumentsService,
    scenarioErpComponentService: ScenarioErpComponentService,
    scenarioErpComponentErpProductService: ScenarioErpComponentErpProductService,
    scenarioErpCustomerService: ScenarioErpCustomerService,
    scenarioErpEmployeeService: ScenarioErpEmployeeService,
    scenarioErpInvoiceService: ScenarioErpInvoiceService,
    scenarioErpOrderService: ScenarioErpOrderService,
    scenarioErpOrderItemService: ScenarioErpOrderItemService,
    scenarioErpProductService: ScenarioErpProductService,
    scenarioErpSupplierService: ScenarioErpSupplierService,
    scenarioService: ScenarioService,
    scenarioQuestionnaireService: ScenarioQuestionnaireService,
    scenarioCodingItemRatingService: ScenarioCodingItemRatingService,
    scenarioRatingCriterionSelectionService: ScenarioRatingCriterionSelectionService,
    scenarioSampleCompanyFileService: ScenarioSampleCompanyFileService,
    scenarioSurveyResultsService: ScenarioSurveyResultsService,
    scenarioUserAccountService: ScenarioUserAccountService,
    spreadsheetService: SpreadsheetService,
    spreadsheetCellService: SpreadsheetCellService,
    surveyService: SurveyService,
    surveyInvitationService: SurveyInvitationService,
    surveyEventService: SurveyEventService,
    surveyResultsService: SurveyResultsService,
    surveyUserAccountService: SurveyUserAccountService,
    textDocumentService: TextDocumentService,
    userAccountService: UserAccountService,
    @Named("execute-rscript-evaluation-actor") executeRScriptEvaluationActor: ActorRef)(implicit
    executionContext: ExecutionContext)
    extends AbstractController(controllerComponents)
    with Circe {

  def schemaBackoffice: Action[AnyContent] =
    environment.mode match {
      case Mode.Dev => Action(Ok(SchemaRenderer.renderSchema(backofficeSchemaDefinition.schema)))
      case _ => Action(NotFound)
    }

  def schemaPlayer: Action[AnyContent] =
    environment.mode match {
      case Mode.Dev => Action(Ok(SchemaRenderer.renderSchema(playerSchemaDefinition.schema)))
      case _ => Action(NotFound)
    }

  def graphqlBackoffice: Action[GraphQLRequestBody] =
    optionUserAction.async(circe.tolerantJson[GraphQLRequestBody])(request =>
      graphql(
        request = request,
        schema = backofficeSchemaDefinition.schema,
        context = createBackofficeContext(request.userAccount),
        middleware = List(BackofficeSecurityMiddleware)
      ))

  def graphqlPlayer: Action[GraphQLRequestBody] =
    optionUserAction.async(circe.tolerantJson[GraphQLRequestBody])(request =>
      graphql(
        request = request,
        schema = playerSchemaDefinition.schema,
        context = createPlayerContext(request.userAccount, request.playerParticipantToken),
        middleware = List(PlayerSecurityMiddleware)
      ))

  private def graphql[Ctx <: ContextBase](
      request: UserAccountRequest[GraphQLRequestBody],
      schema: Schema[Ctx, Unit],
      context: Ctx,
      middleware: List[Middleware[Ctx]]) = {
    val query = request.body.query
    val operationName = request.body.operationName
    val variables = request.body.variables

    executeQuery(
      schema = schema,
      context = context,
      middleware = middleware,
      query = query,
      variables = variables,
      operationName = operationName)
  }

  private def executeQuery[Ctx <: ContextBase](
      schema: Schema[Ctx, Unit],
      context: Ctx,
      middleware: List[Middleware[Ctx]],
      query: String,
      variables: Option[Json],
      operationName: Option[String]) =
    QueryParser.parse(query) match {
      case Success(queryAst) =>
        Executor
          .execute(
            schema,
            queryAst = queryAst,
            userContext = context,
            operationName = operationName,
            variables = variables.getOrElse(Json.obj()),
            exceptionHandler = exceptionHandler,
            middleware = middleware
          )
          .map(result =>
            context.authenticationAction match {
              case Some(Login(userAccountId)) =>
                Ok(result).withSession(UserAction.userAccountIdSessionKey -> userAccountId.toString)
              case Some(Logout) =>
                Ok(result).withNewSession
              case None =>
                Ok(result)
            })
          .recover {
            case error: QueryAnalysisError => BadRequest(error.resolveError)
            case error: ErrorWithResolver => InternalServerError(error.resolveError)
          }

      case Failure(error: SyntaxError) =>
        Future.successful(
          BadRequest(
            Json.obj(
              "syntaxError" -> Json.fromString(error.getMessage),
              "locations" -> Json.arr(
                Json.obj(
                  "line" -> Json.fromInt(error.originalError.position.line),
                  "column" -> Json.fromInt(error.originalError.position.column))
              )
            )))

      case Failure(error) =>
        throw error
    }

  private val exceptionHandler: ExceptionHandler = ExceptionHandler { case (resultMarshaller, error: ApiError) =>
    HandledException(
      message = error.message,
      additionalFields =
        Map("type" -> resultMarshaller.scalarNode(error.getClass.getSimpleName.replace("$", ""), "String", Set.empty))
    )
  }

  private def createBackofficeContext(userAccount: Option[UserAccount]) =
    BackofficeContext(
      executionContext,
      websocketManager: ActorRef,
      userAccount,
      applicationConfiguration,
      storage,
      mailing,
      binaryFileService,
      chatMessageService,
      codingModelService,
      codingDimensionService,
      codingItemService,
      codingCriterionService,
      directoryService,
      emailService,
      erpComponentErpProductService,
      erpComponentService,
      erpCustomerService,
      erpEmployeeService,
      erpInvoiceService,
      erpOrderItemService,
      erpOrderService,
      erpProductService,
      erpSupplierService,
      erpService,
      fileService,
      freetextQuestionCodingCriterionService,
      freetextQuestionRatingService,
      freetextQuestionRatingCriterionSelectionService,
      interventionService,
      projectService,
      projectModuleService,
      projectUserAccountService,
      questionnaireAnswerService,
      questionnaireQuestionService,
      questionnaireService,
      questionnaireSurveyResultsService,
      rScriptService,
      ratingService,
      referenceBookChapterService,
      referenceBookArticleService,
      referenceBookContentService,
      referenceBookChapterScenarioService,
      runtimeSurveyResultsService,
      sampleCompanyService,
      scenarioCodingAutomatedCriterionService,
      scenarioDocumentsService,
      scenarioErpComponentService,
      scenarioErpComponentErpProductService,
      scenarioErpCustomerService,
      scenarioErpEmployeeService,
      scenarioErpInvoiceService,
      scenarioErpOrderService,
      scenarioErpOrderItemService,
      scenarioErpProductService,
      scenarioErpSupplierService,
      scenarioService,
      scenarioQuestionnaireService,
      scenarioCodingItemRatingService,
      scenarioRatingCriterionSelectionService,
      scenarioSampleCompanyFileService,
      scenarioSurveyResultsService,
      scenarioUserAccountService,
      spreadsheetService,
      spreadsheetCellService,
      surveyService,
      surveyInvitationService,
      surveyEventService,
      surveyResultsService,
      surveyUserAccountService,
      textDocumentService,
      userAccountService
    )

  private def createPlayerContext(userAccount: Option[UserAccount], participantToken: Option[String]) =
    PlayerContext(
      executionContext,
      websocketManager: ActorRef,
      userAccount,
      participantToken,
      applicationConfiguration,
      storage,
      mailing,
      binaryFileService,
      codingModelService,
      codingItemService,
      directoryService,
      emailService,
      erpComponentErpProductService,
      erpComponentService,
      erpCustomerService,
      erpEmployeeService,
      erpInvoiceService,
      erpOrderItemService,
      erpOrderService,
      erpProductService,
      erpSupplierService,
      erpService,
      fileService,
      freetextQuestionCodingCriterionService,
      freetextQuestionRatingCriterionSelectionService,
      interventionService,
      projectService,
      projectModuleService,
      questionnaireAnswerService,
      questionnaireQuestionService,
      questionnaireService,
      questionnaireSurveyResultsService,
      referenceBookArticleService,
      referenceBookContentService,
      referenceBookChapterScenarioService,
      runtimeSurveyResultsService,
      sampleCompanyService,
      scenarioService,
      scenarioQuestionnaireService,
      scenarioRatingCriterionSelectionService,
      scenarioSurveyResultsService,
      spreadsheetService,
      spreadsheetCellService,
      surveyService,
      surveyInvitationService,
      surveyEventService,
      surveyResultsService,
      textDocumentService,
      codingDimensionService,
      userAccountService,
      scenarioCodingAutomatedCriterionService,
      codingCriterionService,
      executeRScriptEvaluationActor
    )

  def codegen: Action[AnyContent] =
    Action.async {
      environment.mode match {
        case Mode.Dev =>
          val packageSegments = Seq("database", "generated")

          val dataSource = new org.postgresql.ds.PGSimpleDataSource()
          dataSource.setUser(config.getString("database.user"))
          dataSource.setPassword(config.getString("database.password"))
          dataSource.setDatabaseName(config.getString("database.database"))
          dataSource.setPortNumbers(Seq(config.getInt("database.port")).toArray)
          dataSource.setServerNames(Seq(config.getString("database.host")).toArray)

          val codegen = new ComposeableTraitsJdbcCodegen(dataSource, packageSegments.mkString("."), false) {
            override def nameParser: NameParser = SnakeCaseNames
            override def typer: Typer = new CustomTyper
          }

          Future.sequence(codegen.writeFiles(s"app/${packageSegments.mkString("/")}")).map(_ => Ok)
        case _ => Future.successful(NotFound)
      }
    }
}

case class GraphQLRequestBody(query: String, operationName: Option[String], variables: Option[Json])
