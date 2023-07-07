import {act, renderHook} from "@testing-library/react-hooks"
import {questionnaireMock} from "../../../../graphql/__mocks__"
import {useQuestionnaireQuestionState} from "../use-questionnaire-question-state"

const getConnectedHook = () => renderHook(() => useQuestionnaireQuestionState(questionnaireMock.questions))

describe("UseQuestionnaireQuestionsState", () => {
  describe("isQuestionnaireFinished", () => {
    it("should default to false", () => {
      const {result} = getConnectedHook()

      expect(result.current.isQuestionnaireFinished).toBe(false)
    })

    it("should be true after all questions are answered", () => {
      const {result} = getConnectedHook()

      act(() => {
        result.current.onSelectAnswer(questionnaireMock.questions[0].id, questionnaireMock.questions[0].answers[0].id)
      })
      act(() => {
        result.current.onSelectAnswer(questionnaireMock.questions[1].id, questionnaireMock.questions[1].answers[0].id)
      })
      act(() => {
        result.current.onSelectAnswer(questionnaireMock.questions[2].id, questionnaireMock.questions[2].answers[0].id)
      })

      act(() => {
        result.current.onSelectAnswer(questionnaireMock.questions[3].id, questionnaireMock.questions[3].answers[0].id)
      })
      act(() => {
        result.current.onUpdateFreeText(questionnaireMock.questions[3].id, "answered")
      })

      act(() => {
        result.current.onSelectAnswer(questionnaireMock.questions[4].id, questionnaireMock.questions[4].answers[0].id)
      })

      act(() => {
        result.current.onUpdateFreeText(questionnaireMock.questions[5].id, "answered")
      })

      expect(result.current.isQuestionnaireFinished).toBe(true)
    })
  })

  describe("numberOfAnsweredQuestions", () => {
    it("should default to 0", () => {
      const {result} = getConnectedHook()

      expect(result.current.numberOfAnsweredQuestions).toBe(0)
    })

    it("should be the correct number after questions are answered (1)", () => {
      const {result} = getConnectedHook()
      const mockQuestion = questionnaireMock.questions[0]

      act(() => {
        result.current.onSelectAnswer(mockQuestion.id, mockQuestion.answers[0].id)
      })

      expect(result.current.numberOfAnsweredQuestions).toBe(1)
    })

    it("should be the correct number after questions are answered (3)", () => {
      const {result} = getConnectedHook()

      act(() => {
        result.current.onSelectAnswer(questionnaireMock.questions[0].id, questionnaireMock.questions[0].answers[0].id)
      })

      act(() => {
        result.current.onSelectAnswer(questionnaireMock.questions[1].id, questionnaireMock.questions[1].answers[0].id)
      })

      act(() => {
        result.current.onSelectAnswer(questionnaireMock.questions[2].id, questionnaireMock.questions[2].answers[0].id)
      })

      expect(result.current.numberOfAnsweredQuestions).toBe(3)
    })
  })

  describe("onSelectAnswer", () => {
    it("should default to be defined", () => {
      const {result} = getConnectedHook()

      expect(result.current.onSelectAnswer).toBeDefined()
    })
  })

  describe("onDeselectAnswer", () => {
    it("should default to be defined", () => {
      const {result} = getConnectedHook()

      expect(result.current.onDeselectAnswer).toBeDefined()
    })
  })

  describe("onUpdateFreeText", () => {
    it("should default to be defined", () => {
      const {result} = getConnectedHook()

      expect(result.current.onUpdateFreeText).toBeDefined()
    })
  })
})
