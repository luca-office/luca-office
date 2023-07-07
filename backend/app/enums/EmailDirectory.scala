package enums

import io.circe.{Decoder, Encoder}
import utils.CirceUtils

sealed trait EmailDirectory

object EmailDirectory {

  case object Inbox extends EmailDirectory
  case object Sent extends EmailDirectory
  case object Draft extends EmailDirectory
  case object Trash extends EmailDirectory

  def parse(value: String): EmailDirectory =
    value match {
      case "Inbox" => Inbox
      case "Sent" => Sent
      case "Draft" => Draft
      case "Trash" => Trash
    }

  def print(value: EmailDirectory): String = value.toString

  implicit val decoder: Decoder[EmailDirectory] =
    CirceUtils.mkDecoderWith[EmailDirectory](parse)

  implicit val encoder: Encoder[EmailDirectory] =
    CirceUtils.mkEncoderWith[EmailDirectory](print)
}
