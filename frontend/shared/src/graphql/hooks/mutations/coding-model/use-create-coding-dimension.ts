import {useMutation} from "@apollo/client"
import {CodingDimension} from "../../../../models"
import {Option} from "../../../../utils"
import {createEntityInCache} from "../../../cache"
import {CodingDimensionsQuery, CodingDimensionsQueryVariables} from "../../../generated/CodingDimensionsQuery"
import {
  CreateCodingDimensionMutation,
  CreateCodingDimensionMutationVariables
} from "../../../generated/CreateCodingDimensionMutation"
import {CodingDimensionCreation} from "../../../generated/globalTypes"
import {createCodingDimensionMutation} from "../../../mutations"
import {codingDimensionsQuery, scenarioQuery} from "../../../queries"

export interface CreateCodingDimensionProps {
  readonly createCodingDimension: (creation: CodingDimensionCreation) => Promise<Option<CodingDimension>>
  readonly createCodingDimensionLoading: boolean
}

export const useCreateCodingDimension = (codingModelId: UUID, scenarioId: UUID): CreateCodingDimensionProps => {
  const [createCodingModel, {loading}] = useMutation<
    CreateCodingDimensionMutation,
    CreateCodingDimensionMutationVariables
  >(createCodingDimensionMutation)

  return {
    createCodingDimension: (creation: CodingDimensionCreation) =>
      new Promise<Option<CodingDimension>>((resolve, reject) => {
        createCodingModel({
          variables: {creation},
          update: createEntityInCache<
            CodingDimensionsQuery,
            CreateCodingDimensionMutation,
            CodingDimensionsQueryVariables
          >(codingDimensionsQuery, "codingDimensions", query => query.codingDimensions, "createCodingDimension", {
            modelId: codingModelId
          }),
          refetchQueries: [
            {
              query: scenarioQuery,
              variables: {
                id: scenarioId
              }
            }
          ]
        })
          .then(result => resolve(Option.of<CodingDimension>(result?.data?.createCodingDimension)))
          .catch(reject)
      }),
    createCodingDimensionLoading: loading
  }
}
