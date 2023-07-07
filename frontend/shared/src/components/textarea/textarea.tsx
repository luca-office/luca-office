import {css} from "@emotion/react"
import {CSSInterpolation} from "@emotion/serialize"
import {omit} from "lodash-es"
import * as React from "react"
import {ChangeEvent} from "react"
import {HeadingLevel} from "../../enums"
import {
  borderColor,
  borderRadius,
  CustomStyle,
  fontFamily,
  FontWeight,
  primaryColor,
  spacing,
  spacingSmall,
  spacingTiny,
  TextSize,
  validationErrorColor
} from "../../styles"
import {LucaI18nLangKey, useLucaTranslation} from "../../translations"
import {Heading} from ".."

interface Props
  extends React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>,
    InputProps {
  readonly labelKey?: LucaI18nLangKey
  readonly ref?:
    | ((instance: HTMLTextAreaElement | null) => void)
    | React.RefObject<HTMLTextAreaElement>
    | null
    | undefined
  readonly renderHeader?: () => React.ReactNode
}

interface InputProps extends CustomStyle {
  readonly hasValidationError?: boolean
  readonly trimText?: boolean
  readonly customStyleOnlyTextArea?: CSSInterpolation
}

export const TextArea: React.FC<Props & CustomStyle> = React.forwardRef((props, ref) => {
  const {labelKey, hasValidationError = false, customStyles, trimText, customStyleOnlyTextArea, renderHeader} = props
  const textareaProps = omit(
    props,
    "labelKey",
    "customStyles",
    "hasValidationError",
    "customStyleOnlyTextArea",
    "trimText",
    "renderHeader"
  )
  const textAreaChange = textareaProps.onChange
  const {t} = useLucaTranslation()
  const onChange = textAreaChange
    ? (event: ChangeEvent<HTMLTextAreaElement>) => {
        const value = trimText ? (event.target?.value ?? "").trim() : event.target?.value ?? ""
        textAreaChange({...event, target: {...event.target, value}})
      }
    : undefined
  return (
    <div css={customStyles}>
      {renderHeader !== undefined
        ? renderHeader()
        : labelKey && (
            <Heading customStyles={styles.heading} fontWeight={FontWeight.Bold} level={HeadingLevel.h3}>
              {t(labelKey)}
            </Heading>
          )}
      <textarea
        css={[styles.textarea(hasValidationError), customStyles, customStyleOnlyTextArea]}
        ref={ref}
        {...textareaProps}
        onChange={onChange}
      />
    </div>
  )
})

const styles = {
  heading: css({marginBottom: spacingTiny}),
  textarea: (hasValidationError: boolean) =>
    css({
      //@ts-ignore spread overwrite
      borderRadius,
      fontFamily: fontFamily,
      border: `1px solid ${borderColor}`,
      fontSize: TextSize.Medium,
      padding: spacing(spacingTiny, spacingSmall),
      boxSizing: "border-box",
      resize: "vertical",
      width: "100%",
      "&::placeholder": {
        fontSize: TextSize.Medium
      },
      ...(hasValidationError
        ? {
            borderRadius: 0,
            borderColor: validationErrorColor,
            outline: `1px solid ${validationErrorColor}`
          }
        : {
            "&:focus": {
              borderRadius: 0,
              borderColor: primaryColor,
              outline: `1px solid ${primaryColor}`
            }
          })
    })
}
