import {css} from "@emotion/react"
import {CSSInterpolation} from "@emotion/serialize"
import * as React from "react"
import {InputType} from "../../enums"
import {
  backgroundColorBright,
  borderColor,
  borderRadius,
  CustomStyle,
  fontColor,
  primaryColorHover,
  spacingTiny,
  TextSize
} from "../../styles"
import {useAutoCompleteInput} from "./hooks/use-auto-complete-input"
import {TextInput, TextInputProps} from "./text-input"

export interface AutoCompleteInputProps
  extends CustomStyle,
    Omit<TextInputProps, "type" | "ref" | "value" | "defaultValue" | "onChange" | "wrapperRef" | "key"> {
  readonly value?: string
  readonly defaultValue?: string
  readonly onChange: (value: string) => void
  readonly items: string[]
  readonly customResultListStyle?: CSSInterpolation
  readonly showAllResultsForEmptySearch?: boolean
}

export const AutoCompleteInput: React.FC<AutoCompleteInputProps> = React.forwardRef<
  HTMLDivElement,
  AutoCompleteInputProps
>(
  (
    {
      items,
      onChange,
      value,
      defaultValue,
      onFocus,
      onBlur,
      showAllResultsForEmptySearch,
      customStyles,
      customResultListStyle,
      ...textInputProps
    },
    ref
  ) => {
    const {
      results,
      textInputWrapperRef,
      textInputRef,
      resultsListRef,
      resultsVisible,
      inputValue,
      onChange: handleOnChange,
      popperStyles,
      popperAttributes,
      setInputFocus,
      onResultClick
    } = useAutoCompleteInput({
      value,
      defaultValue,
      items,
      onChange,
      showAllResultsForEmptySearch
    })

    const handleFocus = (evt: React.FocusEvent<HTMLInputElement>) => {
      onFocus?.(evt)
      setInputFocus(true)
    }
    const handleBlur = (evt: React.FocusEvent<HTMLInputElement>) => {
      onBlur?.(evt)
      setInputFocus(false)
    }

    return (
      <div css={[styles.autoCompleteInput, customStyles]} ref={ref}>
        <TextInput
          customStyles={styles.textInput}
          wrapperRef={textInputWrapperRef as React.RefObject<HTMLDivElement>}
          ref={textInputRef as React.RefObject<HTMLInputElement>}
          type={InputType.text}
          value={inputValue}
          onChange={handleOnChange}
          autoComplete="off"
          preventValueUpdateWhileFocused={true}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...textInputProps}
        />
        <div
          className={"results-list"}
          css={[styles.resultsList(resultsVisible), customResultListStyle]}
          style={popperStyles}
          ref={resultsListRef as React.RefObject<HTMLDivElement>}
          {...popperAttributes}>
          {results.map((result, index) => (
            <div
              key={`result_${result}_${index}`}
              className={"results-list-item"}
              css={styles.resultsItem}
              onMouseDown={() => onResultClick(result)}>
              {result}
            </div>
          ))}
        </div>
      </div>
    )
  }
)

const styles = {
  autoCompleteInput: css({
    position: "relative"
  }),
  textInput: css({
    width: "100%"
  }),
  resultsList: (resultsVisible: boolean) =>
    css({
      // visibility is used to hide the list to prevent popper positioning issues
      visibility: resultsVisible ? "initial" : "hidden",
      padding: spacingTiny,
      border: `1px solid ${borderColor}`,
      borderRadius: borderRadius,
      backgroundColor: backgroundColorBright,
      boxSizing: "border-box"
    }),
  resultsItem: css({
    padding: spacingTiny,
    borderRadius: borderRadius,
    fontSize: TextSize.Medium,
    letterSpacing: 0,
    color: fontColor,
    cursor: "pointer",
    userSelect: "none",

    "&:hover": {
      backgroundColor: primaryColorHover
    }
  })
}
