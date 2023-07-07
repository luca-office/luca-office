import {NavigationConfig} from "shared/models"
import {useNavigate} from "../../../../../../hooks/use-navigate"
import {Route} from "../../../../../../routes"

export interface UseDimensionsTableHook {
  readonly navigate: (navigationConfig: NavigationConfig<Route>) => void
}

export const useDimensionsTable = (): UseDimensionsTableHook => {
  const {navigate} = useNavigate()
  return {
    navigate
  }
}
