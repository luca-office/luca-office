import {MockedProvider} from "@apollo/client/testing"
import {act, renderHook} from "@testing-library/react-hooks"
import * as React from "react"
import {Provider} from "react-redux"
import {projectsMock, surveyLightMock} from "shared/graphql/__mocks__"
import {surveyLightQuery} from "shared/graphql/queries"
import {Children} from "shared/styles"
import {fakeStore} from "sharedTests/redux/fake-store"
import wait from "waait"
import {initialAppState} from "../../../../../redux/state/app-state"
import {useEditSurvey} from "../use-edit-survey"

const getConnectedHook = () =>
  renderHook(() => useEditSurvey(projectsMock[0].id, surveyLightMock.id), {
    wrapper: ({children}: Children) => (
      <MockedProvider
        mocks={[
          {
            request: {
              query: surveyLightQuery,
              variables: {id: surveyLightMock.id}
            },
            result: {
              data: {
                survey: surveyLightMock
              }
            }
          }
        ]}
        addTypename={true}>
        <Provider store={fakeStore(initialAppState)}>{children}</Provider>
      </MockedProvider>
    )
  })

describe("use-edit-survey", () => {
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
      expect(result.current.firstProjectSurveyOrlyVisible).toBeUndefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("initialized", () => {
    it("should default to be true", async () => {
      const {result} = getConnectedHook()
      expect(result.current.initialized).toBeTruthy()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
})
