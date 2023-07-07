import * as React from "react"
import {useFreetextQuestionRatingsByRatingsList} from "shared/components/rating/hooks/use-freetext-question-ratings-by-ratings-list"
import {FreetextQuestionRating, Rating} from "shared/models"
import {exists} from "shared/utils"

export interface FreetextQuestionRatingsForParticipants {
  readonly [surveyInvitationId: string]: FreetextQuestionRating[]
}

export interface UseFreetextQuestionRatingsForParticipantsHook {
  readonly freetextQuestionRatingsForParticipantsLoading: boolean
  readonly freetextQuestionRatingsForParticipants: FreetextQuestionRatingsForParticipants
  readonly getFreetextQuestionRatingsForParticipants: (ratings: Rating[], surveyInvitationIds: UUID[]) => void
}

export const useFreetextQuestionRatingsForParticipants = (): UseFreetextQuestionRatingsForParticipantsHook => {
  const isMounted = React.useRef(false)

  const [
    freetextQuestionRatingsForParticipantsLoading,
    setFreetextQuestionRatingsForParticipantsLoading
  ] = React.useState(false)
  const [
    freetextQuestionRatingsForParticipants,
    setFreetextQuestionRatingsForParticipants
  ] = React.useState<FreetextQuestionRatingsForParticipants>({})

  const {getFreetextQuestionRatings} = useFreetextQuestionRatingsByRatingsList()

  const getFreetextQuestionRatingsForParticipants = (ratings: Rating[], surveyInvitationIds: UUID[]) => {
    setFreetextQuestionRatingsForParticipantsLoading(true)

    getFreetextQuestionRatings(ratings)
      .then(freetextQuestionRatings =>
        freetextQuestionRatings.filter(freetextQuestionRating =>
          exists(
            surveyInvitationId => freetextQuestionRating.surveyInvitationId === surveyInvitationId,
            surveyInvitationIds
          )
        )
      )
      .then(freetextQuestionRatings =>
        freetextQuestionRatings.reduce((accumulator, freetextQuestionRating) => {
          const previousFreetextQuestionRating = accumulator[freetextQuestionRating.surveyInvitationId] ?? []
          return {
            ...accumulator,
            [freetextQuestionRating.surveyInvitationId]: [...previousFreetextQuestionRating, freetextQuestionRating]
          }
        }, {} as FreetextQuestionRatingsForParticipants)
      )
      .then(freetextQuestionRatingsForParticipants => {
        if (isMounted.current) {
          setFreetextQuestionRatingsForParticipants(freetextQuestionRatingsForParticipants)
          setFreetextQuestionRatingsForParticipantsLoading(false)
        }
      })
      .catch(() => {
        if (isMounted.current) {
          setFreetextQuestionRatingsForParticipants({})
          setFreetextQuestionRatingsForParticipantsLoading(false)
        }
      })
  }

  React.useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])

  return {
    freetextQuestionRatingsForParticipantsLoading,
    freetextQuestionRatingsForParticipants,
    getFreetextQuestionRatingsForParticipants
  }
}
