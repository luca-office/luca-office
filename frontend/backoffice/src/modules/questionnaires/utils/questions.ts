import {getQuestionTypeIconName} from "shared/components"
import {QuestionScoringType, QuestionType} from "shared/graphql/generated/globalTypes"
import {FreetextQuestionCodingCriterion, QuestionnaireAnswer, QuestionnaireQuestion} from "shared/models"
import {exists, Option} from "shared/utils"
import {ResortableEntity} from "../../../models"

export const convertQuestionsToResortableEntity = (
  questionsOption: Option<QuestionnaireQuestion[]>
): Option<ResortableEntity[]> =>
  questionsOption.map<ResortableEntity[]>(questions =>
    questions.map(question => ({
      id: question.id,
      position: question.position,
      icon: getQuestionTypeIconName(question.questionType),
      title: question.text
    }))
  )

export const convertAnswersToResortableEntity = (
  answersOption: Option<QuestionnaireAnswer[]>
): Option<ResortableEntity[]> =>
  answersOption.map<ResortableEntity[]>(answers =>
    answers.map(answer => ({
      id: answer.id,
      position: answer.position,
      title: answer.text
    }))
  )

/**
 * if the user changes the question type from a type that support a certain scoring to
 * a type that does not support scoring, we need to reset the scoring
 * @param isScoringEnabled - does the current question have a scoring setting !== None
 * @param sourceQuestionType - type of current question
 * @param targetQuestionType - selected type that should be switched to
 */
export const isScoringResetNecessary = (
  isScoringEnabled: boolean,
  sourceQuestionType: QuestionType,
  targetQuestionType: QuestionType
) => {
  return targetQuestionType !== QuestionType.FreeText && sourceQuestionType !== targetQuestionType && isScoringEnabled
}

const hasEmptyQuestionTitle = (questions: QuestionnaireQuestion[]) =>
  questions.some(question => question.text.trim() === "")

const hasEmptyQuestionAnswers = (questions: QuestionnaireQuestion[]) =>
  questions.some(question => question.answers.some(answer => answer.text.trim() === ""))

const isNoScoreFreetextCriterion = (criterion: FreetextQuestionCodingCriterion) =>
  criterion.description.trim() === "" && criterion.score === 0

const hasEmptyCodingCriteria = (questions: QuestionnaireQuestion[]) =>
  questions
    .filter(question => question.questionType === QuestionType.FreeText)
    .some(freeTextQuestion => {
      // only allow extact one criterion with empty description and score of 0
      return freeTextQuestion.freetextQuestionCodingCriteria.filter(isNoScoreFreetextCriterion).length > 1
        ? true
        : freeTextQuestion.freetextQuestionCodingCriteria
            .filter(criterion => !isNoScoreFreetextCriterion(criterion))
            .some(criterion => criterion.description.trim() === "") &&
            freeTextQuestion.scoringType !== QuestionScoringType.None
    })

export const containsEmptyTitleAnswersOrCriteria = (questions: QuestionnaireQuestion[]) =>
  hasEmptyQuestionTitle(questions) || hasEmptyQuestionAnswers(questions) || hasEmptyCodingCriteria(questions)

export const containsUnsetCorrectAnswer = (questions: QuestionnaireQuestion[]): boolean =>
  exists(question => {
    const needsCorrectAnswer =
      (question.questionType === QuestionType.SingleChoice || question.questionType === QuestionType.MultipleChoice) &&
      question.scoringType !== QuestionScoringType.None

    return needsCorrectAnswer && !exists(answer => answer.isCorrect, question.answers)
  }, questions)
