import * as React from "react"
import {useScenario, useUpdateScenario} from "shared/graphql/hooks"
import {Scenario} from "shared/models"
import {EditScenarioDateModal} from "./edit-date-modal"

export interface Props {
  readonly scenario: Scenario
  readonly onDismiss: () => void
  readonly onConfirm: () => void
}

export const EditScenarioDateModalContainer: React.FC<Props> = ({onConfirm, onDismiss, scenario}) => {
  const {scenario: scenarioOption} = useScenario(scenario.id)
  const {updateScenario} = useUpdateScenario()

  const [isFictiveDateSelected, setIsFictiveDateSelected] = React.useState(scenario.date !== null)
  const [selectedFictiveDate, setSelectedFictiveDate] = React.useState<Date>(
    scenario.date !== null ? new Date(scenario.date) : new Date()
  )

  const handleSubmit = (date: string | null | undefined) => {
    scenarioOption.forEach(scenario => {
      updateScenario(scenario.id, {
        description: scenario.description,
        name: scenario.name,
        shouldDisplayTime: scenario.shouldDisplayTime,
        shouldHideReferenceBookChapters: scenario.shouldHideReferenceBookChapters,
        tags: scenario.tags,
        completionEmailAddress: scenario.completionEmailAddress,
        date,
        introductionEmailId: scenario.introductionEmailId,
        sampleCompanyId: scenario.sampleCompanyId,
        maxDurationInSeconds: scenario.maxDurationInSeconds
      }).then(onConfirm)
    })
  }

  return (
    <EditScenarioDateModal
      setSelectedFictiveDate={setSelectedFictiveDate}
      selectedFictiveDate={selectedFictiveDate}
      isFictiveDateSelected={isFictiveDateSelected}
      setIsFictiveDateSelected={setIsFictiveDateSelected}
      onConfirm={handleSubmit}
      onDismiss={onDismiss}
    />
  )
}
