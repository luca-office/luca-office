import {useSelector} from "react-redux"
import {Payload} from "redux-first-router"
import {AppState} from "../../../redux/state/app-state"
import {Route} from "../../../routes"

export interface UseAuthHook {
  readonly activeRoute: Route | undefined
  readonly urlParams: Payload | undefined
}

export const useAuth = (): UseAuthHook => {
  const activeRoute = useSelector<AppState, Route | undefined>(state => state.location?.type as Route | undefined)
  const urlParams = useSelector<AppState, Payload | undefined>(store => store.location?.payload)
  return {
    activeRoute,
    urlParams
  }
}
