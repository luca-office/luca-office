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
} from "../../../components"
import {IconName} from "../../../enums"
import {QuestionnaireSurveyResultsForParticipantQuery_questionnaireSurveyResultsForParticipant_questionResults as QuestionResult} from "../../../graphql/generated/QuestionnaireSurveyResultsForParticipantQuery"
import {
  FreetextQuestionCodingCriterion,
  Questionnaire,
  QuestionnaireQuestion,
  QuestionResultsByQuestionId
} from "../../../models"
import {CustomStyle, spacingMedium, TextSize} from "../../../styles"
import {LucaTFunction} from "../../../translations"
import {find} from "../../../utils"
import {QuestionDetailView} from "./question-detail-view"

export interface Props extends CustomStyle {
  readonly t: LucaTFunction
  readonly participantName: string
  readonly questionnaire: Questionnaire
  readonly questionResultsByQuestion: QuestionResultsByQuestionId
  readonly freetextQuestionCodingCriteriaForQuestionnaire: FreetextQuestionCodingCriterion[]
  readonly selectedNodeId: UUID
  readonly updateSelectedNodeId: (id: UUID) => void
}

export const DetailView: React.FC<Props> = props => {
  const {
    t,
    customStyles,
    participantName,
    questionnaire,
    questionResultsByQuestion,
    freetextQuestionCodingCriteriaForQuestionnaire,
    selectedNodeId,
    updateSelectedNodeId
  } = props
  const selectedQuestion = find(question => question.id === selectedNodeId, questionnaire.questions)

  return (
    <Card hasShadow css={customStyles}>
      <CardHeader hasGreyBackground hasShadow>
        <Icon hasSpacing name={IconName.Student} />
        <Text size={TextSize.Medium}>{participantName}</Text>
      </CardHeader>
      <CardContent customStyles={styles.cardContent}>
        {selectedQuestion
          .map(question => (
            <QuestionDetailView
              t={t}
              question={question}
              questionResult={questionResultsByQuestion[question.id]}
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
              showAverageScore={false}
            />
          )}
      </CardContent>
      <CardFooter customStyles={styles.cardFooter}>
        {selectedQuestion
          .map(question => questionFooter(t, question, questionResultsByQuestion[question.id]))
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
      showAverageScoreAsProgress={false}
      t={t}
      averageScore={averageScore}
      score={score}
      maxScore={maxScore}
    />
  )
}

const questionFooter = (t: LucaTFunction, question: QuestionnaireQuestion, questionResult: QuestionResult) => (
  <DetailViewFooter
    showAverageScoreAsProgress={false}
    t={t}
    averageScore={questionResult.averageScore}
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
