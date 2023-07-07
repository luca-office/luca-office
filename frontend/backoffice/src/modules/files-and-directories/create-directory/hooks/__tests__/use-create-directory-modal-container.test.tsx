import {MockedProvider} from "@apollo/client/testing"
import {act, renderHook} from "@testing-library/react-hooks"
import * as React from "react"
import {Provider} from "react-redux"
import {Children} from "shared/styles"
import {fakeStore} from "sharedTests/redux/fake-store"
import wait from "waait"
import {initialAppState} from "../../../../../redux/state/app-state"
import {useCreateDirectoryModalContainer} from "../use-create-directory-modal-container"

const getConnectedHook = () =>
  renderHook(() => useCreateDirectoryModalContainer(""), {
    wrapper: ({children}: Children) => (
      <MockedProvider addTypename={true}>
        <Provider store={fakeStore(initialAppState)}>{children}</Provider>
      </MockedProvider>
    )
  })

describe("use-create-directory-modal-container", () => {
  describe("createDirectoryLoading", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.createDirectoryLoading).toBe(false)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
})
