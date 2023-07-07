import {css} from "@emotion/react"
import {CSSInterpolation} from "@emotion/serialize"

import * as React from "react"
import {useState} from "react"
import OutsideClickHandler from "react-outside-click-handler"
import {Button, Icon, Text} from "shared/components"
import {ButtonVariant, IconName} from "shared/enums"
import {
  backgroundColor,
  borderRadius,
  boxHeightSmall,
  CustomStyle,
  fontColorLight,
  fontFamily,
  primaryColor,
  primaryColor8PercentOpacity,
  spacing,
  spacingSmall,
  spacingTiny,
  TextSize
} from "shared/styles"

export interface InlineEditableTextareaProps {
  readonly isEditing: boolean
  readonly setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
  readonly value: string | null
  readonly setValue: React.Dispatch<React.SetStateAction<string | null>>
}

export interface InlineEditableTextareaContainerProps {
  readonly text: string
  readonly onConfirm?: (text: string) => Promise<unknown>
  readonly readOnly?: boolean // used in context of wrapped action fields
  readonly disabled?: boolean
  readonly placeholder?: string
  readonly showCheckmark?: boolean
  readonly customWrappedTextareaStyles?: CSSInterpolation
}

export const InlineEditableTextarea: React.FC<
  InlineEditableTextareaProps & InlineEditableTextareaContainerProps & CustomStyle
> = ({
  text,
  onConfirm,
  customStyles,
  isEditing,
  setIsEditing,
  readOnly,
  value,
  setValue,
  disabled,
  placeholder,
  showCheckmark = true,
  customWrappedTextareaStyles
}) => {
  let ref: HTMLDivElement | null
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const html = ref?.innerHTML

    if (typeof html !== "undefined" && onConfirm) {
      const saveValue = html?.trim() ?? ""

      Promise.resolve(onConfirm(saveValue)).then(() => {
        setIsEditing(false)
        setValue(null)
      })
    }
  }

  const handleOutsideClick = () => {
    setIsEditing(false)
    setValue(null)
  }

  React.useEffect(() => {
    if (isEditing) {
      setTimeout(() => ref?.focus(), 0)
    }
  }, [isEditing])

  const wrappedTextarea = (
    <div
      css={[styles.wrapperDisabled, !disabled && styles.wrapper, isEditing && styles.wrapperEditable]}
      onClick={() => !readOnly && !isEditing && setIsEditing(true)}>
      <div
        className="textarea"
        ref={div => (ref = div)}
        css={[
          styles.input,
          isEditing && styles.inputEditable,
          disabled && styles.inputDisabled,
          customWrappedTextareaStyles
        ]}
        contentEditable={isEditing}
        suppressContentEditableWarning={true}>
        {value !== null ? value : text}
        {!value && !text && !isEditing && (
          <Text className="placeholder" customStyles={styles.placeholder}>
            {placeholder}
          </Text>
        )}
      </div>
      {!isEditing ? (
        <Icon
          name={IconName.EditBordered}
          customStyles={styles.hoverIcon}
          className={"hover-icon"}
          color={primaryColor}
        />
      ) : showCheckmark ? (
        <Button type="submit" customStyles={styles.icon} variant={ButtonVariant.IconOnly} icon={IconName.Check} />
      ) : null}
    </div>
  )
  return readOnly ? (
    wrappedTextarea
  ) : (
    <div css={[css(styles.fullWidth, styles.fullWidthChildren), customStyles]}>
      <OutsideClickHandler onOutsideClick={isEditing ? handleOutsideClick : () => null}>
        <form onSubmit={handleSubmit} css={styles.fullWidth}>
          {wrappedTextarea}
        </form>
      </OutsideClickHandler>
    </div>
  )
}

export const InlineEditableTextareaContainer: React.FC<InlineEditableTextareaContainerProps & CustomStyle> = props => {
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState<string | null>(props.text)

  React.useEffect(() => {
    if (value !== props.text) {
      setValue(props.text)
    }
  }, [props.text])

  return (
    <InlineEditableTextarea
      isEditing={isEditing}
      setIsEditing={setIsEditing}
      value={value}
      setValue={setValue}
      {...props}
    />
  )
}

const styles = {
  fullWidth: css({
    display: "flex",
    flexGrow: 1
  }),
  fullWidthChildren: css({
    ">div": {
      display: "flex",
      flexGrow: 1
    }
  }),
  wrapperDisabled: css({
    display: "flex",
    flexGrow: 1,
    padding: spacing(spacingTiny, spacingSmall, spacingTiny, spacingSmall),
    width: "100%",
    boxSizing: "border-box",
    alignItems: "center",
    position: "relative"
  }),
  wrapper: css({
    "&:hover": {
      cursor: "pointer",
      backgroundColor: primaryColor8PercentOpacity,
      borderRadius: borderRadius,

      ".hover-icon": {
        display: "block"
      }
    }
  }),
  wrapperEditable: css({
    backgroundColor: backgroundColor
  }),
  input: css({
    cursor: "pointer",
    fontSize: TextSize.Medium,
    padding: 0,
    paddingRight: spacingSmall,
    border: "none",
    fontFamily: fontFamily,
    minHeight: 50,
    width: "100%",
    outline: "none",
    backgroundColor: "transparent",
    textIndent: 0,
    resize: "none",
    wordBreak: "break-word",
    overflowWrap: "break-word",
    whiteSpace: "pre-line"
  }),
  placeholder: css({
    color: fontColorLight,
    fontSize: TextSize.Medium
  }),
  inputEditable: css({
    cursor: "default",
    color: primaryColor
  }),
  inputDisabled: css({
    cursor: "default",
    resize: "none"
  }),
  hoverIcon: css({
    width: 16,
    height: 16,
    display: "none",
    position: "absolute",
    top: spacingSmall,
    right: spacingSmall
  }),

  icon: css({
    height: boxHeightSmall
  })
}
