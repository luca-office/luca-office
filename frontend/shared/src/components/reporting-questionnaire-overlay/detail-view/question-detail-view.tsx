import {css} from "@emotion/react"
import * as React from "react"
import {
  Checkbox,
  Heading,
  Paper,
  RadioButton,
  ReportingClosedQuestionAnswersTable,
  ReportingCriteriaTable,
  Text
} from "../../../components"
import {HeadingLevel} from "../../../enums"
import {QuestionScoringType, QuestionType, ScoringType} from "../../../graphql/generated/globalTypes"
import {QuestionnaireSurveyResultsForParticipantQuery_questionnaireSurveyResultsForParticipant_questionResults as QuestionResult} from "../../../graphql/generated/QuestionnaireSurveyResultsForParticipantQuery"
import {FreetextQuestionCodingCriterion, QuestionnaireAnswer, QuestionnaireQuestion} from "../../../models"
import {
  border,
  fontColor,
  fontColorLight,
  FontWeight,
  spacingLarge,
  spacingMedium,
  spacingSmall,
  textEllipsis,
  TextSize
} from "../../../styles"
import {LucaTFunction} from "../../../translations"

interface Props {
  readonly t: LucaTFunction
  readonly question: QuestionnaireQuestion
  readonly questionResult: QuestionResult
  readonly freetextQuestionCodingCriteria: FreetextQuestionCodingCriterion[]
}

export const QuestionDetailView: React.FC<Props> = ({t, question, questionResult, freetextQuestionCodingCriteria}) => (
  <div>
    <Heading customStyles={styles.heading} level={HeadingLevel.h2}>
      {question.text}
    </Heading>
    {question.questionType === QuestionType.FreeText ? (
      freetextContent(t, question, questionResult, freetextQuestionCodingCriteria)
    ) : (
      <ReportingClosedQuestionAnswersTable
        renderAnswerContentColumn={answer =>
          renderAnswerContentColumn(answer, questionResult.selectedAnswerIds, question)
        }
        t={t}
        question={question}
        selectedAnswerIds={questionResult.selectedAnswerIds}
      />
    )}
  </div>
)

const renderAnswerContentColumn = (
  answer: QuestionnaireAnswer,
  selectedAnswerIds: UUID[],
  question: QuestionnaireQuestion
) => {
  const isSelected = selectedAnswerIds.includes(answer.id)
  return (
    <div css={styles.answerTextContent}>
      {question.questionType === QuestionType.SingleChoice ? (
        <RadioButton disabled={true} selected={isSelected} />
      ) : (
        <Checkbox disabled={true} checked={isSelected} />
      )}
      <Text customStyles={styles.answerLabel(isSelected)} size={TextSize.Medium}>
        {answer.text}
      </Text>
    </div>
  )
}

const freetextContent = (
  t: LucaTFunction,
  question: QuestionnaireQuestion,
  questionResult: QuestionResult,
  freetextQuestionCodingCriteria: FreetextQuestionCodingCriterion[]
) => {
  const freetextAnswer = questionResult.freetextAnswer
  const isFreetextAnswerNonempty = freetextAnswer !== ""

  return (
    <React.Fragment>
      <div css={styles.freetextAnswerWrapper}>
        <Heading customStyles={styles.label} level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
          {t("rating__freetext_answer_label")}:
        </Heading>
        <Paper customStyles={[styles.freeTextPaper]}>
          <Text size={TextSize.Medium} customStyles={isFreetextAnswerNonempty ? undefined : styles.freeTextPlaceholder}>
            {isFreetextAnswerNonempty ? freetextAnswer : t("common__no_data")}
          </Text>
        </Paper>
      </div>
      <ReportingCriteriaTable
        t={t}
        customStyles={styles.table}
        scoringType={
          question.scoringType === QuestionScoringType.Analytical ? ScoringType.Analytical : ScoringType.Holistic
        }
        criteria={freetextQuestionCodingCriteria}
        selectedCriteriaIds={questionResult.selectedCriteriaIds}
        noCriterionFulfilled={questionResult.noCriterionFulfilled}
      />
    </React.Fragment>
  )
}

const styles = {
  heading: {
    marginBottom: spacingMedium
  },
  label: css({
    textAlign: "initial"
  }),
  freetextAnswerWrapper: {
    display: "grid",
    gridTemplateRows: "minmax(min-content, max-content) 1fr",
    gridRowGap: spacingSmall
  },
  freeTextPaper: {
    padding: spacingSmall
  },
  freeTextPlaceholder: {
    color: fontColorLight
  },
  table: {
    marginTop: spacingLarge
  },
  answerTextContent: {
    display: "grid",
    gridTemplateColumns: "minmax(min-content, max-content) 1fr",
    gridColumnGap: spacingMedium,
    alignItems: "center"
  },
  answerLabel: (isSelected: boolean) =>
    css(textEllipsis, {
      color: isSelected ? fontColor : fontColorLight,
      ...(isSelected && {
        borderTop: border(2, "transparent"),
        borderBottom: border(2, "transparent")
      })
    })
}
