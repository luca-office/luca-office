package enums

import io.circe.{Decoder, Encoder}
import utils.CirceUtils

sealed trait InterventionType

object InterventionType {

  case object EmailOpening extends InterventionType
  case object ErpRowOpening extends InterventionType
  case object FileOpening extends InterventionType
  case object NotesContent extends InterventionType
  case object RuntimeSurveyAnswerSelection extends InterventionType
  case object SpreadsheetCellContent extends InterventionType
  case object TextDocumentContent extends InterventionType

  def parse(value: String): InterventionType =
    value match {
      case "EmailOpening" => EmailOpening
      case "ErpRowOpening" => ErpRowOpening
      case "FileOpening" => FileOpening
      case "NotesContent" => NotesContent
      case "RuntimeSurveyAnswerSelection" => RuntimeSurveyAnswerSelection
      case "SpreadsheetCellContent" => SpreadsheetCellContent
      case "TextDocumentContent" => TextDocumentContent
    }

  def print(value: InterventionType): String = value.toString

  implicit val decoder: Decoder[InterventionType] =
    CirceUtils.mkDecoderWith[InterventionType](parse)

  implicit val encoder: Encoder[InterventionType] =
    CirceUtils.mkEncoderWith[InterventionType](print)
}
