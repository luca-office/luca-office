import {act, renderHook} from "@testing-library/react-hooks"
import wait from "waait"
import {useAutoComplete} from "../use-auto-complete"

jest.mock("lodash-es", () => {
  const original = jest.requireActual("lodash-es")
  return {
    ...original,
    debounce: (fn: any) => {
      fn.cancel = jest.fn()
      return fn
    }
  }
})

const items = ["this", "is", "a", "test"]

const getConnectedHook = () => renderHook(() => useAutoComplete(items))

describe("use-auto-complete", () => {
  describe("setSearchQuery", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.setSearchQuery).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("results", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.results).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
    it("initially shows no items", async () => {
      const {result} = getConnectedHook()
      expect(result.current.results).toEqual([])
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
    it("correctly filters items", async () => {
      const {result, waitForValueToChange} = getConnectedHook()
      act(() => result.current.setSearchQuery("is"))
      await waitForValueToChange(() => result.current.results)
      expect(result.current.results).toEqual(items.slice(0, 2))
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
    it("correctly returns no items", async () => {
      const {result, waitForValueToChange} = getConnectedHook()
      act(() => result.current.setSearchQuery("empty"))
      await waitForValueToChange(() => result.current.results)
      expect(result.current.results).toEqual([])
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
})
