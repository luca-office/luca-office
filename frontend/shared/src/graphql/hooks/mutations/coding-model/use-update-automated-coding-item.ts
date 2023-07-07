import {useMutation} from "@apollo/client"
import {CodingItem} from "../../../../models"
import {Option} from "../../../../utils"
import {AutomatedCodingItemUpdate} from "../../../generated/globalTypes"
import {
  UpdateAutomatedCodingItemMutation,
  UpdateAutomatedCodingItemMutationVariables
} from "../../../generated/UpdateAutomatedCodingItemMutation"
import {updateAutomatedCodingItemMutation} from "../../../mutations"

export interface UseUpdateAutomatedCodingItemHook {
  readonly updateAutomatedCodingItem: (id: UUID, update: AutomatedCodingItemUpdate) => Promise<Option<CodingItem>>
  readonly updateAutomatedCodingItemLoading: boolean
}

export const useUpdateAutomatedCodingItem = (): UseUpdateAutomatedCodingItemHook => {
  const [updateAutomatedCodingItem, {loading}] = useMutation<
    UpdateAutomatedCodingItemMutation,
    UpdateAutomatedCodingItemMutationVariables
  >(updateAutomatedCodingItemMutation)

  return {
    updateAutomatedCodingItem: (id: UUID, update: AutomatedCodingItemUpdate) =>
      new Promise<Option<CodingItem>>((resolve, reject) => {
        updateAutomatedCodingItem({
          variables: {id, update}
        })
          .then(result => resolve(Option.of<CodingItem>(result?.data?.updateAutomatedCodingItem)))
          .catch(reject)
      }),
    updateAutomatedCodingItemLoading: loading
  }
}
