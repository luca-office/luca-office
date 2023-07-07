import {css} from "@emotion/react"
import * as React from "react"
import {Email, EmailOpeningIntervention, Intervention, Scenario} from "shared/models"
import {Flex} from "shared/styles"
import {Option} from "shared/utils"
import {EmailBodyContent} from "./email-body-content/email-body-content"
import {EmailBodyFooter} from "./email-body-footer/email-body-footer"

export interface EmailBodyProps {
  readonly actionsDisabled: boolean
  readonly email: Option<Email>
  readonly emailLoading: boolean
  readonly scenario: Option<Scenario>
  readonly isIntroductionEmail: boolean
  readonly emailOpeningInterventions: EmailOpeningIntervention[]
  readonly associatedIntervention: Option<Intervention>
  readonly onCreateInterventionClick: () => void
  readonly navigateToIntervention: () => void
}

export const EmailBody: React.FC<EmailBodyProps> = ({
  actionsDisabled,
  email,
  emailLoading,
  emailOpeningInterventions,
  scenario,
  isIntroductionEmail,
  associatedIntervention,
  onCreateInterventionClick,
  navigateToIntervention
}) => (
  <div css={[Flex.column, styles.body]} className={"email-body"}>
    <EmailBodyContent
      {...{
        actionsDisabled,
        customStyles: styles.content,
        email,
        emailLoading,
        isIntroductionEmail,
        associatedIntervention,
        emailOpeningInterventions,
        scenario
      }}
    />
    {email
      .map(mail => (
        <EmailBodyFooter
          {...{
            customStyles: styles.footer,
            scenario,
            emailOpeningInterventions,
            isIntroductionEmail,
            associatedIntervention,
            email: mail,
            navigateToIntervention,
            disabled: email.isEmpty() || actionsDisabled,
            onCreateInterventionClick
          }}
        />
      ))
      .orNull()}
  </div>
)

const styles = {
  body: css({
    maxHeight: "inherit",
    overflow: "hidden",
    height: "100%"
  }),
  content: css({
    flex: "1 1 auto",
    overflow: "auto"
  }),
  footer: css({
    flex: "0 0 auto"
  })
}
