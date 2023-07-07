import * as React from "react"
import {useDispatch} from "react-redux"
import {ColumnProps} from "shared/components"
import {ProjectModuleType} from "shared/graphql/generated/globalTypes"
import {SurveyInvitationLight} from "shared/models"
import {Route as SharedRoute} from "shared/routes"
import {useLucaTranslation} from "shared/translations"
import {every, first, sortByCreatedAt, sortByPosition} from "shared/utils"
import {navigateToRouteAction} from "../../../../../../../redux/actions/navigation-action"
import {getRaterRatingParticipantTableColumns} from "../../../../../config/participant-table.config"
import {IndexedSurveyInvitation, RatingProjectModule} from "../../../../../models"

export interface UseRaterRatingParticipantTableHook {
  readonly indexedSurveyInvitations: IndexedSurveyInvitation[]
  readonly columns: ColumnProps<IndexedSurveyInvitation>[]
  readonly navigateToParticipantRatingOverview: (surveyInvitation: SurveyInvitationLight) => void
}

interface UseRaterRatingParticipantTableParams {
  readonly surveyInvitations: SurveyInvitationLight[]
  readonly ratingProjectModules: RatingProjectModule[]
}

export const useRaterRatingParticipantTable = ({
  surveyInvitations,
  ratingProjectModules
}: UseRaterRatingParticipantTableParams): UseRaterRatingParticipantTableHook => {
  const {t} = useLucaTranslation()

  const dispatch = useDispatch()

  const sortedProjectModules = React.useMemo(() => sortByPosition(ratingProjectModules), [ratingProjectModules])

  const indexedSurveyInvitations = React.useMemo(
    () =>
      // notice to use same sort as in rating/use-rating-overview
      sortByCreatedAt(surveyInvitations).map((surveyInvitation, index) => ({
        ...surveyInvitation,
        index: index + 1
      })),
    [surveyInvitations]
  )

  const fullyRatedProjectModulesCount = React.useMemo(
    () =>
      sortedProjectModules.reduce((accumulator, projectModule) => {
        const isFullyRated = every(({isFullyRated}) => isFullyRated, projectModule.ratingsByParticipants)
        return isFullyRated ? accumulator + 1 : accumulator
      }, 0),
    [sortedProjectModules]
  )

  const columns = getRaterRatingParticipantTableColumns(
    t,
    indexedSurveyInvitations,
    sortedProjectModules,
    fullyRatedProjectModulesCount
  )

  const navigateToParticipantRatingOverview = (surveyInvitation: SurveyInvitationLight) =>
    first(sortedProjectModules).forEach(projectModule =>
      dispatch(
        navigateToRouteAction(
          projectModule.moduleType === ProjectModuleType.Scenario
            ? SharedRoute.RatingOverviewSurveyModuleParticipantScenarioNormalRater
            : SharedRoute.RatingOverviewSurveyModuleParticipantQuestionnaireNormalRater,
          {
            id: surveyInvitation.survey.projectId,
            surveyId: surveyInvitation.survey.id,
            surveyInvitationId: surveyInvitation.id,
            moduleId: projectModule.id
          }
        )
      )
    )

  return {indexedSurveyInvitations, columns, navigateToParticipantRatingOverview}
}
