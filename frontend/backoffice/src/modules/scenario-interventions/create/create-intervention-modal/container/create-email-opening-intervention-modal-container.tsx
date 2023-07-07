import {inRange} from "lodash"
import * as React from "react"
import {useForm} from "react-hook-form"
import {useDispatch} from "react-redux"
import {IconName, TimeUnit} from "shared/enums"
import {EmailDirectory, EmailOpeningInterventionCreation} from "shared/graphql/generated/globalTypes"
import {useCreateEmail, useCreateEmailOpeningIntervention} from "shared/graphql/hooks"
import {emailsQuery} from "shared/graphql/queries"
import {useLucaTranslation} from "shared/translations"
import {secondsToGivenTimeUnit} from "shared/utils"
import {navigateToRouteAction} from "../../../../../redux/actions/navigation-action"
import {Route} from "../../../../../routes"
import {getReceptionDelayInSeconds} from "../../../../scenario-emails/emails/email/email-delay-modal/email-delay-modal-utils"
import {CreateInterventionModal, InterventionCreationBaseFormType} from "../create-intervention-modal"
import {emailCreationValues} from "../util/email-creation"

interface Props {
  readonly emailId: UUID
  readonly emailReceptionDelayInSeconds: number
  readonly onDismiss: () => void
  readonly scenarioId: UUID
  readonly scenarioMaxDurationInSeconds: number
}

export const CreateEmailOpeningInterventionModalContainer = ({
  scenarioMaxDurationInSeconds,
  emailReceptionDelayInSeconds,
  onDismiss,
  scenarioId,
  emailId
}: Props) => {
  const formMethods = useForm<InterventionCreationBaseFormType>()
  const {t} = useLucaTranslation()

  const {createEmailOpeningIntervention, createEmailOpeningInterventionLoading} = useCreateEmailOpeningIntervention(
    scenarioId
  )
  const {createEmail, createEmailLoading} = useCreateEmail([{query: emailsQuery, variables: {scenarioId}}])

  const dispatch = useDispatch()

  const handleCreateIntervention = (creation: InterventionCreationBaseFormType) => {
    const timeOffsetInSeconds = getReceptionDelayInSeconds(creation.timeUnit, creation.timeOffset)
    if (timeOffsetInSeconds > scenarioMaxDurationInSeconds) {
      formMethods.setError("timeOffset", {message: t("email__future_email_error")})
    } else if (!inRange(timeOffsetInSeconds, emailReceptionDelayInSeconds, scenarioMaxDurationInSeconds)) {
      formMethods.setError("timeOffset", {message: t("email__future_email_error_before_email_available")})
    } else {
      const getCreationValues = (interventionEmailId: UUID): EmailOpeningInterventionCreation => ({
        emailId,
        scenarioId,
        interventionEmailId,
        timeOffsetInSeconds: timeOffsetInSeconds,
        title: creation.title
      })

      createEmail(emailCreationValues(timeOffsetInSeconds, scenarioId, creation.sender)).then(emailOption =>
        emailOption.forEach(email =>
          createEmailOpeningIntervention(getCreationValues(email.id)).then(() => {
            dispatch(
              navigateToRouteAction(Route.ScenarioEmails, {
                scenarioId,
                directory: EmailDirectory.Inbox,
                emailId: email.id
              })
            )
            onDismiss()
          })
        )
      )
    }
  }

  return (
    <CreateInterventionModal
      creationIsLoading={createEmailOpeningInterventionLoading || createEmailLoading}
      timeOffsetDescription={t(
        emailReceptionDelayInSeconds > 0
          ? "interventions__interventions_create_modal_time_hint_email_future_mail"
          : "interventions__interventions_create_modal_time_hint_email",
        {
          durationInMinutes: secondsToGivenTimeUnit(TimeUnit.Minute, scenarioMaxDurationInSeconds),
          emailReceptionInMinutes: secondsToGivenTimeUnit(TimeUnit.Minute, emailReceptionDelayInSeconds)
        }
      )}
      titleKey="interventions__interventions_create_modal_title_mail"
      formMethods={formMethods}
      onConfirm={handleCreateIntervention}
      onDismiss={onDismiss}
      triggerConditionConfig={{
        descriptionKey: "interventions__interventions_check_mail_description",
        titleKey: "interventions__interventions_check_mail",
        icon: IconName.Email
      }}
    />
  )
}
