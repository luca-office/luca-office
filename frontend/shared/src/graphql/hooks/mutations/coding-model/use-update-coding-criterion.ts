import {PureQueryOptions, useMutation} from "@apollo/client"
import {CodingCriterion} from "../../../../models"
import {Option} from "../../../../utils"
import {CodingCriterionUpdate} from "../../../generated/globalTypes"
import {
  UpdateCodingCriterionMutation,
  UpdateCodingCriterionMutationVariables
} from "../../../generated/UpdateCodingCriterionMutation"
import {updateCodingCriterionMutation} from "../../../mutations"

export interface UseUpdateCodingCriterionHook {
  readonly updateCodingCriterion: (id: UUID, update: CodingCriterionUpdate) => Promise<Option<CodingCriterion>>
  readonly updateCodingCriterionLoading: boolean
}

export const useUpdateCodingCriterion = (refetchQueries?: PureQueryOptions[]): UseUpdateCodingCriterionHook => {
  const [updateCodingCriterion, {loading}] = useMutation<
    UpdateCodingCriterionMutation,
    UpdateCodingCriterionMutationVariables
  >(updateCodingCriterionMutation, {refetchQueries})

  return {
    updateCodingCriterion: (id: UUID, update: CodingCriterionUpdate) =>
      new Promise<Option<CodingCriterion>>((resolve, reject) => {
        updateCodingCriterion({
          variables: {id, update}
        })
          .then(result => resolve(Option.of(result?.data?.updateCodingCriterion)))
          .catch(reject)
      }),
    updateCodingCriterionLoading: loading
  }
}
