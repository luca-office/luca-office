import * as React from "react"
import {
  Card,
  CardFooter,
  CardHeader,
  ContentLoadingIndicator,
  ContentMissingIndicator,
  DetailViewHeader
} from "shared/components"
import {cardDecorativeBorder, Flex} from "shared/styles"
import {useScenarioDetail} from "../../detail/hooks/use-scenario-detail"
import {InformationContainer} from "../../detail/information/information-container"
import {scenarioDetailStyles as styles} from "../../detail/scenario-detail.style"
import {ScenarioSettings} from "../../detail/settings/scenario-settings"

export interface ScenarioSelectionDetailProps {
  readonly projectId: UUID
  readonly scenarioId: UUID
}

export const ScenarioSelectionDetail: React.FC<ScenarioSelectionDetailProps> = ({scenarioId, projectId}) => {
  const {
    scenario: scenarioOption,
    scenarioLoading,
    navigateToSelection,
    settingsCounts,
    scenarioContributorsCount,
    navigateToEmails,
    navigateToReferenceBookChapters,
    navigateToFilesAndDirectories,
    navigateToSampleCompaniesSelection,
    navigateToCodingModels,
    navigateToEvents,
    navigateToInterventions
  } = useScenarioDetail({scenarioId, projectId})

  return (
    <div css={Flex.column}>
      <DetailViewHeader
        labelKey={"projects__scenario_detail_header_label"}
        navigationButtonConfig={{
          labelKey: "projects__scenario_detail_navigate_back_label",
          onClick: navigateToSelection
        }}
      />
      {scenarioLoading ? (
        <ContentLoadingIndicator />
      ) : (
        scenarioOption
          .map(scenario => (
            <Card customStyles={styles.card}>
              <CardHeader hasShadow={true} hasGreyBackground={true} customStyles={cardDecorativeBorder} />
              <div css={[Flex.column, styles.content]}>
                <InformationContainer
                  {...{
                    scenario,
                    updateInProgress: false,
                    scenarioContributorsCount,
                    isFinalizeScenarioLoading: false,
                    isPublishScenarioLoading: false,
                    duplicateScenarioLoading: false,
                    updateScenario: () => undefined,
                    readonly: true
                  }}
                />
                <ScenarioSettings
                  scenario={scenario}
                  navigateToSampleCompaniesSelection={navigateToSampleCompaniesSelection}
                  navigateToFilesAndDirectories={navigateToFilesAndDirectories}
                  customStyles={styles.settings}
                  isReadOnly={scenario.finalizedAt !== null || scenario.publishedAt !== null}
                  navigateToEmails={navigateToEmails}
                  navigateToCodingModels={navigateToCodingModels}
                  navigateToReferenceBookChapters={navigateToReferenceBookChapters}
                  navigateToInterventions={navigateToInterventions}
                  settingsCount={settingsCounts}
                  navigateToEvents={navigateToEvents}
                />
              </div>
              <CardFooter customStyles={styles.cardFooter} />
            </Card>
          ))
          .getOrElse(<ContentMissingIndicator />)
      )}
    </div>
  )
}
