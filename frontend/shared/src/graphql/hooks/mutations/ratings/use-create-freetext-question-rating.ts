import {useMutation} from "@apollo/client"
import {FreetextQuestionRating} from "../../../../models"
import {Option} from "../../../../utils"
import {createEntityInCache} from "../../../cache"
import {
  CreateFreetextQuestionRatingMutation,
  CreateFreetextQuestionRatingMutationVariables
} from "../../../generated/CreateFreetextQuestionRatingMutation"
import {
  FreetextQuestionRatingsQuery,
  FreetextQuestionRatingsQueryVariables
} from "../../../generated/FreetextQuestionRatingsQuery"
import {FreetextQuestionRatingCreation} from "../../../generated/globalTypes"
import {createFreetextQuestionRatingMutation} from "../../../mutations"
import {freetextQuestionRatingsQuery} from "../../../queries"

export interface UseCreateFreetextQuestionRatingHook {
  readonly createFreetextQuestionRating: (
    creation: FreetextQuestionRatingCreation
  ) => Promise<Option<FreetextQuestionRating>>
  readonly createFreetextQuestionRatingLoading: boolean
}

export const useCreateFreetextQuestionRating = (): UseCreateFreetextQuestionRatingHook => {
  const [createFreetextQuestionRating, {loading}] = useMutation<
    CreateFreetextQuestionRatingMutation,
    CreateFreetextQuestionRatingMutationVariables
  >(createFreetextQuestionRatingMutation)

  return {
    createFreetextQuestionRating: (creation: FreetextQuestionRatingCreation) =>
      new Promise<Option<FreetextQuestionRating>>((resolve, reject) => {
        createFreetextQuestionRating({
          variables: {creation},
          update: createEntityInCache<
            FreetextQuestionRatingsQuery,
            CreateFreetextQuestionRatingMutation,
            FreetextQuestionRatingsQueryVariables
          >(
            freetextQuestionRatingsQuery,
            "freetextQuestionRatings",
            query => query.freetextQuestionRatings,
            "createFreetextQuestionRating",
            {ratingId: creation.ratingId}
          )
        })
          .then(result => resolve(Option.of(result.data?.createFreetextQuestionRating)))
          .catch(reject)
      }),
    createFreetextQuestionRatingLoading: loading
  }
}
