package enums

import io.circe.{Decoder, Encoder}
import utils.CirceUtils

sealed trait ScoringType

object ScoringType {

  case object Holistic extends ScoringType
  case object Analytical extends ScoringType

  def parse(value: String): ScoringType =
    value match {
      case "Holistic" => Holistic
      case "Analytical" => Analytical
    }

  def print(value: ScoringType): String = value.toString

  implicit val decoder: Decoder[ScoringType] =
    CirceUtils.mkDecoderWith[ScoringType](parse)

  implicit val encoder: Encoder[ScoringType] =
    CirceUtils.mkEncoderWith[ScoringType](print)
}
