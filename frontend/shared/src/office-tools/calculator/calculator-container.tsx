import * as React from "react"
import {OfficeTool, OfficeWindowType} from "../../enums"
import {CustomStyle} from "../../styles"
import {last} from "../../utils"
import {Calculator} from "./calculator"
import {CalculatorKey} from "./enums/calculator-key"

export interface CalculatorState {
  readonly openWindows: Array<OfficeWindowType>
  readonly minimizedWindows: Array<OfficeWindowType>
}

export interface CalculatorSurveyEvents {
  readonly sendCalculatorKeyPressedEvent: (key: CalculatorKey) => void
}

export interface CalculatorContainerProps extends CustomStyle {
  readonly onClose: () => void
  readonly onMinimize?: () => void
  readonly onOutsideClick?: () => void
  readonly useState: () => CalculatorState
  readonly useSurveyEvents: () => CalculatorSurveyEvents
}

export const CalculatorContainer: React.FC<CalculatorContainerProps> = ({
  customStyles,
  onClose,
  onMinimize,
  onOutsideClick,
  useState,
  useSurveyEvents
}) => {
  const {minimizedWindows, openWindows} = useState()
  const {sendCalculatorKeyPressedEvent} = useSurveyEvents()
  const [officeWindowHasFocus, setOfficeWindowHasFocus] = React.useState(true)

  const onKeyPress = (key: CalculatorKey) => sendCalculatorKeyPressedEvent(key)

  const handleOutsideClick = () => {
    if (openWindows.includes(OfficeTool.Calculator) && !minimizedWindows.includes(OfficeTool.Calculator)) {
      setOfficeWindowHasFocus(false)
      onOutsideClick?.()
    }
  }

  const handleOnMouseDown = () => setOfficeWindowHasFocus(true)

  const isFocussed =
    officeWindowHasFocus &&
    last(openWindows.filter(window => !minimizedWindows.includes(window)))
      .map(window => window === OfficeTool.Calculator)
      .getOrElse(false)

  return (
    <Calculator
      customStyles={customStyles}
      onClose={onClose}
      onKeyPress={onKeyPress}
      onMinimize={onMinimize}
      onOutsideClick={handleOutsideClick}
      onMouseDown={handleOnMouseDown}
      isFocussed={isFocussed}
    />
  )
}
