import {MockedProvider} from "@apollo/client/testing"
import {renderHook} from "@testing-library/react-hooks"
import * as React from "react"
import {Provider} from "react-redux"
import {act} from "react-test-renderer"
import {questionnairesMock, scenarioQuestionnairesMock, scenariosMock} from "shared/graphql/__mocks__"
import {questionnairesQuery, scenarioQuestionnairesQuery} from "shared/graphql/queries"
import {Children} from "shared/styles"
import {fakeStore} from "sharedTests/redux/fake-store"
import wait from "waait"
import {initialAppState} from "../../../../../../redux/state/app-state"
import {useQuestionnaireSelection} from "../use-questionnaire-selection"

const scenario = scenariosMock[0]
const getConnectedHook = () =>
  renderHook(() => useQuestionnaireSelection(scenario.id, true), {
    wrapper: ({children}: Children) => (
      <MockedProvider
        mocks={[
          {
            request: {
              query: questionnairesQuery,
              variables: {isRuntimeSurvey: true}
            },
            result: {
              data: {
                questionnaires: questionnairesMock
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
          }
        ]}
        addTypename={true}>
        <Provider store={fakeStore(initialAppState)}>{children}</Provider>
      </MockedProvider>
    )
  })

describe("useEventSelection", () => {
  it("loading should default to be true", async () => {
    const {result} = getConnectedHook()
    expect(result.current.loading).toBe(true)
    // Silence mock provider act warnings
    await act(() => wait(0))
  })

  it("questionnaires should default to be defined", async () => {
    const {result} = getConnectedHook()
    expect(result.current.questionnaires).toBeDefined()
    // Silence mock provider act warnings
    await act(() => wait(0))
  })

  it("eventQuestionnairePreviewForModal should default to be empty", async () => {
    const {result} = getConnectedHook()
    expect(result.current.eventQuestionnairePreviewForModal.isEmpty()).toBe(true)
    // Silence mock provider act warnings
    await act(() => wait(0))
  })

  it("assignedQuestionnaires should default to be defined", async () => {
    const {result} = getConnectedHook()
    expect(result.current.assignedQuestionnaires).toBeDefined()
    // Silence mock provider act warnings
    await act(() => wait(0))
  })
})
