import {MockedProvider} from "@apollo/client/testing"
import {act, renderHook} from "@testing-library/react-hooks"
import * as React from "react"
import {Provider} from "react-redux"
import {Children} from "shared/styles"
import {fakeStore} from "sharedTests/redux/fake-store"
import wait from "waait"
import {initialAppState} from "../../../../../redux/state/app-state"
import {useCreateQuestionnaireModal} from "../use-create-questionnaire-modal"

const getConnectedHook = () =>
  renderHook(() => useCreateQuestionnaireModal(false), {
    wrapper: ({children}: Children) => (
      <MockedProvider addTypename={true}>
        <Provider store={fakeStore(initialAppState)}>{children}</Provider>
      </MockedProvider>
    )
  })

describe("use-create-questionnaire-modal", () => {
  describe("createQuestionnaireLoading", () => {
    it("should default to be false", async () => {
      const {result} = getConnectedHook()
      expect(result.current.createQuestionnaireLoading).toBeFalsy()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("useFormMethods", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.formMethods).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
})
