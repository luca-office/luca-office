import {useCallback, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {useCheckLogin} from "shared/graphql/hooks"
import {UserAccountForLogin} from "shared/models"
import {Option} from "shared/utils"
import {AppMode} from "../../../../../enums"
import {navigateToRouteAction} from "../../../../../redux/actions/navigation-action"
import {updateAppMode} from "../../../../../redux/actions/ui/common-ui-action"
import {AppState} from "../../../../../redux/state/app-state"
import {Route} from "../../../../../routes"

export interface UseAppModeSelectHook {
  readonly appMode: AppMode
  readonly changeAppMode: (mode: AppMode) => void
  readonly isMenuVisible: boolean
  readonly toggleMenu: () => void
  readonly account: Option<UserAccountForLogin>
}

export const useAppModeSelect = (): UseAppModeSelectHook => {
  const [isMenuVisible, toggleMenuVisibility] = useState(false)
  const appMode = useSelector<AppState, AppMode>(state => state.ui.common.appMode)

  const {account} = useCheckLogin()
  const dispatch = useDispatch()

  const changeAppMode = useCallback((appMode: AppMode) => {
    dispatch(updateAppMode(appMode))

    switch (appMode) {
      case AppMode.MANAGER:
        dispatch(navigateToRouteAction(Route.Projects))
        break
      case AppMode.USERMANAGEMENT:
        dispatch(navigateToRouteAction(Route.UserManagement))
        break
      case AppMode.RATING:
        dispatch(navigateToRouteAction(Route.RaterRatingOverview))
        break
      case AppMode.EDITOR:
      default:
        dispatch(navigateToRouteAction(Route.Scenarios))
    }
    toggleMenuVisibility(false)
  }, [])

  const toggleMenu = () => {
    toggleMenuVisibility(!isMenuVisible)
  }

  return {
    appMode,
    changeAppMode,
    isMenuVisible,
    toggleMenu,
    account
  }
}
