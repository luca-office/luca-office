import {useMutation} from "@apollo/client"
import {CodingModel} from "../../../../models"
import {Option} from "../../../../utils"
import {CodingModelUpdate} from "../../../generated/globalTypes"
import {
  UpdateCodingModelMutation,
  UpdateCodingModelMutationVariables
} from "../../../generated/UpdateCodingModelMutation"
import {updateCodingModelMutation} from "../../../mutations"

export interface UpdateCodingModelProps {
  readonly updateCodingModel: (id: UUID, update: CodingModelUpdate) => Promise<Option<CodingModel>>
  readonly updateCodingModelLoading: boolean
}

export const useUpdateCodingModel = (): UpdateCodingModelProps => {
  const [updateCodingModel, {loading}] = useMutation<UpdateCodingModelMutation, UpdateCodingModelMutationVariables>(
    updateCodingModelMutation
  )

  return {
    updateCodingModel: (id: UUID, update: CodingModelUpdate) =>
      new Promise<Option<CodingModel>>((resolve, reject) => {
        updateCodingModel({
          variables: {id, update}
        })
          .then(result => resolve(Option.of<CodingModel>(result?.data?.updateCodingModel)))
          .catch(reject)
      }),
    updateCodingModelLoading: loading
  }
}
