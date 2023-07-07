import {useMutation} from "@apollo/client"
import {CodingModel} from "../../../../models"
import {Option} from "../../../../utils"
import {createEntityInCache} from "../../../cache"
import {CodingModelsQuery} from "../../../generated/CodingModelsQuery"
import {
  CreateCodingModelMutation,
  CreateCodingModelMutationVariables
} from "../../../generated/CreateCodingModelMutation"
import {CodingModelCreation} from "../../../generated/globalTypes"
import {createCodingModelMutation} from "../../../mutations"
import {codingModelsQuery, scenarioQuery} from "../../../queries"

export interface CreateCodingModelProps {
  readonly createCodingModel: (creation: CodingModelCreation) => Promise<Option<CodingModel>>
  readonly createCodingModelLoading: boolean
}

export const useCreateCodingModel = (scenarioId: UUID): CreateCodingModelProps => {
  const [createCodingModel, {loading}] = useMutation<CreateCodingModelMutation, CreateCodingModelMutationVariables>(
    createCodingModelMutation
  )

  return {
    createCodingModel: (creation: CodingModelCreation) =>
      new Promise<Option<CodingModel>>((resolve, reject) => {
        createCodingModel({
          variables: {creation},
          update: createEntityInCache<CodingModelsQuery, CreateCodingModelMutation>(
            codingModelsQuery,
            "codingModels",
            query => query.codingModels,
            "createCodingModel"
          ),
          refetchQueries: [{query: scenarioQuery, variables: {id: scenarioId}}]
        })
          .then(result => resolve(Option.of<CodingModel>(result?.data?.createCodingModel)))
          .catch(reject)
      }),
    createCodingModelLoading: loading
  }
}
