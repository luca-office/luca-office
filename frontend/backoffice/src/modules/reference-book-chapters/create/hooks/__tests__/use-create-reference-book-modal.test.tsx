import {MockedProvider} from "@apollo/client/testing"
import {act, renderHook} from "@testing-library/react-hooks"
import * as React from "react"
import {Provider} from "react-redux"
import {Children} from "shared/styles"
import {fakeStore} from "sharedTests/redux/fake-store"
import wait from "waait"
import {initialAppState} from "../../../../../redux/state/app-state"
import {useCreateReferenceBookModal} from "../use-create-reference-book-modal"

const getConnectedHook = () =>
  renderHook(() => useCreateReferenceBookModal(), {
    wrapper: ({children}: Children) => (
      <MockedProvider addTypename={true}>
        <Provider store={fakeStore(initialAppState)}>{children}</Provider>
      </MockedProvider>
    )
  })

describe("use-create-reference-book-modal", () => {
  describe("createReferenceBookLoading", () => {
    it("should default to be false", async () => {
      const {result} = getConnectedHook()
      expect(result.current.createReferenceBookLoading).toBeFalsy()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
})
