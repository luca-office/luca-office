import * as React from "react"
import {useDispatch} from "react-redux"
import {useScenario, useUpdateScenario} from "shared/graphql/hooks"
import {navigateToRouteAction} from "../../../../../redux/actions/navigation-action"
import {Route} from "../../../../../routes"
import {SampleCompanyDetailView} from "../../../.."

interface Props {
  readonly scenarioId: string
  readonly sampleCompanyId: string
  readonly disabled?: boolean
  readonly hideOperationButtons?: boolean
}

export const SelectedSampleCompanyContainer: React.FC<Props> = ({
  scenarioId,
  sampleCompanyId,
  disabled,
  hideOperationButtons
}) => {
  const {scenario: scenarioOption} = useScenario(scenarioId)
  const {updateScenario} = useUpdateScenario()

  const dispatch = useDispatch()

  const navigateToScenarioDetail = () => dispatch(navigateToRouteAction(Route.ScenarioDetail, {scenarioId}))

  const handleRemoveSampleCompanyFromScenario = () =>
    scenarioOption.forEach(scenario =>
      updateScenario(scenarioId, {
        description: scenario.description,
        name: scenario.name,
        shouldDisplayTime: scenario.shouldDisplayTime,
        shouldHideReferenceBookChapters: scenario.shouldHideReferenceBookChapters,
        tags: scenario.tags,
        completionEmailAddress: scenario.completionEmailAddress,
        date: scenario.date,
        introductionEmailId: scenario.introductionEmailId,
        maxDurationInSeconds: scenario.maxDurationInSeconds,
        sampleCompanyId: null
      }).then(navigateToScenarioDetail)
    )

  return (
    <SampleCompanyDetailView
      disabled={disabled}
      navigationButtonConfig={{
        route: Route.ScenarioDetail,
        payload: {scenarioId},
        labelKey: "scenario_details__header_label"
      }}
      hideSubHeaderOperationButton={true}
      sampleCompanyId={sampleCompanyId}
      selectedForScenarioConfig={{
        scenarioId,
        handleRemoveAssignmentClick: handleRemoveSampleCompanyFromScenario,
        isReadOnly: scenarioOption.exists(scenario => scenario.finalizedAt !== null || scenario.publishedAt !== null)
      }}
      hideOperationButtons={hideOperationButtons}
    />
  )
}
