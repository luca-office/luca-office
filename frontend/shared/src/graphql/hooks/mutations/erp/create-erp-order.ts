import {useMutation} from "@apollo/client"
import {ErpType} from "../../../../enums"
import {ErpOrder} from "../../../../models"
import {addErpType, Option, removeTypename} from "../../../../utils"
import {CreateErpOrderMutation, CreateErpOrderMutationVariables} from "../../../generated/CreateErpOrderMutation"
import {ErpOrderCreation} from "../../../generated/globalTypes"
import {createErpOrderMutation} from "../../../mutations"
import {erpOrdersQuery} from "../../../queries"

export interface CreateErpOrderProps {
  readonly createErpOrder: (creation: ErpOrderCreation) => Promise<Option<ErpOrder>>
  readonly isCreateErpOrderLoading: boolean
}

export const useCreateErpOrder = (): CreateErpOrderProps => {
  const [createErpOrder, {loading}] = useMutation<CreateErpOrderMutation, CreateErpOrderMutationVariables>(
    createErpOrderMutation
  )

  return {
    createErpOrder: (creation: ErpOrderCreation) =>
      new Promise<Option<ErpOrder>>((resolve, reject) => {
        createErpOrder({
          variables: {creation},
          refetchQueries: [{query: erpOrdersQuery, variables: {sampleCompanyId: creation.sampleCompanyId}}]
        })
          .then(result =>
            resolve(
              result.data?.createErpOrder
                ? Option.of(addErpType(ErpType.Order)(removeTypename(result.data.createErpOrder)))
                : Option.none()
            )
          )
          .catch(reject)
      }),
    isCreateErpOrderLoading: loading
  }
}
