import {useMutation} from "@apollo/client"
import {CodingItem} from "../../../../models"
import {Option} from "../../../../utils"
import {
  CreateManualCodingItemMutation,
  CreateManualCodingItemMutationVariables
} from "../../../generated/CreateManualCodingItemMutation"
import {ManualCodingItemCreation} from "../../../generated/globalTypes"
import {createManualCodingItemMutation} from "../../../mutations"
import {codingDimensionQuery} from "../../../queries"

export interface CreateManualCodingItemProps {
  readonly createManualCodingItem: (creation: ManualCodingItemCreation) => Promise<Option<CodingItem>>
  readonly createManualCodingItemLoading: boolean
}

export const useCreateManualCodingItem = (codingDimensionId: UUID): CreateManualCodingItemProps => {
  const [createManualCodingItem, {loading}] = useMutation<
    CreateManualCodingItemMutation,
    CreateManualCodingItemMutationVariables
  >(createManualCodingItemMutation)

  return {
    createManualCodingItem: (creation: ManualCodingItemCreation) =>
      new Promise<Option<CodingItem>>((resolve, reject) => {
        createManualCodingItem({
          variables: {creation},
          refetchQueries: [{query: codingDimensionQuery, variables: {id: codingDimensionId}}]
        })
          .then(result => resolve(Option.of<CodingItem>(result?.data?.createManualCodingItem)))
          .catch(reject)
      }),
    createManualCodingItemLoading: loading
  }
}
