import {IconName} from "../../../enums"
import {Option} from "../../../utils"
import {CalculatorKey} from "../enums/calculator-key"

export const keyToIcon = (key: CalculatorKey): Option<IconName> => {
  switch (key) {
    case CalculatorKey.Addition:
      return Option.of<IconName>(IconName.Add)
    case CalculatorKey.Subtraction:
      return Option.of<IconName>(IconName.Subtract)
    case CalculatorKey.Multiply:
      return Option.of<IconName>(IconName.Close)
    case CalculatorKey.Result:
      return Option.of<IconName>(IconName.Equals)
    case CalculatorKey.Divide:
      return Option.of<IconName>(IconName.Divide)
    default:
      return Option.none<IconName>()
  }
}

export const keyToOperation = (key: CalculatorKey) => {
  switch (key) {
    case CalculatorKey.AC:
      return "AC"
    case CalculatorKey.OpenBracket:
      return "("
    case CalculatorKey.CloseBracket:
      return ")"
    case CalculatorKey.Reciprocal:
      return "1/x"
    case CalculatorKey.Zero:
      return "0"
    case CalculatorKey.One:
      return "1"
    case CalculatorKey.Two:
      return "2"
    case CalculatorKey.Three:
      return "3"
    case CalculatorKey.Four:
      return "4"
    case CalculatorKey.Five:
      return "5"
    case CalculatorKey.Six:
      return "6"
    case CalculatorKey.Seven:
      return "7"
    case CalculatorKey.Eight:
      return "8"
    case CalculatorKey.Nine:
      return "9"
    case CalculatorKey.Separator:
      return "."
    case CalculatorKey.Divide:
      return "/"
    case CalculatorKey.Multiply:
      return "*"
    case CalculatorKey.Subtraction:
      return "-"
    case CalculatorKey.Addition:
      return "+"
    case CalculatorKey.Exponentiation:
      return "x^y"
    case CalculatorKey.Result:
      return "="
  }
}

export const keyToCalculatorKey = (key: string): Option<CalculatorKey> => {
  switch (key) {
    case "9":
      return Option.of<CalculatorKey>(CalculatorKey.Nine)
    case "8":
      return Option.of<CalculatorKey>(CalculatorKey.Eight)
    case "7":
      return Option.of<CalculatorKey>(CalculatorKey.Seven)
    case "6":
      return Option.of<CalculatorKey>(CalculatorKey.Six)
    case "5":
      return Option.of<CalculatorKey>(CalculatorKey.Five)
    case "4":
      return Option.of<CalculatorKey>(CalculatorKey.Four)
    case "3":
      return Option.of<CalculatorKey>(CalculatorKey.Three)
    case "2":
      return Option.of<CalculatorKey>(CalculatorKey.Two)
    case "1":
      return Option.of<CalculatorKey>(CalculatorKey.One)
    case "0":
      return Option.of<CalculatorKey>(CalculatorKey.Zero)
    case ".":
    case ",":
      return Option.of<CalculatorKey>(CalculatorKey.Separator)
    case "(":
      return Option.of<CalculatorKey>(CalculatorKey.OpenBracket)
    case ")":
      return Option.of<CalculatorKey>(CalculatorKey.CloseBracket)
    case "/":
      return Option.of<CalculatorKey>(CalculatorKey.Divide)
    case "*":
      return Option.of<CalculatorKey>(CalculatorKey.Multiply)
    case "-":
      return Option.of<CalculatorKey>(CalculatorKey.Subtraction)
    case "+":
      return Option.of<CalculatorKey>(CalculatorKey.Addition)
    case "Clear":
    case "Delete":
      return Option.of<CalculatorKey>(CalculatorKey.AC)
    case "=":
    case "Enter":
      return Option.of<CalculatorKey>(CalculatorKey.Result)
    default:
      return Option.none<CalculatorKey>()
  }
}
