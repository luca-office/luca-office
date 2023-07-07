import {useEffect} from "react"
import {useLucaTranslation} from "shared/translations"
import {allowedExitRoutes, Route} from "../routes"
import {useSelector} from "react-redux"
import {AppState} from "../redux/state/app-state"

export const useBeforeUnload = () => {
  const {t} = useLucaTranslation()
  const activeRoute = useSelector<AppState, Route | undefined>(store => store.routing.activeRoute)

  const onBeforeUnload = (event: BeforeUnloadEvent) => {
    if (activeRoute !== undefined && !allowedExitRoutes.includes(activeRoute)) {
      event.preventDefault()
      event.returnValue = t("event_before_unload_prompt")
    }
  }

  useEffect(() => {
    window.addEventListener("beforeunload", onBeforeUnload)

    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload)
    }
  }, [activeRoute])
}
