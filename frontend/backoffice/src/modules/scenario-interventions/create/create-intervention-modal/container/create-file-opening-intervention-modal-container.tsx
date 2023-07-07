import * as React from "react"
import {useForm} from "react-hook-form"
import {useDispatch} from "react-redux"
import {IconName, TimeUnit} from "shared/enums"
import {EmailDirectory, FileOpeningInterventionCreation} from "shared/graphql/generated/globalTypes"
import {useCreateEmail, useCreateFileOpeningIntervention, useEmails} from "shared/graphql/hooks"
import {emailsQuery} from "shared/graphql/queries"
import {File} from "shared/models"
import {useLucaTranslation} from "shared/translations"
import {secondsToGivenTimeUnit} from "shared/utils"
import {navigateToRouteAction} from "../../../../../redux/actions/navigation-action"
import {Route} from "../../../../../routes"
import {getReceptionDelayInSeconds} from "../../../../scenario-emails/emails/email/email-delay-modal/email-delay-modal-utils"
import {CreateInterventionModal, InterventionCreationBaseFormType} from "../create-intervention-modal"
import {emailCreationValues} from "../util/email-creation"

interface Props {
  readonly onDismiss: () => void
  readonly scenarioId: UUID
  readonly file: File
  readonly scenarioMaxDurationInSeconds: number
}

export const CreateFileOpeningInterventionModalContainer = ({
  scenarioMaxDurationInSeconds,
  onDismiss,
  scenarioId,
  file
}: Props) => {
  const formMethods = useForm<InterventionCreationBaseFormType>()
  const isInterventionOnEmailFile = file.emailId !== null
  const {t} = useLucaTranslation()

  const {createFileOpeningIntervention, createFileOpeningInterventionLoading} = useCreateFileOpeningIntervention(
    scenarioId
  )
  const {createEmail, createEmailLoading} = useCreateEmail([{query: emailsQuery, variables: {scenarioId}}])

  const {emails} = useEmails(scenarioId, !isInterventionOnEmailFile)

  const offsetOfInterventionOnEmailFileInSeconds = emails.getOrElse([]).find(email => email.id === file.emailId)
    ?.receptionDelayInSeconds

  const dispatch = useDispatch()

  const handleCreateIntervention = (creation: InterventionCreationBaseFormType) => {
    const timeOffsetInSeconds = getReceptionDelayInSeconds(creation.timeUnit, creation.timeOffset)

    const isBeforeAttachementIsAvailable =
      offsetOfInterventionOnEmailFileInSeconds !== undefined &&
      timeOffsetInSeconds < offsetOfInterventionOnEmailFileInSeconds

    if (timeOffsetInSeconds > scenarioMaxDurationInSeconds || isBeforeAttachementIsAvailable) {
      formMethods.setError("timeOffset", {
        message: t(
          isBeforeAttachementIsAvailable
            ? "interventions__interventions_create_modal_time_hint_on_email_attachement_error"
            : "email__future_email_error"
        )
      })
    } else {
      const getCreationValues = (emailId: UUID): FileOpeningInterventionCreation => ({
        interventionEmailId: emailId,
        fileId: file.id,
        scenarioId,
        timeOffsetInSeconds: timeOffsetInSeconds,
        title: creation.title
      })

      createEmail(emailCreationValues(timeOffsetInSeconds, scenarioId, creation.sender)).then(emailOption =>
        emailOption.forEach(email =>
          createFileOpeningIntervention(getCreationValues(email.id)).then(() =>
            dispatch(
              navigateToRouteAction(Route.ScenarioEmails, {
                scenarioId,
                directory: EmailDirectory.Inbox,
                emailId: email.id
              })
            )
          )
        )
      )
    }
  }

  return (
    <CreateInterventionModal
      creationIsLoading={createFileOpeningInterventionLoading || createEmailLoading}
      timeOffsetDescription={t(
        isInterventionOnEmailFile
          ? "interventions__interventions_create_modal_time_hint_on_email_attachement"
          : "interventions__interventions_create_modal_time_hint",
        {
          durationInMinutes: secondsToGivenTimeUnit(TimeUnit.Minute, scenarioMaxDurationInSeconds),
          emailReceptionInSeconds: offsetOfInterventionOnEmailFileInSeconds
        }
      )}
      titleKey="interventions__interventions_create_modal_title_file"
      formMethods={formMethods}
      onConfirm={handleCreateIntervention}
      onDismiss={onDismiss}
      triggerConditionConfig={{
        descriptionKey: "interventions__interventions_check_file_description",
        titleKey: "interventions__interventions_check_file",
        icon: IconName.File
      }}
    />
  )
}
