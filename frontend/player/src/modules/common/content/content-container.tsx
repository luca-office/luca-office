import * as React from "react"
import {useDispatch, useSelector} from "react-redux"
import {usePlayerWebsocket} from "../../../hooks/use-player-websocket"
import {navigateToRouteAction} from "../../../redux/actions/routing-action"
import {AppState} from "../../../redux/state/app-state"
import {Route, RouteParameters} from "../../../routes"
import {Content} from "./content"

export const ContentContainer: React.FC = () => {
  const activeRoute = useSelector<AppState, Route | undefined>(store => store.routing.activeRoute)
  const routingParameters = useSelector<AppState, RouteParameters | undefined>(store => store.routing.parameters)
  const isChatOpened = useSelector<AppState, boolean>(store => store.ui.windowManager.isChatVisible)
  const dispatch = useDispatch()

  usePlayerWebsocket(isChatOpened)

  const handleCloseScenarioFinalScoreOverlay = () => {
    dispatch(
      navigateToRouteAction({
        routeType: Route.ReportScenario,
        parameters: {
          scenarioId: routingParameters?.scenarioId,
          surveyId: routingParameters?.surveyId,
          token: routingParameters?.token
        }
      })
    )
  }
  const handleCloseQuestionnaireFinalScoreOverlay = () => {
    dispatch(
      navigateToRouteAction({
        routeType: Route.ReportQuestionnaire,
        parameters: {
          questionnaireId: routingParameters?.questionnaireId,
          surveyId: routingParameters?.surveyId,
          token: routingParameters?.token
        }
      })
    )
  }

  return (
    <Content
      closeScenarioFinalScoreOverlay={handleCloseScenarioFinalScoreOverlay}
      closeQuestionnaireFinalScoreOverlay={handleCloseQuestionnaireFinalScoreOverlay}
      routingParameters={routingParameters ?? {}}
      activeRoute={activeRoute}
    />
  )
}
