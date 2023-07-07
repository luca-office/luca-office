package enums

import io.circe.{Decoder, Encoder}
import utils.CirceUtils

sealed trait RScriptEvaluationStatus

object RScriptEvaluationStatus {

  case object Success extends RScriptEvaluationStatus
  case object NoResult extends RScriptEvaluationStatus
  case object Timeout extends RScriptEvaluationStatus

  def parse(value: String): RScriptEvaluationStatus =
    value match {
      case "Success" => Success
      case "NoResult" => NoResult
      case "Timeout" => Timeout
    }

  def print(value: RScriptEvaluationStatus): String = value.toString

  implicit val decoder: Decoder[RScriptEvaluationStatus] =
    CirceUtils.mkDecoderWith[RScriptEvaluationStatus](parse)

  implicit val encoder: Encoder[RScriptEvaluationStatus] =
    CirceUtils.mkEncoderWith[RScriptEvaluationStatus](print)
}
