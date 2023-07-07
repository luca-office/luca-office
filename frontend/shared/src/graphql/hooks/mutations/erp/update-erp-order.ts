import {useMutation} from "@apollo/client"
import {ErpType} from "../../../../enums"
import {ErpOrder} from "../../../../models"
import {addErpType, Option, removeTypename} from "../../../../utils"
import {ErpOrderUpdate} from "../../../generated/globalTypes"
import {UpdateErpOrderMutation, UpdateErpOrderMutationVariables} from "../../../generated/UpdateErpOrderMutation"
import {updateErpOrderMutation} from "../../../mutations"

export interface UpdateErpOrderProps {
  readonly updateErpOrder: (id: number, sampleCompanyId: UUID, update: ErpOrderUpdate) => Promise<Option<ErpOrder>>
  readonly isUpdateErpOrderLoading: boolean
}

export const useUpdateErpOrder = (): UpdateErpOrderProps => {
  const [updateErpOrder, {loading}] = useMutation<UpdateErpOrderMutation, UpdateErpOrderMutationVariables>(
    updateErpOrderMutation
  )

  return {
    updateErpOrder: (id: number, sampleCompanyId: UUID, update: ErpOrderUpdate) =>
      new Promise<Option<ErpOrder>>((resolve, reject) => {
        updateErpOrder({variables: {id, sampleCompanyId, update}})
          .then(result =>
            resolve(
              result.data?.updateErpOrder
                ? Option.of(addErpType(ErpType.Order)(removeTypename(result.data.updateErpOrder)))
                : Option.none()
            )
          )
          .catch(reject)
      }),
    isUpdateErpOrderLoading: loading
  }
}
