package enums

import io.circe.{Decoder, Encoder}
import utils.CirceUtils

sealed trait QuestionType

object QuestionType {

  case object SingleChoice extends QuestionType
  case object MultipleChoice extends QuestionType
  case object FreeText extends QuestionType

  def parse(value: String): QuestionType =
    value match {
      case "SingleChoice" => SingleChoice
      case "MultipleChoice" => MultipleChoice
      case "FreeText" => FreeText
    }

  def print(value: QuestionType): String = value.toString

  implicit val decoder: Decoder[QuestionType] =
    CirceUtils.mkDecoderWith[QuestionType](parse)

  implicit val encoder: Encoder[QuestionType] =
    CirceUtils.mkEncoderWith[QuestionType](print)
}
