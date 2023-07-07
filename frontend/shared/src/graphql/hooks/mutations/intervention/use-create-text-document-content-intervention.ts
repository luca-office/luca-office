import {useMutation} from "@apollo/client"
import {Intervention} from "../../../../models"
import {Option} from "../../../../utils"
import {
  CreateTextDocumentContentInterventionMutation,
  CreateTextDocumentContentInterventionMutationVariables
} from "../../../generated/CreateTextDocumentContentInterventionMutation"
import {TextDocumentContentInterventionCreation} from "../../../generated/globalTypes"
import {createTextDocumentContentInterventionMutation} from "../../../mutations/interventions"
import {interventionsQuery} from "../../../queries/interventions"

export interface CreateTextDocumentContentInterventionProps {
  readonly createTextDocumentContentIntervention: (
    creation: TextDocumentContentInterventionCreation
  ) => Promise<Option<Intervention>>
  readonly createTextDocumentContentInterventionLoading: boolean
}

export const useCreateTextDocumentContentIntervention = (
  scenarioId: UUID
): CreateTextDocumentContentInterventionProps => {
  const [createTextDocumentContentIntervention, {loading}] = useMutation<
    CreateTextDocumentContentInterventionMutation,
    CreateTextDocumentContentInterventionMutationVariables
  >(createTextDocumentContentInterventionMutation)

  return {
    createTextDocumentContentIntervention: (creation: TextDocumentContentInterventionCreation) =>
      new Promise<Option<Intervention>>((resolve, reject) => {
        createTextDocumentContentIntervention({
          variables: {creation},
          refetchQueries: [{query: interventionsQuery, variables: {scenarioId: scenarioId}}]
        })
          .then(result => resolve(Option.of<Intervention>(result?.data?.createTextDocumentContentIntervention)))
          .catch(reject)
      }),
    createTextDocumentContentInterventionLoading: loading
  }
}
