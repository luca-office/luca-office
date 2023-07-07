import {useMutation} from "@apollo/client"
import {CodingItem} from "../../../../models"
import {Option} from "../../../../utils"
import {
  CreateAutomatedCodingItemMutation,
  CreateAutomatedCodingItemMutationVariables
} from "../../../generated/CreateAutomatedCodingItemMutation"
import {AutomatedCodingItemCreation} from "../../../generated/globalTypes"
import {createAutomatedCodingItemMutation} from "../../../mutations"
import {codingDimensionQuery} from "../../../queries"

export interface CreateAutomatedCodingItemProps {
  readonly createAutomatedCodingItem: (creation: AutomatedCodingItemCreation) => Promise<Option<CodingItem>>
  readonly createAutomatedCodingItemLoading: boolean
}

export const useCreateAutomatedCodingItem = (codingDimensionId: UUID): CreateAutomatedCodingItemProps => {
  const [createAutomatedCodingItem, {loading}] = useMutation<
    CreateAutomatedCodingItemMutation,
    CreateAutomatedCodingItemMutationVariables
  >(createAutomatedCodingItemMutation)

  return {
    createAutomatedCodingItem: (creation: AutomatedCodingItemCreation) =>
      new Promise<Option<CodingItem>>((resolve, reject) => {
        createAutomatedCodingItem({
          variables: {creation},
          refetchQueries: [{query: codingDimensionQuery, variables: {id: codingDimensionId}}]
        })
          .then(result => resolve(Option.of<CodingItem>(result?.data?.createAutomatedCodingItem)))
          .catch(reject)
      }),
    createAutomatedCodingItemLoading: loading
  }
}
