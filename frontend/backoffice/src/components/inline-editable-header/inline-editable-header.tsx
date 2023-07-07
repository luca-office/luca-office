import {css} from "@emotion/react"
import {CSSInterpolation} from "@emotion/serialize"
import * as React from "react"
import {useCallback, useEffect} from "react"
import OutsideClickHandler from "react-outside-click-handler"
import {Button, Icon, TextInput} from "shared/components"
import {ButtonVariant, IconName, InputType} from "shared/enums"
import {CustomStyle, fontColorLight, primaryColor} from "shared/styles"
import {inlineEditableHeaderStyle as styles} from "./inline-editable-header.style"

export interface InlineEditableHeaderProps {
  readonly isEditing: boolean
  readonly isLoading: boolean
  readonly setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
  readonly setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  readonly setValue: React.Dispatch<React.SetStateAction<string | null>>
  readonly type: InputType.number | InputType.text
  readonly value: string | null
}

export interface InlineEditableHeaderContainerProps {
  readonly disabled?: boolean
  readonly formatValue?: (value: string) => string
  readonly isNumber?: boolean
  readonly min?: number
  readonly onConfirm: (text: string) => Promise<unknown> | void
  readonly placeholder?: string
  readonly text: string
  readonly customTextInputStyles?: CSSInterpolation
  readonly customInnerInputStyles?: CSSInterpolation
  readonly showLockWhenDisabled?: boolean
  readonly hideIcon?: boolean
}

export const InlineEditableHeader: React.FC<
  InlineEditableHeaderProps & InlineEditableHeaderContainerProps & CustomStyle
> = ({
  customStyles,
  customTextInputStyles,
  customInnerInputStyles,
  disabled,
  isEditing,
  isLoading,
  onConfirm,
  placeholder,
  setIsEditing,
  setIsLoading,
  setValue,
  text,
  type,
  value,
  min,
  showLockWhenDisabled = false,
  hideIcon
}) => {
  const inputRef = React.createRef<HTMLInputElement>()
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (value && value.trim().length > 0) {
      const trimmedValue = value.trim()

      setIsLoading(true)
      // Promise.resolve converts value or promise into Promise securely, no check needed
      Promise.resolve(onConfirm(trimmedValue || ""))
        .then(() => {
          setValue(trimmedValue)
          setIsEditing(false)
          setIsLoading(false)
        })
        .catch(error => {
          setValue(text)
          console.error(error)
        })
    } else {
      setIsEditing(false)
      setValue(text)
    }
  }

  const handleOutsideClick = () => {
    setIsEditing(false)
    setValue(text)
  }

  const enableEditing = () => {
    setIsEditing(true)
    inputRef.current?.focus()
  }
  const escFunction = useCallback((event: KeyboardEvent) => {
    if (event.code === "Escape" || event.code === "Esc") {
      setIsEditing(false)
      setValue(text)
    }
  }, [])

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false)
    return () => {
      document.removeEventListener("keydown", escFunction, false)
    }
  }, [])

  return (
    <div css={[css(styles.fullWidth, styles.fullWidthChildren), customStyles]}>
      <OutsideClickHandler onOutsideClick={isEditing ? handleOutsideClick : () => null}>
        <form onSubmit={handleSubmit} onBlur={handleSubmit} css={styles.fullWidth}>
          <div
            css={[styles.wrapperDisabled, !disabled && styles.wrapper, isEditing && styles.wrapperEditable]}
            onClick={!disabled && !isEditing ? () => enableEditing() : undefined}>
            <TextInput
              customStyles={[styles.inputWrapper, customTextInputStyles]}
              customInputStyles={[
                styles.input(isLoading, showLockWhenDisabled),
                isEditing && styles.inputEditable,
                disabled && styles.inputDisabled,
                !isEditing && text === null && styles.inputPlaceholder,
                customInnerInputStyles
              ]}
              onChange={setValue}
              value={value !== null ? value : text}
              type={type}
              readOnly={!isEditing || isLoading}
              isClearable={false}
              placeholder={placeholder}
              min={min}
              ref={inputRef}
              preventInputTrimOnChange={true}
            />
            {!hideIcon &&
              (isEditing ? (
                <Button
                  type="submit"
                  customStyles={styles.icon}
                  variant={ButtonVariant.IconOnly}
                  icon={IconName.Check}
                />
              ) : (
                <Icon
                  name={IconName.EditBordered}
                  customStyles={styles.hoverIcon}
                  className={"hover-icon"}
                  color={primaryColor}
                />
              ))}
            {disabled && showLockWhenDisabled && (
              <Icon name={IconName.LockClosed} className={"disabled-icon"} color={fontColorLight} />
            )}
          </div>
        </form>
      </OutsideClickHandler>
    </div>
  )
}

export const InlineEditableHeaderContainer: React.FC<InlineEditableHeaderContainerProps & CustomStyle> = props => {
  const {text, formatValue, isNumber} = props
  const [isEditing, setIsEditing] = React.useState(false)
  const [value, setValue] = React.useState<string | null>(null)
  const [displayValue, setDisplayValue] = React.useState<string | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const [type, setType] = React.useState<InputType.number | InputType.text>(InputType.text)

  React.useEffect(() => {
    if (value !== text) {
      setValue(text)
    }
  }, [text])

  React.useEffect(() => {
    if (formatValue) {
      if (value !== null) {
        if (!isEditing) {
          setDisplayValue(formatValue(value))
          setType(InputType.text)
        } else {
          setDisplayValue(value)
          setType(isNumber ? InputType.number : InputType.text)
        }
      }
    }
  }, [value, isEditing])

  return (
    <InlineEditableHeader
      isLoading={isLoading}
      isEditing={isEditing}
      setIsLoading={setIsLoading}
      setIsEditing={setIsEditing}
      value={formatValue ? displayValue : value}
      setValue={setValue}
      type={type}
      {...props}
    />
  )
}
