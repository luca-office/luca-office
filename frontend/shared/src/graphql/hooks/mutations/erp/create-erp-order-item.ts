import {useMutation} from "@apollo/client"
import {ErpType} from "../../../../enums"
import {ErpOrderItem} from "../../../../models"
import {addErpType, Option, removeTypename} from "../../../../utils"
import {
  CreateErpOrderItemMutation,
  CreateErpOrderItemMutationVariables
} from "../../../generated/CreateErpOrderItemMutation"
import {ErpOrderItemCreation} from "../../../generated/globalTypes"
import {createErpOrderItemMutation} from "../../../mutations"
import {erpOrderItemsQuery} from "../../../queries"

export interface CreateErpOrderItemProps {
  readonly createErpOrderItem: (creation: ErpOrderItemCreation) => Promise<Option<ErpOrderItem>>
  readonly isCreateErpOrderItemLoading: boolean
}

export const useCreateErpOrderItem = (): CreateErpOrderItemProps => {
  const [createErpOrderItem, {loading}] = useMutation<CreateErpOrderItemMutation, CreateErpOrderItemMutationVariables>(
    createErpOrderItemMutation
  )

  return {
    createErpOrderItem: (creation: ErpOrderItemCreation) =>
      new Promise<Option<ErpOrderItem>>((resolve, reject) => {
        createErpOrderItem({
          variables: {creation},
          refetchQueries: [{query: erpOrderItemsQuery, variables: {sampleCompanyId: creation.sampleCompanyId}}]
        })
          .then(result =>
            resolve(
              result.data?.createErpOrderItem
                ? Option.of(addErpType(ErpType.OrderItem)(removeTypename(result.data.createErpOrderItem)))
                : Option.none()
            )
          )
          .catch(reject)
      }),
    isCreateErpOrderItemLoading: loading
  }
}
