import useEvent from "@react-hook/event"
import * as React from "react"
import {CalculatorKey} from "../enums/calculator-key"
import {keyToCalculatorKey} from "../utils/calculator-utils"

interface LastKeyInput {
  readonly key: CalculatorKey
  readonly numberOfCalls: number
}

export interface UseCalculatorButtonsProps {
  readonly onButtonClick: (key: CalculatorKey) => void
  readonly isCalculatorFocussed: boolean
  readonly respectFocus?: boolean
}

export const useCalculatorButtons = ({
  onButtonClick,
  isCalculatorFocussed,
  respectFocus = true
}: UseCalculatorButtonsProps) => {
  const [lastKeyInput, setLastKeyInput] = React.useState<LastKeyInput | undefined>(undefined)

  const handleKeyDown = (event: KeyboardEvent) => {
    if (!isCalculatorFocussed) {
      return
    }

    keyToCalculatorKey(event.key).forEach(key => {
      if (lastKeyInput?.key === key) {
        setLastKeyInput({key, numberOfCalls: lastKeyInput.numberOfCalls + 1})
        return
      }
      setLastKeyInput({key, numberOfCalls: 1})
    })
  }

  useEvent(document, "keydown", handleKeyDown)

  React.useEffect(() => {
    if (lastKeyInput && (isCalculatorFocussed || !respectFocus)) {
      onButtonClick(lastKeyInput.key)
    }

    if (!isCalculatorFocussed) {
      setLastKeyInput(undefined)
    }
  }, [isCalculatorFocussed, lastKeyInput])
}
