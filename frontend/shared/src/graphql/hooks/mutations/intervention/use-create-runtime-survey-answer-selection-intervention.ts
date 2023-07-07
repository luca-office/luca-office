import {useMutation} from "@apollo/client"
import {Intervention} from "../../../../models"
import {Option} from "../../../../utils"
import {
  CreateRuntimeSurveyAnswerSelectionInterventionMutation,
  CreateRuntimeSurveyAnswerSelectionInterventionMutationVariables
} from "../../../generated/CreateRuntimeSurveyAnswerSelectionInterventionMutation"
import {RuntimeSurveyAnswerSelectionInterventionCreation} from "../../../generated/globalTypes"
import {createRuntimeSurveyAnswerSelectionInterventionMutation} from "../../../mutations/interventions"
import {interventionsQuery} from "../../../queries/interventions"

export interface CreateRuntimeSurveyAnswerSelectionInterventionProps {
  readonly createRuntimeSurveyAnswerSelectionIntervention: (
    creation: RuntimeSurveyAnswerSelectionInterventionCreation
  ) => Promise<Option<Intervention>>
  readonly createRuntimeSurveyAnswerSelectionInterventionLoading: boolean
}

export const useCreateRuntimeSurveyAnswerSelectionIntervention = (
  scenarioId: UUID
): CreateRuntimeSurveyAnswerSelectionInterventionProps => {
  const [createRuntimeSurveyAnswerSelectionIntervention, {loading}] = useMutation<
    CreateRuntimeSurveyAnswerSelectionInterventionMutation,
    CreateRuntimeSurveyAnswerSelectionInterventionMutationVariables
  >(createRuntimeSurveyAnswerSelectionInterventionMutation)

  return {
    createRuntimeSurveyAnswerSelectionIntervention: (creation: RuntimeSurveyAnswerSelectionInterventionCreation) =>
      new Promise<Option<Intervention>>((resolve, reject) => {
        createRuntimeSurveyAnswerSelectionIntervention({
          variables: {creation},
          refetchQueries: [{query: interventionsQuery, variables: {scenarioId: scenarioId}}]
        })
          .then(result =>
            resolve(Option.of<Intervention>(result?.data?.createRuntimeSurveyAnswerSelectionIntervention))
          )
          .catch(reject)
      }),
    createRuntimeSurveyAnswerSelectionInterventionLoading: loading
  }
}
