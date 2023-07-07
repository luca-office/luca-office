import {css} from "@emotion/react"
import * as React from "react"
import {DetailViewHeader, LoadingIndicator} from "shared/components"
import {InterventionGroupType, InterventionHeaderGroupType} from "shared/enums"
import {ButtonConfig, Intervention, ScenarioQuestionnaire} from "shared/models"
import {flex1, headerHeight, spacing, spacingHuge, spacingMedium, spacingSmall} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {Option} from "shared/utils"
import {InterventionDetailViewContainer} from "../detail/intervention/intervention-detail-view-container"
import {InterventionGroupEntityBase} from "../detail/intervention-group-entity/intervention-group-entity-detail-view"
import {InterventionGroupEntityDetailViewContainer} from "../detail/intervention-group-entity/intervention-group-entity-detail-view-container"
import {getGroupEntityBaseFromIntervention} from "../utils"
import {InterventionsGroupTypesTableOfContentsContainer} from "./group-type-table-of-contents/group-type-table-of-contents-container"

export interface InterventionsGroupTypeOverviewPropsProps {
  readonly groupEntityId: Option<UUID>
  readonly groupType: Option<InterventionGroupType>
  readonly headerGroupType: InterventionHeaderGroupType
  readonly interventionInDetailView: Option<Intervention>
  readonly interventions: Intervention[]
  readonly isLoading: boolean
  readonly isReadOnly: boolean
  readonly navigateToScenario: () => void
  readonly scenarioId: UUID
  readonly scenarioMaxDurationInSeconds: number
  readonly scenarioQuestionnaires: ScenarioQuestionnaire[]
}

export const InterventionsGroupTypeOverview: React.FC<InterventionsGroupTypeOverviewPropsProps> = ({
  groupEntityId,
  groupType,
  headerGroupType,
  interventionInDetailView,
  interventions,
  isLoading,
  isReadOnly,
  navigateToScenario,
  scenarioId,
  scenarioMaxDurationInSeconds,
  scenarioQuestionnaires
}) => {
  const navigationButtonConfig: ButtonConfig = {
    labelKey: "scenario_title",
    onClick: navigateToScenario
  }

  const {t} = useLucaTranslation()
  const firstInterventionOfGroupEntity = interventions.find(
    intervention =>
      getGroupEntityBaseFromIntervention(intervention, scenarioQuestionnaires).id === groupEntityId.getOrElse("")
  )

  const groupEntityTitle = firstInterventionOfGroupEntity
    ? getGroupEntityBaseFromIntervention(firstInterventionOfGroupEntity, scenarioQuestionnaires).title
    : groupType.contains(InterventionGroupType.Notes)
    ? t("interventions__detail_view_table_of_contents_title_notes")
    : undefined

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
          isLoading={isLoading}
          scenarioId={scenarioId}
          selectedInterventionId={interventionInDetailView.map(intervention => intervention.id)}
          scenarioQuestionnaires={scenarioQuestionnaires}
          groupEntityId={groupEntityId}
        />
        {isLoading && (
          <div css={styles.loading}>
            <LoadingIndicator />
          </div>
        )}
        {interventionInDetailView.isEmpty() && !isLoading && (
          <InterventionGroupEntityDetailViewContainer
            scenarioId={scenarioId}
            scenarioMaxDurationInSeconds={scenarioMaxDurationInSeconds}
            interventions={interventions}
            interventionGroupType={groupType}
            isReadOnly={isReadOnly}
            interventionHeaderGroupType={headerGroupType}
            scenarioQuestionnaires={scenarioQuestionnaires}
            interventionGroupEntity={groupEntityId.flatMap(entityId =>
              Option.of<InterventionGroupEntityBase>(
                groupEntityTitle ? {title: groupEntityTitle, id: entityId} : undefined
              )
            )}
          />
        )}
        {!isLoading &&
          interventionInDetailView
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
