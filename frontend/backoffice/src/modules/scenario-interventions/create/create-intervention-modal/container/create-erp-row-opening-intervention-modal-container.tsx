import * as React from "react"
import {useForm} from "react-hook-form"
import {useDispatch} from "react-redux"
import {ErpType, IconName, TimeUnit} from "shared/enums"
import {EmailDirectory, ErpRowOpeningInterventionCreation, ErpTableType} from "shared/graphql/generated/globalTypes"
import {useCreateEmail, useCreateErpRowOpeningIntervention} from "shared/graphql/hooks"
import {emailsQuery} from "shared/graphql/queries"
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
  readonly erpRowId: number
  readonly erpTableType: ErpType
  readonly sampleCompanyId: UUID
  readonly scenarioMaxDurationInSeconds: number
}

export const CreateErpRowOpeningInterventionModalContainer = ({
  scenarioMaxDurationInSeconds,
  onDismiss,
  scenarioId,
  erpRowId,
  erpTableType,
  sampleCompanyId
}: Props) => {
  const formMethods = useForm<InterventionCreationBaseFormType>()
  const {t} = useLucaTranslation()

  const {createErpRowOpeningIntervention, createErpRowOpeningInterventionLoading} = useCreateErpRowOpeningIntervention(
    scenarioId
  )
  const {createEmail, createEmailLoading} = useCreateEmail([{query: emailsQuery, variables: {scenarioId}}])

  const dispatch = useDispatch()

  const handleCreateIntervention = (creation: InterventionCreationBaseFormType) => {
    const timeOffsetInSeconds = getReceptionDelayInSeconds(creation.timeUnit, creation.timeOffset)
    if (timeOffsetInSeconds > scenarioMaxDurationInSeconds) {
      formMethods.setError("timeOffset", {message: t("email__future_email_error")})
    } else {
      const getCreationValues = (emailId: UUID): ErpRowOpeningInterventionCreation => ({
        interventionEmailId: emailId,
        erpRowId,
        erpTableType: (erpTableType as unknown) as ErpTableType,
        sampleCompanyId,
        scenarioId,
        timeOffsetInSeconds: timeOffsetInSeconds,
        title: creation.title
      })

      createEmail(emailCreationValues(timeOffsetInSeconds, scenarioId, creation.sender)).then(emailOption =>
        emailOption.forEach(email =>
          createErpRowOpeningIntervention(getCreationValues(email.id)).then(() =>
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
      creationIsLoading={createErpRowOpeningInterventionLoading || createEmailLoading}
      timeOffsetDescription={t("interventions__interventions_create_modal_time_hint", {
        durationInMinutes: secondsToGivenTimeUnit(TimeUnit.Minute, scenarioMaxDurationInSeconds)
      })}
      titleKey="interventions__interventions_create_modal_title_erp"
      formMethods={formMethods}
      onConfirm={handleCreateIntervention}
      onDismiss={onDismiss}
      triggerConditionConfig={{
        descriptionKey: "interventions__interventions_check_erp_row_description",
        titleKey: "interventions__interventions_check_erp",
        icon: IconName.Database
      }}
    />
  )
}
