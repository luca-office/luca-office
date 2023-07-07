import * as React from "react"
import {Card, CardHeader, Icon, Text} from "shared/components"
import {ScoringMetadata} from "shared/components/scoring-overlay/scoring-metadata/scoring-metadata"
import {IconName} from "shared/enums"
import {
  FreetextQuestionCodingCriterion,
  Project,
  Questionnaire,
  QuestionnaireSurveyResultsForParticipant,
  QuestionResultsByQuestionId,
  SurveyInvitationLight,
  SurveyLight
} from "shared/models"
import {spacingHuge, spacingMedium, TextSize, tocFlexSizing} from "shared/styles"
import {LucaTFunction} from "shared/translations"
import {first} from "shared/utils"
import {DetailView} from "./detail-view/detail-view"
import {Toc} from "./toc/toc"

interface Props {
  readonly t: LucaTFunction
  readonly project: Project
  readonly survey: SurveyLight
  readonly questionnaire: Questionnaire
  readonly questionnaireSurveyResultsForParticipants: QuestionnaireSurveyResultsForParticipant[]
  readonly freetextQuestionCodingCriteriaForQuestionnaire: FreetextQuestionCodingCriterion[]
  readonly selectedNodeId: UUID
  readonly surveyInvitations: SurveyInvitationLight[]
  readonly updateSelectedNodeId: (id: UUID) => void
  readonly onCloseOverlay: () => void
}

export const ReportingQuestionnaireAllParticipantsOverlay: React.FC<Props> = props => {
  const {
    t,
    project,
    survey,
    questionnaire,
    questionnaireSurveyResultsForParticipants,
    freetextQuestionCodingCriteriaForQuestionnaire,
    selectedNodeId,
    updateSelectedNodeId,
    onCloseOverlay,
    surveyInvitations
  } = props

  const questionResults = first(questionnaireSurveyResultsForParticipants).map(result => result.questionResults)

  const questionResultsByQuestion = questionResults
    .getOrElse([])
    .reduce<QuestionResultsByQuestionId>((results, current) => ({...results, [current.questionId]: current}), {})

  return (
    <Card customStyles={styles.card}>
      <CardHeader customStyles={styles.header} hasGreyBackground hasShadow>
        <Text size={TextSize.Medium}>
          {t("reporting_scoring__overlay_title_all", {count: questionnaireSurveyResultsForParticipants.length})}
        </Text>
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
          questionnaireSurveyResultsForParticipants={questionnaireSurveyResultsForParticipants}
          selectedNodeId={selectedNodeId}
          updateSelectedNode={updateSelectedNodeId}
        />
        <DetailView
          t={t}
          customStyles={styles.detailView}
          surveyInvitations={surveyInvitations}
          questionnaire={questionnaire}
          questionResultsByQuestion={questionResultsByQuestion}
          questionnaireSurveyResultsForParticipants={questionnaireSurveyResultsForParticipants}
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
