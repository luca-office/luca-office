package enums

import io.circe.{Decoder, Encoder}
import utils.CirceUtils

sealed trait ProjectModuleEndType

object ProjectModuleEndType {

  case object ByParticipant extends ProjectModuleEndType
  case object ByTime extends ProjectModuleEndType
  case object ByCommand extends ProjectModuleEndType

  def parse(value: String): ProjectModuleEndType =
    value match {
      case "ByParticipant" => ByParticipant
      case "ByTime" => ByTime
      case "ByCommand" => ByCommand
    }

  def print(value: ProjectModuleEndType): String = value.toString

  implicit val decoder: Decoder[ProjectModuleEndType] =
    CirceUtils.mkDecoderWith[ProjectModuleEndType](parse)

  implicit val encoder: Encoder[ProjectModuleEndType] =
    CirceUtils.mkEncoderWith[ProjectModuleEndType](print)
}
