import {css} from "@emotion/react"
import * as React from "react"
import {Button} from "../../components"
import {IconName} from "../../enums"
import {fontColor} from "../../styles"
import {buttonHeight} from "../../styles/sizes"
import {CalculatorButtonConfig, calculatorButtonConfigs} from "./calculator-button-configs"
import {CalculatorButtonType} from "./enums/calculator-button-type"
import {CalculatorKey} from "./enums/calculator-key"
import {useCalculatorButtons} from "./hooks/use-calculator-buttons"
import {keyToIcon, keyToOperation} from "./utils/calculator-utils"

export interface CalculatorButtonsProps {
  readonly onButtonClick: (key: CalculatorKey) => void
  readonly isCalculatorFocussed: boolean
}

export const CalculatorButtons: React.FC<CalculatorButtonsProps> = ({onButtonClick, isCalculatorFocussed}) => {
  useCalculatorButtons({onButtonClick, isCalculatorFocussed})

  const renderButton = ({
    calculatorKey,
    type: buttonType = CalculatorButtonType.Primary,
    customStyles
  }: CalculatorButtonConfig) => {
    const iconName = keyToIcon(calculatorKey)
    const onClick = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      // blur to prevent from being called on press of enter
      evt.currentTarget.blur()
      onButtonClick(calculatorKey)
    }
    return (
      <Button
        {...{
          key: calculatorKey,
          className: `operation-${calculatorKey.toLowerCase()}`,
          onClick,
          customStyles: [
            styles.button,
            buttonType === CalculatorButtonType.Secondary ? styles.buttonSecondary : null,
            calculatorKey === CalculatorKey.Divide ? styles.buttonSmallIcon : null,
            customStyles
          ],
          ...iconName
            .map<Partial<{icon: IconName; children: React.ReactNode}>>(icon => ({
              icon
            }))
            .getOrElse({
              children: keyToOperation(calculatorKey)
            })
        }}
      />
    )
  }

  return <div css={styles.grid}>{calculatorButtonConfigs.map(renderButton)}</div>
}

const styles = {
  grid: css({
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gridTemplateRows: "repeat(5, 1fr)",
    gridGap: 8
  }),
  button: css({
    width: "100%",
    height: "100%",
    minHeight: buttonHeight,
    boxShadow: "0px 2px 2px 0px rgba(0, 0, 0, 0.11)",

    "> div > div": {
      marginRight: 0
    }
  }),
  buttonSecondary: css({
    background: "#f0f0f0",
    color: fontColor
  }),
  buttonSmallIcon: css({
    "svg > g > g": {
      strokeWidth: 0,
      fill: "white"
    }
  })
}
