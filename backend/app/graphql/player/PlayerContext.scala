package graphql.player

import akka.actor.ActorRef
import database.generated.public.UserAccount
import graphql.{AuthenticationAction, ContextBase, Login, Logout}
import services._
import utils.{ApplicationConfiguration, Mailing, Storage}

import java.util.UUID
import scala.concurrent.ExecutionContext

case class PlayerContext(
    ec: ExecutionContext,
    websocketManager: ActorRef,
    userAccountOption: Option[UserAccount],
    participantToken: Option[String],
    applicationConfiguration: ApplicationConfiguration,
    storage: Storage,
    mailing: Mailing,
    binaryFileService: BinaryFileService,
    codingModelService: CodingModelService,
    codingItemService: CodingItemService,
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
    freetextQuestionRatingCriterionSelectionService: FreetextQuestionRatingCriterionSelectionService,
    interventionService: InterventionService,
    projectService: ProjectService,
    projectModuleService: ProjectModuleService,
    questionnaireAnswerService: QuestionnaireAnswerService,
    questionnaireQuestionService: QuestionnaireQuestionService,
    questionnaireService: QuestionnaireService,
    questionnaireSurveyResultsService: QuestionnaireSurveyResultsService,
    referenceBookArticleService: ReferenceBookArticleService,
    referenceBookContentService: ReferenceBookContentService,
    referenceBookChapterScenarioService: ReferenceBookChapterScenarioService,
    runtimeSurveyResultsService: RuntimeSurveyResultsService,
    sampleCompanyService: SampleCompanyService,
    scenarioService: ScenarioService,
    scenarioQuestionnaireService: ScenarioQuestionnaireService,
    scenarioRatingCriterionSelectionService: ScenarioRatingCriterionSelectionService,
    scenarioSurveyResultsService: ScenarioSurveyResultsService,
    spreadsheetService: SpreadsheetService,
    spreadsheetCellService: SpreadsheetCellService,
    surveyService: SurveyService,
    surveyInvitationService: SurveyInvitationService,
    surveyEventService: SurveyEventService,
    surveyResultsService: SurveyResultsService,
    textDocumentService: TextDocumentService,
    codingDimensionService: CodingDimensionService,
    userAccountService: UserAccountService,
    scenarioCodingAutomatedCriterionService: ScenarioCodingAutomatedCriterionService,
    codingCriterionService: CodingCriterionService,
    executeRScriptEvaluationActor: ActorRef
) extends ContextBase
    with PlayerQuery
    with PlayerMutation {

  implicit def executionContext: ExecutionContext = ec

  var authenticationAction: Option[AuthenticationAction] = None

  def isUserAuthenticated: Boolean =
    participantToken.isDefined

  def createSession(userAccountId: UUID): Unit =
    authenticationAction = Some(Login(userAccountId))

  def removeSession(): Unit =
    authenticationAction = Some(Logout)
}
