import {MockedProvider} from "@apollo/client/testing"
import {act, renderHook} from "@testing-library/react-hooks"
import * as React from "react"
import {interventionsMock} from "shared/__mocks__"
import {questionnairesMock, scenarioQuestionnairesMock, scenariosMock} from "shared/graphql/__mocks__"
import {questionnaireQuestionsMock} from "shared/graphql/__mocks__/questionnaire-questions.mock"
import {questionnaireQuestionQuery, scenarioQuestionnairesQuery} from "shared/graphql/queries"
import {interventionsQuery} from "shared/graphql/queries/interventions"
import {Children} from "shared/styles"
import wait from "waait"
import {useQuestionnaireQuestionDetail} from "../use-questionnaire-question-detail"

const questionnaireId = questionnairesMock[0].id
const questionnaireQuestionId = questionnaireQuestionsMock[0].id

const getConnectedHook = () =>
  renderHook(() => useQuestionnaireQuestionDetail(questionnaireId, questionnaireQuestionId, jest.fn), {
    wrapper: ({children}: Children) => (
      <MockedProvider
        mocks={[
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
              variables: {scenarioId: scenariosMock[0].id}
            },
            result: {
              data: {
                scenarioQuestionnaires: scenarioQuestionnairesMock
              }
            }
          },
          {
            request: {
              query: interventionsQuery,
              variables: {scenarioId: scenariosMock[0].id}
            },
            result: {
              data: {
                interventions: interventionsMock
              }
            }
          }
        ]}
        addTypename={true}>
        <React.Fragment>{children}</React.Fragment>
      </MockedProvider>
    )
  })

describe("use-questionnaire-question-detail", () => {
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
  describe("isChangeQuestionTypeModalVisible", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.isChangeQuestionTypeModalVisible).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("sorting", () => {
    it("should default to be defined and have setter", async () => {
      const {result} = getConnectedHook()
      expect(result.current.resortModalVisible).toBe(false)
      result.current.setResortModalVisible(true)
      expect(result.current.resortModalVisible).toBe(true)
      expect(result.current.sortableAnswers).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
})
