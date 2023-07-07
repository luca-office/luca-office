import {css} from "@emotion/react"
import * as React from "react"
import {EmailDirectory} from "shared/graphql/generated/globalTypes"
import {headerHeight, spacing, spacingHuge, spacingLarge, spacingMedium, spacingSmall} from "shared/styles"
import {Email} from "./email/email"
import {EmailDirectories} from "./email-directories/email-directories"
import {useEmails} from "./hooks/use-emails"

export interface EmailsProps {
  readonly scenarioId: UUID
  readonly directory: EmailDirectory
  readonly emailId?: UUID
}

export const Emails: React.FC<EmailsProps> = ({scenarioId, directory, emailId}) => {
  const {
    actionsDisabled,
    emails,
    emailsLoading,
    introductionEmail,
    interventions,
    scenario,
    selectDirectory,
    selectedDirectory,
    selectedEmailId,
    selectEmail
  } = useEmails({scenarioId, selectedDirectory: directory, selectedEmailId: emailId})

  return (
    <div css={styles.emails}>
      <div css={[styles.generalWrapper, styles.directoryWrapper]}>
        <EmailDirectories
          {...{
            actionsDisabled,
            scenario,
            emails,
            emailsLoading,
            introductionEmail,
            interventions,
            selectedEmailId,
            selectEmail,
            selectedDirectory,
            selectDirectory
          }}
        />
      </div>
      <div css={[styles.generalWrapper, styles.emailWrapper]}>
        <Email {...{selectedEmailId, interventions, scenario, actionsDisabled}} />
      </div>
    </div>
  )
}

const styles = {
  emails: css({
    display: "grid",
    gridTemplateColumns: "35% 1fr",
    padding: spacing(spacingLarge, spacingHuge),
    height: `calc(100vh - ${2 * headerHeight + 2 * spacingLarge + spacingMedium}px)`,
    overflow: "hidden"
  }),
  generalWrapper: css({
    minWidth: 0,
    overflow: "hidden",

    ".email-body, .email-directories": {
      boxSizing: "border-box"
    }
  }),
  directoryWrapper: css({
    marginRight: spacingSmall
  }),
  emailWrapper: css({
    flex: 1,
    marginLeft: spacingSmall,
    minHeight: "min-content"
  })
}
