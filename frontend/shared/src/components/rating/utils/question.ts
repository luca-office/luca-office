import {max, sum, sumBy} from "lodash-es"
import {QuestionScoringType, QuestionType} from "../../../graphql/generated/globalTypes"
import {
  FreetextQuestionCriterionSelection,
  FreetextQuestionRating,
  QuestionnaireQuestion,
  Rating
} from "../../../models"
import {exists, find, getHighestNumber, isDefined, some} from "../../../utils"

export const requiresScoring = ({questionType, scoringType}: QuestionnaireQuestion): boolean =>
  questionType === QuestionType.FreeText && scoringType !== QuestionScoringType.None

export const getScoreOfAllQuestions = (questions: QuestionnaireQuestion[]): number =>
  sumBy(questions, question => question.score)

export const getMaxScore = (questions: QuestionnaireQuestion[], question: QuestionnaireQuestion): number =>
  question.questionType === QuestionType.FreeText
    ? question.scoringType === QuestionScoringType.Holistic
      ? getHighestNumber(question.freetextQuestionCodingCriteria.map(codingCriteria => codingCriteria.score))
      : sum(question.freetextQuestionCodingCriteria.map(codingCriteria => codingCriteria.score))
    : question.questionType === QuestionType.SingleChoice
    ? max(questions.filter(({questionType}) => questionType === QuestionType.SingleChoice).map(({score}) => score)) ?? 0
    : sum(questions.filter(({questionType}) => questionType === QuestionType.MultipleChoice).map(({score}) => score))

export const getMaxScoreOfQuestion = (question: QuestionnaireQuestion): number => {
  if (question.scoringType === QuestionScoringType.None) {
    return 0
  }
  switch (question.questionType) {
    case QuestionType.FreeText:
      return question.scoringType === QuestionScoringType.Holistic
        ? getHighestNumber(question.freetextQuestionCodingCriteria.map(codingCriteria => codingCriteria.score))
        : sum(question.freetextQuestionCodingCriteria.map(codingCriteria => codingCriteria.score))
    case (QuestionType.MultipleChoice, QuestionType.SingleChoice):
      return question.score
    default:
      return question.score
  }
}

export const getMaxScoreOfAllQuestions = (questions: QuestionnaireQuestion[]): number =>
  sum(questions.map(question => getMaxScoreOfQuestion(question)))

export const getScoreByCriterionSelections = (
  criterionSelections: FreetextQuestionCriterionSelection[],
  question: QuestionnaireQuestion
) => {
  const criteria = question.freetextQuestionCodingCriteria.filter(({id}) =>
    exists(criterion => criterion.criterionId === id, criterionSelections)
  )
  return criteria.length > 0 ? sumBy(criteria, criterion => criterion.score) : 0
}

export const getScoreOfAllQuestionsByCriterionSelections = (
  criterionSelections: FreetextQuestionCriterionSelection[],
  questions: QuestionnaireQuestion[]
) => sumBy(questions, question => getScoreByCriterionSelections(criterionSelections, question))

export const isAutomatedQuestion = (question: QuestionnaireQuestion) => question.questionType !== QuestionType.FreeText

interface WasManualQuestionRatedWithoutFinalizedCheck {
  readonly question: QuestionnaireQuestion
  readonly criterionSelections: FreetextQuestionCriterionSelection[]
  readonly freetextQuestionRatings: FreetextQuestionRating[]
}

export const wasManualQuestionRatedWithoutFinalizedCheck = ({
  question,
  criterionSelections,
  freetextQuestionRatings
}: WasManualQuestionRatedWithoutFinalizedCheck) =>
  find(freetextQuestionRating => freetextQuestionRating.questionId === question.id, freetextQuestionRatings).exists(
    freetextQuestionRating => freetextQuestionRating.noCriterionFulfilled
  ) ||
  some(
    criterion => exists(criterionSelection => criterionSelection.criterionId === criterion.id, criterionSelections),
    question.freetextQuestionCodingCriteria
  )

interface IsManualQuestionRatedParams {
  readonly question: QuestionnaireQuestion
  readonly criterionSelections: FreetextQuestionCriterionSelection[]
  readonly freetextQuestionRatings: FreetextQuestionRating[]
  readonly ratings?: Rating[]
}

export const isManualQuestionRated = ({
  question,
  criterionSelections,
  freetextQuestionRatings,
  ratings
}: IsManualQuestionRatedParams) =>
  wasManualQuestionRatedWithoutFinalizedCheck({question, criterionSelections, freetextQuestionRatings}) ||
  find(
    freetextQuestionRating => freetextQuestionRating.questionId === question.id,
    freetextQuestionRatings
  ).exists(freetextQuestionRating =>
    find(rating => rating.id === freetextQuestionRating.ratingId, ratings ?? []).exists(rating =>
      isDefined(rating.finalizedAt)
    )
  )

export const isManualQuestionRatingFinished = (
  question: QuestionnaireQuestion,
  criterionSelections: FreetextQuestionCriterionSelection[]
) =>
  exists(
    criterion => exists(criterionSelection => criterionSelection.criterionId === criterion.id, criterionSelections),
    question.freetextQuestionCodingCriteria
  )

export const isAutomaticQuestionRatingFinished = (question: QuestionnaireQuestion, selectedAnswerIds: UUID[]) =>
  exists(answer => exists(selectedAnswerId => selectedAnswerId === answer.id, selectedAnswerIds), question.answers)
