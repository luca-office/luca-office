import {css} from "@emotion/react"
import {CustomStyle} from "../../styles"
import {CalculatorButtonType} from "./enums/calculator-button-type"
import {CalculatorKey} from "./enums/calculator-key"

export interface CalculatorButtonConfig extends CustomStyle {
  readonly calculatorKey: CalculatorKey
  readonly type?: CalculatorButtonType
}

export const calculatorButtonConfigs: CalculatorButtonConfig[] = [
  {calculatorKey: CalculatorKey.OpenBracket, customStyles: css({gridColumn: "1 / 3"})},
  {calculatorKey: CalculatorKey.CloseBracket, customStyles: css({gridColumn: "3 / 5"})},
  {calculatorKey: CalculatorKey.AC},

  {calculatorKey: CalculatorKey.Seven, type: CalculatorButtonType.Secondary},
  {calculatorKey: CalculatorKey.Eight, type: CalculatorButtonType.Secondary},
  {calculatorKey: CalculatorKey.Nine, type: CalculatorButtonType.Secondary},
  {calculatorKey: CalculatorKey.Divide},
  {calculatorKey: CalculatorKey.Reciprocal},

  {calculatorKey: CalculatorKey.Four, type: CalculatorButtonType.Secondary},
  {calculatorKey: CalculatorKey.Five, type: CalculatorButtonType.Secondary},
  {calculatorKey: CalculatorKey.Six, type: CalculatorButtonType.Secondary},
  {calculatorKey: CalculatorKey.Multiply},
  {calculatorKey: CalculatorKey.Exponentiation},

  {calculatorKey: CalculatorKey.One, type: CalculatorButtonType.Secondary},
  {calculatorKey: CalculatorKey.Two, type: CalculatorButtonType.Secondary},
  {calculatorKey: CalculatorKey.Three, type: CalculatorButtonType.Secondary},
  {calculatorKey: CalculatorKey.Subtraction},
  {calculatorKey: CalculatorKey.Result, customStyles: css({gridColumn: "5 / 6", gridRow: "4 / 6"})},

  {calculatorKey: CalculatorKey.Zero, type: CalculatorButtonType.Secondary, customStyles: css({gridColumn: "1 / 3"})},
  {calculatorKey: CalculatorKey.Separator, type: CalculatorButtonType.Secondary},
  {calculatorKey: CalculatorKey.Addition}
]
