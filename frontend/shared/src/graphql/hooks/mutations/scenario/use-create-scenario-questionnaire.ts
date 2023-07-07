import {useMutation} from "@apollo/client"
import {ScenarioQuestionnaire} from "../../../../models"
import {Option, removeTypename} from "../../../../utils"
import {
  CreateScenarioQuestionnaireMutation,
  CreateScenarioQuestionnaireMutationVariables
} from "../../../generated/CreateScenarioQuestionnaireMutation"
import {ScenarioQuestionnaireCreation} from "../../../generated/globalTypes"
import {createScenarioQuestionnaireMutation} from "../../../mutations"
import {scenarioQuery, scenarioQuestionnairesQuery} from "../../../queries"

export interface CreateScenarioQuestionnaireProps {
  readonly createScenarioQuestionnaire: (
    creation: ScenarioQuestionnaireCreation
  ) => Promise<Option<ScenarioQuestionnaire>>
  readonly createScenarioQuestionnaireLoading: boolean
}

export const useCreateScenarioQuestionnaire = (): CreateScenarioQuestionnaireProps => {
  const [createScenarioQuestionnaire, {loading}] = useMutation<
    CreateScenarioQuestionnaireMutation,
    CreateScenarioQuestionnaireMutationVariables
  >(createScenarioQuestionnaireMutation)

  return {
    createScenarioQuestionnaire: (creation: ScenarioQuestionnaireCreation) =>
      new Promise<Option<ScenarioQuestionnaire>>((resolve, reject) => {
        createScenarioQuestionnaire({
          variables: {creation},
          refetchQueries: [
            {query: scenarioQuestionnairesQuery, variables: {scenarioId: creation.scenarioId}},
            {query: scenarioQuery, variables: {id: creation.scenarioId}}
          ]
        })
          .then(result =>
            resolve(
              Option.of(result.data?.createScenarioQuestionnaire).map(
                element => removeTypename(element) as ScenarioQuestionnaire
              )
            )
          )
          .catch(reject)
      }),
    createScenarioQuestionnaireLoading: loading
  }
}
