import {useMutation} from "@apollo/client"
import {ErpType} from "../../../../enums"
import {ErpCustomer} from "../../../../models"
import {addErpType, Option, removeTypename} from "../../../../utils"
import {ErpCustomerUpdate} from "../../../generated/globalTypes"
import {
  UpdateErpCustomerMutation,
  UpdateErpCustomerMutationVariables
} from "../../../generated/UpdateErpCustomerMutation"
import {updateErpCustomerMutation} from "../../../mutations"

export interface UpdateErpCustomerProps {
  readonly updateErpCustomer: (
    id: number,
    sampleCompanyId: UUID,
    update: ErpCustomerUpdate
  ) => Promise<Option<ErpCustomer>>
  readonly isUpdateErpCustomerLoading: boolean
}

export const useUpdateErpCustomer = (): UpdateErpCustomerProps => {
  const [updateErpCustomer, {loading}] = useMutation<UpdateErpCustomerMutation, UpdateErpCustomerMutationVariables>(
    updateErpCustomerMutation
  )

  return {
    updateErpCustomer: (id: number, sampleCompanyId: UUID, update: ErpCustomerUpdate) =>
      new Promise<Option<ErpCustomer>>((resolve, reject) => {
        updateErpCustomer({variables: {id, sampleCompanyId, update}})
          .then(result =>
            resolve(
              result.data?.updateErpCustomer
                ? Option.of(addErpType(ErpType.Customer)(removeTypename(result.data.updateErpCustomer)))
                : Option.none()
            )
          )
          .catch(reject)
      }),
    isUpdateErpCustomerLoading: loading
  }
}
