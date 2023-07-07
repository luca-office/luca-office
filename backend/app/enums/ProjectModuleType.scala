package enums

import io.circe.{Decoder, Encoder}
import utils.CirceUtils

sealed trait ProjectModuleType

object ProjectModuleType {

  case object Scenario extends ProjectModuleType
  case object Questionnaire extends ProjectModuleType

  def parse(value: String): ProjectModuleType =
    value match {
      case "Scenario" => Scenario
      case "Questionnaire" => Questionnaire
    }

  def print(value: ProjectModuleType): String = value.toString

  implicit val decoder: Decoder[ProjectModuleType] =
    CirceUtils.mkDecoderWith[ProjectModuleType](parse)

  implicit val encoder: Encoder[ProjectModuleType] =
    CirceUtils.mkEncoderWith[ProjectModuleType](print)
}
