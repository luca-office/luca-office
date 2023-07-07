import {useMutation} from "@apollo/client"
import {CodingCriterion} from "../../../../models"
import {Option} from "../../../../utils"
import {createEntityInCache} from "../../../cache"
import {CodingCriteriaQuery, CodingCriteriaQueryVariables} from "../../../generated/CodingCriteriaQuery"
import {
  CreateCodingCriterionMutation,
  CreateCodingCriterionMutationVariables
} from "../../../generated/CreateCodingCriterionMutation"
import {CodingCriterionCreation} from "../../../generated/globalTypes"
import {createCodingCriterionMutation} from "../../../mutations"
import {codingCriteriaQuery, codingDimensionQuery, codingDimensionsQuery} from "../../../queries"

export interface CreateCodingCriterionProps {
  readonly createCodingCriterion: (creation: CodingCriterionCreation) => Promise<Option<CodingCriterion>>
  readonly createCodingCriterionLoading: boolean
}

export const useCreateCodingCriterion = (codingItemId: UUID, codingModelId: UUID): CreateCodingCriterionProps => {
  const [createCodingModel, {loading}] = useMutation<
    CreateCodingCriterionMutation,
    CreateCodingCriterionMutationVariables
  >(createCodingCriterionMutation)

  return {
    createCodingCriterion: (creation: CodingCriterionCreation) =>
      new Promise<Option<CodingCriterion>>((resolve, reject) => {
        createCodingModel({
          variables: {creation},
          update: createEntityInCache<CodingCriteriaQuery, CreateCodingCriterionMutation, CodingCriteriaQueryVariables>(
            codingCriteriaQuery,
            "codingCriteria",
            query => query.codingCriteria,
            "createCodingCriterion",
            {
              itemId: codingItemId
            }
          ),
          refetchQueries: [
            {
              query: codingDimensionsQuery,
              variables: {
                modelId: codingModelId
              }
            }
          ]
        })
          .then(result => resolve(Option.of<CodingCriterion>(result?.data?.createCodingCriterion)))
          .catch(reject)
      }),
    createCodingCriterionLoading: loading
  }
}
