import {useMutation} from "@apollo/client"
import {Intervention} from "../../../../models"
import {Option} from "../../../../utils"
import {updateIdEntityInCache} from "../../../cache"
import {RuntimeSurveyAnswerSelectionInterventionUpdate} from "../../../generated/globalTypes"
import {InterventionsQuery, InterventionsQueryVariables} from "../../../generated/InterventionsQuery"
import {
  UpdateRuntimeSurveyAnswerSelectionInterventionMutation,
  UpdateRuntimeSurveyAnswerSelectionInterventionMutationVariables
} from "../../../generated/UpdateRuntimeSurveyAnswerSelectionInterventionMutation"
import {updateRuntimeSurveyAnswerSelectionInterventionMutation} from "../../../mutations/interventions"
import {interventionsQuery} from "../../../queries/interventions"

export interface UpdateRuntimeSurveyAnswerSelectionInterventionProps {
  readonly updateRuntimeSurveyAnswerSelectionIntervention: (
    id: UUID,
    update: RuntimeSurveyAnswerSelectionInterventionUpdate
  ) => Promise<Option<Intervention>>
  readonly updateRuntimeSurveyAnswerSelectionInterventionLoading: boolean
}

export const useUpdateRuntimeSurveyAnswerSelectionIntervention = (
  scenarioId: UUID
): UpdateRuntimeSurveyAnswerSelectionInterventionProps => {
  const [updateRuntimeSurveyAnswerSelectionIntervention, {loading}] = useMutation<
    UpdateRuntimeSurveyAnswerSelectionInterventionMutation,
    UpdateRuntimeSurveyAnswerSelectionInterventionMutationVariables
  >(updateRuntimeSurveyAnswerSelectionInterventionMutation)

  return {
    updateRuntimeSurveyAnswerSelectionIntervention: (
      id: UUID,
      update: RuntimeSurveyAnswerSelectionInterventionUpdate
    ) =>
      new Promise<Option<Intervention>>((resolve, reject) => {
        updateRuntimeSurveyAnswerSelectionIntervention({
          variables: {id, update},
          update: updateIdEntityInCache<
            InterventionsQuery,
            UpdateRuntimeSurveyAnswerSelectionInterventionMutation,
            Intervention,
            InterventionsQueryVariables
          >(interventionsQuery, "interventions", id, "updateRuntimeSurveyAnswerSelectionIntervention", {
            scenarioId
          })
        })
          .then(result =>
            resolve(Option.of<Intervention>(result?.data?.updateRuntimeSurveyAnswerSelectionIntervention))
          )
          .catch(reject)
      }),
    updateRuntimeSurveyAnswerSelectionInterventionLoading: loading
  }
}
