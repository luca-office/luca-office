import {useMutation} from "@apollo/client"
import {PureQueryOptions} from "@apollo/client/core"
import {Rating} from "../../../../models"
import {Option} from "../../../../utils"
import {updateIdEntityInCache} from "../../../cache"
import {FinalizeRatingMutation, FinalizeRatingMutationVariables} from "../../../generated/FinalizeRatingMutation"
import {RatingsQuery, RatingsQueryVariables} from "../../../generated/RatingsQuery"
import {finalizeRatingMutation} from "../../../mutations"
import {ratingsQuery} from "../../../queries"

export interface UseFinalizeRatingHook {
  readonly finalizeRating: (ratingId: UUID) => Promise<Option<Rating>>
  readonly finalizeRatingLoading: boolean
}

export const useFinalizeRating = (surveyId: UUID, refetchQueries?: PureQueryOptions[]): UseFinalizeRatingHook => {
  const [finalizeRating, {loading}] = useMutation<FinalizeRatingMutation, FinalizeRatingMutationVariables>(
    finalizeRatingMutation
  )

  return {
    finalizeRating: (ratingId: UUID) =>
      new Promise<Option<Rating>>((resolve, reject) => {
        finalizeRating({
          variables: {id: ratingId},
          update: updateIdEntityInCache<RatingsQuery, FinalizeRatingMutation, Rating, RatingsQueryVariables>(
            ratingsQuery,
            "ratings",
            ratingId,
            "finalizeRating",
            {surveyId}
          ),
          ...(refetchQueries !== undefined && {refetchQueries})
        })
          .then(result => resolve(Option.of(result.data?.finalizeRating)))
          .catch(reject)
      }),
    finalizeRatingLoading: loading
  }
}
