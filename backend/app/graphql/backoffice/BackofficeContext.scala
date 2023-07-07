package graphql.backoffice

import akka.actor.ActorRef
import database.generated.public.UserAccount
import graphql._
import services._
import utils.{ApplicationConfiguration, Mailing, Storage}

import java.util.UUID
import scala.concurrent.{ExecutionContext, Future}

case class BackofficeContext(
    ec: ExecutionContext,
    websocketManager: ActorRef,
    userAccountOption: Option[UserAccount],
    applicationConfiguration: ApplicationConfiguration,
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
    userAccountService: UserAccountService)
    extends ContextBase
    with BackofficeQuery
    with BackofficeMutation {

  implicit def executionContext: ExecutionContext = ec

  var authenticationAction: Option[AuthenticationAction] = None

  def isUserAuthenticated: Boolean =
    userAccountOption.isDefined

  def createSession(userAccountId: UUID): Unit =
    authenticationAction = Some(Login(userAccountId))

  def removeSession(): Unit =
    authenticationAction = Some(Logout)

  def runWithUserAccount[A](action: UserAccount => Future[A]): Future[A] =
    userAccountOption match {
      case Some(userAccount) =>
        action(userAccount)
      case _ =>
        Future.failed(Unauthorized)
    }
}
