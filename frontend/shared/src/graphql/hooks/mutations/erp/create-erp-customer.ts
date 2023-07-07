import {useMutation} from "@apollo/client"
import {ErpType} from "../../../../enums"
import {ErpCustomer} from "../../../../models"
import {addErpType, Option, removeTypename} from "../../../../utils"
import {
  CreateErpCustomerMutation,
  CreateErpCustomerMutationVariables
} from "../../../generated/CreateErpCustomerMutation"
import {ErpCustomerCreation} from "../../../generated/globalTypes"
import {createErpCustomerMutation} from "../../../mutations"
import {erpCustomersQuery} from "../../../queries"

export interface CreateErpCustomerProps {
  readonly createErpCustomer: (creation: ErpCustomerCreation) => Promise<Option<ErpCustomer>>
  readonly isCreateErpCustomerLoading: boolean
}

export const useCreateErpCustomer = (): CreateErpCustomerProps => {
  const [createErpCustomer, {loading}] = useMutation<CreateErpCustomerMutation, CreateErpCustomerMutationVariables>(
    createErpCustomerMutation
  )

  return {
    createErpCustomer: (creation: ErpCustomerCreation) =>
      new Promise<Option<ErpCustomer>>((resolve, reject) => {
        createErpCustomer({
          variables: {creation},
          refetchQueries: [{query: erpCustomersQuery, variables: {sampleCompanyId: creation.sampleCompanyId}}]
        })
          .then(result =>
            resolve(
              result.data?.createErpCustomer
                ? Option.of(addErpType(ErpType.Customer)(removeTypename(result.data.createErpCustomer)))
                : Option.none()
            )
          )
          .catch(reject)
      }),
    isCreateErpCustomerLoading: loading
  }
}
