import {useMutation} from "@apollo/client"
import {Intervention} from "../../../../models"
import {Option} from "../../../../utils"
import {
  CreateFileOpeningInterventionMutation,
  CreateFileOpeningInterventionMutationVariables
} from "../../../generated/CreateFileOpeningInterventionMutation"
import {FileOpeningInterventionCreation} from "../../../generated/globalTypes"
import {createFileOpeningInterventionMutation} from "../../../mutations/interventions"
import {interventionsQuery} from "../../../queries/interventions"

export interface CreateFileOpeningInterventionProps {
  readonly createFileOpeningIntervention: (creation: FileOpeningInterventionCreation) => Promise<Option<Intervention>>
  readonly createFileOpeningInterventionLoading: boolean
}

export const useCreateFileOpeningIntervention = (scenarioId: UUID): CreateFileOpeningInterventionProps => {
  const [createFileOpeningIntervention, {loading}] = useMutation<
    CreateFileOpeningInterventionMutation,
    CreateFileOpeningInterventionMutationVariables
  >(createFileOpeningInterventionMutation)

  return {
    createFileOpeningIntervention: (creation: FileOpeningInterventionCreation) =>
      new Promise<Option<Intervention>>((resolve, reject) => {
        createFileOpeningIntervention({
          variables: {creation},
          refetchQueries: [{query: interventionsQuery, variables: {scenarioId: scenarioId}}]
        })
          .then(result => resolve(Option.of<Intervention>(result?.data?.createFileOpeningIntervention)))
          .catch(reject)
      }),
    createFileOpeningInterventionLoading: loading
  }
}
