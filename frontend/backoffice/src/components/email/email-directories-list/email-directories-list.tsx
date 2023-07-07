import partial from "lodash-es/partial"
import * as React from "react"
import {Icon, LoadingIndicator, Text, Tooltip} from "shared/components"
import {IconName} from "shared/enums"
import {InterventionType} from "shared/graphql/generated/globalTypes"
import {Email, Intervention, Scenario} from "shared/models"
import {Flex, fontColor, fontColorBright, TextSize} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {getReceptionDelayLabel, Option} from "shared/utils"
import {getGroupTypeIconName, interventionTypeToGroupType} from "../../../modules/scenario-interventions/utils"
import {emailDirectoriesListStyle as styles} from "./email-directories-list.style"

export interface EmailDirectoriesListProps {
  readonly scenario: Option<Scenario>
  readonly emails: Email[]
  readonly emailsLoading: boolean
  readonly interventions: Intervention[]
  readonly selectedEmailId: Option<UUID>
  readonly selectEmail: (email: Email) => void
  readonly isInbox: boolean
}

export const EmailDirectoriesList: React.FC<EmailDirectoriesListProps> = ({
  scenario,
  emails,
  emailsLoading,
  interventions,
  selectedEmailId,
  selectEmail,
  isInbox
}) => {
  const {t} = useLucaTranslation()
  return (
    <div css={Flex.column}>
      {emailsLoading ? (
        <div css={styles.loadingIndicator}>
          <LoadingIndicator />
        </div>
      ) : emails.length ? (
        emails.map(email => {
          const isSelected = selectedEmailId.map(id => email.id === id).getOrElse(false)
          const associatedIntervention = interventions.find(
            intervention => intervention.interventionEmailId === email.id
          )
          const isInterventionEmail = associatedIntervention !== undefined
          const isIntroductionEmail = scenario
            .map(scenarioValue => scenarioValue.introductionEmailId === email.id)
            .getOrElse(false)
          return (
            <div
              key={email.id}
              onClick={partial(selectEmail, email)}
              css={[styles.email(isIntroductionEmail || isInterventionEmail), isSelected && styles.emailSelected]}
              className="email-directories-list-email">
              <div css={styles.emailContent}>
                <div css={Flex.row}>
                  <div css={styles.emailSenderOrRecipient} className={"email-directories-list-email-sender"}>
                    {email.sender ?? email.recipient}
                  </div>

                  <div css={styles.emailTime} className={"email-directories-list-email-time"}>
                    {associatedIntervention?.interventionType === InterventionType.RuntimeSurveyAnswerSelection ? (
                      <Text size={TextSize.Medium}>
                        {t("interventions__interventions_table_time_offset_after_event")}
                      </Text>
                    ) : (
                      getReceptionDelayLabel(t, email.receptionDelayInSeconds)
                    )}
                  </div>

                  {isInbox && (
                    <div
                      css={styles.emailStatus(email.isInitiallyRead)}
                      className={"email-directories-list-email-read-status"}
                    />
                  )}
                </div>
                <div css={styles.emailSubject} className={"email-directories-list-email-subject"}>
                  {email.subject}
                </div>
              </div>
              {(isIntroductionEmail || isInterventionEmail) && (
                <Tooltip
                  customStyles={styles.emailIconContainer(isInterventionEmail, isSelected)}
                  title={t(
                    isIntroductionEmail ? "email__introduction_email_label" : "email__intervention_email_label"
                  )}>
                  <Icon
                    name={
                      isIntroductionEmail
                        ? IconName.Email
                        : getGroupTypeIconName(interventionTypeToGroupType(associatedIntervention!.interventionType)) // cant be undefined here
                    }
                    color={isInterventionEmail ? fontColor : fontColorBright}
                  />
                </Tooltip>
              )}
            </div>
          )
        })
      ) : (
        <div css={styles.placeholder} className={"email-directories-list-placeholder"}>
          {t("email__placeholder")}
        </div>
      )}
    </div>
  )
}
