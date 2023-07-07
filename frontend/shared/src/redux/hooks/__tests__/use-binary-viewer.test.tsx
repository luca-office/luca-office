import {act, renderHook} from "@testing-library/react-hooks"
import * as React from "react"
import {Provider} from "react-redux"
import wait from "waait"
import {fakeStore} from "../../../../tests/redux/fake-store"
import {Children} from "../../../styles"
import {initialSharedAppState, SharedAppState} from "../../state"
import {useBinaryViewer} from "../use-binary-viewer"

const getConnectedHook = () =>
  renderHook(() => useBinaryViewer<SharedAppState>("imageViewer", state => state), {
    wrapper: ({children}: Children) => <Provider store={fakeStore(initialSharedAppState)}>{children}</Provider>
  })

describe("use-binary-viewer", () => {
  describe("binaries", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.binaries).toBeDefined()
    })
  })
  describe("closeBinary", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.closeBinary).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("selectBinaryId", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.selectBinaryId).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("selectedBinaryId", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.selectedBinaryId).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
})
