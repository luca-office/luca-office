package enums

import io.circe.{Decoder, Encoder}
import utils.CirceUtils

sealed trait Salutation

object Salutation {

  case object Mr extends Salutation
  case object Mrs extends Salutation
  case object NonBinary extends Salutation

  def parse(value: String): Salutation =
    value match {
      case "Mr" => Mr
      case "Mrs" => Mrs
      case "NonBinary" => NonBinary
    }

  def print(value: Salutation): String = value.toString

  implicit val decoder: Decoder[Salutation] =
    CirceUtils.mkDecoderWith[Salutation](parse)

  implicit val encoder: Encoder[Salutation] =
    CirceUtils.mkEncoderWith[Salutation](print)
}
