import {css} from "@emotion/react"
import * as React from "react"
import {ChangeEvent, useEffect, useRef, useState} from "react"
import OutsideClickHandler from "react-outside-click-handler"
import {
  backgroundColor,
  border,
  borderColor,
  borderRadius,
  borderRadiusSmall,
  fontColorLight,
  fontFamily,
  primaryColor,
  primaryColor8PercentOpacity,
  spacing,
  spacingMedium,
  spacingSmall,
  spacingTiny,
  TextSize
} from "shared/styles"

export interface EditableMultilineTextareaProps {
  readonly disabled: boolean
  readonly text: string
  readonly placeholder: string
  readonly onConfirm: (value: string) => void
}

export const EditableMultilineTextarea: React.FC<EditableMultilineTextareaProps> = ({
  disabled,
  text,
  placeholder,
  onConfirm
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(text)
  const [textAreaHeight, setTextAreaHeight] = useState("auto")
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaHeight("auto")
    setValue(event.target.value)
  }

  const handleConfirm = () => {
    onConfirm(value)
    setIsEditing(false)
  }

  useEffect(() => {
    setTextAreaHeight(
      `${
        textAreaRef.current?.scrollHeight
          ? textAreaRef.current.scrollHeight - spacingSmall
          : TextSize.Medium + spacingTiny
      }px`
    )
  }, [value])

  return (
    <div css={[styles.fullWidth, styles.answerInput]}>
      <OutsideClickHandler onOutsideClick={isEditing ? handleConfirm : () => null}>
        <div
          css={[styles.wrapperDisabled, !disabled && styles.wrapper, isEditing && styles.wrapperEditable]}
          onClick={() => !disabled && !isEditing && setIsEditing(true)}>
          {!isEditing && !value ? (
            <textarea
              disabled={disabled}
              rows={1}
              className={"textarea"}
              value={placeholder}
              readOnly={true}
              css={[styles.input, styles.placeholder, isEditing && styles.inputEditable]}
            />
          ) : (
            <textarea
              disabled={disabled}
              ref={textAreaRef}
              rows={1}
              style={{height: textAreaHeight}}
              className="textarea"
              css={[styles.input, isEditing && styles.inputEditable, disabled && styles.inputDisabled]}
              onChange={handleChange}
              value={value}
              suppressContentEditableWarning={true}
              contentEditable={isEditing}
            />
          )}
        </div>
      </OutsideClickHandler>
    </div>
  )
}
const styles = {
  fullWidth: css({
    display: "flex",
    flexGrow: 1,
    "> div": {
      display: "flex",
      flexGrow: 1
    }
  }),
  wrapperDisabled: css({
    display: "flex",
    flexGrow: 1,
    width: "100%",
    boxSizing: "border-box",
    alignItems: "center",
    position: "relative"
  }),
  wrapper: css({
    "&:hover": {
      cursor: "pointer",
      backgroundColor: primaryColor8PercentOpacity,
      borderRadius: borderRadius
    }
  }),
  wrapperEditable: css({
    backgroundColor: backgroundColor
  }),
  input: css({
    cursor: "pointer",
    fontSize: TextSize.Medium,
    border: "none",
    fontFamily: fontFamily,
    minHeight: spacingMedium,
    width: "100%",
    height: "fit-content",
    outline: "none",
    backgroundColor: "transparent",
    textIndent: 0,
    resize: "none",
    wordBreak: "break-word",
    overflowWrap: "break-word",
    whiteSpace: "pre-line",
    padding: spacing(spacingTiny, spacingSmall)
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
  answerInput: css({
    border: border(1, borderColor),
    borderRadius: borderRadiusSmall,
    height: "auto"
  })
}
