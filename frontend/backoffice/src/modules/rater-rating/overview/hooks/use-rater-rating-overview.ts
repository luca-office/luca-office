import {isEqual} from "lodash-es"
import * as React from "react"
import {useDispatch} from "react-redux"
import {useCheckLogin, useSurveysForUserAccountLazy} from "shared/graphql/hooks"
import {Rating, Survey, UserAccount, UserAccountForLogin} from "shared/models"
import {exists, isDefined, Option} from "shared/utils"
import {navigateToRouteAction} from "../../../../redux/actions/navigation-action"
import {Route} from "../../../../routes"
import {useRatingsBySurveys} from "../../hooks"

export interface UseRaterRatingOverviewHook {
  readonly dataLoading: boolean
  readonly surveys: Survey[]
  readonly navigateToDetailview: (surveyId: UUID) => void
  readonly userAccount: Option<UserAccountForLogin>
}

export const useRaterRatingOverview = (): UseRaterRatingOverviewHook => {
  const dispatch = useDispatch()

  const userAccountRef = React.useRef<UserAccountForLogin | null>(null)
  const surveysRef = React.useRef<Survey[]>([])
  const ratingsRef = React.useRef<Rating[]>([])
  const userRatingsRef = React.useRef<Rating[]>([])

  const {account: userAccount, checkLoginLoading: userAccountLoading} = useCheckLogin()
  const {
    surveysForUserAccount: surveys,
    surveysForUserAccountLoading: surveysLoading,
    getSurveysForUserAccount: getSurveys
  } = useSurveysForUserAccountLazy()
  const {ratings, ratingsLoading, getRatings} = useRatingsBySurveys()

  if (!isEqual(userAccountRef.current, userAccount.orNull())) {
    userAccountRef.current = userAccount.orNull()
  }

  if (!isEqual(surveysRef.current, surveys)) {
    surveysRef.current = surveys
  }

  if (!isEqual(ratingsRef.current, ratings)) {
    ratingsRef.current = ratings
  }

  const userRatings = React.useMemo(
    () =>
      userAccountRef.current !== null
        ? ratingsRef.current.filter(
            rating => rating.userAccountId === userAccountRef.current?.id && !rating.isFinalScore
          )
        : [],
    [ratingsRef.current, userAccountRef.current]
  )

  if (!isEqual(userRatingsRef.current, userRatings)) {
    userRatingsRef.current = userRatings
  }

  const unratedSurveys = React.useMemo(
    () =>
      surveysRef.current.filter(
        survey =>
          !exists(
            userRating => userRating.surveyId === survey.id && isDefined(userRating.finalizedAt),
            userRatingsRef.current
          )
      ),
    [surveysRef.current, userRatingsRef.current]
  )

  const navigateToDetailview = (surveyId: UUID) => {
    dispatch(navigateToRouteAction(Route.RaterRatingDetails, {surveyId}))
  }

  React.useEffect(() => {
    if (userAccountRef.current !== null) {
      getSurveys(userAccountRef.current.id)
    }
  }, [userAccountRef.current])

  React.useEffect(() => {
    getRatings(surveysRef.current)
  }, [surveysRef.current])

  return {
    dataLoading: surveysLoading || userAccountLoading || ratingsLoading,
    surveys: unratedSurveys,
    navigateToDetailview,
    userAccount
  }
}
