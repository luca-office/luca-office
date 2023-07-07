import {useMutation} from "@apollo/client"
import {ErpType} from "../../../../enums"
import {ErpOrderItem} from "../../../../models"
import {addErpType, Option, removeTypename} from "../../../../utils"
import {ErpOrderItemUpdate} from "../../../generated/globalTypes"
import {
  UpdateErpOrderItemMutation,
  UpdateErpOrderItemMutationVariables
} from "../../../generated/UpdateErpOrderItemMutation"
import {updateErpOrderItemMutation} from "../../../mutations"

export interface UpdateErpOrderItemProps {
  readonly updateErpOrderItem: (
    id: number,
    sampleCompanyId: UUID,
    update: ErpOrderItemUpdate
  ) => Promise<Option<ErpOrderItem>>
  readonly isUpdateErpOrderItemLoading: boolean
}

export const useUpdateErpOrderItem = (): UpdateErpOrderItemProps => {
  const [updateErpOrderItem, {loading}] = useMutation<UpdateErpOrderItemMutation, UpdateErpOrderItemMutationVariables>(
    updateErpOrderItemMutation
  )

  return {
    updateErpOrderItem: (id: number, sampleCompanyId: UUID, update: ErpOrderItemUpdate) =>
      new Promise<Option<ErpOrderItem>>((resolve, reject) => {
        updateErpOrderItem({variables: {id, sampleCompanyId, update}})
          .then(result =>
            resolve(
              result.data?.updateErpOrderItem
                ? Option.of(addErpType(ErpType.OrderItem)(removeTypename(result.data.updateErpOrderItem)))
                : Option.none()
            )
          )
          .catch(reject)
      }),
    isUpdateErpOrderItemLoading: loading
  }
}
