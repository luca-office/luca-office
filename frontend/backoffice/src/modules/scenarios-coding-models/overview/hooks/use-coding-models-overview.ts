import {useDispatch, useSelector} from "react-redux"
import {Payload} from "redux-first-router"
import {NotificationSeverity} from "shared/enums"
import {useCheckLogin, useCodingModels, useDuplicateCodingModel} from "shared/graphql/hooks"
import {scenarioQuery} from "shared/graphql/queries"
import {AppNotification, CodingModel, ScenarioExtendedWithCodingModel} from "shared/models"
import {Option} from "shared/utils"
import {EntityFilterConfig} from "../../../../models"
import {AppAction} from "../../../../redux/actions/app-action"
import {navigateToRouteAction} from "../../../../redux/actions/navigation-action"
import {updateNotification} from "../../../../redux/actions/ui/common-ui-action"
import {AppState} from "../../../../redux/state/app-state"
import {Route} from "../../../../routes"
import {applyFilterAndSortEntities} from "../../../../utils"

export interface UseCodingModelsOverviewHook {
  readonly loading: boolean
  readonly navigateToDetails: (scenarioId: UUID) => void
  readonly onCreateClicked: () => void
  readonly scenariosWithCodingModel: ScenarioExtendedWithCodingModel[]
  readonly onCodingModelCardClicked: (codingModel: CodingModel) => void
}

export const useCodingModelOverviewHook = (scenarioId: UUID): UseCodingModelsOverviewHook => {
  const dispatch = useDispatch()
  const navigate = (route: Route, payload?: Payload) => dispatch<AppAction>(navigateToRouteAction(route, payload))
  const {codingModels, codingModelsLoading} = useCodingModels()
  const {duplicateCodingModel} = useDuplicateCodingModel([{query: scenarioQuery, variables: {id: scenarioId}}])
  const {account: user} = useCheckLogin()

  const filterOptions = useSelector<AppState, EntityFilterConfig>(
    state => state.ui.common.entityFilters.scenarioCodingModels
  )

  const onCreateClicked = () => {
    navigate(Route.ScenarioCodingModelCreate, {scenarioId})
  }

  const sortableEntities: ScenarioExtendedWithCodingModel[] = codingModels.getOrElse([]).map(codingModel => ({
    codingModel,
    createdAt: codingModel.scenario.createdAt,
    description: codingModel.scenario.description,
    finalizedAt: codingModel.scenario.finalizedAt,
    publishedAt: codingModel.scenario.publishedAt,
    id: codingModel.id,
    maxDurationInSeconds: codingModel.scenario.maxDurationInSeconds,
    name: codingModel.scenario.name,
    author: {
      id: codingModel.scenario.author.id,
      lastName: codingModel.scenario.author.lastName
    }
  }))

  const handleOnCodingModelCardClicked = (codingModel: CodingModel) => {
    duplicateCodingModel(codingModel.id, scenarioId)
      .then(codingModelOption =>
        codingModelOption.forEach(codingModel => {
          navigate(Route.ScenarioCodingModelDetail, {scenarioId, codingModelId: codingModel.id})
          dispatch(
            updateNotification(
              Option.of<AppNotification>({
                severity: NotificationSeverity.Success,
                messageKey: "coding_models__overview_duplicate_success"
              })
            )
          )
        })
      )
      .catch(() =>
        dispatch(
          updateNotification(
            Option.of<AppNotification>({
              severity: NotificationSeverity.Error,
              messageKey: "coding_models__overview_duplicate_error"
            })
          )
        )
      )
  }

  return {
    loading: codingModelsLoading,
    onCreateClicked,
    onCodingModelCardClicked: handleOnCodingModelCardClicked,
    navigateToDetails: (scenarioId: UUID) => navigate(Route.ScenarioDetail, {scenarioId}),
    scenariosWithCodingModel: applyFilterAndSortEntities<ScenarioExtendedWithCodingModel>(
      filterOptions,
      sortableEntities,
      user.safeAsSubtype(),
      Option.none()
    )
  }
}
