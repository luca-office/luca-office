package enums

import io.circe.{Decoder, Encoder}
import utils.CirceUtils

sealed trait FamilyStatus

object FamilyStatus {

  case object Married extends FamilyStatus
  case object Single extends FamilyStatus
  case object Divorced extends FamilyStatus

  def parse(value: String): FamilyStatus =
    value match {
      case "Married" => Married
      case "Single" => Single
      case "Divorced" => Divorced
    }

  def print(value: FamilyStatus): String = value.toString

  implicit val decoder: Decoder[FamilyStatus] =
    CirceUtils.mkDecoderWith[FamilyStatus](parse)

  implicit val encoder: Encoder[FamilyStatus] =
    CirceUtils.mkEncoderWith[FamilyStatus](print)
}
