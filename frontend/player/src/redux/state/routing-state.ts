import {RouteParameters, Route} from "../../routes"

export interface RoutingState {
  readonly activeRoute: Route
  readonly parameters?: RouteParameters
}

export const initialRoutingState = (surveyId: UUID | null): RoutingState => ({
  activeRoute: surveyId !== null ? Route.OpenParticipation : Route.VerifyToken,
  parameters: surveyId !== null ? {surveyId} : undefined
})
