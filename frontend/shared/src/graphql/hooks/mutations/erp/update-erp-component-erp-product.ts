import {useMutation} from "@apollo/client"
import {ErpType} from "../../../../enums"
import {ErpComponentErpProduct} from "../../../../models"
import {addErpType, Option, removeTypename} from "../../../../utils"
import {ErpComponentErpProductUpdate} from "../../../generated/globalTypes"
import {
  UpdateErpComponentErpProductMutation,
  UpdateErpComponentErpProductMutationVariables
} from "../../../generated/UpdateErpComponentErpProductMutation"
import {updateErpComponentErpProductMutation} from "../../../mutations"

export interface UseUpdateErpComponentErpProductHook {
  readonly updateErpComponentErpProduct: (
    id: number,
    sampleCompanyId: UUID,
    update: ErpComponentErpProductUpdate
  ) => Promise<Option<ErpComponentErpProduct>>
  readonly isUpdateErpComponentErpProductLoading: boolean
}

export const useUpdateErpComponentErpProduct = (): UseUpdateErpComponentErpProductHook => {
  const [updateErpComponentErpProduct, {loading}] = useMutation<
    UpdateErpComponentErpProductMutation,
    UpdateErpComponentErpProductMutationVariables
  >(updateErpComponentErpProductMutation)

  return {
    updateErpComponentErpProduct: (id: number, sampleCompanyId: UUID, update: ErpComponentErpProductUpdate) =>
      new Promise<Option<ErpComponentErpProduct>>((resolve, reject) => {
        updateErpComponentErpProduct({variables: {id, sampleCompanyId, update}})
          .then(result =>
            resolve(
              result.data?.updateErpComponentErpProduct
                ? Option.of(
                    addErpType(ErpType.ComponentProduct)(removeTypename(result.data.updateErpComponentErpProduct))
                  )
                : Option.none()
            )
          )
          .catch(reject)
      }),
    isUpdateErpComponentErpProductLoading: loading
  }
}
