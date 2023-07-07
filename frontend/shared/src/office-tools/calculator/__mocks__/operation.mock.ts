import {CalculatorButtonType} from "../enums/calculator-button-type"
import {CalculatorButtonConfig} from "../calculator-button-configs"
import {CalculatorKey} from "../enums/calculator-key"

export const mockCalculatorButtonConfigs: CalculatorButtonConfig[] = [
  {calculatorKey: CalculatorKey.Addition, type: CalculatorButtonType.Primary},
  {calculatorKey: CalculatorKey.Subtraction, type: CalculatorButtonType.Secondary},
  {calculatorKey: CalculatorKey.Multiply, type: CalculatorButtonType.Primary},
  {calculatorKey: CalculatorKey.Divide, type: CalculatorButtonType.Secondary}
]
