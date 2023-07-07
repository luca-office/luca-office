import {useMutation} from "@apollo/client"
import {CodingDimension} from "../../../../models"
import {Option} from "../../../../utils"
import {CodingDimensionUpdate} from "../../../generated/globalTypes"
import {
  UpdateCodingDimensionMutation,
  UpdateCodingDimensionMutationVariables
} from "../../../generated/UpdateCodingDimensionMutation"
import {updateCodingDimensionMutation} from "../../../mutations"

export interface UpdateCodingDimensionProps {
  readonly updateCodingDimension: (id: UUID, update: CodingDimensionUpdate) => Promise<Option<CodingDimension>>
  readonly updateCodingDimensionLoading: boolean
}

export const useUpdateCodingDimension = (): UpdateCodingDimensionProps => {
  const [updateCodingModel, {loading}] = useMutation<
    UpdateCodingDimensionMutation,
    UpdateCodingDimensionMutationVariables
  >(updateCodingDimensionMutation)

  return {
    updateCodingDimension: (id: UUID, update: CodingDimensionUpdate) =>
      new Promise<Option<CodingDimension>>((resolve, reject) => {
        updateCodingModel({
          variables: {id, update}
        })
          .then(result => resolve(Option.of<CodingDimension>(result?.data?.updateCodingDimension)))
          .catch(reject)
      }),
    updateCodingDimensionLoading: loading
  }
}
