package enums

import io.circe.{Decoder, Encoder}
import utils.CirceUtils

sealed trait FeatureType

object FeatureType {

  case object AnswerEmail extends FeatureType
  case object CopyToClipboard extends FeatureType
  case object FormulaUsage extends FeatureType
  case object PasteFromClipboard extends FeatureType
  case object Search extends FeatureType

  def parse(value: String): FeatureType =
    value match {
      case "AnswerEmail" => AnswerEmail
      case "CopyToClipboard" => CopyToClipboard
      case "FormulaUsage" => FormulaUsage
      case "PasteFromClipboard" => PasteFromClipboard
      case "Search" => Search
    }

  def print(value: FeatureType): String = value.toString

  implicit val decoder: Decoder[FeatureType] =
    CirceUtils.mkDecoderWith[FeatureType](parse)

  implicit val encoder: Encoder[FeatureType] =
    CirceUtils.mkEncoderWith[FeatureType](print)
}
