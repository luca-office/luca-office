import {initialSharedAppState, SharedAppState} from "shared/redux/state/app-state"
import {initialRoutingState, RoutingState} from "./routing-state"

export type AppState = Readonly<{routing: RoutingState}> & SharedAppState

export const initialAppState = (surveyId: UUID | null): AppState => ({
  routing: initialRoutingState(surveyId),
  ...initialSharedAppState
})
