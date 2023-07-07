package enums

import io.circe.{Decoder, Encoder}
import utils.CirceUtils

sealed trait CalculatorKey

object CalculatorKey {

  case object AC extends CalculatorKey
  case object OpenBracket extends CalculatorKey
  case object CloseBracket extends CalculatorKey
  case object Reciprocal extends CalculatorKey
  case object Zero extends CalculatorKey
  case object One extends CalculatorKey
  case object Two extends CalculatorKey
  case object Three extends CalculatorKey
  case object Four extends CalculatorKey
  case object Five extends CalculatorKey
  case object Six extends CalculatorKey
  case object Seven extends CalculatorKey
  case object Eight extends CalculatorKey
  case object Nine extends CalculatorKey
  case object Separator extends CalculatorKey
  case object Divide extends CalculatorKey
  case object Multiply extends CalculatorKey
  case object Subtraction extends CalculatorKey
  case object Addition extends CalculatorKey
  case object Exponentiation extends CalculatorKey
  case object Result extends CalculatorKey

  def parse(value: String): CalculatorKey =
    value match {
      case "AC" => AC
      case "OpenBracket" => OpenBracket
      case "CloseBracket" => CloseBracket
      case "Reciprocal" => Reciprocal
      case "Zero" => Zero
      case "One" => One
      case "Two" => Two
      case "Three" => Three
      case "Four" => Four
      case "Five" => Five
      case "Six" => Six
      case "Seven" => Seven
      case "Eight" => Eight
      case "Nine" => Nine
      case "Separator" => Separator
      case "Divide" => Divide
      case "Multiply" => Multiply
      case "Subtraction" => Subtraction
      case "Addition" => Addition
      case "Exponentiation" => Exponentiation
      case "Result" => Result
    }

  def print(value: CalculatorKey): String = value.toString

  implicit val decoder: Decoder[CalculatorKey] =
    CirceUtils.mkDecoderWith[CalculatorKey](parse)

  implicit val encoder: Encoder[CalculatorKey] =
    CirceUtils.mkEncoderWith[CalculatorKey](print)
}
