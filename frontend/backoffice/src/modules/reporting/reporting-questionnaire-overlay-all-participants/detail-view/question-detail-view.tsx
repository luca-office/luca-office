import {css} from "@emotion/react"
import {groupBy} from "lodash"
import * as React from "react"
import {
  AnswerCountById,
  Heading,
  PercentagePaperPrefix,
  ReportingClosedQuestionAnswersTable,
  Text
} from "shared/components"
import {HeadingLevel} from "shared/enums"
import {QuestionType} from "shared/graphql/generated/globalTypes"
import {QuestionnaireSurveyResultsForParticipantQuery_questionnaireSurveyResultsForParticipant_questionResults as QuestionResult} from "shared/graphql/generated/QuestionnaireSurveyResultsForParticipantQuery"
import {
  FreetextQuestionCodingCriterion,
  QuestionnaireAnswer,
  QuestionnaireQuestion,
  QuestionnaireSurveyResultsForParticipant,
  SurveyInvitationLight
} from "shared/models"
import {
  border,
  fontColor,
  fontColorLight,
  primaryColor,
  spacingLarge,
  spacingMedium,
  spacingSmall,
  textEllipsis,
  TextSize
} from "shared/styles"
import {LucaTFunction} from "shared/translations"
import {FreeTextContentContainer} from "./freetext-content"

interface Props {
  readonly t: LucaTFunction
  readonly question: QuestionnaireQuestion
  readonly questionResult: QuestionResult
  readonly freetextQuestionCodingCriteria: FreetextQuestionCodingCriterion[]
  readonly questionnaireSurveyResultsForParticipants: QuestionnaireSurveyResultsForParticipant[]
  readonly surveyInvitations: SurveyInvitationLight[]
}

export const QuestionDetailView: React.FC<Props> = ({
  t,
  question,
  questionResult,
  freetextQuestionCodingCriteria,
  questionnaireSurveyResultsForParticipants,
  surveyInvitations
}) => {
  const allSelectedAnswerids = questionnaireSurveyResultsForParticipants.flatMap(result =>
    result.questionResults.flatMap(result => result.selectedAnswerIds)
  )
  const groupedByAnswerId = groupBy(allSelectedAnswerids, answerId => answerId)
  const answerCountById = Object.keys(groupedByAnswerId).reduce<AnswerCountById>(
    (acc, current) => ({...acc, [current]: groupedByAnswerId[current].length}),
    {}
  )

  return (
    <div>
      <Heading customStyles={styles.heading} level={HeadingLevel.h2}>
        {question.text}
      </Heading>
      {question.questionType === QuestionType.FreeText ? (
        <FreeTextContentContainer
          freetextQuestionCodingCriteria={freetextQuestionCodingCriteria}
          question={question}
          questionnaireSurveyResultsForParticipants={questionnaireSurveyResultsForParticipants}
          surveyInvitations={surveyInvitations}
        />
      ) : (
        <ReportingClosedQuestionAnswersTable
          renderAnswerContentColumn={answer =>
            renderAnswerContentColumn(
              answer,
              questionResult.selectedAnswerIds,
              questionnaireSurveyResultsForParticipants,
              answerCountById
            )
          }
          t={t}
          question={question}
          selectedAnswerIds={questionResult.selectedAnswerIds}
        />
      )}
    </div>
  )
}
const renderAnswerContentColumn = (
  answer: QuestionnaireAnswer,
  selectedAnswerIds: UUID[],
  questionnaireSurveyResultsForParticipants: QuestionnaireSurveyResultsForParticipant[],
  answerCountById: AnswerCountById
) => {
  const isSelected = selectedAnswerIds.includes(answer.id)

  return (
    <div css={styles.answerTextContent}>
      <PercentagePaperPrefix
        ratingsCount={answerCountById[answer.id]}
        ratersCount={questionnaireSurveyResultsForParticipants.length}
      />
      <Text customStyles={styles.answerLabel(isSelected)} size={TextSize.Medium}>
        {answer.text}
      </Text>
    </div>
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
  marginLeft: {
    marginLeft: spacingSmall
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
    }),
  participantName: {
    color: primaryColor
  }
}
