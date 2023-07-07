package enums

import io.circe.{Decoder, Encoder}
import utils.CirceUtils

sealed trait PaymentStatus

object PaymentStatus {

  case object Paid extends PaymentStatus
  case object Unpaid extends PaymentStatus

  def parse(value: String): PaymentStatus =
    value match {
      case "Paid" => Paid
      case "Unpaid" => Unpaid
    }

  def print(value: PaymentStatus): String = value.toString

  implicit val decoder: Decoder[PaymentStatus] =
    CirceUtils.mkDecoderWith[PaymentStatus](parse)

  implicit val encoder: Encoder[PaymentStatus] =
    CirceUtils.mkEncoderWith[PaymentStatus](print)
}
