import {css} from "@emotion/react"
import {CSSInterpolation} from "@emotion/serialize"
import * as React from "react"
import {ButtonVariant, HeadingLevel, IconName} from "../../enums"
import {
  backgroundColorLight,
  borderRadius,
  Flex,
  insetShadow,
  spacingMedium,
  spacingSmall,
  spacingTiny
} from "../../styles"
import {LucaI18nLangKey, useLucaTranslation} from "../../translations"
import {Button, Heading, Icon, Label, Text} from "../"

export interface SelectionInPreviewFooterProps {
  readonly customContent?: JSX.Element
  readonly customLabelStyles?: CSSInterpolation
  readonly headingKey: LucaI18nLangKey
  readonly icon?: IconName
  readonly onConfirm?: () => void
  readonly textKey?: LucaI18nLangKey
  readonly title?: string
}

export const SelectionInPreviewFooter: React.FC<SelectionInPreviewFooterProps> = ({
  customContent,
  customLabelStyles,
  headingKey,
  icon,
  onConfirm,
  textKey,
  title
}) => {
  const {t} = useLucaTranslation()
  return (
    <div css={styles.footer}>
      <Label customStyles={customLabelStyles} label={t(headingKey)} />

      <div className="card-wrapper" css={styles.card}>
        <div css={Flex.row}>
          {icon && <Icon customStyles={styles.icon} name={icon} />}
          {title !== undefined && <Heading level={HeadingLevel.h3}>{title}</Heading>}
        </div>
        <div css={styles.buttonRow}>
          {textKey && <Text>{t(textKey)}</Text>}
          {customContent === undefined && (
            <Button onClick={onConfirm} variant={ButtonVariant.Primary}>
              {t("continue_button")}
            </Button>
          )}
        </div>
        {customContent}
      </div>
    </div>
  )
}

const styles = {
  footer: css({
    backgroundColor: backgroundColorLight
  }),
  buttonRow: css(Flex.row, {
    justifyContent: "space-between"
  }),
  icon: css({
    marginRight: spacingSmall
  }),
  card: css({
    margin: spacingSmall,
    boxShadow: insetShadow,
    padding: spacingMedium,
    backgroundColor: "white",
    borderRadius: borderRadius
  })
}
