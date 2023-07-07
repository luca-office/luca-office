import {useMutation} from "@apollo/client"
import {ErpType} from "../../../../enums"
import {ErpComponent} from "../../../../models"
import {addErpType, Option, removeTypename} from "../../../../utils"
import {ErpComponentUpdate} from "../../../generated/globalTypes"
import {
  UpdateErpComponentMutation,
  UpdateErpComponentMutationVariables
} from "../../../generated/UpdateErpComponentMutation"
import {updateErpComponentMutation} from "../../../mutations"

export interface UpdateErpComponentProps {
  readonly updateErpComponent: (
    id: number,
    sampleCompanyId: UUID,
    update: ErpComponentUpdate
  ) => Promise<Option<ErpComponent>>
  readonly isUpdateErpComponentLoading: boolean
}

export const useUpdateErpComponent = (): UpdateErpComponentProps => {
  const [updateErpComponent, {loading}] = useMutation<UpdateErpComponentMutation, UpdateErpComponentMutationVariables>(
    updateErpComponentMutation
  )

  return {
    updateErpComponent: (id: number, sampleCompanyId: UUID, update: ErpComponentUpdate) =>
      new Promise<Option<ErpComponent>>((resolve, reject) => {
        updateErpComponent({variables: {id, sampleCompanyId, update}})
          .then(result =>
            resolve(
              result.data?.updateErpComponent
                ? Option.of(addErpType(ErpType.Component)(removeTypename(result.data.updateErpComponent)))
                : Option.none()
            )
          )
          .catch(reject)
      }),
    isUpdateErpComponentLoading: loading
  }
}
