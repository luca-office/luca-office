import {useMutation} from "@apollo/client"
import {ErpType} from "../../../../enums"
import {ErpComponentErpProduct} from "../../../../models"
import {addErpType, Option, removeTypename} from "../../../../utils"
import {
  CreateErpComponentErpProductMutation,
  CreateErpComponentErpProductMutationVariables
} from "../../../generated/CreateErpComponentErpProductMutation"
import {ErpComponentErpProductCreation} from "../../../generated/globalTypes"
import {createErpComponentErpProductMutation} from "../../../mutations"
import {erpComponentErpProductsQuery} from "../../../queries"

export interface CreateErpComponentErpProductProps {
  readonly createErpComponentErpProduct: (
    creation: ErpComponentErpProductCreation
  ) => Promise<Option<ErpComponentErpProduct>>
  readonly isCreateErpComponentErpProductLoading: boolean
}

export const useCreateErpComponentErpProduct = (): CreateErpComponentErpProductProps => {
  const [createErpComponentErpProduct, {loading}] = useMutation<
    CreateErpComponentErpProductMutation,
    CreateErpComponentErpProductMutationVariables
  >(createErpComponentErpProductMutation)

  return {
    createErpComponentErpProduct: (creation: ErpComponentErpProductCreation) =>
      new Promise<Option<ErpComponentErpProduct>>((resolve, reject) => {
        createErpComponentErpProduct({
          variables: {creation},
          refetchQueries: [
            {query: erpComponentErpProductsQuery, variables: {sampleCompanyId: creation.sampleCompanyId}}
          ]
        })
          .then(result =>
            resolve(
              result.data?.createErpComponentErpProduct
                ? Option.of(
                    addErpType(ErpType.ComponentProduct)(removeTypename(result.data.createErpComponentErpProduct))
                  )
                : Option.none()
            )
          )
          .catch(reject)
      }),
    isCreateErpComponentErpProductLoading: loading
  }
}
