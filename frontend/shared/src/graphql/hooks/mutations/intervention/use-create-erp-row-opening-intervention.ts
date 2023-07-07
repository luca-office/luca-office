import {useMutation} from "@apollo/client"
import {Intervention} from "../../../../models"
import {Option} from "../../../../utils"
import {
  CreateErpRowOpeningInterventionMutation,
  CreateErpRowOpeningInterventionMutationVariables
} from "../../../generated/CreateErpRowOpeningInterventionMutation"
import {ErpRowOpeningInterventionCreation} from "../../../generated/globalTypes"
import {createErpRowOpeningInterventionMutation} from "../../../mutations/interventions"
import {interventionsQuery} from "../../../queries/interventions"

export interface CreateErpRowOpeningInterventionProps {
  readonly createErpRowOpeningIntervention: (
    creation: ErpRowOpeningInterventionCreation
  ) => Promise<Option<Intervention>>
  readonly createErpRowOpeningInterventionLoading: boolean
}

export const useCreateErpRowOpeningIntervention = (scenarioId: UUID): CreateErpRowOpeningInterventionProps => {
  const [createErpRowOpeningIntervention, {loading}] = useMutation<
    CreateErpRowOpeningInterventionMutation,
    CreateErpRowOpeningInterventionMutationVariables
  >(createErpRowOpeningInterventionMutation)

  return {
    createErpRowOpeningIntervention: (creation: ErpRowOpeningInterventionCreation) =>
      new Promise<Option<Intervention>>((resolve, reject) => {
        createErpRowOpeningIntervention({
          variables: {creation},
          refetchQueries: [{query: interventionsQuery, variables: {scenarioId: scenarioId}}]
        })
          .then(result => resolve(Option.of<Intervention>(result?.data?.createErpRowOpeningIntervention)))
          .catch(reject)
      }),
    createErpRowOpeningInterventionLoading: loading
  }
}
