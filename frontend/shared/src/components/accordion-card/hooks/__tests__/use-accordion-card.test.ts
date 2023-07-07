import {act, renderHook} from "@testing-library/react-hooks"
import wait from "waait"
import {useAccordionCard} from "../use-accordion-card"

const getConnectedHook = () => renderHook(() => useAccordionCard())

describe("use-accordion-card", () => {
  describe("contentVisible", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.contentVisible).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("showContent", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.showContent).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("hideContent", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.hideContent).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
})
