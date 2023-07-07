import {act, renderHook} from "@testing-library/react-hooks"
import wait from "waait"
import {emailsMock} from "../../../../../../hooks/__mocks__/emails.mock"
import {useEmailBodySettings} from "../use-email-body-settings"

const email = emailsMock[0]
const getConnectedHook = () => renderHook(() => useEmailBodySettings(email, jest.fn()))

describe("use-email-body-settings", () => {
  describe("directoryOptions", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.directoryOptions).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("markerOptions", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.markerOptions).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("isDelayOverlayVisible", () => {
    it("should be false by default", async () => {
      const {result} = getConnectedHook()
      expect(result.current.isDelayOverlayVisible).toEqual(false)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
})
