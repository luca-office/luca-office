import {useDispatch} from "react-redux"
import {NavigationConfig} from "shared/models"
import {navigateToRouteAction} from "../redux/actions/navigation-action"
import {Route} from "../routes"

export interface UseNavigateHook {
  readonly navigate: (navigationConfig: NavigationConfig<Route>) => void
}

export const useNavigate = (): UseNavigateHook => {
  const dispatch = useDispatch()

  const navigate = (navigationConfig: NavigationConfig<Route>) =>
    dispatch(navigateToRouteAction(navigationConfig.route, navigationConfig.payload))

  return {
    navigate
  }
}
