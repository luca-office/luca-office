import {CSSInterpolation} from "@emotion/serialize"
import React from "react"
import {HeadingLevel, IconName} from "../../enums"
import {Questionnaire, QuestionResultsByQuestionId} from "../../models"
import {flex1, spacingMedium, TextSize} from "../../styles"
import {LucaTFunction} from "../../translations"
import {roundNumber, sortByPosition} from "../../utils"
import {getQuestionTypeIconName, Heading, RatingOverviewTable, Text} from ".."

interface ReportingFinalScoreQuestionnaireDetailViewProps {
  readonly questionnaire: Questionnaire
  readonly questionResultsByQuestion: QuestionResultsByQuestionId
  readonly navigateToQuestion: (questionId: UUID) => void
  readonly t: LucaTFunction
  readonly showAverageScore: boolean
}

export const ReportingFinalScoreQuestionnaireDetailView: React.FC<ReportingFinalScoreQuestionnaireDetailViewProps> = ({
  questionnaire,
  questionResultsByQuestion,
  navigateToQuestion,
  showAverageScore,
  t
}) => {
  const entities = sortByPosition(questionnaire.questions).map(question => ({
    id: question.id,
    title: question.text,
    position: question.position,
    scoringType: question.scoringType,
    score: questionResultsByQuestion[question.id].score,
    maxScore: questionResultsByQuestion[question.id].maximumScore,
    averageScore: roundNumber(questionResultsByQuestion[question.id].averageScore),
    iconName: getQuestionTypeIconName(question.questionType),
    rated: true
  }))

  return (
    <div css={styles.wrapper}>
      <Heading level={HeadingLevel.h2}>{questionnaire.title}</Heading>
      <Text customStyles={styles.spacingTop} size={TextSize.Medium}>
        {questionnaire.description}
      </Text>
      <RatingOverviewTable
        customStyles={styles.table}
        customTableWrapperStyles={styles.tableWrapper}
        entities={entities}
        onClick={navigateToQuestion}
        scoringName={t("rating_scenario__scoring_label")}
        entityName={t("questions")}
        enumerate={true}
        title={t("question")}
        iconName={IconName.QuestionnaireCascade}
        isReadonly={true}
        isNotRatable={false}
        showStatusIcons={false}
        showAverageScore={showAverageScore}
      />
    </div>
  )
}

const styles: Record<string, CSSInterpolation> = {
  table: {
    marginTop: spacingMedium,
    display: "flex",
    flexDirection: "column",
    flex: flex1,
    overflow: "auto"
  },
  spacingTop: {
    marginTop: spacingMedium
  },
  wrapper: {
    display: "flex",
    flex: "1 1 auto",
    flexDirection: "column"
  },
  tableWrapper: {
    display: "flex",
    flex: "1 1 0",
    overflow: "auto",
    flexDirection: "column"
  }
}
