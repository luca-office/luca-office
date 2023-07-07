import {evaluate, format} from "mathjs"
import {useState} from "react"
import {Option} from "../../../utils"
import {CalculatorKey} from "../enums/calculator-key"
import {keyToOperation} from "../utils/calculator-utils"

export interface WithCalculatorHandling {
  readonly operation: Option<string>
  readonly result: Option<string>
  readonly handleOperation: (operation: CalculatorKey) => void
  readonly hasInvalidInput: boolean
}

export const useCalculatorHandling = (): WithCalculatorHandling => {
  const [operationString, setOperationString] = useState<Option<string>>(Option.none())
  const [result, setResult] = useState(Option.of("0"))
  const [hasInvalidInput, setHasInvalidInput] = useState(false)

  const updateOperation = (operation: string) =>
    operationString.isEmpty()
      ? setOperationString(Option.of(operation))
      : operationString.forEach(o => setOperationString(Option.of(o + operation)))

  const calculateResult = () => {
    try {
      operationString.forEach(o => {
        const result: number = evaluate(o)
        const resultString = Option.of(format(result, {precision: 14}))
        setOperationString(resultString)
        setResult(resultString)
        setHasInvalidInput(false)
      })
    } catch (error) {
      setHasInvalidInput(true)
    }
  }

  const reset = () => {
    setOperationString(Option.none())
    setResult(Option.of("0"))
    setHasInvalidInput(false)
  }

  const setFriction = () =>
    operationString.isEmpty()
      ? setOperationString(Option.of("1/"))
      : operationString.forEach(o => setOperationString(Option.of(`1/${o}`)))

  const setExponentiation = () => operationString.forEach(o => setOperationString(Option.of(`${o}^`)))

  const handleOperation = (operation: CalculatorKey) => {
    switch (operation) {
      case CalculatorKey.AC:
        reset()
        break

      case CalculatorKey.Result:
        calculateResult()
        break

      case CalculatorKey.Reciprocal:
        setFriction()
        break

      case CalculatorKey.Exponentiation:
        setExponentiation()
        break

      default:
        updateOperation(keyToOperation(operation))
    }
  }

  return {
    operation: operationString,
    result,
    handleOperation,
    hasInvalidInput
  }
}
