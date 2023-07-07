package enums

import io.circe.{Decoder, Encoder}
import utils.CirceUtils

sealed trait QuestionScoringType

object QuestionScoringType {

  case object Holistic extends QuestionScoringType
  case object Analytical extends QuestionScoringType
  case object None extends QuestionScoringType

  def parse(value: String): QuestionScoringType =
    value match {
      case "Holistic" => Holistic
      case "Analytical" => Analytical
      case "None" => None
    }

  def print(value: QuestionScoringType): String = value.toString

  implicit val decoder: Decoder[QuestionScoringType] =
    CirceUtils.mkDecoderWith[QuestionScoringType](parse)

  implicit val encoder: Encoder[QuestionScoringType] =
    CirceUtils.mkEncoderWith[QuestionScoringType](print)
}
