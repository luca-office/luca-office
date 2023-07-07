import {useMutation} from "@apollo/client"
import {ScenarioErpComponentErpProduct} from "../../../../models"
import {Option} from "../../../../utils"
import {createEntityInCache} from "../../../cache"
import {
  CreateScenarioErpComponentErpProductMutation,
  CreateScenarioErpComponentErpProductMutationVariables
} from "../../../generated/CreateScenarioErpComponentErpProductMutation"
import {ScenarioErpComponentErpProductCreation} from "../../../generated/globalTypes"
import {
  ScenarioErpComponentErpProductsQuery,
  ScenarioErpComponentErpProductsQueryVariables
} from "../../../generated/ScenarioErpComponentErpProductsQuery"
import {createScenarioErpComponentErpProductMutation} from "../../../mutations"
import {scenarioErpComponentErpProductsQuery} from "../../../queries"

export interface UseCreateScenarioErpComponentErpProductHook {
  readonly createScenarioErpComponentErpProduct: (
    creation: ScenarioErpComponentErpProductCreation
  ) => Promise<Option<ScenarioErpComponentErpProduct>>
  readonly createScenarioErpComponentErpProductLoading: boolean
}

export const useCreateScenarioErpComponentErpProduct = (): UseCreateScenarioErpComponentErpProductHook => {
  const [createScenarioErpComponentErpProduct, {loading}] = useMutation<
    CreateScenarioErpComponentErpProductMutation,
    CreateScenarioErpComponentErpProductMutationVariables
  >(createScenarioErpComponentErpProductMutation)

  return {
    createScenarioErpComponentErpProduct: (creation: ScenarioErpComponentErpProductCreation) =>
      new Promise<Option<ScenarioErpComponentErpProduct>>((resolve, reject) => {
        createScenarioErpComponentErpProduct({
          variables: {creation},
          update: createEntityInCache<
            ScenarioErpComponentErpProductsQuery,
            CreateScenarioErpComponentErpProductMutation,
            ScenarioErpComponentErpProductsQueryVariables
          >(
            scenarioErpComponentErpProductsQuery,
            "scenarioErpComponentErpProducts",
            query => query.scenarioErpComponentErpProducts,
            "createScenarioErpComponentErpProduct"
          )
        })
          .then(result => resolve(Option.of(result.data?.createScenarioErpComponentErpProduct)))
          .catch(reject)
      }),
    createScenarioErpComponentErpProductLoading: loading
  }
}
