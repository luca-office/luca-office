import {isEqual} from "lodash-es"
import * as React from "react"
import {useRatings, useSurveyUserAccounts} from "shared/graphql/hooks"
import {Rating, UserAccount} from "shared/models"
import {exists, find, isDefined} from "shared/utils"

interface RaterEntity {
  readonly raterId: UUID
  readonly email: string
  readonly finalized: boolean
}

export interface UseRatersCardHook {
  readonly ratersCount: number
  readonly raterEntities: RaterEntity[]
  readonly raterEmails: string[]
  readonly inviteOverlayVisible: boolean
  readonly showInviteOverlay: () => void
  readonly hideInviteOverlay: () => void
  readonly raters: UserAccount[]
  readonly ratings: Rating[]
  readonly isRatingFinalized: boolean
}

export const useRatersCard = (surveyId: UUID): UseRatersCardHook => {
  const ratersRef = React.useRef<UserAccount[]>([])
  const ratingsRef = React.useRef<Rating[]>([])

  const [inviteOverlayVisible, setInviteOverlayVisible] = React.useState(false)

  const {surveyUserAccounts: raters} = useSurveyUserAccounts(surveyId)
  const {ratings: allRatings} = useRatings(surveyId)

  if (!isEqual(ratersRef.current, raters)) {
    ratersRef.current = raters
  }

  const ratings = allRatings.filter(rating => !rating.isFinalScore)

  if (!isEqual(ratingsRef.current, ratings)) {
    ratingsRef.current = ratings
  }

  const isRatingFinalized = find(({isFinalScore}) => isFinalScore, allRatings).exists(({finalizedAt}) =>
    isDefined(finalizedAt)
  )
  const ratersCount = ratersRef.current.length
  const raterEntities = React.useMemo<RaterEntity[]>(
    () =>
      ratersRef.current.map(rater => ({
        raterId: rater.id,
        email: rater.email,
        finalized: exists(
          rating => !rating.isFinalScore && rating.userAccountId === rater.id && isDefined(rating.finalizedAt),
          ratingsRef.current
        )
      })),
    [ratersRef.current, ratingsRef.current]
  )
  const raterEmails = raterEntities.map(({email}) => email)

  const showInviteOverlay = () => setInviteOverlayVisible(true)
  const hideInviteOverlay = () => setInviteOverlayVisible(false)

  return {
    ratersCount,
    raterEntities,
    raterEmails,
    inviteOverlayVisible,
    showInviteOverlay,
    hideInviteOverlay,
    raters: ratersRef.current,
    ratings: ratingsRef.current,
    isRatingFinalized
  }
}
