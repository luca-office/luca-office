package enums

import io.circe.{Decoder, Encoder}
import utils.CirceUtils

sealed trait AuthenticationType

object AuthenticationType {

  case object OnlyRegistered extends AuthenticationType
  case object OnlyAnonymous extends AuthenticationType
  case object RegisteredOrAnonymous extends AuthenticationType

  def parse(value: String): AuthenticationType =
    value match {
      case "OnlyRegistered" => OnlyRegistered
      case "OnlyAnonymous" => OnlyAnonymous
      case "RegisteredOrAnonymous" => RegisteredOrAnonymous
    }

  def print(value: AuthenticationType): String = value.toString

  implicit val decoder: Decoder[AuthenticationType] =
    CirceUtils.mkDecoderWith[AuthenticationType](parse)

  implicit val encoder: Encoder[AuthenticationType] =
    CirceUtils.mkEncoderWith[AuthenticationType](print)
}
