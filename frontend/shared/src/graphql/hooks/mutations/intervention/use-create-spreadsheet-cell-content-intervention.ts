import {useMutation} from "@apollo/client"
import {Intervention} from "../../../../models"
import {Option} from "../../../../utils"
import {
  CreateSpreadsheetCellContentInterventionMutation,
  CreateSpreadsheetCellContentInterventionMutationVariables
} from "../../../generated/CreateSpreadsheetCellContentInterventionMutation"
import {SpreadsheetCellContentInterventionCreation} from "../../../generated/globalTypes"
import {createSpreadsheetCellContentInterventionMutation} from "../../../mutations/interventions"
import {interventionsQuery} from "../../../queries/interventions"

export interface CreateSpreadsheetCellContentInterventionProps {
  readonly createSpreadsheetCellContentIntervention: (
    creation: SpreadsheetCellContentInterventionCreation
  ) => Promise<Option<Intervention>>
  readonly createSpreadsheetCellContentInterventionLoading: boolean
}

export const useCreateSpreadsheetCellContentIntervention = (
  scenarioId: UUID
): CreateSpreadsheetCellContentInterventionProps => {
  const [createSpreadsheetCellContentIntervention, {loading}] = useMutation<
    CreateSpreadsheetCellContentInterventionMutation,
    CreateSpreadsheetCellContentInterventionMutationVariables
  >(createSpreadsheetCellContentInterventionMutation)

  return {
    createSpreadsheetCellContentIntervention: (creation: SpreadsheetCellContentInterventionCreation) =>
      new Promise<Option<Intervention>>((resolve, reject) => {
        createSpreadsheetCellContentIntervention({
          variables: {creation},
          refetchQueries: [{query: interventionsQuery, variables: {scenarioId: scenarioId}}]
        })
          .then(result => resolve(Option.of<Intervention>(result?.data?.createSpreadsheetCellContentIntervention)))
          .catch(reject)
      }),
    createSpreadsheetCellContentInterventionLoading: loading
  }
}
