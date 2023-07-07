import {css} from "@emotion/react"
import partial from "lodash-es/partial"
import * as React from "react"
import {DeleteOrArchiveEntityButton, Icon, Tooltip} from "shared/components"
import {EmailDirectory} from "shared/graphql/generated/globalTypes"
import {useDeleteEmail} from "shared/graphql/hooks"
import {Email} from "shared/models"
import {boxHeightMedium, Flex, inputHeight, spacingSmall} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {getDirectoryIcon, getReceptionDelayLabel, Option} from "shared/utils"

export interface EmailHeaderProps {
  readonly actionsDisabled: boolean
  readonly email: Option<Email>
  readonly emailLoading: boolean
  readonly isIntroductionEmail: boolean
  readonly isInterventionEmail: boolean
  readonly hasIntervention: boolean
  readonly onDelete: () => void
}

export const EmailHeader: React.FC<EmailHeaderProps> = ({
  actionsDisabled,
  email,
  emailLoading,
  isIntroductionEmail,
  isInterventionEmail,
  hasIntervention,
  onDelete
}) => {
  const {t} = useLucaTranslation()

  const senderOrRecipient = email
    .map(
      mail =>
        `${mail.sender ?? mail.recipient} (${
          isIntroductionEmail
            ? t("email__introduction_email_label")
            : isInterventionEmail
            ? t("email__intervention_email_label")
            : getReceptionDelayLabel(t, mail.receptionDelayInSeconds)
        })`
    )
    .getOrElse(t("email__placeholder_not_found_title"))

  return (
    <div css={styles.wrapper}>
      <Icon
        customStyles={styles.directoryIcon}
        name={getDirectoryIcon(email.map(mail => mail.directory).getOrElse(EmailDirectory.Inbox))}
      />

      <div css={styles.senderOrRecipient}>{emailLoading ? t("email__placeholder_loading") : senderOrRecipient}</div>

      {!emailLoading &&
        email
          .map(mail => (
            <Tooltip
              title={t(
                hasIntervention
                  ? "email__intervention_email_delete_tooltip_email_has_intervention_error"
                  : "email__intervention_email_delete_tooltip"
              )}
              inactive={!isInterventionEmail && !hasIntervention}>
              <DeleteOrArchiveEntityButton
                useDeleteHook={partial(useDeleteEmail, mail.scenarioId)}
                entityId={mail.id}
                titleKey={isIntroductionEmail ? "email__title_delete_introduction" : undefined}
                onSuccess={onDelete}
                disabled={isIntroductionEmail || isInterventionEmail || hasIntervention || actionsDisabled}
              />
            </Tooltip>
          ))
          .orNull()}
    </div>
  )
}

const Size = {
  directoryIcon: 16
}

const styles = {
  wrapper: css(Flex.row, {
    height: boxHeightMedium
  }),
  directoryIcon: css({
    width: Size.directoryIcon,
    height: Size.directoryIcon,
    minWidth: Size.directoryIcon,
    marginLeft: spacingSmall,
    marginRight: spacingSmall
  }),
  senderOrRecipient: css({
    width: `calc(100% - ${2 * spacingSmall + Size.directoryIcon + inputHeight}px)`,
    marginRight: spacingSmall
  })
}
