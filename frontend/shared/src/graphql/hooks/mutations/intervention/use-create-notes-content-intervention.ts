import {useMutation} from "@apollo/client"
import {Intervention} from "../../../../models"
import {Option} from "../../../../utils"
import {
  CreateNotesContentInterventionMutation,
  CreateNotesContentInterventionMutationVariables
} from "../../../generated/CreateNotesContentInterventionMutation"
import {NotesContentInterventionCreation} from "../../../generated/globalTypes"
import {createNotesContentInterventionMutation} from "../../../mutations/interventions"
import {interventionsQuery} from "../../../queries/interventions"

export interface CreateNotesContentInterventionProps {
  readonly createNotesContentIntervention: (creation: NotesContentInterventionCreation) => Promise<Option<Intervention>>
  readonly createNotesContentInterventionLoading: boolean
}

export const useCreateNotesContentIntervention = (scenarioId: UUID): CreateNotesContentInterventionProps => {
  const [createNotesContentIntervention, {loading}] = useMutation<
    CreateNotesContentInterventionMutation,
    CreateNotesContentInterventionMutationVariables
  >(createNotesContentInterventionMutation)

  return {
    createNotesContentIntervention: (creation: NotesContentInterventionCreation) =>
      new Promise<Option<Intervention>>((resolve, reject) => {
        createNotesContentIntervention({
          variables: {creation},
          refetchQueries: [{query: interventionsQuery, variables: {scenarioId: scenarioId}}]
        })
          .then(result => resolve(Option.of<Intervention>(result?.data?.createNotesContentIntervention)))
          .catch(reject)
      }),
    createNotesContentInterventionLoading: loading
  }
}
