import {act, renderHook} from "@testing-library/react-hooks"
import {questionnaireMock} from "shared/graphql/__mocks__"
import {questionnaireQuestionsMock} from "shared/graphql/__mocks__/questionnaire-questions.mock"
import wait from "waait"
import {Route} from "../../../../../../routes"
import {useQuestionnaireInformation, UseQuestionnaireInformationParams} from "../use-questionnaire-information"

const questionnaire = questionnaireMock

const defaultHookParams: UseQuestionnaireInformationParams = {
  readonly: false,
  questionnaire,
  openQuestionsSortOverlay: jest.fn(),
  openQuestionCreation: jest.fn(),
  deleteQuestion: jest.fn(),
  showQuestionScoring: true,
  hideActions: false,
  navigationQuestionConfig: {
    route: Route.QuestionnaireDetailQuestion,
    payload: {questionnaireId: questionnaire.id, questionId: questionnaireQuestionsMock[0].id}
  }
}

const getConnectedHook = () => renderHook(() => useQuestionnaireInformation(defaultHookParams))

describe("use-questionnaire-information", () => {
  describe("isEditable", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.isEditable).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("descriptionField", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.descriptionField).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("questionnaireUpdate", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.questionnaireUpdate).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("questionsColumns", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.questionsColumns).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
})
