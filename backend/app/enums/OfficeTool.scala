package enums

import io.circe.{Decoder, Encoder}
import utils.CirceUtils

sealed trait OfficeTool

object OfficeTool {

  case object Calculator extends OfficeTool
  case object Chat extends OfficeTool
  case object EmailClient extends OfficeTool
  case object Erp extends OfficeTool
  case object FileBrowser extends OfficeTool
  case object ImageViewer extends OfficeTool
  case object Notes extends OfficeTool
  case object PdfViewer extends OfficeTool
  case object ReferenceBookViewer extends OfficeTool
  case object SpreadsheetEditor extends OfficeTool
  case object TextEditor extends OfficeTool
  case object VideoPlayer extends OfficeTool

  def parse(value: String): OfficeTool =
    value match {
      case "Calculator" => Calculator
      case "Chat" => Chat
      case "EmailClient" => EmailClient
      case "Erp" => Erp
      case "FileBrowser" => FileBrowser
      case "ImageViewer" => ImageViewer
      case "Notes" => Notes
      case "PdfViewer" => PdfViewer
      case "ReferenceBookViewer" => ReferenceBookViewer
      case "SpreadsheetEditor" => SpreadsheetEditor
      case "TextEditor" => TextEditor
      case "VideoPlayer" => VideoPlayer
    }

  def print(value: OfficeTool): String = value.toString

  implicit val decoder: Decoder[OfficeTool] =
    CirceUtils.mkDecoderWith[OfficeTool](parse)

  implicit val encoder: Encoder[OfficeTool] =
    CirceUtils.mkEncoderWith[OfficeTool](print)
}
