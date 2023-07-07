import {useMutation} from "@apollo/client"
import {ScenarioCodingItemRating} from "../../../../models"
import {Option} from "../../../../utils"
import {createEntityInCache} from "../../../cache"
import {
  CreateScenarioCodingItemRatingMutation,
  CreateScenarioCodingItemRatingMutationVariables
} from "../../../generated/CreateScenarioCodingItemRatingMutation"
import {ScenarioCodingItemRatingCreation} from "../../../generated/globalTypes"
import {
  ScenarioCodingItemRatingsQuery,
  ScenarioCodingItemRatingsQueryVariables
} from "../../../generated/ScenarioCodingItemRatingsQuery"
import {createScenarioCodingItemRatingMutation} from "../../../mutations"
import {scenarioCodingItemRatingsQuery} from "../../../queries"

export interface UseCreateScenarioCodingItemRatingHook {
  readonly createScenarioCodingItemRating: (
    creation: ScenarioCodingItemRatingCreation
  ) => Promise<Option<ScenarioCodingItemRating>>
  readonly createScenarioCodingItemRatingLoading: boolean
}

export const useCreateScenarioCodingItemRating = (): UseCreateScenarioCodingItemRatingHook => {
  const [createScenarioCodingItemRating, {loading}] = useMutation<
    CreateScenarioCodingItemRatingMutation,
    CreateScenarioCodingItemRatingMutationVariables
  >(createScenarioCodingItemRatingMutation)

  return {
    createScenarioCodingItemRating: (creation: ScenarioCodingItemRatingCreation) =>
      new Promise<Option<ScenarioCodingItemRating>>((resolve, reject) => {
        createScenarioCodingItemRating({
          variables: {creation},
          update: createEntityInCache<
            ScenarioCodingItemRatingsQuery,
            CreateScenarioCodingItemRatingMutation,
            ScenarioCodingItemRatingsQueryVariables
          >(
            scenarioCodingItemRatingsQuery,
            "scenarioCodingItemRatings",
            query => query.scenarioCodingItemRatings,
            "createScenarioCodingItemRating",
            {
              ratingId: creation.ratingId
            }
          )
        })
          .then(result => resolve(Option.of(result.data?.createScenarioCodingItemRating)))
          .catch(reject)
      }),
    createScenarioCodingItemRatingLoading: loading
  }
}
