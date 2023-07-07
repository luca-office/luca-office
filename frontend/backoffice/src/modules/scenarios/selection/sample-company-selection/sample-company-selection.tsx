import {css} from "@emotion/react"
import * as React from "react"
import {OverviewCard} from "shared/components"
import {SampleCompany} from "shared/models"
import {isDefined} from "shared/utils"
import {ModuleSelectionContainer} from "../../../common/module-selection/module-selection-container"
import {useSampleCompanySelection} from "./hooks/use-sample-company-selection"

export interface SampleCompanySelectionProps {
  readonly scenarioId: UUID
}

export const SampleCompanySelection: React.FC<SampleCompanySelectionProps> = ({scenarioId}) => {
  const {
    sampleCompanies,
    navigateToScenarioDetail,
    scenarioOption,
    updateScenario,
    openSampleCompany
  } = useSampleCompanySelection(scenarioId)

  return (
    <ModuleSelectionContainer<SampleCompany>
      multiSelection={false}
      onSelectionConfirmed={updateScenario}
      subheaderConfig={{
        entityFilterType: "scenarioSampleCompanySelection",
        labelKey: "sample_companies__selection_header",
        navigationButton: {
          labelKey: "sample_companies__selection_back_button",
          onClick: navigateToScenarioDetail
        },
        customFilterHeaderStyles: css({gridTemplateColumns: "1fr 1fr 3fr"})
      }}
      renderContent={(sampleCompany, footer) => (
        <OverviewCard
          key={sampleCompany.id}
          onClick={() => openSampleCompany(sampleCompany.id)}
          headerText={sampleCompany.name}
          noAnimationOnHover={true}
          text={sampleCompany.description}
          footer={footer}
        />
      )}
      footerConfig={{
        emptySelectionKey: "sample_companies__selection_empty_selection",
        entitySelectionKey: "sample_companies__filter_title"
      }}
      entities={sampleCompanies.filter(company => isDefined(company.publishedAt))}
      alreadyAssignedEntities={sampleCompanies.filter(company =>
        scenarioOption.exists(scenario => scenario.sampleCompanyId === company.id)
      )}
    />
  )
}
