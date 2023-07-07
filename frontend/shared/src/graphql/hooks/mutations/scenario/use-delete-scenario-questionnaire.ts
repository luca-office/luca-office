import {ApolloError, useMutation} from "@apollo/client"
import {ScenarioQuestionnaire} from "../../../../models"
import {Option, removeTypename} from "../../../../utils"
import {
  DeleteScenarioQuestionnaireMutation,
  DeleteScenarioQuestionnaireMutationVariables
} from "../../../generated/DeleteScenarioQuestionnaireMutation"
import {deleteScenarioQuestionnaireMutation} from "../../../mutations"
import {scenarioQuestionnairesQuery} from "../../../queries"

export interface DeleteScenarioQuestionnaireProps {
  readonly deleteScenarioQuestionnaire: () => Promise<Option<ScenarioQuestionnaire>>
  readonly deleteScenarioQuestionnaireLoading: boolean
}

export const useDeleteScenarioQuestionnaire = (
  scenarioId: UUID,
  questionnaireId: UUID,
  onError?: (error: ApolloError) => void
): DeleteScenarioQuestionnaireProps => {
  const [deleteScenarioQuestionnaire, {loading}] = useMutation<
    DeleteScenarioQuestionnaireMutation,
    DeleteScenarioQuestionnaireMutationVariables
  >(deleteScenarioQuestionnaireMutation, {onError})

  return {
    deleteScenarioQuestionnaire: () =>
      new Promise<Option<ScenarioQuestionnaire>>((resolve, reject) => {
        deleteScenarioQuestionnaire({
          variables: {scenarioId, questionnaireId},
          refetchQueries: [{query: scenarioQuestionnairesQuery, variables: {scenarioId}}]
        })
          .then(result =>
            resolve(
              Option.of(result.data?.deleteScenarioQuestionnaire).map(
                element => removeTypename(element) as ScenarioQuestionnaire
              )
            )
          )
          .catch(reject)
      }),
    deleteScenarioQuestionnaireLoading: loading
  }
}
