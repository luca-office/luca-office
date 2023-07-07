import * as React from "react"
import {useDispatch, useSelector} from "react-redux"
import {AppMode} from "../../../enums"
import {useCheckUserClaims} from "../../../hooks/use-check-user-claims"
import {AppAction} from "../../../redux/actions/app-action"
import {navigateToRouteAction} from "../../../redux/actions/navigation-action"
import {AppState} from "../../../redux/state/app-state"
import {Route} from "../../../routes"
import {AppHeader} from "./app-header"

export const AppHeaderContainer: React.FC = () => {
  const activeRoute = useSelector<AppState, Route | undefined>(state => state.location?.type as Route | undefined)
  const appMode = useSelector<AppState, AppMode>(state => state.ui.common.appMode)
  const dispatch = useDispatch()
  const navigate = (route: Route) => dispatch<AppAction>(navigateToRouteAction(route))

  const {userClaims, userClaimsCheckLoading} = useCheckUserClaims()

  return (
    <AppHeader
      userMayAdministrateRScripts={!userClaimsCheckLoading && userClaims.mayAdministrateRScripts}
      activeRoute={activeRoute}
      navigate={navigate}
      appMode={appMode}
    />
  )
}
