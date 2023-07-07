import {css} from "@emotion/react"
// https://github.com/wojtekmaj/react-daterange-picker
import DateRangePickerLib from "@wojtekmaj/react-daterange-picker"
import {omit} from "lodash-es"
import * as React from "react"
import {IconName} from "../../enums"
import {
  backgroundColorBright,
  borderRadius,
  CustomStyle,
  errorColor,
  fontFamily,
  headerBoxShadow,
  primaryColor
} from "../../styles"
import {calenderStyle, Icon, Label} from ".."

export interface DateRangePickerProps {
  readonly autoFocus?: boolean
  readonly calendarClassName?: string | string[]
  readonly calendarIcon?: JSX.Element | null
  readonly className?: string | string[]
  readonly clearIcon?: JSX.Element | null
  readonly dayAriaLabel?: string
  readonly dayPlaceholder?: string
  readonly disabled?: boolean
  readonly format?: string
  readonly isOpen?: boolean
  readonly monthAriaLabel?: string
  readonly monthPlaceholder?: string
  readonly maxDate?: Date
  readonly minDate?: Date
  readonly rangeDivider?: string
  readonly name?: string
  readonly onCalendarOpen?: () => void
  readonly onCalendarClose?: () => void
  readonly required?: boolean
  readonly showLeadingZeros?: boolean
  readonly yearAriaLabel?: string
  readonly yearPlaceholder?: string
  readonly returnValue?: "start" | "end" | "range"
  readonly value: Date | Date[]
  readonly onChange: (date: Date | Date[]) => void
  readonly label?: string
}

export const DateRangePicker: React.FunctionComponent<DateRangePickerProps & CustomStyle> = props => {
  const {value, onChange, label, customStyles, rangeDivider = "-", format = "dd.MM.yyyy"} = props
  const cleanProps = omit(props, "label", "value", "onChange", "customStyles")
  const [date, setDate] = React.useState<Date | Date[]>(value)

  const handleChange = (date: Date | Date[]) => {
    setDate(date)
    onChange(date)
  }

  return (
    <div css={[style, calenderStyle, customStyles]}>
      {label && <Label label={label} />}
      <DateRangePickerLib
        value={date}
        onChange={handleChange}
        clearIcon={<Icon name={IconName.Close} />}
        calendarIcon={<Icon name={IconName.Calendar} />}
        rangeDivider={rangeDivider}
        format={format}
        {...cleanProps}
      />
    </div>
  )
}

const style = css({
  // DateRangePicker
  ".react-daterange-picker": {
    fontFamily: fontFamily
  },
  ".react-daterange-picker__wrapper": {
    padding: "6px 12px",
    background: backgroundColorBright,
    border: "none",
    borderRadius: borderRadius,
    boxShadow: headerBoxShadow
  },
  ".react-daterange-picker__inputGroup:nth-of-type(1)": {
    flexGrow: 0
  },
  ".react-daterange-picker__inputGroup__input:invalid": {
    background: backgroundColorBright
  },
  ".react-daterange-picker__range-divider": {},
  ".react-daterange-picker__button": {},
  ".react-daterange-picker__button g": {
    stroke: primaryColor
  },
  ".react-daterange-picker__clear-button g": {
    stroke: errorColor
  },
  ".react-daterange-picker__calendar-button": {}
})
