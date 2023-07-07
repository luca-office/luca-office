package enums

import io.circe.{Decoder, Encoder}
import utils.CirceUtils

sealed trait EmploymentMode

object EmploymentMode {

  case object FullTime extends EmploymentMode
  case object PartTime extends EmploymentMode
  case object Assistance extends EmploymentMode
  case object Student extends EmploymentMode

  def parse(value: String): EmploymentMode =
    value match {
      case "FullTime" => FullTime
      case "PartTime" => PartTime
      case "Assistance" => Assistance
      case "Student" => Student
    }

  def print(value: EmploymentMode): String = value.toString

  implicit val decoder: Decoder[EmploymentMode] =
    CirceUtils.mkDecoderWith[EmploymentMode](parse)

  implicit val encoder: Encoder[EmploymentMode] =
    CirceUtils.mkEncoderWith[EmploymentMode](print)
}
