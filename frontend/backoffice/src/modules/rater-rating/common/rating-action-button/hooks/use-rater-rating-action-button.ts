import * as React from "react"
import {useDispatch} from "react-redux"
import {useFinalizeRating, useRatings} from "shared/graphql/hooks"
import {surveysForUserAccountQuery} from "shared/graphql/queries"
import {find, isDefined} from "shared/utils"
import {navigateToRouteAction} from "../../../../../redux/actions/navigation-action"
import {Route} from "../../../../../routes"

export interface UseRaterRatingActionButtonHook {
  readonly dataLoading: boolean
  readonly actionLoading: boolean
  readonly isFinalized: boolean
  readonly isOrlyVisible: boolean
  readonly showOrly: () => void
  readonly onConfirm: () => void
  readonly onCancel: () => void
}

export const useRaterRatingActionButton = (surveyId: UUID, userAccountId: UUID): UseRaterRatingActionButtonHook => {
  const dispatch = useDispatch()

  const isMounted = React.useRef(false)

  const [finalizeRatingLoading, setFinalizeRatingLoading] = React.useState(false)
  const [isOrlyVisible, setIsOrlyVisible] = React.useState(false)

  const {ratings, ratingsLoading} = useRatings(surveyId)
  const {finalizeRating} = useFinalizeRating(surveyId, [
    {query: surveysForUserAccountQuery, variables: {userAccountId}}
  ])

  const rating = find(
    ({userAccountId: ratingUserAccountId, isFinalScore}) => ratingUserAccountId === userAccountId && !isFinalScore,
    ratings
  )
  const isFinalized = rating.map(({finalizedAt}) => isDefined(finalizedAt)).getOrElse(false)

  const showOrly = () => setIsOrlyVisible(true)
  const hideOrly = () => setIsOrlyVisible(false)

  const onConfirm = () => {
    setFinalizeRatingLoading(true)
    rating.forEach(({id: ratingId}) =>
      finalizeRating(ratingId)
        .then(() => {
          if (isMounted.current) {
            setFinalizeRatingLoading(false)
            hideOrly()
          }
          dispatch(navigateToRouteAction(Route.RaterRatingOverview))
        })
        .catch(() => isMounted.current && setFinalizeRatingLoading(false))
    )
  }

  React.useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])

  return {
    dataLoading: ratingsLoading,
    actionLoading: finalizeRatingLoading,
    isFinalized,
    isOrlyVisible,
    showOrly,
    onConfirm,
    onCancel: hideOrly
  }
}
