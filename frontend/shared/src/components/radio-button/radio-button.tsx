import {css} from "@emotion/react"
import {CSSInterpolation} from "@emotion/serialize"
import * as React from "react"
import {HeadingLevel, IconName} from "../../enums"
import {buttonBackgroundDisabled, buttonBackgroundPrimary, CustomStyle, Flex, spacingSmall} from "../../styles"
import {Heading} from ".."
import {Icon} from "../icon/icon"

interface Props extends CustomStyle {
  readonly label?: string
  readonly selected: boolean
  readonly disabled?: boolean
  readonly onChange?: (selected: boolean) => void
  readonly customBorderStyle?: CSSInterpolation
  readonly customRadioBoxStyle?: CSSInterpolation
  readonly labelLevel?: HeadingLevel
  readonly withSelectedIcon?: IconName
}

export const RadioButton: React.FunctionComponent<Props> = ({
  selected,
  label,
  disabled = false,
  onChange,
  customStyles,
  customBorderStyle,
  customRadioBoxStyle,
  withSelectedIcon,
  labelLevel = HeadingLevel.h4
}) => {
  const handleClick = onChange && !disabled ? () => onChange(!selected) : undefined
  return (
    <div
      className="radio-button"
      css={[styles.container, disabled && styles.containerDisabled, customStyles]}
      onClick={handleClick}>
      <div css={[styles.radioBoxBorder(disabled), customBorderStyle]}>
        <div css={styles.radioBoxWrapper(selected, withSelectedIcon !== undefined)}>
          {withSelectedIcon ? (
            <div css={[styles.radioBox(selected, disabled), customRadioBoxStyle]}>
              {selected && <Icon customStyles={styles.radioBoxWithIcon} name={withSelectedIcon} color={"white"} />}
            </div>
          ) : (
            <div css={[styles.radioBox(selected, disabled), customRadioBoxStyle]} />
          )}
        </div>
      </div>
      {label && (
        <Heading customStyles={styles.label} level={labelLevel}>
          {label}
        </Heading>
      )}
    </div>
  )
}

const Size = {
  radioButton: 16
}

const styles = {
  container: css(Flex.row, {
    cursor: "pointer",
    alignItems: "center"
  }),
  containerDisabled: css({
    cursor: "not-allowed"
  }),
  radioBoxBorder: (disabled: boolean) =>
    css(Flex.column, {
      alignItems: "center",
      justifyContent: "center",
      width: Size.radioButton,
      height: Size.radioButton,
      background: disabled ? buttonBackgroundDisabled : buttonBackgroundPrimary,
      borderRadius: "50%"
    }),
  radioBoxWrapper: (selected: boolean, withSelectedIcon: boolean) =>
    css(
      Flex.column,
      {
        alignItems: "center",
        justifyContent: "center",
        width: Size.radioButton - 2,
        height: Size.radioButton - 2,
        borderRadius: "50%",
        backgroundColor: "white"
      },
      withSelectedIcon && selected && {backgroundColor: "transparent"}
    ),
  radioBox: (selected: boolean, disabled: boolean) =>
    css({
      height: Size.radioButton - 4,
      width: Size.radioButton - 4,
      borderRadius: "50%",
      background: !selected ? "white" : disabled ? buttonBackgroundDisabled : buttonBackgroundPrimary
    }),
  radioBoxWithIcon: css({
    width: Size.radioButton - 4,
    height: Size.radioButton - 4,
    minWidth: Size.radioButton - 4,
    "> svg": {
      display: "block"
    }
  }),
  label: css({
    marginLeft: spacingSmall
  })
}
