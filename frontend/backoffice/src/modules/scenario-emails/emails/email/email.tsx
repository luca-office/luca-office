import {css} from "@emotion/react"
import * as React from "react"
import {EmailOpeningIntervention, Intervention, Scenario} from "shared/models"
import {headerHeight, inputHeight, spacingMedium, spacingSmall} from "shared/styles"
import {find, Option} from "shared/utils"
import {EmailContent, EmailHeader} from "../../../../components"
import {CreateEmailOpeningInterventionModalContainer} from "../../../scenario-interventions/create/create-intervention-modal/container/create-email-opening-intervention-modal-container"
import {getInterventionsForTypeName} from "../../../scenario-interventions/utils"
import {EmailBody} from "./email-body/email-body"
import {useEmail} from "./hooks/use-email"

export interface EmailProps {
  readonly actionsDisabled: boolean
  readonly selectedEmailId: Option<UUID>
  readonly scenario: Option<Scenario>
  readonly interventions: Intervention[]
}

export const Email: React.FC<EmailProps> = ({actionsDisabled, selectedEmailId, interventions, scenario}) => {
  const {
    email,
    emailLoading,
    isIntroductionEmail,
    isCreateInterventionModalVisible,
    navigateToEmails,
    navigateToIntervention,
    toggleIsCreateInterventionModalVisible
  } = useEmail(scenario, selectedEmailId)

  const associatedIntervention = selectedEmailId.flatMap(emailId =>
    find(intervention => intervention.interventionEmailId === emailId, interventions)
  )

  const emailOpeningInterventions = getInterventionsForTypeName(
    interventions,
    "EmailOpeningIntervention"
  ) as EmailOpeningIntervention[]

  const emailOpeningInterventionsForEmail = emailOpeningInterventions.filter(
    intervention => intervention.emailId === selectedEmailId.getOrElse("")
  )

  return (
    <EmailContent
      customStyles={styles.content}
      header={
        <EmailHeader
          {...{
            isIntroductionEmail,
            hasIntervention: emailOpeningInterventionsForEmail.length > 0,
            isInterventionEmail: associatedIntervention.isDefined(),
            email,
            emailLoading,
            onDelete: navigateToEmails,
            actionsDisabled
          }}
        />
      }>
      <EmailBody
        {...{
          actionsDisabled,
          scenario,
          onCreateInterventionClick: toggleIsCreateInterventionModalVisible,
          emailOpeningInterventions: emailOpeningInterventionsForEmail,
          isIntroductionEmail,
          associatedIntervention,
          email,
          emailLoading,
          navigateToIntervention
        }}
      />
      {isCreateInterventionModalVisible &&
        email
          .map(mail => (
            <CreateEmailOpeningInterventionModalContainer
              emailId={mail.id}
              emailReceptionDelayInSeconds={mail.receptionDelayInSeconds}
              onDismiss={toggleIsCreateInterventionModalVisible}
              scenarioId={scenario.map(s => s.id).getOrElse("")}
              scenarioMaxDurationInSeconds={scenario.map(s => s.maxDurationInSeconds || 0).getOrElse(0)}
            />
          ))
          .orNull()}
    </EmailContent>
  )
}

const Size = {
  subHeader: 20
}

const Spacing = {
  subHeaderHeight: Size.subHeader + 2 * spacingMedium,
  contentWrapper: 2 * spacingMedium,
  emailContentHeader: inputHeight + 2 * spacingSmall
}

const styles = {
  content: css({
    "> div:last-of-type": {
      maxHeight: `calc(100vh - ${
        headerHeight + Spacing.subHeaderHeight + Spacing.contentWrapper + Spacing.emailContentHeader
      }px)`,
      overflow: "hidden"
    }
  })
}
