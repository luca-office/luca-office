package enums

import io.circe.{Decoder, Encoder}
import utils.CirceUtils

sealed trait DeliveryStatus

object DeliveryStatus {

  case object InProcess extends DeliveryStatus
  case object Completed extends DeliveryStatus

  def parse(value: String): DeliveryStatus =
    value match {
      case "InProcess" => InProcess
      case "Completed" => Completed
    }

  def print(value: DeliveryStatus): String = value.toString

  implicit val decoder: Decoder[DeliveryStatus] =
    CirceUtils.mkDecoderWith[DeliveryStatus](parse)

  implicit val encoder: Encoder[DeliveryStatus] =
    CirceUtils.mkEncoderWith[DeliveryStatus](print)
}
