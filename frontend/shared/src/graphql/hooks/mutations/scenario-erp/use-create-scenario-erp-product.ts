import {useMutation} from "@apollo/client"
import {ScenarioErpProduct} from "../../../../models"
import {Option} from "../../../../utils"
import {createEntityInCache} from "../../../cache"
import {
  CreateScenarioErpProductMutation,
  CreateScenarioErpProductMutationVariables
} from "../../../generated/CreateScenarioErpProductMutation"
import {ScenarioErpProductCreation} from "../../../generated/globalTypes"
import {ScenarioErpProductsQuery, ScenarioErpProductsQueryVariables} from "../../../generated/ScenarioErpProductsQuery"
import {createScenarioErpProductMutation} from "../../../mutations"
import {scenarioErpProductsQuery} from "../../../queries"

export interface UseCreateScenarioErpProductHook {
  readonly createScenarioErpProduct: (creation: ScenarioErpProductCreation) => Promise<Option<ScenarioErpProduct>>
  readonly createScenarioErpProductLoading: boolean
}

export const useCreateScenarioErpProduct = (): UseCreateScenarioErpProductHook => {
  const [createScenarioErpProduct, {loading}] = useMutation<
    CreateScenarioErpProductMutation,
    CreateScenarioErpProductMutationVariables
  >(createScenarioErpProductMutation)

  return {
    createScenarioErpProduct: (creation: ScenarioErpProductCreation) =>
      new Promise<Option<ScenarioErpProduct>>((resolve, reject) => {
        createScenarioErpProduct({
          variables: {creation},
          update: createEntityInCache<
            ScenarioErpProductsQuery,
            CreateScenarioErpProductMutation,
            ScenarioErpProductsQueryVariables
          >(
            scenarioErpProductsQuery,
            "scenarioErpProducts",
            query => query.scenarioErpProducts,
            "createScenarioErpProduct"
          )
        })
          .then(result => resolve(Option.of(result.data?.createScenarioErpProduct)))
          .catch(reject)
      }),
    createScenarioErpProductLoading: loading
  }
}
