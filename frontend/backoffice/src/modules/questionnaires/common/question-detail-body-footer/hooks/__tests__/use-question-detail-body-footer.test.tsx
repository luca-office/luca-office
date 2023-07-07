import {MockedProvider} from "@apollo/client/testing"
import {act, renderHook} from "@testing-library/react-hooks"
import * as React from "react"
import {Provider} from "react-redux"
import {scenarioQuestionnairesMock, scenariosMock} from "shared/graphql/__mocks__"
import {updateScenarioQuestionnaireMutation} from "shared/graphql/mutations"
import {scenarioQuery, scenarioQuestionnairesQuery} from "shared/graphql/queries"
import {Children} from "shared/styles"
import {convertSecondsToMinutes} from "shared/utils"
import {fakeStore} from "sharedTests/redux/fake-store"
import wait from "waait"
import {initialAppState} from "../../../../../../redux/state/app-state"
import {useQuestionDetailBodyFooter} from "../use-question-detail-body-footer"

const questionnaireId = scenarioQuestionnairesMock[0].questionnaireId
const scenarioId = scenarioQuestionnairesMock[0].scenarioId

const getConnectedHook = () =>
  renderHook(() => useQuestionDetailBodyFooter(questionnaireId, scenarioId), {
    wrapper: ({children}: Children) => (
      <MockedProvider
        mocks={[
          {
            request: {
              query: scenarioQuery,
              variables: {id: scenarioId}
            },
            result: {
              data: {
                scenario: {...scenariosMock[0], id: scenarioId}
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
              query: updateScenarioQuestionnaireMutation,
              variables: {questionnaireId, scenarioId, update: {activationDelayInSeconds: 5}}
            },
            result: {
              data: {
                updateScenarioQuestionnaire: scenarioQuestionnairesMock[0]
              }
            }
          }
        ]}
        addTypename={true}>
        <Provider store={fakeStore(initialAppState)}>{children}</Provider>
      </MockedProvider>
    )
  })

describe("use-question-detail-body-footer", () => {
  describe("loading", () => {
    it("should be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.loading).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("activationDelaySeconds", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.activationDelaySeconds).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("displayEventDelayModal", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.displayEventDelayModal).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("maxScenarioDuration", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.maxScenarioDuration).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("existingDurations", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.existingDurations).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
      expect(result.current.existingDurations).toEqual(
        scenarioQuestionnairesMock
          .filter(sq => sq.questionnaireId !== questionnaireId)
          .map(sq => convertSecondsToMinutes(sq.activationDelayInSeconds))
      )
    })
  })
})
