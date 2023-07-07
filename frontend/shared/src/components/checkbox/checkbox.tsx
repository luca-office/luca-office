import {CSSInterpolation} from "@emotion/serialize"
import * as React from "react"
import {IconName} from "../../enums"
import {CustomStyle, TextSize} from "../../styles"
import {Icon} from "../"
import {Text} from "../typography/typography"
import {checkboxStyles as styles} from "./checkbox.style"

export enum CheckboxLabelPosition {
  Left,
  Right
}

export interface CheckboxProps extends CustomStyle {
  readonly checked?: boolean
  readonly defaultChecked?: boolean
  readonly label?: string
  readonly disabled?: boolean
  readonly onChange?: React.ChangeEventHandler<HTMLInputElement>
  readonly labelPosition?: CheckboxLabelPosition
  readonly customBorderStyle?: CSSInterpolation
  readonly customButtonStyle?: CSSInterpolation
  readonly readonlyInput?: boolean
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onChange,
  disabled = false,
  readonlyInput = false,
  labelPosition = CheckboxLabelPosition.Right,
  customStyles,
  defaultChecked,
  customBorderStyle,
  customButtonStyle
}) => {
  const renderLabel = () => (
    <Text
      className={"checkbox-label"}
      size={TextSize.Medium}
      css={[labelPosition === CheckboxLabelPosition.Left ? styles.labelLeft : styles.labelRight]}>
      {label}
    </Text>
  )

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) =>
    onChange !== undefined && !disabled ? onChange(evt) : undefined
  return (
    <div css={[styles.checkbox, customStyles]}>
      {label && labelPosition === CheckboxLabelPosition.Left && renderLabel()}
      <div css={[styles.checkboxBorder(disabled), customBorderStyle]}>
        <div css={[styles.checkbox, styles.button, checked && styles.buttonChecked, customButtonStyle]}>
          <input
            {...{
              css: [styles.input, disabled && styles.inputDisabled],
              type: "checkbox",
              disabled: disabled,
              role: "checkbox",
              defaultChecked: defaultChecked,
              checked,
              onChange: handleChange,
              readOnly: readonlyInput
            }}
          />
          {checked ? (
            <Icon customStyles={disabled && styles.checkIconDisabled} name={IconName.Check} color={"white"} />
          ) : (
            <div css={styles.checkboxPlaceholder} />
          )}
        </div>
      </div>
      {label && labelPosition === CheckboxLabelPosition.Right && renderLabel()}
    </div>
  )
}
