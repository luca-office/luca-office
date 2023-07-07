import {useMutation} from "@apollo/client"
import {ErpType} from "../../../../enums"
import {ErpSupplier} from "../../../../models"
import {addErpType, Option, removeTypename} from "../../../../utils"
import {ErpSupplierUpdate} from "../../../generated/globalTypes"
import {
  UpdateErpSupplierMutation,
  UpdateErpSupplierMutationVariables
} from "../../../generated/UpdateErpSupplierMutation"
import {updateErpSupplierMutation} from "../../../mutations"

export interface UpdateErpSupplierProps {
  readonly updateErpSupplier: (
    id: number,
    sampleCompanyId: UUID,
    update: ErpSupplierUpdate
  ) => Promise<Option<ErpSupplier>>
  readonly isUpdateErpSupplierLoading: boolean
}

export const useUpdateErpSupplier = (): UpdateErpSupplierProps => {
  const [updateErpSupplier, {loading}] = useMutation<UpdateErpSupplierMutation, UpdateErpSupplierMutationVariables>(
    updateErpSupplierMutation
  )

  return {
    updateErpSupplier: (id: number, sampleCompanyId: UUID, update: ErpSupplierUpdate) =>
      new Promise<Option<ErpSupplier>>((resolve, reject) => {
        updateErpSupplier({variables: {id, sampleCompanyId, update}})
          .then(result =>
            resolve(
              result.data?.updateErpSupplier
                ? Option.of(addErpType(ErpType.Supplier)(removeTypename(result.data.updateErpSupplier)))
                : Option.none()
            )
          )
          .catch(reject)
      }),
    isUpdateErpSupplierLoading: loading
  }
}
