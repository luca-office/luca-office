import * as React from "react"
import {ScenarioUpdate} from "shared/graphql/generated/globalTypes"
import {Scenario} from "shared/models"
import {Information} from "./information"

export interface InformationContainerProps {
  readonly duplicateScenarioLoading: boolean
  readonly isFinalizeScenarioLoading: boolean
  readonly isPublishScenarioLoading: boolean
  readonly scenario: Scenario
  readonly scenarioContributorsCount: number
  readonly updateInProgress: boolean
  readonly updateScenario: (id: string, update: ScenarioUpdate) => void
  readonly readonly?: boolean
}

export const InformationContainer: React.FC<InformationContainerProps> = props => {
  const [isInviteContributorsModalVisible, setIsInviteContributorsModalVisible] = React.useState(false)
  const [isEditDateModalVisible, setIsEditDateModalVisible] = React.useState(false)
  const [isEditDurationModalVisible, setIsEditDurationModalVisible] = React.useState(false)

  const toggleIsInviteContributorsModalVisible = () =>
    setIsInviteContributorsModalVisible(!isInviteContributorsModalVisible)

  const toggleIsEditDateModalVisible = () => setIsEditDateModalVisible(!isEditDateModalVisible)

  const toggleIsEditDurationModalVisible = () => setIsEditDurationModalVisible(!isEditDurationModalVisible)

  return (
    <Information
      isEditDateModalVisible={isEditDateModalVisible}
      isInviteContributorsModalVisible={isInviteContributorsModalVisible}
      isEditDurationModalVisible={isEditDurationModalVisible}
      toggleIsEditDateModalVisible={toggleIsEditDateModalVisible}
      toggleIsInviteContributorsModalVisible={toggleIsInviteContributorsModalVisible}
      toggleIsEditDurationModalVisible={toggleIsEditDurationModalVisible}
      {...props}
    />
  )
}
