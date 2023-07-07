import {CSSInterpolation} from "@emotion/serialize"
import {sumBy} from "lodash-es"
import * as React from "react"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  DetailViewFooter,
  Icon,
  ReportingFinalScoreQuestionnaireDetailView,
  Text
} from "shared/components"
import {IconName} from "shared/enums"
import {QuestionnaireSurveyResultsForParticipantQuery_questionnaireSurveyResultsForParticipant_questionResults as QuestionResult} from "shared/graphql/generated/QuestionnaireSurveyResultsForParticipantQuery"
import {
  FreetextQuestionCodingCriterion,
  Questionnaire,
  QuestionnaireSurveyResultsForParticipant,
  QuestionResultsByQuestionId,
  SurveyInvitationLight
} from "shared/models"
import {CustomStyle, spacingMedium, TextSize} from "shared/styles"
import {LucaTFunction} from "shared/translations"
import {find} from "shared/utils"
import {QuestionDetailView} from "./question-detail-view"

export interface Props extends CustomStyle {
  readonly t: LucaTFunction
  readonly questionnaire: Questionnaire
  readonly questionnaireSurveyResultsForParticipants: QuestionnaireSurveyResultsForParticipant[]
  readonly questionResultsByQuestion: QuestionResultsByQuestionId
  readonly freetextQuestionCodingCriteriaForQuestionnaire: FreetextQuestionCodingCriterion[]
  readonly selectedNodeId: UUID
  readonly updateSelectedNodeId: (id: UUID) => void
  readonly surveyInvitations: SurveyInvitationLight[]
}

export const DetailView: React.FC<Props> = props => {
  const {
    t,
    customStyles,
    questionnaire,
    questionnaireSurveyResultsForParticipants,
    freetextQuestionCodingCriteriaForQuestionnaire,
    questionResultsByQuestion,
    selectedNodeId,
    updateSelectedNodeId,
    surveyInvitations
  } = props

  const selectedQuestion = find(question => question.id === selectedNodeId, questionnaire.questions)

  return (
    <Card hasShadow css={customStyles}>
      <CardHeader hasGreyBackground hasShadow>
        <Icon hasSpacing name={IconName.Student} />
        <Text size={TextSize.Medium}>
          {t("reporting_scoring__scenario_details_header", {count: questionnaireSurveyResultsForParticipants.length})}
        </Text>
      </CardHeader>
      <CardContent customStyles={styles.cardContent}>
        {selectedQuestion
          .map(question => (
            <QuestionDetailView
              t={t}
              question={question}
              questionResult={questionResultsByQuestion[question.id]}
              surveyInvitations={surveyInvitations}
              questionnaireSurveyResultsForParticipants={questionnaireSurveyResultsForParticipants}
              freetextQuestionCodingCriteria={freetextQuestionCodingCriteriaForQuestionnaire.filter(
                criterion => criterion.questionId === question.id
              )}
            />
          ))
          .getOrElse(
            <ReportingFinalScoreQuestionnaireDetailView
              t={t}
              questionnaire={questionnaire}
              questionResultsByQuestion={questionResultsByQuestion}
              navigateToQuestion={updateSelectedNodeId}
              showAverageScore={true}
            />
          )}
      </CardContent>
      <CardFooter customStyles={styles.cardFooter}>
        {selectedQuestion
          .map(question => questionFooter(t, questionResultsByQuestion[question.id]))
          .getOrElse(questionnaireFooter(t, questionResultsByQuestion))}
      </CardFooter>
    </Card>
  )
}

const questionnaireFooter = (t: LucaTFunction, questionResultsByQuestion: QuestionResultsByQuestionId) => {
  const questionResults = Object.values(questionResultsByQuestion)
  const score = sumBy(questionResults, result => result.score)
  const maxScore = sumBy(questionResults, result => result.maximumScore)
  const averageScore = sumBy(questionResults, result => result.averageScore)

  return (
    <DetailViewFooter
      showAverageScoreAsProgress
      customLabelKey="rating__average_score_label"
      t={t}
      averageScore={averageScore}
      score={score}
      maxScore={maxScore}
    />
  )
}

const questionFooter = (t: LucaTFunction, questionResult: QuestionResult) => (
  <DetailViewFooter
    showAverageScoreAsProgress
    t={t}
    averageScore={questionResult.averageScore}
    customLabelKey="rating__average_score_label"
    score={questionResult.score}
    maxScore={questionResult.maximumScore}
  />
)

const styles: Record<string, CSSInterpolation> = {
  cardContent: {
    flex: "1 1 0",
    padding: spacingMedium,
    boxSizing: "border-box",
    overflow: "auto"
  },
  cardFooter: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch"
  }
}
