import {useDispatch} from "react-redux"
import {ProjectProps, useProject} from "shared/graphql/hooks"
import {SurveyLightProps, useSurveyLight} from "shared/graphql/hooks/queries/survey/use-survey-light"
import {Route as SharedRoute} from "shared/routes"
import {navigateToRouteAction} from "../../../../../redux/actions/navigation-action"
import {Route} from "../../../../../routes"

export interface UseDashboardActionFooterHook extends Pick<SurveyLightProps, "survey">, Pick<ProjectProps, "project"> {
  readonly onNavigate: () => void
}

export const useDashboardActionFooter = (projectId: UUID, surveyId: UUID): UseDashboardActionFooterHook => {
  const {survey} = useSurveyLight(surveyId)
  const {project} = useProject(projectId)
  const dispatch = useDispatch()

  const navigateRating = () => dispatch(navigateToRouteAction(Route.SurveyScoring, {projectId, surveyId}))
  const navigateProjectDashboard = () =>
    dispatch(navigateToRouteAction(SharedRoute.SurveyMonitoring, {projectId, surveyId}))

  return {
    survey,
    project,
    onNavigate: survey.map(surveyValue => surveyValue.isCompleted).getOrElse(false)
      ? navigateRating
      : navigateProjectDashboard
  }
}
