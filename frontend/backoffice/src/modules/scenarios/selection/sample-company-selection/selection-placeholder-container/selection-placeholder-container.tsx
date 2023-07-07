import * as React from "react"
import {useDispatch} from "react-redux"
import {navigateToRouteAction} from "../../../../../redux/actions/navigation-action"
import {Route} from "../../../../../routes"
import {ModuleSelectionPlaceholder} from "../../../../common"

interface SampleCompanySelectionPlaceholderContainerProps {
  readonly scenarioId: UUID
  readonly disabled?: boolean
}

export const SampleCompanySelectionPlaceholderContainer: React.FC<SampleCompanySelectionPlaceholderContainerProps> = ({
  scenarioId,
  disabled
}) => {
  const dispatch = useDispatch()
  const navigateToSelect = () => dispatch(navigateToRouteAction(Route.ScenarioSampleCompanySelection, {scenarioId}))
  const navigateToScenario = () => dispatch(navigateToRouteAction(Route.ScenarioDetail, {scenarioId}))

  return (
    <ModuleSelectionPlaceholder
      subheaderConfig={{
        labelKey: "sample_companies__header_label_selection",
        navigationButton: {labelKey: "scenario_details__header_label", onClick: navigateToScenario}
      }}
      onCreateClick={navigateToSelect}
      entityKey="sample_companies__filter_title"
      disabled={disabled}
    />
  )
}
