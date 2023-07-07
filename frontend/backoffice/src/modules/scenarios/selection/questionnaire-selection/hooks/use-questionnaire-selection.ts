import React, {Dispatch, SetStateAction} from "react"
import {useDispatch} from "react-redux"
import {useCreateScenarioQuestionnaire, useQuestionnaires, useScenarioQuestionnaires} from "shared/graphql/hooks"
import {Questionnaire} from "shared/models"
import {first, Option} from "shared/utils"
import {navigateToRouteAction} from "../../../../../redux/actions/navigation-action"
import {Route} from "../../../../../routes"

export interface UseQuestionnaireSelectionHook {
  readonly loading: boolean
  readonly handleBackNavigation: () => void
  readonly eventQuestionnairePreviewForModal: Option<Questionnaire>
  readonly setEventQuestionnairePreviewForModal: Dispatch<SetStateAction<Option<Questionnaire>>>
  readonly questionnaires: Questionnaire[]
  readonly assignedQuestionnaires: Questionnaire[]
  readonly updateAssignment: (selectedEvents: Questionnaire[]) => void
}

export const useQuestionnaireSelection = (
  scenarioId: UUID,
  isRuntimeSurvey: boolean
): UseQuestionnaireSelectionHook => {
  const dispatch = useDispatch()

  const {questionnaires, questionnairesLoading} = useQuestionnaires(isRuntimeSurvey)
  const {scenarioQuestionnaires, scenarioQuestionnairesLoading} = useScenarioQuestionnaires(scenarioId)
  const {createScenarioQuestionnaire} = useCreateScenarioQuestionnaire()

  const [eventQuestionnairePreviewForModal, setEventQuestionnairePreviewForModal] = React.useState<
    Option<Questionnaire>
  >(Option.none())

  const handleBackNavigation = () => dispatch(navigateToRouteAction(Route.ScenarioQuestionnaireDetail, {scenarioId}))

  const createAssignment = (selectedQuestionnaires: Questionnaire[]) => {
    selectedQuestionnaires.map(questionnaire =>
      createScenarioQuestionnaire({
        scenarioId,
        activationDelayInSeconds: 0,
        questionnaireId: questionnaire.id
      })
    )

    first(selectedQuestionnaires).forEach(questionnaire =>
      dispatch(
        navigateToRouteAction(Route.ScenarioQuestionnaireDetail, {scenarioId, questionnaireId: questionnaire.id})
      )
    )
  }

  return {
    loading: questionnairesLoading || scenarioQuestionnairesLoading,
    eventQuestionnairePreviewForModal,
    setEventQuestionnairePreviewForModal,
    questionnaires: questionnaires.getOrElse([]).filter(questionnaire => !!questionnaire.publishedAt),
    handleBackNavigation,
    updateAssignment: createAssignment,
    assignedQuestionnaires: scenarioQuestionnaires.getOrElse([]).map(assigned => assigned.questionnaire)
  }
}
