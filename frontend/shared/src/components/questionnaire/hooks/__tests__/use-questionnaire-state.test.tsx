import {renderHook} from "@testing-library/react-hooks"
import {
  finishedQuestionsState,
  initialQuestionsState,
  partiallyFinishedQuestionsState
} from "../__mocks__/questions-state.mock"
import {useQuestionnaireState} from "../use-questionnaire-state"
import {QuestionsState} from "../use-questions-state"

const getConnectedHook = (questionsState?: QuestionsState) => renderHook(() => useQuestionnaireState(questionsState))

describe("UseQuestionnaireState", () => {
  describe("numberOfAnsweredQuestions", () => {
    it("should default to be 0", () => {
      const {result} = getConnectedHook()
      expect(result.current.numberOfAnsweredQuestions).toBe(0)
    })

    it("should show the correct number of answered questions (initial)", () => {
      const {result} = getConnectedHook(initialQuestionsState)
      expect(result.current.numberOfAnsweredQuestions).toBe(0)
    })

    it("should show the correct number of answered questions (partial)", () => {
      const {result} = getConnectedHook(partiallyFinishedQuestionsState)
      expect(result.current.numberOfAnsweredQuestions).toBe(2)
    })

    it("should show the correct number of answered questions (finished)", () => {
      const {result} = getConnectedHook(finishedQuestionsState)
      expect(result.current.numberOfAnsweredQuestions).toBe(4)
    })
  })

  describe("isQuestionnaireFinished", () => {
    it("should default to false", () => {
      const {result} = getConnectedHook()
      expect(result.current.isQuestionnaireFinished).toBe(false)
    })

    it("should be false with no answered questions", () => {
      const {result} = getConnectedHook(initialQuestionsState)
      expect(result.current.isQuestionnaireFinished).toBe(false)
    })

    it("should be false with some questions answered", () => {
      const {result} = getConnectedHook(partiallyFinishedQuestionsState)
      expect(result.current.isQuestionnaireFinished).toBe(false)
    })

    it("should be true with all questions answered", () => {
      const {result} = getConnectedHook(finishedQuestionsState)
      expect(result.current.isQuestionnaireFinished).toBe(true)
    })
  })
})
