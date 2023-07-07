package enums

import io.circe.{Decoder, Encoder}
import utils.CirceUtils

sealed trait ProjectModuleProgressType

object ProjectModuleProgressType {

  case object InProgress extends ProjectModuleProgressType
  case object Completed extends ProjectModuleProgressType

  def parse(value: String): ProjectModuleProgressType =
    value match {
      case "InProgress" => InProgress
      case "Completed" => Completed
    }

  def print(value: ProjectModuleProgressType): String = value.toString

  implicit val decoder: Decoder[ProjectModuleProgressType] =
    CirceUtils.mkDecoderWith[ProjectModuleProgressType](parse)

  implicit val encoder: Encoder[ProjectModuleProgressType] =
    CirceUtils.mkEncoderWith[ProjectModuleProgressType](print)
}
