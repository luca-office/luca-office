package graphql

import services._
import utils.Storage

trait ContextBase {
  def authenticationAction: Option[AuthenticationAction]
  def storage: Storage

  def binaryFileService: BinaryFileService
  def codingItemService: CodingItemService
  def codingModelService: CodingModelService
  def directoryService: DirectoryService
  def emailService: EmailService
  def erpService: ErpService
  def fileService: FileService
  def freetextQuestionCodingCriterionService: FreetextQuestionCodingCriterionService
  def freetextQuestionRatingCriterionSelectionService: FreetextQuestionRatingCriterionSelectionService
  def projectService: ProjectService
  def questionnaireAnswerService: QuestionnaireAnswerService
  def questionnaireQuestionService: QuestionnaireQuestionService
  def questionnaireService: QuestionnaireService
  def referenceBookArticleService: ReferenceBookArticleService
  def referenceBookContentService: ReferenceBookContentService
  def sampleCompanyService: SampleCompanyService
  def scenarioRatingCriterionSelectionService: ScenarioRatingCriterionSelectionService
  def scenarioService: ScenarioService
  def spreadsheetCellService: SpreadsheetCellService
  def spreadsheetService: SpreadsheetService
  def surveyInvitationService: SurveyInvitationService
  def surveyService: SurveyService
  def textDocumentService: TextDocumentService
  def userAccountService: UserAccountService
}
