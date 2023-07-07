import {isEqual} from "lodash-es"
import * as React from "react"
import {useDispatch} from "react-redux"
import {ProjectModuleType} from "shared/graphql/generated/globalTypes"
import {useCheckLogin, useProjectModules} from "shared/graphql/hooks"
import {Rating} from "shared/models"
import {Route as SharedRoute} from "shared/routes"
import {exists, find, first, isDefined, sortByPosition} from "shared/utils"
import {navigateToRouteAction} from "../../../../../redux/actions/navigation-action"
import {Route} from "../../../../../routes"
import {useScoring} from "../../use-scoring"
import {ParticipantTableEntity} from "../scoring-dashboard-table/scoring-dashboard-table"

export interface UseScoringDashboardHook {
  readonly loading: boolean
  readonly navigateToParticipantRating: (surveyInvitationId: UUID) => void
  readonly navigateToParticipantProgress: (surveyInvitationId: UUID) => void
  readonly participantTableEntities: ParticipantTableEntity[]
  readonly selfInvited: boolean
  readonly selfInvitedRatingFinished: boolean
  readonly isFinalRatingCompleted: boolean
}

export const useScoringDashboard = (surveyId: UUID, projectId: UUID): UseScoringDashboardHook => {
  const dispatch = useDispatch()

  const {loading, participantTableEntities, raters, allRatings} = useScoring(surveyId, projectId)

  const allRatingsRef = React.useRef<Rating[]>([])

  const {account, checkLoginLoading} = useCheckLogin()
  const {projectModules, projectModulesLoading} = useProjectModules(projectId)

  if (!isEqual(allRatingsRef.current, allRatings)) {
    allRatingsRef.current = allRatings
  }

  const selfInvited = account.exists(({id: accountId}) => exists(rater => rater.id === accountId, raters))
  const selfInvitedRatingFinished =
    selfInvited &&
    account.exists(({id: accountId}) =>
      find(rating => rating.userAccountId === accountId && !rating.isFinalScore, allRatingsRef.current).exists(rating =>
        isDefined(rating.finalizedAt)
      )
    )

  const firstProjectModuleId = first(sortByPosition(projectModules)).map(projectModule => projectModule.id)

  const routeOption = React.useMemo(
    () =>
      firstProjectModuleId.map(id =>
        projectModules.find(projectModule => projectModule.id === id)?.moduleType === ProjectModuleType.Questionnaire
          ? SharedRoute.RatingOverviewSurveyModuleParticipantQuestionnaire
          : SharedRoute.RatingOverviewSurveyModuleParticipantScenario
      ),
    [firstProjectModuleId.orNull(), projectModules]
  )

  const navigateToParticipantRating = (surveyInvitationId: UUID) =>
    routeOption.forEach(route =>
      firstProjectModuleId.forEach(moduleId =>
        dispatch(
          navigateToRouteAction(route, {
            id: projectId,
            surveyId,
            moduleId,
            surveyInvitationId
          })
        )
      )
    )

  const navigateToParticipantProgress = (surveyInvitationId: UUID) => {
    dispatch(
      navigateToRouteAction(Route.SurveyScoringParticipant, {
        projectId,
        surveyId,
        surveyInvitationId
      })
    )
  }

  const isFinalRatingCompleted = allRatings.some(rating => rating.isFinalScore && rating.finalizedAt !== null)

  return {
    loading: loading || checkLoginLoading || projectModulesLoading,
    navigateToParticipantRating,
    navigateToParticipantProgress,
    participantTableEntities,
    selfInvited,
    selfInvitedRatingFinished,
    isFinalRatingCompleted
  }
}
