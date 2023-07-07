import {useMutation} from "@apollo/client"
import {ErpType} from "../../../../enums"
import {ErpComponent} from "../../../../models"
import {addErpType, Option, removeTypename} from "../../../../utils"
import {
  CreateErpComponentMutation,
  CreateErpComponentMutationVariables
} from "../../../generated/CreateErpComponentMutation"
import {ErpComponentCreation} from "../../../generated/globalTypes"
import {createErpComponentMutation} from "../../../mutations"
import {erpComponentsQuery} from "../../../queries"

export interface CreateErpComponentProps {
  readonly createErpComponent: (creation: ErpComponentCreation) => Promise<Option<ErpComponent>>
  readonly isCreateErpComponentLoading: boolean
}

export const useCreateErpComponent = (): CreateErpComponentProps => {
  const [createErpComponent, {loading}] = useMutation<CreateErpComponentMutation, CreateErpComponentMutationVariables>(
    createErpComponentMutation
  )

  return {
    createErpComponent: (creation: ErpComponentCreation) =>
      new Promise<Option<ErpComponent>>((resolve, reject) => {
        createErpComponent({
          variables: {creation},
          refetchQueries: [{query: erpComponentsQuery, variables: {sampleCompanyId: creation.sampleCompanyId}}]
        })
          .then(result =>
            resolve(
              result.data?.createErpComponent
                ? Option.of(addErpType(ErpType.Component)(removeTypename(result.data.createErpComponent)))
                : Option.none()
            )
          )
          .catch(reject)
      }),
    isCreateErpComponentLoading: loading
  }
}
