import {css} from "@emotion/react"
import * as React from "react"
import {SelectOption} from "../../models"
import {borderColor, CustomStyle, fontFamily, primaryColor, spacingSmall} from "../../styles"
import {LucaI18nLangKey} from "../../translations"
import {FormFieldLabel} from ".."

interface Props
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>,
    CustomStyle {
  readonly labelKey?: LucaI18nLangKey
  readonly optionList: SelectOption[]
  readonly ref?: ((instance: HTMLSelectElement | null) => void) | React.RefObject<HTMLSelectElement> | null | undefined
}

export const SelectInput: React.FC<Props> = React.forwardRef(
  ({value, onChange, labelKey, optionList, customStyles, defaultValue, name, disabled}, ref) => {
    return (
      <div>
        {!!labelKey && <FormFieldLabel textKey={labelKey} />}

        <select
          name={name}
          ref={ref}
          css={[styles, customStyles]}
          value={value}
          disabled={disabled}
          onChange={onChange}
          defaultValue={defaultValue}>
          {optionList.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    )
  }
)

const styles = css({
  background: "white",
  borderRadius: 2,
  fontFamily: fontFamily,
  border: `1px solid ${borderColor}`,
  textIndent: spacingSmall,
  height: 32,
  fontSize: 16,
  width: 189,

  "&:focus": {
    outlineColor: primaryColor
  }
})
