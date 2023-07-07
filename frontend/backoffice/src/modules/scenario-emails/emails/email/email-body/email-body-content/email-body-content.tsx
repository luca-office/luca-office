import {css} from "@emotion/react"
import * as React from "react"
import {LoadingIndicator} from "shared/components"
import {Email, EmailOpeningIntervention, Intervention, Scenario} from "shared/models"
import {
  CustomStyle,
  fontColor,
  fontColorLight,
  spacing,
  spacingHuge,
  spacingHuger,
  spacingLarge,
  spacingMedium,
  spacingSmall
} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {Option} from "shared/utils"
import {EmailBodyFiles} from "./email-body-files/email-body-files"
import {EmailBodyMessage} from "./email-body-message/email-body-message"
import {EmailBodySender} from "./email-body-sender/email-body-sender"
import {EmailBodySettings} from "./email-body-settings/email-body-settings"

export interface EmailBodyContentProps extends CustomStyle {
  readonly email: Option<Email>
  readonly emailLoading: boolean
  readonly isIntroductionEmail: boolean
  readonly associatedIntervention: Option<Intervention>
  readonly scenario: Option<Scenario>
  readonly actionsDisabled?: boolean
  readonly emailOpeningInterventions: EmailOpeningIntervention[]
}

export const EmailBodyContent: React.FC<EmailBodyContentProps> = ({
  actionsDisabled,
  email,
  emailLoading,
  isIntroductionEmail,
  associatedIntervention,
  emailOpeningInterventions,
  scenario,
  customStyles
}) => {
  const {t} = useLucaTranslation()

  return (
    <div css={[styles.content, customStyles]}>
      {emailLoading ? (
        <div css={styles.loadingIndicator}>
          <LoadingIndicator />
        </div>
      ) : (
        email
          .map(mail => (
            <React.Fragment>
              <EmailBodySettings
                customStyles={styles.contentMargin}
                email={mail}
                isIntroductionEmail={isIntroductionEmail}
                associatedIntervention={associatedIntervention}
                emailOpeningInterventions={emailOpeningInterventions}
                disabled={actionsDisabled}
              />
              <EmailBodySender
                customStyles={[styles.contentMargin, styles.sender]}
                email={mail}
                disabled={actionsDisabled}
              />
              <EmailBodyMessage
                customStyles={styles.message}
                email={mail}
                disabled={actionsDisabled}
                scenario={scenario}
              />
              <EmailBodyFiles
                customStyles={[styles.contentMargin, styles.files]}
                disabled={actionsDisabled}
                email={mail}
              />
            </React.Fragment>
          ))
          .getOrElse(<div css={styles.placeholder}>{t("email__placeholder_not_found")}</div>)
      )}
    </div>
  )
}

const styles = {
  content: css({
    padding: spacing(spacingLarge, spacingMedium, spacingHuge + spacingSmall, spacingMedium),
    color: fontColor
  }),
  loadingIndicator: css({
    "> div": {
      margin: "auto"
    }
  }),
  placeholder: css({
    color: fontColorLight,
    textAlign: "center",
    marginTop: spacingHuger + spacingSmall
  }),
  contentMargin: css({
    margin: spacing(0, spacingSmall)
  }),
  sender: css({
    marginTop: spacingLarge,

    "> div": {
      minWidth: 0
    },

    ".content-wrapper > div": {
      overflow: "hidden"
    }
  }),
  message: css({
    marginTop: spacingHuge + spacingSmall
  }),
  files: css({
    marginTop: spacingMedium
  })
}
