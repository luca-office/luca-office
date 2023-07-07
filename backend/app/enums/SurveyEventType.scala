package enums

import io.circe.{Decoder, Encoder}
import utils.CirceUtils

sealed trait SurveyEventType

object SurveyEventType {

  case object StoreParticipantData extends SurveyEventType
  case object StartProject extends SurveyEventType
  case object EndProject extends SurveyEventType
  case object ResumeProject extends SurveyEventType
  case object StartScenario extends SurveyEventType
  case object EndScenario extends SurveyEventType
  case object ResumeScenario extends SurveyEventType
  case object StartQuestionnaire extends SurveyEventType
  case object EndQuestionnaire extends SurveyEventType
  case object ResumeQuestionnaire extends SurveyEventType
  case object CopyToClipboard extends SurveyEventType
  case object PasteFromClipboard extends SurveyEventType
  case object EvaluateIntervention extends SurveyEventType
  case object CreateEmail extends SurveyEventType
  case object AnswerEmail extends SurveyEventType
  case object ShowEmail extends SurveyEventType
  case object DeleteEmailDraft extends SurveyEventType
  case object MoveEmailToTrash extends SurveyEventType
  case object SendEmail extends SurveyEventType
  case object SelectEmailDirectory extends SurveyEventType
  case object SearchEmails extends SurveyEventType
  case object UpdateEmail extends SurveyEventType
  case object UpdateEmailText extends SurveyEventType
  case object DownloadEmailAttachment extends SurveyEventType
  case object AddEmailAttachment extends SurveyEventType
  case object DeleteEmailAttachment extends SurveyEventType
  case object ReceiveEmail extends SurveyEventType
  case object CalculatorKeyPressed extends SurveyEventType
  case object OpenTool extends SurveyEventType
  case object CloseTool extends SurveyEventType
  case object MinimizeTool extends SurveyEventType
  case object RestoreTool extends SurveyEventType
  case object ViewDirectory extends SurveyEventType
  case object ViewDownloadsDirectory extends SurveyEventType
  case object ViewFile extends SurveyEventType
  case object OpenImageBinary extends SurveyEventType
  case object CloseImageBinary extends SurveyEventType
  case object SelectImageBinary extends SurveyEventType
  case object OpenVideoBinary extends SurveyEventType
  case object CloseVideoBinary extends SurveyEventType
  case object SelectVideoBinary extends SurveyEventType
  case object OpenPdfBinary extends SurveyEventType
  case object ClosePdfBinary extends SurveyEventType
  case object SelectPdfBinary extends SurveyEventType
  case object OpenSpreadsheet extends SurveyEventType
  case object CloseSpreadsheet extends SurveyEventType
  case object SelectSpreadsheet extends SurveyEventType
  case object OpenTextDocument extends SurveyEventType
  case object CloseTextDocument extends SurveyEventType
  case object SelectTextDocument extends SurveyEventType
  case object UpdateTextDocumentContent extends SurveyEventType
  case object ViewReferenceBookChapter extends SurveyEventType
  case object ViewReferenceBookArticle extends SurveyEventType
  case object ViewReferenceBookBinary extends SurveyEventType
  case object SearchReferenceBook extends SurveyEventType
  case object PlayVideo extends SurveyEventType
  case object PauseVideo extends SurveyEventType
  case object UpdateSpreadsheetCellValue extends SurveyEventType
  case object UpdateSpreadsheetCellType extends SurveyEventType
  case object UpdateSpreadsheetCellStyle extends SurveyEventType
  case object SelectSpreadsheetCell extends SurveyEventType
  case object SelectSpreadsheetCellRange extends SurveyEventType
  case object StartEvent extends SurveyEventType
  case object EndEvent extends SurveyEventType
  case object ResumeEvent extends SurveyEventType
  case object SelectQuestionnaireAnswer extends SurveyEventType
  case object DeselectQuestionnaireAnswer extends SurveyEventType
  case object SelectQuestionnaireFreetextAnswer extends SurveyEventType
  case object DeselectQuestionnaireFreetextAnswer extends SurveyEventType
  case object UpdateQuestionnaireFreeTextAnswer extends SurveyEventType
  case object EnlargeQuestionnaireBinary extends SurveyEventType
  case object ShrinkQuestionnaireBinary extends SurveyEventType
  case object PlayQuestionnaireVideo extends SurveyEventType
  case object PauseQuestionnaireVideo extends SurveyEventType
  case object EnterFullscreenQuestionnaireVideo extends SurveyEventType
  case object LeaveFullscreenQuestionnaireVideo extends SurveyEventType
  case object QuestionnaireVideoPlaybackEnded extends SurveyEventType
  case object EnlargeQuestionnaireQuestionBinary extends SurveyEventType
  case object ShrinkQuestionnaireQuestionBinary extends SurveyEventType
  case object PlayQuestionnaireQuestionVideo extends SurveyEventType
  case object PauseQuestionnaireQuestionVideo extends SurveyEventType
  case object EnterFullscreenQuestionnaireQuestionVideo extends SurveyEventType
  case object LeaveFullscreenQuestionnaireQuestionVideo extends SurveyEventType
  case object QuestionnaireQuestionVideoPlaybackEnded extends SurveyEventType
  case object ErpExpandDirectory extends SurveyEventType
  case object ErpCollapseDirectory extends SurveyEventType
  case object ErpSelectTable extends SurveyEventType
  case object ErpSelectRow extends SurveyEventType
  case object ErpDeselectRow extends SurveyEventType
  case object ErpSelectAllRows extends SurveyEventType
  case object ErpDeselectAllRows extends SurveyEventType
  case object ErpSelectCell extends SurveyEventType
  case object ErpCopyCellContentToClipboard extends SurveyEventType
  case object ErpSearchTable extends SurveyEventType
  case object ErpUpdateShowOnlySelectedRows extends SurveyEventType
  case object ErpSortTable extends SurveyEventType
  case object ErpOpenRow extends SurveyEventType
  case object ErpCloseRow extends SurveyEventType
  case object ErpOpenAttachment extends SurveyEventType
  case object ErpCopyCoreDataToClipboard extends SurveyEventType
  case object ErpCopyCoreDataAndReferencesToClipboard extends SurveyEventType
  case object ErpCopyReferenceToClipboard extends SurveyEventType
  case object ErpNavigateToReference extends SurveyEventType
  case object ErpNavigateBack extends SurveyEventType
  case object UpdateNotesText extends SurveyEventType
  case object StartSurveyCommand extends SurveyEventType
  case object EndSurveyCommand extends SurveyEventType
  case object StartScenarioCommand extends SurveyEventType
  case object StartQuestionnaireCommand extends SurveyEventType
  case object SendSupervisorChatMessage extends SurveyEventType
  case object SendParticipantChatMessage extends SurveyEventType
  case object ReceiveSupervisorChatMessage extends SurveyEventType

  def parse(value: String): SurveyEventType =
    value match {
      case "StoreParticipantData" => StoreParticipantData
      case "StartProject" => StartProject
      case "EndProject" => EndProject
      case "ResumeProject" => ResumeProject
      case "StartScenario" => StartScenario
      case "EndScenario" => EndScenario
      case "ResumeScenario" => ResumeScenario
      case "StartQuestionnaire" => StartQuestionnaire
      case "EndQuestionnaire" => EndQuestionnaire
      case "ResumeQuestionnaire" => ResumeQuestionnaire
      case "CopyToClipboard" => CopyToClipboard
      case "PasteFromClipboard" => PasteFromClipboard
      case "EvaluateIntervention" => EvaluateIntervention
      case "CreateEmail" => CreateEmail
      case "AnswerEmail" => AnswerEmail
      case "ShowEmail" => ShowEmail
      case "DeleteEmailDraft" => DeleteEmailDraft
      case "MoveEmailToTrash" => MoveEmailToTrash
      case "SendEmail" => SendEmail
      case "SelectEmailDirectory" => SelectEmailDirectory
      case "SearchEmails" => SearchEmails
      case "UpdateEmail" => UpdateEmail
      case "UpdateEmailText" => UpdateEmailText
      case "DownloadEmailAttachment" => DownloadEmailAttachment
      case "AddEmailAttachment" => AddEmailAttachment
      case "DeleteEmailAttachment" => DeleteEmailAttachment
      case "ReceiveEmail" => ReceiveEmail
      case "CalculatorKeyPressed" => CalculatorKeyPressed
      case "OpenTool" => OpenTool
      case "CloseTool" => CloseTool
      case "MinimizeTool" => MinimizeTool
      case "RestoreTool" => RestoreTool
      case "ViewDirectory" => ViewDirectory
      case "ViewDownloadsDirectory" => ViewDownloadsDirectory
      case "ViewFile" => ViewFile
      case "OpenImageBinary" => OpenImageBinary
      case "CloseImageBinary" => CloseImageBinary
      case "SelectImageBinary" => SelectImageBinary
      case "OpenVideoBinary" => OpenVideoBinary
      case "CloseVideoBinary" => CloseVideoBinary
      case "SelectVideoBinary" => SelectVideoBinary
      case "OpenPdfBinary" => OpenPdfBinary
      case "ClosePdfBinary" => ClosePdfBinary
      case "SelectPdfBinary" => SelectPdfBinary
      case "OpenSpreadsheet" => OpenSpreadsheet
      case "CloseSpreadsheet" => CloseSpreadsheet
      case "SelectSpreadsheet" => SelectSpreadsheet
      case "OpenTextDocument" => OpenTextDocument
      case "CloseTextDocument" => CloseTextDocument
      case "SelectTextDocument" => SelectTextDocument
      case "UpdateTextDocumentContent" => UpdateTextDocumentContent
      case "ViewReferenceBookChapter" => ViewReferenceBookChapter
      case "ViewReferenceBookArticle" => ViewReferenceBookArticle
      case "ViewReferenceBookBinary" => ViewReferenceBookBinary
      case "SearchReferenceBook" => SearchReferenceBook
      case "PlayVideo" => PlayVideo
      case "PauseVideo" => PauseVideo
      case "UpdateSpreadsheetCellValue" => UpdateSpreadsheetCellValue
      case "UpdateSpreadsheetCellType" => UpdateSpreadsheetCellType
      case "UpdateSpreadsheetCellStyle" => UpdateSpreadsheetCellStyle
      case "SelectSpreadsheetCell" => SelectSpreadsheetCell
      case "SelectSpreadsheetCellRange" => SelectSpreadsheetCellRange
      case "StartEvent" => StartEvent
      case "EndEvent" => EndEvent
      case "ResumeEvent" => ResumeEvent
      case "SelectQuestionnaireAnswer" => SelectQuestionnaireAnswer
      case "DeselectQuestionnaireAnswer" => DeselectQuestionnaireAnswer
      case "SelectQuestionnaireFreetextAnswer" => SelectQuestionnaireFreetextAnswer
      case "DeselectQuestionnaireFreetextAnswer" => DeselectQuestionnaireFreetextAnswer
      case "UpdateQuestionnaireFreeTextAnswer" => UpdateQuestionnaireFreeTextAnswer
      case "EnlargeQuestionnaireBinary" => EnlargeQuestionnaireBinary
      case "ShrinkQuestionnaireBinary" => ShrinkQuestionnaireBinary
      case "PlayQuestionnaireVideo" => PlayQuestionnaireVideo
      case "PauseQuestionnaireVideo" => PauseQuestionnaireVideo
      case "EnterFullscreenQuestionnaireVideo" => EnterFullscreenQuestionnaireVideo
      case "LeaveFullscreenQuestionnaireVideo" => LeaveFullscreenQuestionnaireVideo
      case "QuestionnaireVideoPlaybackEnded" => QuestionnaireVideoPlaybackEnded
      case "EnlargeQuestionnaireQuestionBinary" => EnlargeQuestionnaireQuestionBinary
      case "ShrinkQuestionnaireQuestionBinary" => ShrinkQuestionnaireQuestionBinary
      case "PlayQuestionnaireQuestionVideo" => PlayQuestionnaireQuestionVideo
      case "PauseQuestionnaireQuestionVideo" => PauseQuestionnaireQuestionVideo
      case "EnterFullscreenQuestionnaireQuestionVideo" => EnterFullscreenQuestionnaireQuestionVideo
      case "LeaveFullscreenQuestionnaireQuestionVideo" => LeaveFullscreenQuestionnaireQuestionVideo
      case "QuestionnaireQuestionVideoPlaybackEnded" => QuestionnaireQuestionVideoPlaybackEnded
      case "ErpExpandDirectory" => ErpExpandDirectory
      case "ErpCollapseDirectory" => ErpCollapseDirectory
      case "ErpSelectTable" => ErpSelectTable
      case "ErpSelectRow" => ErpSelectRow
      case "ErpDeselectRow" => ErpDeselectRow
      case "ErpSelectAllRows" => ErpSelectAllRows
      case "ErpDeselectAllRows" => ErpDeselectAllRows
      case "ErpSelectCell" => ErpSelectCell
      case "ErpCopyCellContentToClipboard" => ErpCopyCellContentToClipboard
      case "ErpSearchTable" => ErpSearchTable
      case "ErpUpdateShowOnlySelectedRows" => ErpUpdateShowOnlySelectedRows
      case "ErpSortTable" => ErpSortTable
      case "ErpOpenRow" => ErpOpenRow
      case "ErpCloseRow" => ErpCloseRow
      case "ErpOpenAttachment" => ErpOpenAttachment
      case "ErpCopyCoreDataToClipboard" => ErpCopyCoreDataToClipboard
      case "ErpCopyCoreDataAndReferencesToClipboard" => ErpCopyCoreDataAndReferencesToClipboard
      case "ErpCopyReferenceToClipboard" => ErpCopyReferenceToClipboard
      case "ErpNavigateToReference" => ErpNavigateToReference
      case "ErpNavigateBack" => ErpNavigateBack
      case "UpdateNotesText" => UpdateNotesText
      case "StartSurveyCommand" => StartSurveyCommand
      case "EndSurveyCommand" => EndSurveyCommand
      case "StartScenarioCommand" => StartScenarioCommand
      case "StartQuestionnaireCommand" => StartQuestionnaireCommand
      case "SendSupervisorChatMessage" => SendSupervisorChatMessage
      case "SendParticipantChatMessage" => SendParticipantChatMessage
      case "ReceiveSupervisorChatMessage" => ReceiveSupervisorChatMessage
    }

  def print(value: SurveyEventType): String = value.toString

  implicit val decoder: Decoder[SurveyEventType] =
    CirceUtils.mkDecoderWith[SurveyEventType](parse)

  implicit val encoder: Encoder[SurveyEventType] =
    CirceUtils.mkEncoderWith[SurveyEventType](print)
}
