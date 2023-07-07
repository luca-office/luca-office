package enums

import io.circe.{Decoder, Encoder}
import utils.CirceUtils

sealed trait QuestionnaireType

object QuestionnaireType {

  case object Global extends QuestionnaireType
  case object RuntimeSurvey extends QuestionnaireType

  def parse(value: String): QuestionnaireType =
    value match {
      case "Global" => Global
      case "RuntimeSurvey" => RuntimeSurvey
    }

  def print(value: QuestionnaireType): String = value.toString

  implicit val decoder: Decoder[QuestionnaireType] =
    CirceUtils.mkDecoderWith[QuestionnaireType](parse)

  implicit val encoder: Encoder[QuestionnaireType] =
    CirceUtils.mkEncoderWith[QuestionnaireType](print)
}
