import {useMutation} from "@apollo/client"
import {DeleteEntityHook, Rating} from "../../../../models"
import {deleteIdEntityFromCache} from "../../../cache"
import {DeleteRatingMutation, DeleteRatingMutationVariables} from "../../../generated/DeleteRatingMutation"
import {RatingsQuery, RatingsQueryVariables} from "../../../generated/RatingsQuery"
import {deleteRatingMutation} from "../../../mutations"
import {ratingsQuery} from "../../../queries"

export const useDeleteRating = (surveyId: UUID): DeleteEntityHook => {
  const [deleteRating, {loading}] = useMutation<DeleteRatingMutation, DeleteRatingMutationVariables>(
    deleteRatingMutation
  )

  return {
    deleteEntity: (id: UUID) =>
      new Promise<void>((resolve, reject) => {
        deleteRating({
          variables: {id},
          update: deleteIdEntityFromCache<RatingsQuery, DeleteRatingMutation, RatingsQueryVariables, Rating>(
            ratingsQuery,
            "ratings",
            id,
            {surveyId}
          )
        })
          .then(() => resolve())
          .catch(reject)
      }),
    deleteEntityLoading: loading
  }
}
