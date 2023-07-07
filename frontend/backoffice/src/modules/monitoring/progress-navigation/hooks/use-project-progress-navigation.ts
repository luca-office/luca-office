import {useDispatch} from "react-redux"
import {Route as SharedRoute} from "shared/routes"
import {navigateToRouteAction} from "../../../../redux/actions/navigation-action"
import {Route} from "../../../../routes"
import {ProjectProgressNavigationProps} from "../project-progress-navigation"

export interface UseProjectProgressNavigationProps {
  readonly navigateToDashboard: () => void
  readonly navigateToModule: (moduleId: UUID) => void
}

export const useProjectProgressNavigation = ({
  projectId,
  surveyId
}: ProjectProgressNavigationProps): UseProjectProgressNavigationProps => {
  const dispatch = useDispatch()

  const navigateToModule = (moduleId: UUID) => {
    dispatch(
      navigateToRouteAction(Route.SurveyMonitoringModule, {
        projectId,
        surveyId,
        moduleId: moduleId
      })
    )
  }

  const navigateToDashboard = () => dispatch(navigateToRouteAction(SharedRoute.SurveyMonitoring, {projectId, surveyId}))

  return {
    navigateToModule,
    navigateToDashboard
  }
}
