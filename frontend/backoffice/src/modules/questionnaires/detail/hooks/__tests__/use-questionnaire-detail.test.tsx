import {MockedProvider} from "@apollo/client/testing"
import {act, renderHook} from "@testing-library/react-hooks"
import * as React from "react"
import {checkLoginMock, questionnairesMock, scenarioQuestionnairesMock, scenariosMock} from "shared/graphql/__mocks__"
import {questionnaireQuestionsMock} from "shared/graphql/__mocks__/questionnaire-questions.mock"
import {
  checkLoginQuery,
  questionnaireQuery,
  questionnaireQuestionQuery,
  scenarioQuestionnairesQuery
} from "shared/graphql/queries"
import {Children} from "shared/styles"
import wait from "waait"
import {QuestionnaireDetailMode} from "../../../../../enums"
import {useQuestionnaireDetail} from "../use-questionnaire-detail"

const questionnaireId = questionnairesMock[0].id
const questionnaireQuestionId = questionnaireQuestionsMock[0].id
const scenarioId = scenariosMock[0].id

const getConnectedHook = () =>
  renderHook(
    () =>
      useQuestionnaireDetail({
        displayMode: QuestionnaireDetailMode.Default,
        questionnaireId,
        questionId: questionnaireQuestionId
      }),
    {
      wrapper: ({children}: Children) => (
        <MockedProvider
          mocks={[
            {
              request: {
                query: questionnaireQuery,
                variables: {id: questionnaireId}
              },
              result: {
                data: {
                  questionnaire: questionnairesMock[0]
                }
              }
            },
            {
              request: {
                query: questionnaireQuestionQuery,
                variables: {id: questionnaireQuestionId}
              },
              result: {
                data: {
                  questionnaireQuestion: questionnaireQuestionsMock[0]
                }
              }
            },
            {
              request: {
                query: scenarioQuestionnairesQuery,
                variables: {scenarioId}
              },
              result: {
                data: {
                  scenarioQuestionnaires: scenarioQuestionnairesMock
                }
              }
            },
            {
              request: {
                query: checkLoginQuery
              },
              result: {
                data: {
                  checkLogin: checkLoginMock
                }
              }
            }
          ]}
          addTypename={true}>
          <React.Fragment>{children}</React.Fragment>
        </MockedProvider>
      )
    }
  )

describe("use-questionnaire-detail", () => {
  describe("questionnaire", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.questionnaire).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("dataLoading", () => {
    it("should default to be true", async () => {
      const {result} = getConnectedHook()
      expect(result.current.dataLoading).toBeDefined()
      expect(result.current.dataLoading).toBe(true)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("actionsLoading", () => {
    it("should default to be false", async () => {
      const {result} = getConnectedHook()
      expect(result.current.actionsLoading).toBeDefined()
      expect(result.current.actionsLoading).toBe(false)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("selectedEntityId", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.selectedEntityId).toBeDefined()
    })
  })
  describe("resortModalVisible", () => {
    it("should default to be false", async () => {
      const {result} = getConnectedHook()
      expect(result.current.resortModalVisible).toBe(false)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("sortableQuestions", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.sortableQuestions).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("questionCreationVisible", () => {
    it("should default to be false", async () => {
      const {result} = getConnectedHook()
      expect(result.current.questionCreationVisible).toBe(false)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("isScenarioFinalized", () => {
    it("should default to be false", async () => {
      const {result} = getConnectedHook()
      expect(result.current.isScenarioReadOnly).toBe(false)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("isProjectQuestionnaire", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.isProjectQuestionnaire).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("isEventSelection", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.isEventSelection).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("isRuntimeSurvey", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.isRuntimeSurvey).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
})
