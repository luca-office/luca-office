import {useMutation} from "@apollo/client"
import {ErpType} from "../../../../enums"
import {ErpProduct} from "../../../../models"
import {addErpType, Option, removeTypename} from "../../../../utils"
import {ErpProductUpdate} from "../../../generated/globalTypes"
import {UpdateErpProductMutation, UpdateErpProductMutationVariables} from "../../../generated/UpdateErpProductMutation"
import {updateErpProductMutation} from "../../../mutations"

export interface UpdateErpProductProps {
  readonly updateErpProduct: (
    id: number,
    sampleCompanyId: UUID,
    update: ErpProductUpdate
  ) => Promise<Option<ErpProduct>>
  readonly isUpdateErpProductLoading: boolean
}

export const useUpdateErpProduct = (): UpdateErpProductProps => {
  const [updateErpProduct, {loading}] = useMutation<UpdateErpProductMutation, UpdateErpProductMutationVariables>(
    updateErpProductMutation
  )

  return {
    updateErpProduct: (id: number, sampleCompanyId: UUID, update: ErpProductUpdate) =>
      new Promise<Option<ErpProduct>>((resolve, reject) => {
        updateErpProduct({variables: {id, sampleCompanyId, update}})
          .then(result =>
            resolve(
              result.data?.updateErpProduct
                ? Option.of(addErpType(ErpType.Product)(removeTypename(result.data.updateErpProduct)))
                : Option.none()
            )
          )
          .catch(reject)
      }),
    isUpdateErpProductLoading: loading
  }
}
