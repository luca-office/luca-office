import {useForm, UseFormMethods} from "react-hook-form"
import {useDispatch} from "react-redux"
import {Payload} from "redux-first-router"
import {CodingModelCreation} from "shared/graphql/generated/globalTypes"
import {useCreateCodingModel} from "shared/graphql/hooks"
import {AppAction} from "../../../../redux/actions/app-action"
import {navigateToRouteAction} from "../../../../redux/actions/navigation-action"
import {Route} from "../../../../routes"

export interface CodingModelCreationForm {
  readonly title: string
  readonly description: string
}

export interface UseCreateCodingModelHook {
  readonly createCodingModel: (creation: CodingModelCreation) => void
  readonly createCodingModelLoading: boolean
  readonly formMethods: UseFormMethods<CodingModelCreationForm>
  readonly navigate: (route: Route, payload?: Payload) => AppAction
}

export const useCreateCodingModelModal = (scenarioId: UUID): UseCreateCodingModelHook => {
  const dispatch = useDispatch()
  const navigate = (route: Route, payload?: Payload) => dispatch<AppAction>(navigateToRouteAction(route, payload))

  const {createCodingModel, createCodingModelLoading} = useCreateCodingModel(scenarioId)

  const formMethods = useForm<CodingModelCreationForm>()

  const handleCreateCodingModel = (creation: CodingModelCreation) => {
    createCodingModel(creation).then(codingModelOption =>
      codingModelOption.forEach(codingModel =>
        navigate(Route.ScenarioCodingModelDetail, {
          scenarioId: codingModel.scenario.id,
          codingModelId: codingModel.id
        })
      )
    )
  }

  return {
    createCodingModel: handleCreateCodingModel,
    createCodingModelLoading,
    formMethods,
    navigate
  }
}
