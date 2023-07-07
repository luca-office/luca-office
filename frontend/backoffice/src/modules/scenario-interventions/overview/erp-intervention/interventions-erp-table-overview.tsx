import {css} from "@emotion/react"
import * as React from "react"
import {DetailViewHeader, LoadingIndicator} from "shared/components"
import {ErpType, InterventionGroupType, InterventionHeaderGroupType} from "shared/enums"
import {ButtonConfig, ErpRowOpeningIntervention, Intervention, ScenarioQuestionnaire} from "shared/models"
import {flex1, headerHeight, spacing, spacingHuge, spacingMedium, spacingSmall} from "shared/styles"
import {Option} from "shared/utils"
import {InterventionDetailViewContainer} from "../../detail/intervention/intervention-detail-view-container"
import {
  InterventionGroupEntityBase,
  InterventionGroupEntityDetailViewContainer
} from "../../detail/intervention-group-entity/intervention-group-entity-detail-view-container"
import {InterventionsGroupTypesTableOfContentsContainer} from "../group-type-table-of-contents/group-type-table-of-contents-container"

export interface InterventionsGroupTypeOverviewPropsProps {
  readonly erpType: ErpType
  readonly erpRowId: Option<number>
  readonly headerGroupType: InterventionHeaderGroupType
  readonly interventions: Intervention[]
  readonly interventionInDetail: Option<ErpRowOpeningIntervention>
  readonly isLoading: boolean
  readonly isReadOnly: boolean
  readonly navigateToScenario: () => void
  readonly scenarioId: UUID
  readonly scenarioQuestionnaires: ScenarioQuestionnaire[]
}

export const InterventionsErpTableOverview: React.FC<InterventionsGroupTypeOverviewPropsProps> = ({
  headerGroupType,
  interventions,
  isLoading,
  interventionInDetail,
  erpRowId,
  isReadOnly,
  erpType,
  navigateToScenario,
  scenarioId,
  scenarioQuestionnaires
}) => {
  const navigationButtonConfig: ButtonConfig = {
    labelKey: "scenario_title",
    onClick: navigateToScenario
  }

  return (
    <div css={styles.wrapper}>
      <DetailViewHeader
        labelKey={"interventions__detail_view_header_label"}
        navigationButtonConfig={navigationButtonConfig}
      />
      <div css={styles.content}>
        <InterventionsGroupTypesTableOfContentsContainer
          headerGroupType={headerGroupType}
          interventions={interventions}
          erpConfig={{erpType, rowId: erpRowId}}
          isLoading={isLoading}
          scenarioId={scenarioId}
          selectedInterventionId={interventionInDetail.map(intervention => intervention.id)}
          scenarioQuestionnaires={scenarioQuestionnaires}
          groupEntityId={Option.none()}
        />
        {isLoading && (
          <div css={styles.loading}>
            <LoadingIndicator />
          </div>
        )}
        {!isLoading && interventionInDetail.isEmpty() && (
          <InterventionGroupEntityDetailViewContainer
            scenarioId={scenarioId}
            scenarioMaxDurationInSeconds={0}
            erpConfig={{erpType, rowId: erpRowId}}
            interventions={interventions}
            interventionGroupType={Option.of<InterventionGroupType>(InterventionGroupType.Erp)}
            isReadOnly={isReadOnly}
            interventionHeaderGroupType={headerGroupType}
            scenarioQuestionnaires={scenarioQuestionnaires}
            interventionGroupEntity={Option.of<InterventionGroupEntityBase>({title: erpType, id: erpType})}
          />
        )}
        {!isLoading &&
          interventionInDetail
            .map(intervention => (
              <InterventionDetailViewContainer
                headerGroupType={headerGroupType}
                intervention={intervention}
                scenarioQuestionnaires={scenarioQuestionnaires}
                isReadOnly={isReadOnly}
              />
            ))
            .orNull()}
      </div>
    </div>
  )
}

const Spacing = {
  // The content-card spacing consists of the header, the sub-header and its padding and the padding of the content
  contentCard: 2 * headerHeight + 2 * spacingSmall + 2 * spacingMedium
}

const styles = {
  wrapper: css({
    display: "flex",
    flexDirection: "column",
    height: `calc(100vh - ${headerHeight}px)`
  }),
  loading: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }),
  content: css({
    flex: flex1,
    display: "grid",
    gap: spacingMedium,
    gridTemplateColumns: "350px minmax(0, 3fr)",
    padding: spacing(spacingMedium, spacingHuge)
  }),
  card: css({
    maxHeight: `calc(100vh - ${Spacing.contentCard}px)`
  }),
  cardContent: css({
    overflow: "auto"
  }),
  preview: css({
    width: "90vw",
    height: "90vh"
  })
}
