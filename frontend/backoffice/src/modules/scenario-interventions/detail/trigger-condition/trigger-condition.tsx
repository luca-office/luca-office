import {css} from "@emotion/react"
import * as React from "react"
import {Heading, Icon, Label, Text} from "shared/components"
import {HeadingLevel, IconName} from "shared/enums"
import {
  borderRadius,
  CustomStyle,
  Flex,
  insetShadow,
  spacing,
  spacingMedium,
  spacingSmall,
  TextSize
} from "shared/styles"
import {LucaI18nLangKey, useLucaTranslation} from "shared/translations"

export interface TriggerConditionProps extends CustomStyle {
  readonly icon: IconName
  readonly titleKey: LucaI18nLangKey
  readonly descriptionKey: LucaI18nLangKey
  readonly renderCondition?: () => JSX.Element | undefined
  readonly titleKeyOptions?: Record<string, any>
}

export const TriggerCondition: React.FC<TriggerConditionProps> = ({
  icon,
  descriptionKey,
  renderCondition,
  titleKey,
  titleKeyOptions,
  customStyles
}) => {
  const {t} = useLucaTranslation()

  return (
    <div css={customStyles}>
      <Label label={t("interventions__interventions_table_trigger_condition")} />
      <div css={styles.content}>
        <div css={Flex.row}>
          <Icon customStyles={styles.headerIcon} name={icon} />
          <Heading level={HeadingLevel.h3}>{t(titleKey, titleKeyOptions)}</Heading>
        </div>
        <Text size={TextSize.Smaller} customStyles={styles.description}>
          {t(descriptionKey)}
        </Text>

        {renderCondition?.()}
      </div>
    </div>
  )
}

const styles = {
  content: css({
    boxShadow: insetShadow,
    borderRadius: borderRadius,
    padding: spacing(spacingMedium, spacingMedium)
  }),
  headerIcon: css({
    marginRight: spacingSmall
  }),
  description: css({
    marginBottom: spacingMedium,
    marginTop: spacingSmall
  })
}
