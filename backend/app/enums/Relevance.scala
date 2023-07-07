package enums

import io.circe.{Decoder, Encoder}
import utils.CirceUtils

sealed trait Relevance

object Relevance {

  case object Required extends Relevance
  case object Irrelevant extends Relevance
  case object PotentiallyHelpful extends Relevance

  def parse(value: String): Relevance =
    value match {
      case "Required" => Required
      case "Irrelevant" => Irrelevant
      case "PotentiallyHelpful" => PotentiallyHelpful
    }

  def print(value: Relevance): String = value.toString

  implicit val decoder: Decoder[Relevance] =
    CirceUtils.mkDecoderWith[Relevance](parse)

  implicit val encoder: Encoder[Relevance] =
    CirceUtils.mkEncoderWith[Relevance](print)
}
