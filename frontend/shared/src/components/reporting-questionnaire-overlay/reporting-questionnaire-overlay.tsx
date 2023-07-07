import * as React from "react"
import {Card, CardHeader, Icon, Text} from "../../components"
import {ScoringMetadata} from "../../components/scoring-overlay/scoring-metadata/scoring-metadata"
import {IconName} from "../../enums"
import {
  FreetextQuestionCodingCriterion,
  Project,
  Questionnaire,
  QuestionnaireSurveyResultsForParticipant,
  QuestionResultsByQuestionId,
  SurveyLight
} from "../../models"
import {spacingHuge, spacingMedium, TextSize, tocFlexSizing} from "../../styles"
import {LucaTFunction} from "../../translations"
import {DetailView} from "./detail-view/detail-view"
import {Toc} from "./toc/toc"

interface Props {
  readonly t: LucaTFunction
  readonly participantName: string
  readonly project: Project
  readonly survey: SurveyLight
  readonly questionnaire: Questionnaire
  readonly questionnaireSurveyResultsForParticipant: QuestionnaireSurveyResultsForParticipant
  readonly freetextQuestionCodingCriteriaForQuestionnaire: FreetextQuestionCodingCriterion[]
  readonly selectedNodeId: UUID
  readonly updateSelectedNodeId: (id: UUID) => void
  readonly onCloseOverlay: () => void
}

export const ReportingQuestionnaireOverlay: React.FC<Props> = props => {
  const {
    t,
    participantName,
    project,
    survey,
    questionnaire,
    questionnaireSurveyResultsForParticipant,
    freetextQuestionCodingCriteriaForQuestionnaire,
    selectedNodeId,
    updateSelectedNodeId,
    onCloseOverlay
  } = props
  const questionResultsByQuestion = questionnaireSurveyResultsForParticipant.questionResults.reduce<QuestionResultsByQuestionId>(
    (results, current) => ({...results, [current.questionId]: current}),
    {}
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
        projectModuleName={questionnaire.title}
        projectModuleIcon={IconName.ClipboardFilled}
      />
      <div css={styles.content}>
        <Toc
          t={t}
          customStyles={styles.toc}
          customTocBodyStyles={styles.tocBody}
          questionnaire={questionnaire}
          questionResultsByQuestion={questionResultsByQuestion}
          selectedNodeId={selectedNodeId}
          updateSelectedNode={updateSelectedNodeId}
        />
        <DetailView
          t={t}
          customStyles={styles.detailView}
          participantName={participantName}
          questionnaire={questionnaire}
          questionResultsByQuestion={questionResultsByQuestion}
          freetextQuestionCodingCriteriaForQuestionnaire={freetextQuestionCodingCriteriaForQuestionnaire}
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
