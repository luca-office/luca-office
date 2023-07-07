package enums

import io.circe.{Decoder, Encoder}
import utils.CirceUtils

sealed trait SpreadsheetCellType

object SpreadsheetCellType {

  case object General extends SpreadsheetCellType
  case object Currency extends SpreadsheetCellType
  case object Date extends SpreadsheetCellType
  case object Number extends SpreadsheetCellType
  case object Percent extends SpreadsheetCellType
  case object Text extends SpreadsheetCellType

  def parse(value: String): SpreadsheetCellType =
    value match {
      case "General" => General
      case "Currency" => Currency
      case "Date" => Date
      case "Number" => Number
      case "Percent" => Percent
      case "Text" => Text
    }

  def print(value: SpreadsheetCellType): String = value.toString

  implicit val decoder: Decoder[SpreadsheetCellType] =
    CirceUtils.mkDecoderWith[SpreadsheetCellType](parse)

  implicit val encoder: Encoder[SpreadsheetCellType] =
    CirceUtils.mkEncoderWith[SpreadsheetCellType](print)
}
