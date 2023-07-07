package enums

import io.circe.{Decoder, Encoder}
import utils.CirceUtils

sealed trait SurveyExecutionType

object SurveyExecutionType {

  case object AutomaticAsynchronous extends SurveyExecutionType
  case object ManualAsynchronous extends SurveyExecutionType
  case object ManualSynchronous extends SurveyExecutionType

  def parse(value: String): SurveyExecutionType =
    value match {
      case "AutomaticAsynchronous" => AutomaticAsynchronous
      case "ManualAsynchronous" => ManualAsynchronous
      case "ManualSynchronous" => ManualSynchronous
    }

  def print(value: SurveyExecutionType): String = value.toString

  implicit val decoder: Decoder[SurveyExecutionType] =
    CirceUtils.mkDecoderWith[SurveyExecutionType](parse)

  implicit val encoder: Encoder[SurveyExecutionType] =
    CirceUtils.mkEncoderWith[SurveyExecutionType](print)
}
