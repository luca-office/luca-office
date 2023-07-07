import {CSSInterpolation} from "@emotion/serialize"
import * as React from "react"
import {IconName} from "../../enums"
import {CustomStyle, Flex, fontColor} from "../../styles"
import {LucaI18nLangKey, useLucaTranslation} from "../../translations"
import {Button} from "../button/button"
import {Icon} from "../icon/icon"
import {readonlyActionFieldStyle as styles} from "./readonly-action-field.style"

export interface ReadonlyActionInputProps extends CustomStyle {
  readonly buttonLabel?: string
  readonly label?: string
  readonly labelIconName?: IconName
  readonly onClick?: () => void
  readonly renderValue: () => React.ReactNode
  readonly customContentStyles?: CSSInterpolation
  readonly renderPlaceholder?: boolean
  readonly displayPlain?: boolean //do not render special styling like box or shadow
  readonly disabled?: boolean //do not render special styling like box or shadow
  readonly placeholderKey?: LucaI18nLangKey // render placeholder, if renderValue is empty
}

export const ReadonlyActionField: React.FC<ReadonlyActionInputProps> = ({
  customStyles,
  label,
  labelIconName,
  buttonLabel,
  renderValue,
  renderPlaceholder,
  customContentStyles,
  onClick,
  displayPlain,
  disabled,
  placeholderKey
}) => {
  const {t} = useLucaTranslation()

  const showButton = !!buttonLabel && !!onClick
  return (
    <div
      css={[Flex.column, !displayPlain && styles.inputContainer(disabled), customStyles]}
      data-testid="readonly-action-field"
      onClick={!disabled && !!onClick ? onClick : undefined}>
      <div css={Flex.row}>
        {!!label && <div css={[styles.textOverflowHidden, styles.label]}>{label}</div>}
        {labelIconName && <Icon css={styles.labelIcon} name={labelIconName} color={fontColor} />}
      </div>
      <div
        css={[Flex.row, styles.contentWrapper, displayPlain && styles.contentWrapperPlain]}
        className={"content-wrapper"}>
        <div
          css={[
            styles.content(showButton),
            displayPlain && styles.contentPlain,
            !!placeholderKey && styles.placeholder,
            customContentStyles
          ]}
          className={`content${renderPlaceholder ? " placeholder" : ""}`}>
          {renderPlaceholder && placeholderKey !== undefined ? t(placeholderKey) : renderValue()}
        </div>
        {showButton && (
          <Button
            customStyles={styles.button}
            onClick={disabled ? undefined : onClick}
            className={"readonly-action-button"}
            disabled={disabled}>
            {buttonLabel}
          </Button>
        )}
      </div>
    </div>
  )
}
