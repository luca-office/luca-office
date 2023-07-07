package enums

import io.circe.{Decoder, Encoder}
import utils.CirceUtils

sealed trait Sorting

object Sorting {

  case object Ascending extends Sorting
  case object Descending extends Sorting
  case object None extends Sorting

  def parse(value: String): Sorting =
    value match {
      case "Ascending" => Ascending
      case "Descending" => Descending
      case "None" => None
    }

  def print(value: Sorting): String = value.toString

  implicit val decoder: Decoder[Sorting] =
    CirceUtils.mkDecoderWith[Sorting](parse)

  implicit val encoder: Encoder[Sorting] =
    CirceUtils.mkEncoderWith[Sorting](print)
}
