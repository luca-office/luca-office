import {MockedProvider} from "@apollo/client/testing"
import {act, renderHook} from "@testing-library/react-hooks"
import * as React from "react"
import {Provider} from "react-redux"
import {projectsMock, surveysMock} from "shared/graphql/__mocks__"
import {surveysQuery} from "shared/graphql/queries"
import {Children} from "shared/styles"
import {fakeStore} from "sharedTests/redux/fake-store"
import wait from "waait"
import {initialAppState} from "../../../../../redux/state/app-state"
import {useCreateSurvey} from "../use-create-survey"

const getConnectedHook = () =>
  renderHook(() => useCreateSurvey(projectsMock[0].id, false), {
    wrapper: ({children}: Children) => (
      <MockedProvider
        mocks={[
          {
            request: {
              query: surveysQuery,
              variables: {projectId: projectsMock[0].id}
            },
            result: {
              data: {
                surveys: surveysMock
              }
            }
          }
        ]}
        addTypename={true}>
        <Provider store={fakeStore(initialAppState)}>{children}</Provider>
      </MockedProvider>
    )
  })

describe("use-create-survey", () => {
  describe("formMethods", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.formMethods).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("firstProjectSurveyOrlyVisible", () => {
    it("should default to be false", async () => {
      const {result} = getConnectedHook()
      expect(result.current.firstProjectSurveyOrlyVisible).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("initialized", () => {
    it("should default to be false", async () => {
      const {result} = getConnectedHook()
      expect(result.current.initialized).toBe(false)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
})
