import {css} from "@emotion/react"
import * as React from "react"
import {OverviewCard} from "shared/components"
import {ScenarioLight} from "shared/models"
import {headerHeight, spacingHuger, spacingLarge, spacingMedium, subHeaderHeight} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {CardDurationInfo} from "../../../components"
import {ModuleSelectionContainer} from "../../common/module-selection/module-selection-container"
import {useScenarioSelection} from "./hooks/use-scenario-selection"

interface Props {
  readonly projectId: UUID
}

export const ScenarioSelection: React.FC<Props> = ({projectId}) => {
  const {
    alreadyAssignedScenarios,
    isProjectFinalized,
    openProjectDetail,
    openSelectionDetail,
    saveScenarioAssignment,
    scenarios,
    userMayFinalizeWithoutPublishing
  } = useScenarioSelection(projectId)

  const {t} = useLucaTranslation()

  return (
    <ModuleSelectionContainer<ScenarioLight>
      customCardOverviewStyles={styles.cardOverview}
      entities={scenarios}
      multiSelection={true}
      alreadyAssignedEntities={alreadyAssignedScenarios}
      onSelectionConfirmed={saveScenarioAssignment}
      userMayFinalizeWithoutPublishing={userMayFinalizeWithoutPublishing}
      subheaderConfig={{
        entityFilterType: isProjectFinalized ? "scenarioSelectionPublished" : "scenarioSelection",
        labelKey: "projects__scenario_header_label",
        navigationButton: {
          labelKey: "projects__header_details_label",
          onClick: openProjectDetail
        },
        customFilterHeaderStyles: css({gridTemplateColumns: "1fr 1fr 1fr 3fr"})
      }}
      footerConfig={{
        emptySelectionKey: "project_module_selection__empty_selection_scenario",
        entitySelectionKey: "project_module_selection__selected_scenario"
      }}
      renderContent={(scenario, footer) => (
        <OverviewCard
          key={scenario.id}
          onClick={() => openSelectionDetail(scenario.id)}
          headerText={scenario.name}
          headerInfo={<CardDurationInfo maxDurationInSeconds={scenario.maxDurationInSeconds} t={t} />}
          noAnimationOnHover={true}
          text={scenario.description}
          footer={footer}
          tags={scenario.tags}
        />
      )}
      getEditingStatusConfig={scenario => ({isFinalized: !!scenario.finalizedAt, isPublished: !!scenario.publishedAt})}
    />
  )
}

const styles = {
  cardOverview: css({
    maxHeight: `calc(100vh - ${2 * headerHeight + 2 * subHeaderHeight + spacingHuger + spacingLarge + spacingMedium}px)`
  })
}
