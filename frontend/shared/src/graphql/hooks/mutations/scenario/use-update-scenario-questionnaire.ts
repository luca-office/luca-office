import {useMutation} from "@apollo/client"
import {ScenarioQuestionnaire} from "../../../../models"
import {Option} from "../../../../utils"
import {ScenarioQuestionnaireUpdate} from "../../../generated/globalTypes"
import {
  UpdateScenarioQuestionnaireMutation,
  UpdateScenarioQuestionnaireMutationVariables
} from "../../../generated/UpdateScenarioQuestionnaireMutation"
import {updateScenarioQuestionnaireMutation} from "../../../mutations"
import {scenarioQuestionnairesQuery} from "../../../queries"

export interface UseUpdateScenarioQuestionnaireHook {
  readonly updateScenarioQuestionnaire: (
    scenarioId: UUID,
    questionnaireId: UUID,
    update: ScenarioQuestionnaireUpdate
  ) => Promise<Option<ScenarioQuestionnaire>>
  readonly isUpdateScenarioQuestionnaireLoading: boolean
}

export const useUpdateScenarioQuestionnaire = (): UseUpdateScenarioQuestionnaireHook => {
  const [updateScenarioQuestionnaire, {loading}] = useMutation<
    UpdateScenarioQuestionnaireMutation,
    UpdateScenarioQuestionnaireMutationVariables
  >(updateScenarioQuestionnaireMutation)

  return {
    updateScenarioQuestionnaire: (scenarioId: UUID, questionnaireId: UUID, update: ScenarioQuestionnaireUpdate) =>
      new Promise<Option<ScenarioQuestionnaire>>((resolve, reject) => {
        updateScenarioQuestionnaire({
          variables: {scenarioId, questionnaireId, update},
          refetchQueries: [{query: scenarioQuestionnairesQuery, variables: {scenarioId}}]
        })
          .then(result => resolve(Option.of<ScenarioQuestionnaire>(result.data?.updateScenarioQuestionnaire)))
          .catch(reject)
      }),
    isUpdateScenarioQuestionnaireLoading: loading
  }
}
