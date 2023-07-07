import {useMutation} from "@apollo/client"
import {ScenarioCodingItemRating} from "../../../../models"
import {Option} from "../../../../utils"
import {updateEntityInCache} from "../../../cache"
import {ScenarioCodingItemRatingUpdate} from "../../../generated/globalTypes"
import {
  ScenarioCodingItemRatingsQuery,
  ScenarioCodingItemRatingsQueryVariables
} from "../../../generated/ScenarioCodingItemRatingsQuery"
import {
  UpdateScenarioCodingItemRatingMutation,
  UpdateScenarioCodingItemRatingMutationVariables
} from "../../../generated/UpdateScenarioCodingItemRatingMutation"
import {updateScenarioCodingItemRatingMutation} from "../../../mutations"
import {scenarioCodingItemRatingsQuery} from "../../../queries"

interface UpdateScenarioCodingItemRatingParams {
  readonly ratingId: UUID
  readonly scenarioCodingItemRatingId: UUID
  readonly update: ScenarioCodingItemRatingUpdate
}

export interface UseUpdateScenarioCodingItemRatingHook {
  readonly updateScenarioCodingItemRating: (
    params: UpdateScenarioCodingItemRatingParams
  ) => Promise<Option<ScenarioCodingItemRating>>
  readonly updateScenarioCodingItemRatingLoading: boolean
}

export const useUpdateScenarioCodingItemRating = (): UseUpdateScenarioCodingItemRatingHook => {
  const [updateScenarioCodingItemRating, {loading}] = useMutation<
    UpdateScenarioCodingItemRatingMutation,
    UpdateScenarioCodingItemRatingMutationVariables
  >(updateScenarioCodingItemRatingMutation)

  return {
    updateScenarioCodingItemRating: ({
      ratingId,
      scenarioCodingItemRatingId,
      update
    }: UpdateScenarioCodingItemRatingParams) =>
      new Promise<Option<ScenarioCodingItemRating>>((resolve, reject) => {
        updateScenarioCodingItemRating({
          variables: {id: scenarioCodingItemRatingId, update},
          update: updateEntityInCache<
            ScenarioCodingItemRatingsQuery,
            UpdateScenarioCodingItemRatingMutation,
            ScenarioCodingItemRating,
            ScenarioCodingItemRatingsQueryVariables
          >(
            scenarioCodingItemRatingsQuery,
            "scenarioCodingItemRatings",
            scenarioCodingItemRating => scenarioCodingItemRating.id === scenarioCodingItemRatingId,
            "updateScenarioCodingItemRating",
            {ratingId}
          )
        })
          .then(result => resolve(Option.of(result.data?.updateScenarioCodingItemRating)))
          .catch(reject)
      }),
    updateScenarioCodingItemRatingLoading: loading
  }
}
