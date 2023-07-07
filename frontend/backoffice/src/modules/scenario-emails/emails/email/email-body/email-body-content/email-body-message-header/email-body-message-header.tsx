import {css} from "@emotion/react"
import * as React from "react"
import {Button, CardHeader, Heading, Icon, Text, Tooltip} from "shared/components"
import {HeadingLevel, IconName} from "shared/enums"
import {EmailMessageTemplate} from "shared/enums/email-message-template"
import {
  borderRadiusSmall,
  FontWeight,
  radius,
  spacing,
  spacingCard,
  spacingMedium,
  spacingSmall,
  spacingTiny,
  textEllipsis,
  TextSize,
  zIndex1
} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {getEmailMessageTemplateLabelKey, getEmailMessageTemplateTooltipKey} from "shared/utils"

const emailMessageTemplates = [
  {
    labelKey: getEmailMessageTemplateLabelKey(EmailMessageTemplate.FormalSalutation),
    tooltipKey: getEmailMessageTemplateTooltipKey(EmailMessageTemplate.FormalSalutation),
    value: EmailMessageTemplate.FormalSalutation
  },
  {
    labelKey: getEmailMessageTemplateLabelKey(EmailMessageTemplate.Salutation),
    tooltipKey: getEmailMessageTemplateTooltipKey(EmailMessageTemplate.Salutation),
    value: EmailMessageTemplate.Salutation
  },
  {
    labelKey: getEmailMessageTemplateLabelKey(EmailMessageTemplate.FirstName),
    tooltipKey: getEmailMessageTemplateTooltipKey(EmailMessageTemplate.FirstName),
    value: EmailMessageTemplate.FirstName
  },
  {
    labelKey: getEmailMessageTemplateLabelKey(EmailMessageTemplate.LastName),
    tooltipKey: getEmailMessageTemplateTooltipKey(EmailMessageTemplate.LastName),
    value: EmailMessageTemplate.LastName
  }
]

export interface EmailBodyMessageHeaderProps {
  readonly onTemplateSelection: (template: EmailMessageTemplate) => void
}

export const EmailBodyMessageHeader: React.FC<EmailBodyMessageHeaderProps> = ({onTemplateSelection}) => {
  const {t} = useLucaTranslation()
  return (
    <div css={styles.header}>
      <Heading level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
        {t("email__message_label")}
      </Heading>
      <CardHeader customStyles={styles.headerContent} hasGreyBackground={true} hasShadow={true}>
        <div css={styles.templates}>
          {emailMessageTemplates.map(({labelKey, tooltipKey, value}) => (
            <Tooltip key={labelKey} title={t(tooltipKey)}>
              <Button customStyles={styles.templateButton} onClick={() => onTemplateSelection(value)}>
                {t(labelKey)}
              </Button>
            </Tooltip>
          ))}
        </div>
        <div css={styles.info}>
          <Text size={TextSize.Medium}>{t("email__message_insert_user_information_label")}</Text>
          <Tooltip
            icon={IconName.Information}
            title={t("email__message_insert_user_information_label")}
            text={t("email__message_insert_user_information_description")}>
            <Icon name={IconName.Information} />
          </Tooltip>
        </div>
      </CardHeader>
    </div>
  )
}

const styles = {
  header: css({
    display: "grid",
    gridTemplateRows: "minmax(min-content, max-content) 1fr",
    gridRowGap: spacingTiny
  }),
  headerLabel: css(textEllipsis, {
    letterSpacing: 0.15
  }),
  headerContent: css({
    zIndex: zIndex1,
    borderRadius: radius(borderRadiusSmall, borderRadiusSmall, 0, 0),
    display: "grid",
    gridTemplateColumns: "1fr minmax(min-content, max-content)",
    gridColumnGap: spacingMedium,
    padding: spacing(spacingSmall, spacingCard, spacingSmall, spacingSmall)
  }),
  templates: css({
    display: "grid",
    gridTemplateColumns: `repeat(${emailMessageTemplates.length}, minmax(min-content,max-content))`,
    gridColumnGap: spacingSmall
  }),
  templateButton: css({
    width: "initial"
  }),
  info: css({
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) minmax(min-content, max-content)",
    gridColumnGap: spacingTiny,
    alignItems: "center"
  })
}
