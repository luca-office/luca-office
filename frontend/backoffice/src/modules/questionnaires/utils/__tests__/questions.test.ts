import {
  questionnaireQuestionsMock,
  questionnaireQuestionsMockWithEmptyAnswer,
  questionnaireQuestionsMockWithEmptyCodingCriteria,
  questionnaireQuestionsMockWithEmptyCodingCriteriaAndNoScoring,
  questionnaireQuestionsMockWithEmptyText
} from "shared/graphql/__mocks__/questionnaire-questions.mock"
import {QuestionType} from "shared/graphql/generated/globalTypes"
import {Option} from "shared/utils"
import {
  containsEmptyTitleAnswersOrCriteria,
  convertQuestionsToResortableEntity,
  isScoringResetNecessary
} from "../questions"

describe("questions", () => {
  it("should convertQuestionsToResortableEntity", () => {
    expect(convertQuestionsToResortableEntity(Option.none()).getOrElse([])).toEqual([])
    expect(convertQuestionsToResortableEntity(Option.of(questionnaireQuestionsMock)).getOrElse([])).toHaveLength(
      questionnaireQuestionsMock.length
    )
    expect(
      convertQuestionsToResortableEntity(Option.of(questionnaireQuestionsMock.map(question => ({...question}))))
        .getOrElse([])
        .map(e => e.title)
    ).toEqual(questionnaireQuestionsMock.map(e => e.text))
    expect(
      convertQuestionsToResortableEntity(Option.of(questionnaireQuestionsMock))
        .getOrElse([])
        .map(e => e.id)
    ).toEqual(questionnaireQuestionsMock.map(e => e.id))
  })
  it("should isScoringResetNecessary", () => {
    expect(isScoringResetNecessary(false, QuestionType.SingleChoice, QuestionType.FreeText)).toEqual(false)
    expect(isScoringResetNecessary(true, QuestionType.SingleChoice, QuestionType.FreeText)).toEqual(false)
    expect(isScoringResetNecessary(true, QuestionType.SingleChoice, QuestionType.SingleChoice)).toEqual(false)
    expect(isScoringResetNecessary(true, QuestionType.MultipleChoice, QuestionType.SingleChoice)).toEqual(true)
    expect(isScoringResetNecessary(true, QuestionType.SingleChoice, QuestionType.MultipleChoice)).toEqual(true)
    expect(isScoringResetNecessary(true, QuestionType.SingleChoice, QuestionType.MultipleChoice)).toEqual(true)
    expect(isScoringResetNecessary(false, QuestionType.SingleChoice, QuestionType.MultipleChoice)).toEqual(false)
    expect(isScoringResetNecessary(false, QuestionType.MultipleChoice, QuestionType.SingleChoice)).toEqual(false)
    expect(isScoringResetNecessary(true, QuestionType.FreeText, QuestionType.SingleChoice)).toEqual(true)
    expect(isScoringResetNecessary(true, QuestionType.FreeText, QuestionType.MultipleChoice)).toEqual(true)
    expect(isScoringResetNecessary(true, QuestionType.SingleChoice, QuestionType.FreeText)).toEqual(false)
    expect(isScoringResetNecessary(true, QuestionType.MultipleChoice, QuestionType.FreeText)).toEqual(false)
  })

  it("should containsEmptyTitleAnswersOrCriteria", () => {
    expect(containsEmptyTitleAnswersOrCriteria(questionnaireQuestionsMock)).toEqual(false)
    expect(containsEmptyTitleAnswersOrCriteria(questionnaireQuestionsMockWithEmptyText)).toEqual(true)
    expect(containsEmptyTitleAnswersOrCriteria(questionnaireQuestionsMockWithEmptyCodingCriteria)).toEqual(true)
    expect(containsEmptyTitleAnswersOrCriteria(questionnaireQuestionsMockWithEmptyAnswer)).toEqual(true)
  })
  it("should hasEmptyCodingCriteria", () => {
    expect(containsEmptyTitleAnswersOrCriteria(questionnaireQuestionsMock)).toEqual(false)
    expect(containsEmptyTitleAnswersOrCriteria(questionnaireQuestionsMockWithEmptyText)).toEqual(true)
    expect(containsEmptyTitleAnswersOrCriteria(questionnaireQuestionsMockWithEmptyCodingCriteria)).toEqual(true)
    expect(containsEmptyTitleAnswersOrCriteria(questionnaireQuestionsMockWithEmptyAnswer)).toEqual(true)
    expect(containsEmptyTitleAnswersOrCriteria(questionnaireQuestionsMockWithEmptyCodingCriteriaAndNoScoring)).toEqual(
      false
    )
  })
})
