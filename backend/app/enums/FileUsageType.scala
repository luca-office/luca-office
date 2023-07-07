package enums

import io.circe.{Decoder, Encoder}
import utils.CirceUtils

sealed trait FileUsageType

object FileUsageType {

  case object FileSystem extends FileUsageType
  case object Email extends FileUsageType

  def parse(value: String): FileUsageType =
    value match {
      case "FileSystem" => FileSystem
      case "Email" => Email
    }

  def print(value: FileUsageType): String = value.toString

  implicit val decoder: Decoder[FileUsageType] =
    CirceUtils.mkDecoderWith[FileUsageType](parse)

  implicit val encoder: Encoder[FileUsageType] =
    CirceUtils.mkEncoderWith[FileUsageType](print)
}
