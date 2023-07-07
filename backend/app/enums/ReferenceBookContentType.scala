package enums

import io.circe.{Decoder, Encoder}
import utils.CirceUtils

sealed trait ReferenceBookContentType

object ReferenceBookContentType {

  case object TextContent extends ReferenceBookContentType
  case object ImageContent extends ReferenceBookContentType
  case object PdfContent extends ReferenceBookContentType
  case object VideoContent extends ReferenceBookContentType

  def parse(value: String): ReferenceBookContentType =
    value match {
      case "TextContent" => TextContent
      case "ImageContent" => ImageContent
      case "PdfContent" => PdfContent
      case "VideoContent" => VideoContent
    }

  def print(value: ReferenceBookContentType): String = value.toString

  implicit val decoder: Decoder[ReferenceBookContentType] =
    CirceUtils.mkDecoderWith[ReferenceBookContentType](parse)

  implicit val encoder: Encoder[ReferenceBookContentType] =
    CirceUtils.mkEncoderWith[ReferenceBookContentType](print)
}
