import * as React from "react"
import {useForm} from "react-hook-form"
import {useDispatch} from "react-redux"
import {AnswerBaseType} from "shared/components"
import {IconName, TimeUnit} from "shared/enums"
import {EmailDirectory, RuntimeSurveyAnswerSelectionInterventionCreation} from "shared/graphql/generated/globalTypes"
import {useCreateEmail, useCreateRuntimeSurveyAnswerSelectionIntervention} from "shared/graphql/hooks"
import {emailsQuery} from "shared/graphql/queries"
import {useLucaTranslation} from "shared/translations"
import {secondsToGivenTimeUnit} from "shared/utils"
import {navigateToRouteAction} from "../../../../../redux/actions/navigation-action"
import {Route} from "../../../../../routes"
import {
  RuntimeSurveyAnswerSelectionState,
  SurveyEventAnswerSelectionTriggerCondition
} from "../../../detail/trigger-condition/survey-event-answer-selection-trigger-condition"
import {CreateInterventionModal, InterventionCreationBaseFormType} from "../create-intervention-modal"
import {emailCreationValues} from "../util/email-creation"

interface Props {
  readonly onDismiss: () => void
  readonly scenarioId: UUID
  readonly scenarioMaxDurationInSeconds: number
  readonly questionTitle: string
  readonly selectedAnswer: AnswerBaseType
}

export const CreateRuntimeSurveyAnswerSelectionInterventionModalContainer = ({
  scenarioMaxDurationInSeconds,
  onDismiss,
  questionTitle,
  selectedAnswer,
  scenarioId
}: Props) => {
  const formMethods = useForm<InterventionCreationBaseFormType>()
  const {t} = useLucaTranslation()
  const [isNegated, setIsNegated] = React.useState(false)

  const {
    createRuntimeSurveyAnswerSelectionIntervention,
    createRuntimeSurveyAnswerSelectionInterventionLoading
  } = useCreateRuntimeSurveyAnswerSelectionIntervention(scenarioId)

  const {createEmail, createEmailLoading} = useCreateEmail([{query: emailsQuery, variables: {scenarioId}}])

  const dispatch = useDispatch()

  const handleCreateIntervention = (creation: InterventionCreationBaseFormType) => {
    const getCreationValues = (interventionEmailId: UUID): RuntimeSurveyAnswerSelectionInterventionCreation => ({
      answerId: selectedAnswer.id,
      scenarioId,
      isNegated,
      interventionEmailId,
      title: creation.title
    })

    createEmail(emailCreationValues(1, scenarioId, creation.sender)).then(emailOption =>
      emailOption.forEach(email =>
        createRuntimeSurveyAnswerSelectionIntervention(getCreationValues(email.id)).then(() => {
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

  const renderCondition = () => (
    <SurveyEventAnswerSelectionTriggerCondition
      questionTitle={questionTitle}
      onChange={value => setIsNegated(value === RuntimeSurveyAnswerSelectionState.WasNotSelected)}
      isNegated={isNegated}
      selectedAnswer={selectedAnswer}
    />
  )

  return (
    <CreateInterventionModal
      creationIsLoading={createRuntimeSurveyAnswerSelectionInterventionLoading || createEmailLoading}
      customDescriptionKey="interventions__interventions_create_modal_description_event"
      timeOffsetDescription={t("interventions__interventions_create_modal_time_hint_email", {
        durationInMinutes: secondsToGivenTimeUnit(TimeUnit.Minute, scenarioMaxDurationInSeconds)
      })}
      hideTimeOffset={true}
      titleKey="interventions__interventions_create_modal_title_survey_event"
      formMethods={formMethods}
      onConfirm={handleCreateIntervention}
      onDismiss={onDismiss}
      triggerConditionConfig={{
        descriptionKey: "interventions__interventions_check_runtime_survey_description",
        titleKey: "interventions__interventions_check_runtime_survey",
        icon: IconName.MultipleChoice,
        renderCondition
      }}
    />
  )
}
