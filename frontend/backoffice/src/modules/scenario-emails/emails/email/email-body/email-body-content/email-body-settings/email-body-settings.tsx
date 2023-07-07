import {css} from "@emotion/react"
import * as React from "react"
import {IconName} from "shared/enums"
import {EmailDirectory, InterventionType} from "shared/graphql/generated/globalTypes"
import {Email, EmailOpeningIntervention, Intervention} from "shared/models"
import {CustomStyle, Flex, spacingMedium} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {getReceptionDelayLabel, Option} from "shared/utils"
import {EmailBodyMetaEntry, EmailBodySettingSelection} from "../../../../../../../components"
import {EmailStatus} from "../../../../../../../enums"
import {EmailDelayModal} from "../../../email-delay-modal/email-delay-modal"
import {useEmailUpdate} from "../../../hooks/use-email-update"
import {useEmailBodySettings} from "./hooks/use-email-body-settings"

export interface EmailBodySettingsProps extends CustomStyle {
  readonly email: Email
  readonly isIntroductionEmail: boolean
  readonly associatedIntervention: Option<Intervention>
  readonly disabled?: boolean
  readonly emailOpeningInterventions: EmailOpeningIntervention[]
}

export const EmailBodySettings: React.FC<EmailBodySettingsProps> = ({
  email,
  isIntroductionEmail,
  associatedIntervention,
  emailOpeningInterventions,
  customStyles,
  disabled
}) => {
  const {t} = useLucaTranslation()

  const isInterventionEmail = associatedIntervention.isDefined()

  const {updateEmail} = useEmailUpdate(email)
  const {
    directoryOptions,
    markerOptions,
    moveEmail,
    isDelayOverlayVisible,
    showDelayOverlay,
    hideDelayOverlay
  } = useEmailBodySettings(email, updateEmail)

  const isRuntimeSurveyIntervention = associatedIntervention.exists(
    intervention => intervention.interventionType === InterventionType.RuntimeSurveyAnswerSelection
  )

  const interventionOffset = associatedIntervention
    .map(intervention => getInterventionOffsetOfAssociatedIntervention(intervention))
    .orUndefined()

  return (
    <div css={[Flex.row, customStyles]}>
      <EmailBodySettingSelection
        customStyles={styles.widthFixed}
        label={t("email__directory")}
        options={directoryOptions}
        value={email.directory}
        disabled={isIntroductionEmail || disabled || email.receptionDelayInSeconds >= 0}
        onChange={option => moveEmail(option.value as EmailDirectory)}
      />
      <EmailBodyMetaEntry
        customStyles={[styles.widthFlexible, styles.contentMarginLeft]}
        headerLabelKey={
          email.directory === EmailDirectory.Inbox && email.receptionDelayInSeconds >= 0
            ? "email__reception_delay_label_inbox"
            : "email__reception_delay_label_sent"
        }
        label={
          isIntroductionEmail
            ? t("email__completion_delay_label")
            : isInterventionEmail
            ? `${
                isRuntimeSurveyIntervention
                  ? t("interventions__interventions_table_time_offset_after_event")
                  : interventionOffset !== undefined
                  ? getReceptionDelayLabel(t, interventionOffset)
                  : ""
              } (${t("email__intervention_email_label")})`
            : getReceptionDelayLabel(t, email.receptionDelayInSeconds)
        }
        icon={IconName.Clock}
        disabled={isIntroductionEmail || isInterventionEmail || disabled}
        buttonConfig={{
          labelKey: "email__reception_delay_button_edit",
          onClick: showDelayOverlay
        }}
      />
      {email.directory === EmailDirectory.Inbox && (
        <EmailBodySettingSelection
          customStyles={[styles.widthFixed, styles.contentMarginLeft]}
          value={email.isInitiallyRead ? EmailStatus.Read : EmailStatus.Unread}
          label={t("email__marker_label")}
          disabled={isIntroductionEmail || disabled || email.receptionDelayInSeconds >= 0}
          options={markerOptions}
          onChange={option => updateEmail({isInitiallyRead: option.value === EmailStatus.Read})}
        />
      )}
      {isDelayOverlayVisible && (
        <EmailDelayModal
          emailOpeningInterventions={emailOpeningInterventions}
          email={email}
          onDismiss={hideDelayOverlay}
        />
      )}
    </div>
  )
}

const getInterventionOffsetOfAssociatedIntervention = (intervention: Intervention) =>
  intervention.__typename === "RuntimeSurveyAnswerSelectionIntervention" ? undefined : intervention.timeOffsetInSeconds

const Size = {
  fixed: 178
}

const styles = {
  contentMarginLeft: css({
    marginLeft: spacingMedium
  }),
  widthFixed: css({
    width: Size.fixed
  }),
  widthFlexible: css({
    flex: 1
  })
}
