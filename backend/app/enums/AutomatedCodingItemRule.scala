package enums

import io.circe.{Decoder, Encoder}
import utils.CirceUtils

sealed trait AutomatedCodingItemRule

object AutomatedCodingItemRule {

  case object FeatureUsage extends AutomatedCodingItemRule
  case object ToolUsage extends AutomatedCodingItemRule
  case object InputValue extends AutomatedCodingItemRule
  case object DocumentView extends AutomatedCodingItemRule
  case object RScript extends AutomatedCodingItemRule

  def parse(value: String): AutomatedCodingItemRule =
    value match {
      case "FeatureUsage" => FeatureUsage
      case "ToolUsage" => ToolUsage
      case "InputValue" => InputValue
      case "DocumentView" => DocumentView
      case "RScript" => RScript
    }

  def print(value: AutomatedCodingItemRule): String = value.toString

  implicit val decoder: Decoder[AutomatedCodingItemRule] =
    CirceUtils.mkDecoderWith[AutomatedCodingItemRule](parse)

  implicit val encoder: Encoder[AutomatedCodingItemRule] =
    CirceUtils.mkEncoderWith[AutomatedCodingItemRule](print)
}
