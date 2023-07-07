import * as React from "react"
import {Card, CardHeader, Icon, Text} from "../../components"
import {ScoringMetadata} from "../../components/scoring-overlay/scoring-metadata/scoring-metadata"
import {IconName} from "../../enums"
import {
  CodingDimension,
  CodingItemResultByItemId,
  CodingModel,
  Project,
  Scenario,
  ScenarioSurveyResultsForParticipant,
  SurveyLight
} from "../../models"
import {spacingHuge, spacingMedium, TextSize, tocFlexSizing} from "../../styles"
import {LucaTFunction} from "../../translations"
import {buildParticipantScenarioReportingTree, Option, sortByPosition} from "../../utils"
import {DetailView} from "./detail-view/detail-view"
import {Toc} from "./toc/toc"

interface Props {
  readonly t: LucaTFunction
  readonly participantName: string
  readonly project: Project
  readonly survey: SurveyLight
  readonly codingDimensions: CodingDimension[]
  readonly codingModel: CodingModel
  readonly scenario: Scenario
  readonly scenarioSurveyResultsForParticipant: ScenarioSurveyResultsForParticipant
  readonly selectedNodeId: Option<UUID>
  readonly updateSelectedNodeId: (nodeId: UUID) => void
  readonly navigateToOverview: () => void
  readonly onCloseOverlay: () => void
}

export const ReportingScenarioOverlay: React.FC<Props> = props => {
  const {
    t,
    participantName,
    project,
    survey,
    codingDimensions,
    codingModel,
    selectedNodeId,
    scenario,
    scenarioSurveyResultsForParticipant,
    updateSelectedNodeId,
    navigateToOverview,
    onCloseOverlay
  } = props

  const codingItemResultByItemId = scenarioSurveyResultsForParticipant.codingItemResults.reduce<CodingItemResultByItemId>(
    (results, current) => ({...results, [current.itemId]: current}),
    {}
  )

  const codingNodes = sortByPosition(codingDimensions)
    .filter(dimension => dimension.parentDimensionId === null)
    .map((parentDimension, index) =>
      buildParticipantScenarioReportingTree({
        parentDimension,
        allDimensions: codingDimensions,
        mainDimensionIndex: index,
        codingItemsResultById: codingItemResultByItemId
      })
    )

  return (
    <Card customStyles={styles.card}>
      <CardHeader customStyles={styles.header} hasGreyBackground hasShadow>
        <Text size={TextSize.Medium}>{t("reporting_scoring__overlay_title_participant", {name: participantName})}</Text>
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
          codingItemResultsByItem={codingItemResultByItemId}
          selectedNodeId={selectedNodeId}
          updateSelectedNodeId={updateSelectedNodeId}
        />
        <DetailView
          t={t}
          customStyles={styles.detailView}
          participantName={participantName}
          codingDimensions={codingDimensions}
          codingModel={codingModel}
          codingItemResultByItemId={codingItemResultByItemId}
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
