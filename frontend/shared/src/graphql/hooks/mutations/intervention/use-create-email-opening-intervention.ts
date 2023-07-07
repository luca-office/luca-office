import {useMutation} from "@apollo/client"
import {Intervention} from "../../../../models"
import {Option} from "../../../../utils"
import {
  CreateEmailOpeningInterventionMutation,
  CreateEmailOpeningInterventionMutationVariables
} from "../../../generated/CreateEmailOpeningInterventionMutation"
import {EmailOpeningInterventionCreation} from "../../../generated/globalTypes"
import {createEmailOpeningInterventionMutation} from "../../../mutations/interventions"
import {interventionsQuery} from "../../../queries/interventions"

export interface CreateEmailOpeningInterventionProps {
  readonly createEmailOpeningIntervention: (creation: EmailOpeningInterventionCreation) => Promise<Option<Intervention>>
  readonly createEmailOpeningInterventionLoading: boolean
}

export const useCreateEmailOpeningIntervention = (scenarioId: UUID): CreateEmailOpeningInterventionProps => {
  const [createEmailOpeningIntervention, {loading}] = useMutation<
    CreateEmailOpeningInterventionMutation,
    CreateEmailOpeningInterventionMutationVariables
  >(createEmailOpeningInterventionMutation)

  return {
    createEmailOpeningIntervention: (creation: EmailOpeningInterventionCreation) =>
      new Promise<Option<Intervention>>((resolve, reject) => {
        createEmailOpeningIntervention({
          variables: {creation},
          refetchQueries: [{query: interventionsQuery, variables: {scenarioId: scenarioId}}]
        })
          .then(result => resolve(Option.of<Intervention>(result?.data?.createEmailOpeningIntervention)))
          .catch(reject)
      }),
    createEmailOpeningInterventionLoading: loading
  }
}
