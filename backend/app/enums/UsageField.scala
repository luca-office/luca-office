package enums

import io.circe.{Decoder, Encoder}
import utils.CirceUtils

sealed trait UsageField

object UsageField {

  case object Company extends UsageField
  case object School extends UsageField
  case object Research extends UsageField
  case object Demonstration extends UsageField
  case object Other extends UsageField

  def parse(value: String): UsageField =
    value match {
      case "Company" => Company
      case "School" => School
      case "Research" => Research
      case "Demonstration" => Demonstration
      case "Other" => Other
    }

  def print(value: UsageField): String = value.toString

  implicit val decoder: Decoder[UsageField] =
    CirceUtils.mkDecoderWith[UsageField](parse)

  implicit val encoder: Encoder[UsageField] =
    CirceUtils.mkEncoderWith[UsageField](print)
}
