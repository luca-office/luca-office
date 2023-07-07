import {css} from "@emotion/react"
import {CSSInterpolation} from "@emotion/serialize"
import * as i18next from "i18next"
import {isEmpty} from "lodash-es"
import * as React from "react"
import {useClipboard} from "use-clipboard-copy"
import {IconName, InputType} from "../../enums"
import {
  borderColor,
  CustomStyle,
  errorColor,
  Flex,
  fontColorLight,
  fontFamily,
  inputHeight,
  primaryColor,
  spacingSmall,
  spacingTiny,
  textEllipsis,
  TextSize,
  validationErrorColor
} from "../../styles"
import {LucaI18nLangKey, useLucaTranslation} from "../../translations"
import {isDefined} from "../../utils/common"
import {FormFieldLabel, Icon, Tooltip} from ".."

type InputValue = TypeOf<React.InputHTMLAttributes<HTMLInputElement>, "value">

export interface TextInputProps
  extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "onChange">,
    CustomStyle {
  readonly type: InputType
  readonly customErrorStyles?: CSSInterpolation
  readonly customInputContainerStyles?: CSSInterpolation
  readonly customInputStyles?: CSSInterpolation
  readonly errorKey?: LucaI18nLangKey
  readonly hasValidationError?: boolean
  readonly icon?: IconName
  readonly iconColor?: string
  readonly isClearable?: boolean
  readonly labelKey?: LucaI18nLangKey
  readonly labelKeyOptions?: i18next.TOptions | string
  readonly onChange?: (value: string) => void
  readonly onCopyToClipboard?: (value: string | number) => void
  readonly preventInputTrimOnChange?: boolean
  readonly placeholderKey?: LucaI18nLangKey
  readonly ref?: React.Ref<HTMLInputElement>
  readonly renderInputWrapper?: (props: {children: React.ReactNode}) => React.ReactElement
  readonly showCopyToClipboard?: boolean
  readonly showIconOnHover?: boolean
  readonly wrapperRef?: React.RefObject<HTMLDivElement>
  readonly useValueChangeCount?: boolean
  readonly preventValueUpdateWhileFocused?: boolean
}

export const TextInput: React.FC<TextInputProps> = React.forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      customInputStyles,
      customErrorStyles,
      customInputContainerStyles,
      customStyles,
      defaultValue,
      errorKey,
      hasValidationError = false,
      icon,
      iconColor,
      isClearable = true,
      labelKey,
      labelKeyOptions,
      name,
      onChange,
      onBlur,
      onFocus,
      placeholderKey,
      type,
      value = "",
      showCopyToClipboard = false,
      disabled = false,
      renderInputWrapper,
      wrapperRef,
      onCopyToClipboard,
      preventInputTrimOnChange,
      showIconOnHover = false,
      useValueChangeCount = true,
      preventValueUpdateWhileFocused = false,
      ...inputProps
    },
    ref
  ) => {
    const {t} = useLucaTranslation()

    const inputRef = React.createRef<HTMLInputElement>()
    const previousValueRef = React.useRef<InputValue>(value)
    const previousDefaultValueRef = React.useRef<InputValue>(defaultValue)

    const {copy: copyToClipboard} = useClipboard()

    const [isHovered, setIsHovered] = React.useState(false)
    const [initialValueChangeCount, setInitialValueChangeCount] = React.useState<number>(0)
    const [initialValue, setInitialValue] = React.useState<InputValue>(value ?? defaultValue ?? "")
    const [inputValue, setInputValue] = React.useState<InputValue>(initialValue)
    const [hasFocus, setHasFocus] = React.useState<boolean>(false)

    const hasInputValue = isDefined(inputValue) && inputValue !== ""
    const showClearIcon = !disabled && hasInputValue && isClearable
    const showDuplicateIcon = showCopyToClipboard && (disabled || !isClearable)
    const showIcon = !!icon || showClearIcon || showDuplicateIcon
    const iconName = showClearIcon ? IconName.Close : showDuplicateIcon ? IconName.Duplicate : (icon as IconName)

    const updateInitialValue = (updatedInitialValue: InputValue) => {
      setInitialValue(updatedInitialValue)
      setInitialValueChangeCount(initialValueChangeCount + 1)
    }

    const checkInitialValueOnBlur = (value: InputValue) =>
      value !== undefined && (typeof value !== "string" || !isEmpty(value))

    const updateInitialValueOnBlur = (newValue: string) => {
      if (checkInitialValueOnBlur(value)) {
        previousValueRef.current = newValue
      }
      if (checkInitialValueOnBlur(defaultValue)) {
        previousDefaultValueRef.current = newValue
      }

      if (checkInitialValueOnBlur(initialValue)) {
        updateInitialValue(newValue)
      }
    }

    const handleFocus = (evt: React.FocusEvent<HTMLInputElement>) => {
      onFocus?.(evt)
      setHasFocus(true)
    }
    const handleBlur = (evt: React.FocusEvent<HTMLInputElement>) => {
      onBlur?.(evt)
      setHasFocus(false)

      const newValue = evt.currentTarget.value ?? ""
      updateInitialValueOnBlur(newValue)
    }

    const onChangeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
      let newValue = evt.currentTarget.value || ""

      if (!preventInputTrimOnChange) {
        newValue = newValue.trim()
      }

      setInputValue(newValue)
      if (onChange) {
        onChange(newValue)
      }
    }
    const clearInput = () => {
      updateInitialValue("")
      setInputValue("")
      if (onChange) {
        onChange("")
      }

      if (!ref) {
        inputRef.current?.focus()
        return
      }

      if (!(ref instanceof Function)) {
        ;(ref as React.MutableRefObject<HTMLInputElement>).current?.focus()
      }
    }

    const copyInputToClipboard = () => {
      const copyValue = Array.isArray(inputValue) ? inputValue.join(",") : inputValue
      copyToClipboard(copyValue?.toString())
      onCopyToClipboard?.(copyValue?.toString() ?? "")
    }

    React.useEffect(() => {
      const hasValueChanged =
        previousValueRef.current !== undefined && previousValueRef.current !== value && value !== inputValue
      const hasDefaultValueChanged =
        previousDefaultValueRef.current !== undefined &&
        previousDefaultValueRef.current !== defaultValue &&
        defaultValue !== inputValue

      if ((!preventValueUpdateWhileFocused && hasFocus) || (!hasValueChanged && !hasDefaultValueChanged)) {
        return
      }

      if (hasValueChanged) {
        updateInitialValue(value)
        setInputValue(value)
      } else if (hasDefaultValueChanged) {
        updateInitialValue(defaultValue)
        setInputValue(defaultValue)
      }
      previousValueRef.current = value
      previousDefaultValueRef.current = defaultValue
    }, [value, defaultValue, inputValue])

    // The key attribute is used to re-render the component if the initial value changes
    const textInput = (
      <input
        key={useValueChangeCount ? `input_${initialValue}_${initialValueChangeCount}` : `input_${initialValue}`}
        css={[styles.input, type === InputType.number && styles.numberInput, customInputStyles]}
        defaultValue={inputValue}
        onChange={onChangeHandler}
        placeholder={placeholderKey ? t(placeholderKey) : undefined}
        type={type}
        name={name}
        ref={ref || inputRef}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={disabled}
        {...inputProps}
      />
    )

    const renderIcon = () => {
      const content = (
        <Icon
          customStyles={styles.icon(showClearIcon || showDuplicateIcon)}
          name={iconName}
          color={iconColor}
          onClick={showClearIcon ? clearInput : showDuplicateIcon ? copyInputToClipboard : undefined}
        />
      )
      return showDuplicateIcon ? <Tooltip title={t("clipboard__copy")}>{content}</Tooltip> : content
    }
    const errorStyle = customErrorStyles ? [styles.errorMessage, customErrorStyles] : styles.errorMessage

    return (
      <div
        css={[styles.container, customStyles]}
        ref={wrapperRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
        {labelKey && <FormFieldLabel textKey={labelKey} textKeyOptions={labelKeyOptions} />}
        <div css={[styles.inputContainer(hasValidationError, hasFocus), customStyles, customInputContainerStyles]}>
          {!renderInputWrapper ? textInput : renderInputWrapper({children: textInput})}
          {/*use key attribute to force re-render on input clearance and value change*/}
          {showIcon && (!showIconOnHover || isHovered) && renderIcon()}
        </div>
        {hasValidationError && errorKey && <div css={errorStyle}>{t(errorKey)}</div>}
      </div>
    )
  }
)

TextInput.displayName = "TextInput"

const Size = {
  input: 30
}

const styles = {
  container: css(Flex.column),
  inputContainer: (hasValidationError: boolean, hasFocus: boolean) =>
    css(Flex.row, {
      height: inputHeight,
      boxSizing: "border-box",
      overflow: "hidden",
      borderRadius: hasValidationError || hasFocus ? 0 : 2,
      border: `1px solid ${hasValidationError ? validationErrorColor : hasFocus ? primaryColor : borderColor}`,
      outline: hasValidationError
        ? `1px solid ${validationErrorColor}`
        : hasFocus
        ? `1px solid ${primaryColor}`
        : "none"
    }),
  input: css({
    width: "100%",
    fontFamily: fontFamily,
    height: Size.input,
    textIndent: spacingTiny,
    fontSize: TextSize.Medium,
    padding: "3px 2px",
    boxSizing: "border-box",
    border: 0,
    outline: 0,

    "&::placeholder": {
      fontSize: TextSize.Medium,
      color: fontColorLight
    },
    "&:not(:focus)": textEllipsis
  }),
  numberInput: css({
    MozAppearance: "textfield",

    "::-webkit-outer-spin-button, ::-webkit-inner-spin-button": {
      WebkitAppearance: "none",
      margin: 0
    }
  }),
  icon: (iconClickable: boolean) =>
    css({
      padding: spacingSmall,
      cursor: iconClickable ? "pointer" : "initial"
    }),
  errorMessage: css({
    marginTop: spacingTiny,
    color: errorColor,
    fontSize: TextSize.Smaller
  })
}
