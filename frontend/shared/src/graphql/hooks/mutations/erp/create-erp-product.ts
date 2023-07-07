import {useMutation} from "@apollo/client"
import {ErpType} from "../../../../enums"
import {ErpProduct} from "../../../../models"
import {addErpType, Option, removeTypename} from "../../../../utils"
import {CreateErpProductMutation, CreateErpProductMutationVariables} from "../../../generated/CreateErpProductMutation"
import {ErpProductCreation} from "../../../generated/globalTypes"
import {createErpProductMutation} from "../../../mutations"
import {erpProductsQuery} from "../../../queries"

export interface CreateErpProductProps {
  readonly createErpProduct: (creation: ErpProductCreation) => Promise<Option<ErpProduct>>
  readonly isCreateErpProductLoading: boolean
}

export const useCreateErpProduct = (): CreateErpProductProps => {
  const [createErpProduct, {loading}] = useMutation<CreateErpProductMutation, CreateErpProductMutationVariables>(
    createErpProductMutation
  )

  return {
    createErpProduct: (creation: ErpProductCreation) =>
      new Promise<Option<ErpProduct>>((resolve, reject) => {
        createErpProduct({
          variables: {creation},
          refetchQueries: [{query: erpProductsQuery, variables: {sampleCompanyId: creation.sampleCompanyId}}]
        })
          .then(result =>
            resolve(
              result.data?.createErpProduct
                ? Option.of(addErpType(ErpType.Product)(removeTypename(result.data.createErpProduct)))
                : Option.none()
            )
          )
          .catch(reject)
      }),
    isCreateErpProductLoading: loading
  }
}
