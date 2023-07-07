import {css, SerializedStyles} from "@emotion/react"
import {omit} from "lodash-es"
import * as React from "react"
import {DatePickerProps as DatePickerLibProps, default as DatePickerLib} from "react-date-picker"
import {useClipboard} from "use-clipboard-copy"
import {IconName} from "../../../enums"
import {
  backgroundColorBright,
  borderRadius,
  CustomStyle,
  errorColor,
  fontColor,
  fontColorLight,
  fontFamily,
  headerBoxShadow,
  iconDefaultColor,
  primaryColor,
  spacingSmall,
  spacingTiny,
  validationErrorColor
} from "../../../styles"
import {useLucaTranslation} from "../../../translations"
import {formatDate} from "../../../utils"
import {calenderStyle} from "../../date-range-picker"
import {Icon} from "../../icon/icon"
import {Label} from "../../label/label"
import {Tooltip} from "../../tooltip/tooltip"

export interface SingleDatePickerProps extends DatePickerLibProps, CustomStyle {
  readonly value?: Date
  readonly onChange: (date: Date) => void
  readonly label?: string
  readonly showCopyToClipboard?: boolean
  readonly customDatePickerStyles?: SerializedStyles
  readonly onCopyToClipboard?: (value: string) => void
  readonly calenderRef?:
    | React.RefObject<HTMLInputElement>
    | ((ref: HTMLInputElement | null) => void)
    | React.MutableRefObject<HTMLInputElement | null>
    | undefined
  readonly hasValidationError?: boolean
  readonly showIconOnHover?: boolean
  readonly inputColor?: string
}

export const SingleDatePicker = React.forwardRef<HTMLDivElement, SingleDatePickerProps>((props, ref) => {
  const {
    value,
    onChange,
    label,
    customStyles,
    format = "dd.MM.yyyy",
    disabled = false,
    showCopyToClipboard = false,
    customDatePickerStyles,
    onCopyToClipboard,
    calenderRef,
    hasValidationError,
    showIconOnHover = false,
    inputColor
  } = props

  const {t} = useLucaTranslation()

  const {copy: copyToClipboard} = useClipboard()

  const cleanProps = omit(
    props,
    "label",
    "value",
    "onChange",
    "showCopyToClipboard",
    "onCopyToClipboard",
    "calenderRef",
    "customStyles"
  )
  const [isHovered, setIsHovered] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(value)

  const showDuplicateIcon = disabled && showCopyToClipboard

  const copyDateToClipboard = () => {
    if (!date) {
      return
    }

    const dateString = formatDate(date)
    copyToClipboard(dateString)
    onCopyToClipboard?.(dateString)
  }

  const handleChange = (date: Date) => {
    setDate(date)
    onChange(date)
  }

  return (
    <div
      ref={ref}
      css={[
        styles.datePicker({disabled, showDuplicateIcon, hasValidationError, customDatePickerStyles, inputColor}),
        calenderStyle,
        customStyles
      ]}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      {label && <Label label={label} />}
      <DatePickerLib
        value={date}
        onChange={handleChange}
        clearIcon={!disabled ? <Icon name={IconName.Close} /> : null}
        calendarIcon={
          !showIconOnHover || isHovered ? (
            showDuplicateIcon ? (
              <Tooltip title={t("clipboard__copy")}>
                <Icon customStyles={styles.duplicateIcon} name={IconName.Duplicate} onClick={copyDateToClipboard} />
              </Tooltip>
            ) : (
              <Icon name={IconName.Calendar} />
            )
          ) : null
        }
        format={format}
        {...{
          ...cleanProps,
          inputRef: calenderRef
        }}
      />
    </div>
  )
})

interface DatePickerStyleProps {
  readonly disabled: boolean
  readonly showDuplicateIcon: boolean
  readonly hasValidationError?: boolean
  readonly customDatePickerStyles?: SerializedStyles
  readonly inputColor?: string
}

const styles = {
  datePicker: ({
    disabled,
    showDuplicateIcon,
    hasValidationError,
    customDatePickerStyles,
    inputColor
  }: DatePickerStyleProps) =>
    css({
      // SingleDatePicker
      ".react-date-picker": {
        fontFamily: fontFamily,
        ...customDatePickerStyles
      },
      ".react-date-picker__wrapper": {
        padding: "6px 12px",
        background: backgroundColorBright,
        border: hasValidationError ? `1px solid ${validationErrorColor}` : "none",
        borderRadius: borderRadius,
        boxShadow: headerBoxShadow
      },
      ".react-date-picker__inputGroup": {
        "&, > input": {
          color: inputColor ? inputColor : disabled ? fontColorLight : fontColor
        }
      },
      ".react-date-picker__range-divider": {},
      ".react-date-picker__button": {},
      ".react-date-picker__button g": {
        stroke: showDuplicateIcon ? iconDefaultColor : primaryColor
      },
      ".react-date-picker__clear-button g": {
        stroke: errorColor
      },
      ".react-date-picker__calendar-button": {
        ...(showDuplicateIcon && {
          padding: 0,
          margin: -spacingTiny
        })
      }
    }),
  duplicateIcon: css({
    padding: spacingSmall,
    cursor: "pointer",
    boxSizing: "initial"
  })
}
