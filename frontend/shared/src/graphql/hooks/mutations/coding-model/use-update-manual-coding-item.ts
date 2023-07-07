import {useMutation} from "@apollo/client"
import {CodingItem} from "../../../../models"
import {Option} from "../../../../utils"
import {ManualCodingItemUpdate} from "../../../generated/globalTypes"
import {
  UpdateManualCodingItemMutation,
  UpdateManualCodingItemMutationVariables
} from "../../../generated/UpdateManualCodingItemMutation"
import {updateManualCodingItemMutation} from "../../../mutations"

export interface UpdateManualCodingItemProps {
  readonly updateManualCodingItem: (id: UUID, update: ManualCodingItemUpdate) => Promise<Option<CodingItem>>
  readonly updateManualCodingItemLoading: boolean
}

export const useUpdateManualCodingItem = (): UpdateManualCodingItemProps => {
  const [updateManualCodingItem, {loading}] = useMutation<
    UpdateManualCodingItemMutation,
    UpdateManualCodingItemMutationVariables
  >(updateManualCodingItemMutation)

  return {
    updateManualCodingItem: (id: UUID, update: ManualCodingItemUpdate) =>
      new Promise<Option<CodingItem>>((resolve, reject) => {
        updateManualCodingItem({
          variables: {id, update}
        })
          .then(result => resolve(Option.of<CodingItem>(result?.data?.updateManualCodingItem)))
          .catch(reject)
      }),
    updateManualCodingItemLoading: loading
  }
}
