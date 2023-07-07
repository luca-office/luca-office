package enums

import io.circe.{Decoder, Encoder}
import utils.CirceUtils

sealed trait MimeType

object MimeType {

  case object ApplicationPdf extends MimeType
  case object ImageGif extends MimeType
  case object ImageJpeg extends MimeType
  case object ImagePng extends MimeType
  case object ImageSvg extends MimeType
  case object Spreadsheet extends MimeType
  case object TextHtml extends MimeType
  case object VideoMp4 extends MimeType

  def parse(value: String): MimeType =
    value match {
      case "ApplicationPdf" => ApplicationPdf
      case "ImageGif" => ImageGif
      case "ImageJpeg" => ImageJpeg
      case "ImagePng" => ImagePng
      case "ImageSvg" => ImageSvg
      case "Spreadsheet" => Spreadsheet
      case "TextHtml" => TextHtml
      case "VideoMp4" => VideoMp4
    }

  def print(value: MimeType): String = value.toString

  implicit val decoder: Decoder[MimeType] =
    CirceUtils.mkDecoderWith[MimeType](parse)

  implicit val encoder: Encoder[MimeType] =
    CirceUtils.mkEncoderWith[MimeType](print)
}
