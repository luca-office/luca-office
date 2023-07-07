import {
  getMaxScore,
  getMaxScoreOfAllQuestions,
  getScoreByCriterionSelections,
  getScoreOfAllQuestionsByCriterionSelections,
  isAutomatedQuestion,
  requiresScoring
} from "shared/components/rating/utils/question"
import {QuestionScoringType} from "shared/graphql/generated/globalTypes"
import {
  freeTextQuestionMock,
  multipleChoiceQuestionMock,
  multipleChoiceQuestionWithExtraFreeTextMock,
  multipleChoiceQuestionWithVideoMock,
  questionnaireMock,
  singleChoiceQuestionMock,
  singleChoiceQuestionWithImageMock
} from "shared/graphql/__mocks__"
import {freetextQuestionRatingCriterionSelectionMock} from "shared/graphql/__mocks__/freetext-question-rating-criterion-selections.mock"
import {questionnaireQuestionsMock} from "shared/graphql/__mocks__/questionnaire-questions.mock"
import {Questionnaire} from "shared/models"

describe("question", () => {
  describe("requiresScoring", () => {
    it("returns true for QuestionType.FreeText", () => {
      expect(requiresScoring(questionnaireMock.questions[5])).toEqual(true)
    })
    it("returns false for QuestionType.MultipleChoice", () => {
      expect(requiresScoring(questionnaireMock.questions[2])).toEqual(false)
    })
    it("returns false for QuestionType.SingleChoice", () => {
      expect(requiresScoring(questionnaireMock.questions[0])).toEqual(false)
    })
  })

  describe("getMaxScore", () => {
    it("correctly returns max score for QuestionType.FreeText", () => {
      expect(getMaxScore(questionnaireMock.questions, questionnaireMock.questions[5])).toEqual(3)
    })
    it("correctly returns max score for QuestionType.MultipleChoice", () => {
      expect(getMaxScore(questionnaireMock.questions, questionnaireMock.questions[2])).toEqual(6)
    })
    it("correctly returns max score for QuestionType.SingleChoice", () => {
      expect(getMaxScore(questionnaireMock.questions, questionnaireMock.questions[0])).toEqual(2)
    })
  })
  describe("getScoreByCriterionSelections", () => {
    it("returns correct score", () => {
      expect(
        getScoreByCriterionSelections(
          [
            {
              ...freetextQuestionRatingCriterionSelectionMock,
              criterionId: questionnaireQuestionsMock[0].freetextQuestionCodingCriteria[0].id
            }
          ],
          questionnaireQuestionsMock[0]
        )
      ).toEqual(2)
    })
  })
  describe("getScoreOfAllQuestionsByCriterionSelections", () => {
    it("returns correct score", () => {
      expect(
        getScoreOfAllQuestionsByCriterionSelections(
          [
            {
              ...freetextQuestionRatingCriterionSelectionMock,
              criterionId: questionnaireQuestionsMock[0].freetextQuestionCodingCriteria[0].id
            }
          ],
          questionnaireQuestionsMock
        )
      ).toEqual(10)
    })
  })
  describe("isAutomatedQuestion", () => {
    it("correctly checks if question is automated", () => {
      expect(isAutomatedQuestion(questionnaireQuestionsMock[0])).toEqual(false)
      expect(isAutomatedQuestion(questionnaireQuestionsMock[2])).toEqual(true)
      expect(isAutomatedQuestion(questionnaireQuestionsMock[3])).toEqual(true)
    })
  })

  describe("max Score Of Questionnaire", () => {
    it("should return the max score of a questionnaire", () => {
      const questionnaire = questionnaireMock

      const maxScore = getMaxScoreOfAllQuestions(questionnaire.questions)
      expect(maxScore).toBe(13)
    })
  })
  describe("max Score Of Questionnaire with Freetext ScoringType None", () => {
    it("should return the max score of a questionnaire", () => {
      const questionnaire: Questionnaire = {
        ...questionnaireMock,
        questions: [
          singleChoiceQuestionMock,
          singleChoiceQuestionWithImageMock,
          multipleChoiceQuestionMock,
          multipleChoiceQuestionWithExtraFreeTextMock,
          multipleChoiceQuestionWithVideoMock,
          {...freeTextQuestionMock, scoringType: QuestionScoringType.None}
        ]
      }

      const maxScore = getMaxScoreOfAllQuestions(questionnaire.questions)
      expect(maxScore).toBe(10)
    })
  })
})
