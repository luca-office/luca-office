package models

import enums._
import io.circe.Json

import java.util.UUID

sealed trait SurveyEventData

sealed trait ProjectSurveyEventData extends SurveyEventData

sealed trait ScenarioSurveyEventData extends SurveyEventData with HasScenarioId
sealed trait EmailClientSurveyEventData extends ScenarioSurveyEventData
sealed trait CalculatorSurveyEventData extends ScenarioSurveyEventData
sealed trait FileBrowserSurveyEventData extends ScenarioSurveyEventData
sealed trait ReferenceBookViewerSurveyEventData extends ScenarioSurveyEventData

sealed trait ImageViewerSurveyEventData extends ScenarioSurveyEventData {
  def binaryFileId: UUID
}

sealed trait VideoViewerSurveyEventData extends ScenarioSurveyEventData

sealed trait PdfViewerSurveyEventData extends ScenarioSurveyEventData {
  def binaryFileId: UUID
}

sealed trait TextEditorSurveyEventData extends ScenarioSurveyEventData {
  def textDocumentId: UUID
}

sealed trait SpreadsheetEditorSurveyEventData extends ScenarioSurveyEventData
sealed trait ErpSurveyEventData extends ScenarioSurveyEventData
sealed trait NotesSurveyEventData extends ScenarioSurveyEventData

sealed trait QuestionnaireSurveyEventData extends SurveyEventData with HasQuestionnaireId {
  def scenarioId: Option[UUID]
}

sealed trait SurveyCommandEventData extends SurveyEventData {
  def surveyId: UUID
  def userAccountId: UUID
}

sealed trait HasScenarioId {
  def scenarioId: UUID
}

sealed trait HasQuestionnaireId {
  def questionnaireId: UUID
}

sealed trait HasQuestionId {
  def questionId: UUID
}

sealed trait HasAnswerId {
  def answerId: UUID
}

sealed trait ChatMessageSurveyEventData {
  def message: String
}

case class StoreParticipantData(firstName: String, lastName: String, salutation: Salutation)
    extends ProjectSurveyEventData
case object StartProject extends ProjectSurveyEventData
case object EndProject extends ProjectSurveyEventData
case object ResumeProject extends ProjectSurveyEventData
case class StartScenario(scenarioId: UUID) extends ProjectSurveyEventData with HasScenarioId
case class EndScenario(scenarioId: UUID, endType: ProjectModuleEndType) extends ProjectSurveyEventData with HasScenarioId
case class ResumeScenario(scenarioId: UUID) extends ProjectSurveyEventData with HasScenarioId
case class StartQuestionnaire(questionnaireId: UUID) extends ProjectSurveyEventData with HasQuestionnaireId
case class EndQuestionnaire(questionnaireId: UUID, endType: ProjectModuleEndType) extends ProjectSurveyEventData with HasQuestionnaireId
case class ResumeQuestionnaire(questionnaireId: UUID) extends ProjectSurveyEventData with HasQuestionnaireId

case class OpenTool(scenarioId: UUID, tool: OfficeTool) extends ScenarioSurveyEventData
case class CloseTool(scenarioId: UUID, tool: OfficeTool) extends ScenarioSurveyEventData
case class MinimizeTool(scenarioId: UUID, tool: OfficeTool) extends ScenarioSurveyEventData
case class RestoreTool(scenarioId: UUID, tool: OfficeTool) extends ScenarioSurveyEventData
case class CopyToClipboard(scenarioId: UUID, content: String) extends ScenarioSurveyEventData
case class PasteFromClipboard(scenarioId: UUID, content: String) extends ScenarioSurveyEventData
case class StartEvent(scenarioId: UUID, questionnaireId: UUID) extends ScenarioSurveyEventData
case class EndEvent(scenarioId: UUID, questionnaireId: UUID) extends ScenarioSurveyEventData
case class ResumeEvent(scenarioId: UUID, questionnaireId: UUID) extends ScenarioSurveyEventData
case class EvaluateIntervention(scenarioId: UUID, interventionId: UUID, occurred: Boolean)
    extends ScenarioSurveyEventData

case class CreateEmail(scenarioId: UUID, id: UUID) extends EmailClientSurveyEventData
case class AnswerEmail(scenarioId: UUID, createdEmailId: UUID, answeredEmailId: UUID) extends EmailClientSurveyEventData
case class ShowEmail(scenarioId: UUID, id: UUID) extends EmailClientSurveyEventData with HasScenarioId
case class DeleteEmailDraft(scenarioId: UUID, id: UUID) extends EmailClientSurveyEventData
case class MoveEmailToTrash(scenarioId: UUID, id: UUID) extends EmailClientSurveyEventData
case class SendEmail(scenarioId: UUID, id: UUID, isCompletionEmail: Boolean, text: String)
    extends EmailClientSurveyEventData
case class SelectEmailDirectory(scenarioId: UUID, directory: EmailDirectory) extends EmailClientSurveyEventData
case class SearchEmails(scenarioId: UUID, query: String) extends EmailClientSurveyEventData
case class UpdateEmail(scenarioId: UUID, id: UUID, to: String, cc: Seq[String], subject: String)
    extends EmailClientSurveyEventData
case class UpdateEmailText(scenarioId: UUID, id: UUID, text: String) extends EmailClientSurveyEventData
case class DownloadEmailAttachment(scenarioId: UUID, emailId: UUID, fileId: UUID) extends EmailClientSurveyEventData
case class AddEmailAttachment(scenarioId: UUID, emailId: UUID, fileId: UUID) extends EmailClientSurveyEventData
case class DeleteEmailAttachment(scenarioId: UUID, emailId: UUID, fileId: UUID) extends EmailClientSurveyEventData
case class ReceiveEmail(scenarioId: UUID, emailId: UUID, interventionId: Option[UUID])
    extends EmailClientSurveyEventData

case class CalculatorKeyPressed(scenarioId: UUID, key: CalculatorKey) extends CalculatorSurveyEventData

case class ViewFile(scenarioId: UUID, directoryId: Option[UUID], fileId: UUID, mimeType: MimeType)
    extends FileBrowserSurveyEventData
    with HasScenarioId
case class ViewDirectory(scenarioId: UUID, directoryId: UUID, parentDirectoryId: Option[UUID])
    extends FileBrowserSurveyEventData
case class ViewDownloadsDirectory(scenarioId: UUID) extends FileBrowserSurveyEventData

case class ViewReferenceBookChapter(scenarioId: UUID, chapterId: UUID) extends ReferenceBookViewerSurveyEventData
case class ViewReferenceBookArticle(scenarioId: UUID, chapterId: UUID, articleId: UUID)
    extends ReferenceBookViewerSurveyEventData
case class ViewReferenceBookBinary(scenarioId: UUID, chapterId: UUID, articleId: UUID, binaryFileId: UUID)
    extends ReferenceBookViewerSurveyEventData
case class SearchReferenceBook(scenarioId: UUID, query: String) extends ReferenceBookViewerSurveyEventData

case class OpenImageBinary(
    scenarioId: UUID,
    directoryId: Option[UUID],
    fileId: Option[UUID],
    binaryFileId: UUID,
    binaryFileUrl: String,
    binaryFileTitle: String)
    extends ImageViewerSurveyEventData
case class CloseImageBinary(scenarioId: UUID, binaryFileId: UUID) extends ImageViewerSurveyEventData
case class SelectImageBinary(
    scenarioId: UUID,
    binaryFileId: UUID,
    binaryFileUrl: String,
    binaryFileTitle: String)
    extends ImageViewerSurveyEventData

case class OpenVideoBinary(
    scenarioId: UUID,
    directoryId: Option[UUID],
    fileId: Option[UUID],
    binaryFileId: UUID,
    binaryFileUrl: String,
    binaryFileTitle: String)
    extends VideoViewerSurveyEventData
case class CloseVideoBinary(scenarioId: UUID, binaryFileId: UUID) extends VideoViewerSurveyEventData
case class SelectVideoBinary(
    scenarioId: UUID,
    binaryFileId: UUID,
    binaryFileUrl: String,
    binaryFileTitle: String)
    extends VideoViewerSurveyEventData
case class PlayVideo(scenarioId: UUID, fileId: Option[UUID]) extends VideoViewerSurveyEventData
case class PauseVideo(scenarioId: UUID, fileId: UUID) extends VideoViewerSurveyEventData

case class OpenPdfBinary(
    scenarioId: UUID,
    directoryId: Option[UUID],
    fileId: Option[UUID],
    binaryFileId: UUID,
    binaryFileUrl: String,
    binaryFileTitle: String)
    extends PdfViewerSurveyEventData
case class ClosePdfBinary(scenarioId: UUID, binaryFileId: UUID) extends PdfViewerSurveyEventData
case class SelectPdfBinary(
    scenarioId: UUID,
    binaryFileId: UUID,
    binaryFileUrl: String,
    binaryFileTitle: String)
    extends PdfViewerSurveyEventData

case class OpenSpreadsheet(
    scenarioId: UUID,
    directoryId: Option[UUID],
    fileId: UUID,
    spreadsheetId: UUID,
    spreadsheetTitle: String
) extends SpreadsheetEditorSurveyEventData
case class CloseSpreadsheet(scenarioId: UUID, spreadsheetId: UUID) extends SpreadsheetEditorSurveyEventData
case class SelectSpreadsheet(
    scenarioId: UUID,
    directoryId: Option[UUID],
    fileId: UUID,
    spreadsheetId: UUID,
    spreadsheetTitle: String
) extends SpreadsheetEditorSurveyEventData
case class UpdateSpreadsheetCellValue(
    scenarioId: UUID,
    fileId: UUID,
    spreadsheetId: UUID,
    rowIndex: Int,
    columnIndex: Int,
    cellId: UUID,
    cellType: SpreadsheetCellType,
    value: String
) extends SpreadsheetEditorSurveyEventData
case class UpdateSpreadsheetCellType(
    scenarioId: UUID,
    fileId: UUID,
    spreadsheetId: UUID,
    rowIndex: Int,
    columnIndex: Int,
    cellId: UUID,
    cellType: SpreadsheetCellType,
    value: String
) extends SpreadsheetEditorSurveyEventData
case class UpdateSpreadsheetCellStyle(
    scenarioId: UUID,
    fileId: UUID,
    spreadsheetId: UUID,
    rowIndex: Int,
    columnIndex: Int,
    cellId: UUID,
    style: Json
) extends SpreadsheetEditorSurveyEventData
case class SelectSpreadsheetCell(
    scenarioId: UUID,
    fileId: UUID,
    spreadsheetId: UUID,
    rowIndex: Int,
    columnIndex: Int,
    cellId: UUID)
    extends SpreadsheetEditorSurveyEventData
case class SelectSpreadsheetCellRange(
    scenarioId: UUID,
    fileId: UUID,
    spreadsheetId: UUID,
    startCellRowIndex: Int,
    startCellColumnIndex: Int,
    endCellRowIndex: Int,
    endCellColumnIndex: Int)
    extends SpreadsheetEditorSurveyEventData

case class OpenTextDocument(
    scenarioId: UUID,
    directoryId: Option[UUID],
    fileId: UUID,
    textDocumentId: UUID,
    textDocumentTitle: String
) extends TextEditorSurveyEventData
case class CloseTextDocument(scenarioId: UUID, textDocumentId: UUID) extends TextEditorSurveyEventData
case class SelectTextDocument(
    scenarioId: UUID,
    directoryId: Option[UUID],
    fileId: UUID,
    textDocumentId: UUID,
    textDocumentTitle: String
) extends TextEditorSurveyEventData
case class UpdateTextDocumentContent(scenarioId: UUID, fileId: UUID, textDocumentId: UUID, content: String)
    extends TextEditorSurveyEventData

case class SelectQuestionnaireAnswer(
    questionnaireId: UUID,
    scenarioId: Option[UUID],
    questionId: UUID,
    questionPosition: BigDecimal,
    answerId: UUID,
    answerPosition: BigDecimal,
    value: String)
    extends QuestionnaireSurveyEventData
    with HasQuestionId
    with HasAnswerId
case class DeselectQuestionnaireAnswer(
    questionnaireId: UUID,
    scenarioId: Option[UUID],
    questionId: UUID,
    questionPosition: BigDecimal,
    answerId: UUID,
    answerPosition: BigDecimal,
    value: String)
    extends QuestionnaireSurveyEventData
    with HasQuestionId
    with HasAnswerId
case class SelectQuestionnaireFreetextAnswer(
    questionnaireId: UUID,
    scenarioId: Option[UUID],
    questionId: UUID,
    questionPosition: BigDecimal,
    answerPosition: Option[BigDecimal],
    value: String)
    extends QuestionnaireSurveyEventData
    with HasQuestionId
case class DeselectQuestionnaireFreetextAnswer(
    questionnaireId: UUID,
    scenarioId: Option[UUID],
    questionId: UUID,
    questionPosition: BigDecimal,
    answerPosition: Option[BigDecimal],
    value: String)
    extends QuestionnaireSurveyEventData
    with HasQuestionId
case class UpdateQuestionnaireFreeTextAnswer(
    questionnaireId: UUID,
    scenarioId: Option[UUID],
    questionId: UUID,
    questionPosition: BigDecimal,
    answerPosition: Option[BigDecimal],
    value: String)
    extends QuestionnaireSurveyEventData
    with HasQuestionId
case class EnlargeQuestionnaireBinary(questionnaireId: UUID, scenarioId: Option[UUID], binaryFileId: UUID)
    extends QuestionnaireSurveyEventData
case class ShrinkQuestionnaireBinary(questionnaireId: UUID, scenarioId: Option[UUID], binaryFileId: UUID)
    extends QuestionnaireSurveyEventData
case class PlayQuestionnaireVideo(questionnaireId: UUID, scenarioId: Option[UUID], binaryFileId: UUID)
    extends QuestionnaireSurveyEventData
case class PauseQuestionnaireVideo(questionnaireId: UUID, scenarioId: Option[UUID], binaryFileId: UUID)
    extends QuestionnaireSurveyEventData
case class EnterFullscreenQuestionnaireVideo(questionnaireId: UUID, scenarioId: Option[UUID], binaryFileId: UUID)
    extends QuestionnaireSurveyEventData
case class LeaveFullscreenQuestionnaireVideo(questionnaireId: UUID, scenarioId: Option[UUID], binaryFileId: UUID)
    extends QuestionnaireSurveyEventData
case class QuestionnaireVideoPlaybackEnded(questionnaireId: UUID, scenarioId: Option[UUID], binaryFileId: UUID)
    extends QuestionnaireSurveyEventData
case class EnlargeQuestionnaireQuestionBinary(
    questionnaireId: UUID,
    scenarioId: Option[UUID],
    questionId: UUID,
    binaryFileId: UUID)
    extends QuestionnaireSurveyEventData
    with HasQuestionId
case class ShrinkQuestionnaireQuestionBinary(
    questionnaireId: UUID,
    scenarioId: Option[UUID],
    questionId: UUID,
    binaryFileId: UUID)
    extends QuestionnaireSurveyEventData
    with HasQuestionId
case class PlayQuestionnaireQuestionVideo(
    questionnaireId: UUID,
    scenarioId: Option[UUID],
    questionId: UUID,
    binaryFileId: UUID)
    extends QuestionnaireSurveyEventData
    with HasQuestionId
case class PauseQuestionnaireQuestionVideo(
    questionnaireId: UUID,
    scenarioId: Option[UUID],
    questionId: UUID,
    binaryFileId: UUID)
    extends QuestionnaireSurveyEventData
    with HasQuestionId
case class EnterFullscreenQuestionnaireQuestionVideo(
    questionnaireId: UUID,
    scenarioId: Option[UUID],
    questionId: UUID,
    binaryFileId: UUID)
    extends QuestionnaireSurveyEventData
    with HasQuestionId
case class LeaveFullscreenQuestionnaireQuestionVideo(
    questionnaireId: UUID,
    scenarioId: Option[UUID],
    questionId: UUID,
    binaryFileId: UUID)
    extends QuestionnaireSurveyEventData
    with HasQuestionId
case class QuestionnaireQuestionVideoPlaybackEnded(
    questionnaireId: UUID,
    scenarioId: Option[UUID],
    questionId: UUID,
    binaryFileId: UUID)
    extends QuestionnaireSurveyEventData
    with HasQuestionId

case class ErpExpandDirectory(scenarioId: UUID, directoryName: String) extends ErpSurveyEventData
case class ErpCollapseDirectory(scenarioId: UUID, directoryName: String) extends ErpSurveyEventData
case class ErpSelectTable(scenarioId: UUID, tableType: Option[ErpTableType], tableName: String, isDisabled: Boolean)
    extends ErpSurveyEventData
case class ErpSelectRow(scenarioId: UUID, tableType: ErpTableType, rowId: Int, rowIndex: Int) extends ErpSurveyEventData
case class ErpDeselectRow(scenarioId: UUID, tableType: ErpTableType, rowId: Int, rowIndex: Int)
    extends ErpSurveyEventData
case class ErpSelectAllRows(scenarioId: UUID, tableType: ErpTableType, rowsCount: Int) extends ErpSurveyEventData
case class ErpDeselectAllRows(scenarioId: UUID, tableType: ErpTableType, rowsCount: Int) extends ErpSurveyEventData
case class ErpSelectCell(
    scenarioId: UUID,
    tableType: ErpTableType,
    rowId: Int,
    rowIndex: Int,
    columnName: String,
    columnIndex: Int,
    value: String)
    extends ErpSurveyEventData
case class ErpCopyCellContentToClipboard(
    scenarioId: UUID,
    tableType: ErpTableType,
    rowId: Int,
    rowIndex: Int,
    columnName: String,
    columnIndex: Int,
    value: String)
    extends ErpSurveyEventData
case class ErpSearchTable(scenarioId: UUID, tableType: ErpTableType, query: String, resultsCount: Int)
    extends ErpSurveyEventData
case class ErpUpdateShowOnlySelectedRows(
    scenarioId: UUID,
    tableType: ErpTableType,
    selectedRowsCount: Int,
    value: Boolean)
    extends ErpSurveyEventData
case class ErpSortTable(
    scenarioId: UUID,
    tableType: ErpTableType,
    columnName: String,
    columnIndex: Int,
    sorting: Sorting)
    extends ErpSurveyEventData
case class ErpOpenRow(scenarioId: UUID, tableType: ErpTableType, rowId: Int, rowIndex: Int) extends ErpSurveyEventData
case class ErpCloseRow(scenarioId: UUID, tableType: ErpTableType, rowId: Int, rowIndex: Int) extends ErpSurveyEventData
case class ErpOpenAttachment(scenarioId: UUID, tableType: ErpTableType, rowId: Int, rowIndex: Int, binaryFileId: UUID)
    extends ErpSurveyEventData
case class ErpCopyCoreDataToClipboard(
    scenarioId: UUID,
    tableType: ErpTableType,
    rowId: Int,
    rowIndex: Int,
    value: String)
    extends ErpSurveyEventData
case class ErpCopyCoreDataAndReferencesToClipboard(
    scenarioId: UUID,
    tableType: ErpTableType,
    rowId: Int,
    rowIndex: Int,
    value: String)
    extends ErpSurveyEventData
case class ErpCopyReferenceToClipboard(
    scenarioId: UUID,
    tableType: ErpTableType,
    rowId: Int,
    rowIndex: Int,
    columnName: String,
    value: String)
    extends ErpSurveyEventData
case class ErpNavigateToReference(
    scenarioId: UUID,
    tableType: ErpTableType,
    rowId: Int,
    targetTableType: ErpTableType,
    targetRowId: Int)
    extends ErpSurveyEventData
case class ErpNavigateBack(
    scenarioId: UUID,
    tableType: ErpTableType,
    rowId: Int,
    targetTableType: ErpTableType,
    targetRowId: Int)
    extends ErpSurveyEventData

case class UpdateNotesText(scenarioId: UUID, text: String) extends NotesSurveyEventData

case class StartSurveyCommand(surveyId: UUID, userAccountId: UUID) extends SurveyCommandEventData
case class EndSurveyCommand(surveyId: UUID, userAccountId: UUID) extends SurveyCommandEventData
case class StartScenarioCommand(surveyId: UUID, scenarioId: UUID, userAccountId: UUID) extends SurveyCommandEventData
case class StartQuestionnaireCommand(surveyId: UUID, questionnaireId: UUID, userAccountId: UUID)
    extends SurveyCommandEventData

case class SendSupervisorChatMessage(userAccountId: UUID, recipientInvitationId: UUID, message: String)
    extends SurveyEventData
    with ChatMessageSurveyEventData
case class SendParticipantChatMessage(
    invitationId: UUID,
    message: String,
    currentScenarioId: Option[UUID],
    currentQuestionnaireId: Option[UUID])
    extends SurveyEventData
    with ChatMessageSurveyEventData
case class ReceiveSupervisorChatMessage(message: String) extends SurveyEventData with ChatMessageSurveyEventData
