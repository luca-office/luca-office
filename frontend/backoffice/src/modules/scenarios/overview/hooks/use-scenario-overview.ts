import {useDispatch, useSelector} from "react-redux"
import {Payload} from "redux-first-router"
import {useCheckLogin, useScenarios} from "shared/graphql/hooks"
import {ScenarioLight} from "shared/models"
import {Option} from "shared/utils"
import {useCheckUserClaims} from "../../../../hooks/use-check-user-claims"
import {EntityFilterConfig} from "../../../../models"
import {AppAction} from "../../../../redux/actions/app-action"
import {navigateToRouteAction} from "../../../../redux/actions/navigation-action"
import {AppState} from "../../../../redux/state/app-state"
import {Route} from "../../../../routes"
import {applyFilterAndSortEntities} from "../../../../utils"

export interface UseScenarioOverviewHook {
  readonly loading: boolean
  readonly navigateToDetails: (scenarioId: UUID) => void
  readonly onCreateClicked: () => void
  readonly scenarios: ScenarioLight[]
  readonly mayFinalizeWithoutPublishing: boolean
}

export const useScenarioOverview = (): UseScenarioOverviewHook => {
  const dispatch = useDispatch()
  const filterOptions = useSelector<AppState, EntityFilterConfig>(state => state.ui.common.entityFilters.scenarios)
  const {userClaimsCheckLoading, userClaims} = useCheckUserClaims()
  const {scenarios: scenariosOption, areScenariosLoading} = useScenarios()
  const {account: user} = useCheckLogin()
  const searchableScenarios = scenariosOption.getOrElse([]).map(scenario => ({...scenario, title: scenario.name}))

  const navigate = (route: Route, payload?: Payload) => dispatch<AppAction>(navigateToRouteAction(route, payload))

  const onCreateClicked = () => navigate(Route.ScenarioCreation)

  return {
    loading: areScenariosLoading,
    onCreateClicked,
    navigateToDetails: (scenarioId: UUID) => navigate(Route.ScenarioDetail, {scenarioId}),
    mayFinalizeWithoutPublishing: !userClaimsCheckLoading && userClaims.mayFinalizeWithoutPublishing,
    scenarios: applyFilterAndSortEntities<ScenarioLight>(
      filterOptions,
      searchableScenarios,
      user.safeAsSubtype(),
      Option.none()
    )
  }
}
