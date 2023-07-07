import {useMutation} from "@apollo/client"
import {CodingDimension} from "../../../../models"
import {Option} from "../../../../utils"
import {
  RepositionCodingDimensionMutation,
  RepositionCodingDimensionMutationVariables
} from "../../../generated/RepositionCodingDimensionMutation"
import {repositionCodingDimensionMutation} from "../../../mutations"

export interface RepositionCodingDimension {
  readonly repositionCodingDimension: (id: UUID, predecessorId: UUID | undefined) => Promise<Option<CodingDimension>>
  readonly repositionCodingDimensionLoading: boolean
}

export const useRepositionCodingDimension = (): RepositionCodingDimension => {
  const [repositionCodingDimension, {loading}] = useMutation<
    RepositionCodingDimensionMutation,
    RepositionCodingDimensionMutationVariables
  >(repositionCodingDimensionMutation)

  return {
    repositionCodingDimension: (id: UUID, predecessorId: UUID | undefined) =>
      new Promise<Option<CodingDimension>>((resolve, reject) => {
        repositionCodingDimension({
          variables: {id, predecessorId}
        })
          .then(result => resolve(Option.of<CodingDimension>(result?.data?.repositionCodingDimension)))
          .catch(reject)
      }),
    repositionCodingDimensionLoading: loading
  }
}
