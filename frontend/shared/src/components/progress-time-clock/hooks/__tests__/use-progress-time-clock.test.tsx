import {act, renderHook} from "@testing-library/react-hooks"
import wait from "waait"
import {useProgressTimeClock} from "../use-progress-time-clock"

const getConnectedHook = () => renderHook(() => useProgressTimeClock(undefined))

describe("useProgressTimeClock", () => {
  describe("dateValue", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.dateValue).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })

  describe("percentWidth", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.percentWidth).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })

  describe("remainingTimeString", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.remainingTimeString).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })

  describe("handleTimeClick", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.handleTimeClick).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
})
