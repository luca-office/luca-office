import * as React from "react"
import {useDispatch, useSelector} from "react-redux"
import {Payload} from "redux-first-router"
import {Option} from "shared/utils"
import {AppMode} from "../../../enums"
import {updateAppMode} from "../../../redux/actions/ui/common-ui-action"
import {AppState} from "../../../redux/state/app-state"
import {Route} from "../../../routes"
import {useBackofficeWebsocket} from "../../dashboard/hooks/use-backoffice-websocket"
import {useUpdateChat} from "../../dashboard/hooks/use-update-chat"
import {AppContent} from "./app-content"

export const AppContentContainer: React.FC = () => {
  const activeRoute = useSelector<AppState, Route | undefined>(state => state.location?.type as Route | undefined)
  const activeMode = useSelector<AppState, AppMode>(state => state.ui.common.appMode)
  const urlParams = useSelector<AppState, Payload | undefined>(store => store.location?.payload)

  const dispatch = useDispatch()

  useUpdateChat(urlParams?.surveyId ?? null)
  useBackofficeWebsocket(urlParams?.surveyId ?? null, urlParams?.projectId ?? null)

  React.useEffect(() => {
    if (activeRoute) {
      const appModeOption = getAppModeByRoute(activeRoute)
      appModeOption.forEach(appMode => activeMode !== appMode && dispatch(updateAppMode(appMode)))
    }
  }, [activeRoute])

  return <AppContent urlParams={urlParams} activeRoute={activeRoute} />
}

// extend these checks for routes to ensure correct mode switch on load
const getAppModeByRoute = (route: Route): Option<AppMode> => {
  if (route.startsWith(Route.Projects)) {
    return Option.of<AppMode>(AppMode.MANAGER)
  }
  if (
    route.startsWith(Route.Scenarios) ||
    route.startsWith(Route.Questionnaires) ||
    route.startsWith(Route.ReferenceBookChapters) ||
    route.startsWith(Route.Events) ||
    route.startsWith(Route.SampleCompanies)
  ) {
    return Option.of<AppMode>(AppMode.EDITOR)
  }
  if (route.startsWith(Route.UserManagement)) {
    return Option.of<AppMode>(AppMode.USERMANAGEMENT)
  }
  if (route.startsWith(Route.RaterRatingOverview)) {
    return Option.of<AppMode>(AppMode.RATING)
  }
  return Option.none<AppMode>()
}
