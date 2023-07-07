import * as React from "react"
import {Card, CardHeader, Icon, Text} from "shared/components"
import {ScoringMetadata} from "shared/components/scoring-overlay/scoring-metadata/scoring-metadata"
import {IconName} from "shared/enums"
import {
  CodingDimension,
  CodingItemResultsByItemId,
  CodingModel,
  Project,
  Scenario,
  ScenarioSurveyResultsForParticipant,
  SurveyLight
} from "shared/models"
import {spacingHuge, spacingMedium, TextSize, tocFlexSizing} from "shared/styles"
import {LucaTFunction} from "shared/translations"
import {buildParticipantsScenarioReportingTree, Option, sortByPosition} from "shared/utils"
import {DetailView} from "./detail-view/detail-view"
import {Toc} from "./toc/toc"

interface Props {
  readonly t: LucaTFunction
  readonly project: Project
  readonly survey: SurveyLight
  readonly codingDimensions: CodingDimension[]
  readonly codingModel: CodingModel
  readonly scenario: Scenario
  readonly scenarioSurveyResultsForParticipants: ScenarioSurveyResultsForParticipant[]
  readonly selectedNodeId: Option<UUID>
  readonly updateSelectedNodeId: (nodeId: UUID) => void
  readonly navigateToOverview: () => void
  readonly onCloseOverlay: () => void
}

export const ReportingScenarioAllParticipantsOverlay: React.FC<Props> = props => {
  const {
    t,
    project,
    survey,
    codingDimensions,
    codingModel,
    selectedNodeId,
    scenario,
    scenarioSurveyResultsForParticipants,
    updateSelectedNodeId,
    navigateToOverview,
    onCloseOverlay
  } = props

  const allItemResults = scenarioSurveyResultsForParticipants.flatMap(result => result.codingItemResults)

  const codingItemResultsByItemId = allItemResults.reduce<CodingItemResultsByItemId>(
    (results, codingItem) => ({
      ...results,
      [codingItem.itemId]: [...(results[codingItem.itemId] ?? []), codingItem]
    }),
    {}
  )

  const codingNodes = sortByPosition(codingDimensions)
    .filter(dimension => dimension.parentDimensionId === null)
    .map((parentDimension, index) =>
      buildParticipantsScenarioReportingTree({
        parentDimension,
        allDimensions: codingDimensions,
        mainDimensionIndex: index,
        codingItemResultsByItemId
      })
    )

  return (
    <Card customStyles={styles.card}>
      <CardHeader customStyles={styles.header} hasGreyBackground hasShadow>
        <Text size={TextSize.Medium}>
          {t("reporting_scoring__overlay_title_all", {count: scenarioSurveyResultsForParticipants.length})}
        </Text>
        <Icon customStyles={styles.headerCloseButton} name={IconName.Close} onClick={onCloseOverlay} />
      </CardHeader>
      <ScoringMetadata
        dataLoading={false}
        customStyles={styles.metadata}
        projectName={project.name}
        surveyName={survey.title}
        projectModuleName={scenario.name}
        projectModuleIcon={IconName.ClipboardFilled}
      />
      <div css={styles.content}>
        <Toc
          t={t}
          customStyles={styles.toc}
          navigateToOverview={navigateToOverview}
          nodes={codingNodes}
          scenarioSurveyResultsForParticipants={scenarioSurveyResultsForParticipants}
          selectedNodeId={selectedNodeId}
          updateSelectedNodeId={updateSelectedNodeId}
        />
        <DetailView
          t={t}
          scenarioSurveyResultsForParticipants={scenarioSurveyResultsForParticipants}
          participantsCount={scenarioSurveyResultsForParticipants.length}
          customStyles={styles.detailView}
          codingDimensions={codingDimensions}
          codingModel={codingModel}
          codingItemResultsByItem={codingItemResultsByItemId}
          selectedNodeId={selectedNodeId}
          updateSelectedNodeId={updateSelectedNodeId}
        />
      </div>
    </Card>
  )
}

const styles = {
  header: {
    justifyContent: "space-between"
  },
  headerCloseButton: {
    cursor: "pointer"
  },
  metadata: {
    flex: "0 0 auto",
    padding: spacingMedium,
    paddingBottom: 0
  },
  content: {
    flex: "1 1 auto",
    display: "flex",
    padding: spacingMedium
  },
  toc: {
    flex: tocFlexSizing
  },
  tocBody: {
    flex: "1 1 0"
  },
  detailView: {
    flex: "1 1 0",
    marginLeft: spacingMedium
  },
  card: {
    width: `calc(100vw - ${spacingHuge}px)`,
    height: `calc(100vh - ${spacingMedium}px)`
  }
}
