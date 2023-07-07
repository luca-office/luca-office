import {css} from "@emotion/react"
import * as React from "react"
import {OfficeWindow} from "../../components"
import {ViewerToolsType} from "../../enums"
import {CustomStyle, Flex, floatingWindowShadow, spacingMedium, zIndex3} from "../../styles"
import {CalculatorButtons} from "./calculator-buttons"
import {CalculatorDisplay} from "./calculator-display"
import {CalculatorKey} from "./enums"
import {useCalculatorHandling} from "./hooks/use-calculator-handling"

export interface CalculatorProps extends CustomStyle {
  readonly onKeyPress?: (key: CalculatorKey) => void
  readonly onClose: () => void
  readonly onMinimize?: () => void
  readonly onOutsideClick?: () => void
  readonly onMouseDown?: () => void
  readonly isFocussed: boolean
}

export const Calculator: React.FC<CalculatorProps> = ({
  customStyles,
  onClose,
  onMinimize,
  onKeyPress,
  onOutsideClick,
  onMouseDown,
  isFocussed
}) => {
  const {operation, result, handleOperation, hasInvalidInput} = useCalculatorHandling()

  const onOperationClick = (key: CalculatorKey) => {
    handleOperation(key)
    onKeyPress?.(key)
  }

  return (
    <OfficeWindow
      customStyles={[styles.window, customStyles]}
      toolType={ViewerToolsType.Calculator}
      isDraggable={true}
      draggableBoundsSelector={".desktop-content"}
      onClose={onClose}
      onMouseDown={onMouseDown}
      onMinimize={onMinimize}
      onOutsideClick={onOutsideClick}>
      <div css={styles.content}>
        <CalculatorDisplay hasInvalidInput={hasInvalidInput} operation={operation} result={result} />
        <div>
          <CalculatorButtons onButtonClick={onOperationClick} isCalculatorFocussed={isFocussed} />
        </div>
      </div>
    </OfficeWindow>
  )
}

export const CalculatorSizes = {
  window: {width: 344, height: 372}
}

const styles = {
  window: css({
    width: CalculatorSizes.window.width,
    height: CalculatorSizes.window.height,
    boxShadow: floatingWindowShadow,
    zIndex: zIndex3
  }),
  content: [
    Flex.column,
    css({
      padding: spacingMedium,
      background: "white"
    })
  ]
}
