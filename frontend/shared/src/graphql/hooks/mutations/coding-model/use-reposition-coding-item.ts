import {useMutation} from "@apollo/client"
import {CodingItem} from "../../../../models"
import {Option} from "../../../../utils"
import {
  RepositionCodingItemMutation,
  RepositionCodingItemMutationVariables
} from "../../../generated/RepositionCodingItemMutation"
import {repositionCodingItemMutation} from "../../../mutations"

export interface RepositionCodingItem {
  readonly repositionCodingItem: (id: UUID, predecessorId: UUID | undefined) => Promise<Option<CodingItem>>
  readonly repositionCodingItemLoading: boolean
}

export const useRepositionCodingItem = (): RepositionCodingItem => {
  const [repositionCodingItem, {loading}] = useMutation<
    RepositionCodingItemMutation,
    RepositionCodingItemMutationVariables
  >(repositionCodingItemMutation)

  return {
    repositionCodingItem: (id: UUID, predecessorId: UUID | undefined) =>
      new Promise<Option<CodingItem>>((resolve, reject) => {
        repositionCodingItem({
          variables: {id, predecessorId}
        })
          .then(result => resolve(Option.of<CodingItem>(result?.data?.repositionCodingItem)))
          .catch(reject)
      }),
    repositionCodingItemLoading: loading
  }
}
