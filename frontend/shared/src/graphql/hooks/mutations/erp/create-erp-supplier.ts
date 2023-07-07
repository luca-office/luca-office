import {useMutation} from "@apollo/client"
import {ErpType} from "../../../../enums"
import {ErpSupplier} from "../../../../models"
import {addErpType, Option, removeTypename} from "../../../../utils"
import {
  CreateErpSupplierMutation,
  CreateErpSupplierMutationVariables
} from "../../../generated/CreateErpSupplierMutation"
import {ErpSupplierCreation} from "../../../generated/globalTypes"
import {createErpSupplierMutation} from "../../../mutations"
import {erpSuppliersQuery} from "../../../queries"

export interface CreateErpSupplierProps {
  readonly createErpSupplier: (creation: ErpSupplierCreation) => Promise<Option<ErpSupplier>>
  readonly isCreateErpSupplierLoading: boolean
}

export const useCreateErpSupplier = (): CreateErpSupplierProps => {
  const [createErpSupplier, {loading}] = useMutation<CreateErpSupplierMutation, CreateErpSupplierMutationVariables>(
    createErpSupplierMutation
  )

  return {
    createErpSupplier: (creation: ErpSupplierCreation) =>
      new Promise<Option<ErpSupplier>>((resolve, reject) => {
        createErpSupplier({
          variables: {creation},
          refetchQueries: [{query: erpSuppliersQuery, variables: {sampleCompanyId: creation.sampleCompanyId}}]
        })
          .then(result =>
            resolve(
              result.data?.createErpSupplier
                ? Option.of(addErpType(ErpType.Supplier)(removeTypename(result.data.createErpSupplier)))
                : Option.none()
            )
          )
          .catch(reject)
      }),
    isCreateErpSupplierLoading: loading
  }
}
