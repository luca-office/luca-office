import {act, renderHook} from "@testing-library/react-hooks"
import wait from "waait"
import {questionnaireMock} from "../../../../graphql/__mocks__"
import {QuestionnaireQuestion} from "../../../../models"
import {useQuestionsState} from "../use-questions-state"

const getConnectedHook = (questions: Array<QuestionnaireQuestion>) => renderHook(() => useQuestionsState(questions))

describe("UseQuestionsState", () => {
  describe("questionsState", () => {
    it("should be undefined if there are no questions", () => {
      const {result} = getConnectedHook([])
      expect(result.current.questionsState).toBeUndefined()
    })

    it("should should be defined if there are questions", async () => {
      const {result} = getConnectedHook(questionnaireMock.questions)

      await act(() => wait(0))

      expect(result.current.questionsState).toBeDefined()
    })
  })

  describe("setQuestionsState", () => {
    it("should default to be defined", () => {
      const {result} = getConnectedHook(questionnaireMock.questions)
      expect(result.current.setQuestionsState).toBeDefined()
    })
  })
})
