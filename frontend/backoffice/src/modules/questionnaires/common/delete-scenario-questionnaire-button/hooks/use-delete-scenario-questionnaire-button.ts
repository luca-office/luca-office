import {useDispatch} from "react-redux"
import {DeleteScenarioQuestionnaireProps, useDeleteScenarioQuestionnaire} from "shared/graphql/hooks"
import {useErrorHandler} from "shared/utils"
import {navigateToRouteAction} from "../../../../../redux/actions/navigation-action"
import {Route} from "../../../../../routes"

export interface UseDeleteScenarioQuestionnaireButtonProps
  extends Pick<DeleteScenarioQuestionnaireProps, "deleteScenarioQuestionnaireLoading"> {
  readonly deleteScenarioQuestionnaire: () => void
}

export const useDeleteScenarioQuestionnaireButton = (
  questionnaireId: UUID,
  scenarioId: UUID
): UseDeleteScenarioQuestionnaireButtonProps => {
  const dispatch = useDispatch()

  const handleError = useErrorHandler()

  const {deleteScenarioQuestionnaire, deleteScenarioQuestionnaireLoading} = useDeleteScenarioQuestionnaire(
    scenarioId,
    questionnaireId,
    err => handleError(err.graphQLErrors[0], "error_entity_in_use_scenario_questionnaire_intervention")
  )
  const handleDelete = () => {
    deleteScenarioQuestionnaire().then(() => {
      dispatch(navigateToRouteAction(Route.ScenarioQuestionnaireDetail, {scenarioId}))
    })
  }

  return {
    deleteScenarioQuestionnaire: handleDelete,
    deleteScenarioQuestionnaireLoading
  }
}
