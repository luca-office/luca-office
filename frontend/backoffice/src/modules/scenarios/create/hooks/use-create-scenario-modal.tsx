import {useForm, UseFormMethods} from "react-hook-form"
import {useDispatch} from "react-redux"
import {Payload} from "redux-first-router"
import {ScenarioCreation} from "shared/graphql/generated/globalTypes"
import {useCreateScenario} from "shared/graphql/hooks"
import {AppAction} from "../../../../redux/actions/app-action"
import {navigateToRouteAction} from "../../../../redux/actions/navigation-action"
import {Route} from "../../../../routes"

export interface ScenarioCreationForm {
  readonly title: string
  readonly description: string
  readonly category: string
}

export interface UseCreateScenarioHook {
  readonly createScenario: (creation: ScenarioCreation) => void
  readonly createScenarioLoading: boolean
  readonly formMethods: UseFormMethods<ScenarioCreationForm>
  readonly navigate: (route: Route, payload?: Payload) => AppAction
}

export const useCreateScenarioModal = (): UseCreateScenarioHook => {
  const dispatch = useDispatch()
  const navigate = (route: Route, payload?: Payload) => dispatch<AppAction>(navigateToRouteAction(route, payload))

  const {createScenario, isCreateScenarioLoading} = useCreateScenario()

  const formMethods = useForm<ScenarioCreationForm>()

  const handleCreateScenario = (creation: ScenarioCreation) => {
    createScenario(creation).then(response =>
      response.forEach(scenario => navigate(Route.ScenarioDetail, {scenarioId: scenario.id}))
    )
  }

  return {
    createScenario: handleCreateScenario,
    createScenarioLoading: isCreateScenarioLoading,
    formMethods,
    navigate
  }
}
