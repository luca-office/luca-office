import {act, renderHook} from "@testing-library/react-hooks"
import wait from "waait"
import {useResetPasswordLink} from "../use-reset-password-link"

const getConnectedHook = () => renderHook(() => useResetPasswordLink())

describe("use-reset-password-link", () => {
  describe("isResetOverlayVisible", () => {
    it("should default to be false", async () => {
      const {result} = getConnectedHook()
      expect(result.current.isResetOverlayVisible).toEqual(false)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
    it("should be true after showResetOverlay was called", async () => {
      const {result} = getConnectedHook()
      result.current.showResetOverlay()
      expect(result.current.isResetOverlayVisible).toEqual(true)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("showResetOverlay", () => {
    it("should default be a function", async () => {
      const {result} = getConnectedHook()
      expect(typeof result.current.showResetOverlay).toEqual("function")
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
    it("correctly updates isResetOverlayVisible", async () => {
      const {result} = getConnectedHook()
      expect(result.current.isResetOverlayVisible).toEqual(false)
      result.current.showResetOverlay()
      expect(result.current.isResetOverlayVisible).toEqual(true)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("hideResetOverlay", () => {
    it("should default be a function", async () => {
      const {result} = getConnectedHook()
      expect(typeof result.current.hideResetOverlay).toEqual("function")
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
    it("correctly updates isResetOverlayVisible", async () => {
      const {result} = getConnectedHook()
      expect(result.current.isResetOverlayVisible).toEqual(false)
      result.current.showResetOverlay()
      expect(result.current.isResetOverlayVisible).toEqual(true)
      result.current.hideResetOverlay()
      expect(result.current.isResetOverlayVisible).toEqual(false)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
})
