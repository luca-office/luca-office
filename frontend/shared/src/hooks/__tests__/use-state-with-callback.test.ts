import {act, renderHook} from "@testing-library/react-hooks"
import wait from "waait"
import {useStateWithCallback} from "../use-state-with-callback"

const getConnectedHook = <T>(initialValue?: T) => renderHook(() => useStateWithCallback(initialValue))

describe("use-state-with-callback", () => {
  it("should return tuple with value and setter (no initial state)", async () => {
    const {result} = getConnectedHook()
    expect(result.current.map(value => typeof value)).toEqual(["undefined", "function"])
    // Silence mock provider act warnings
    await act(() => wait(0))
  })
  it("should return tuple with value and setter (initial state)", async () => {
    const {result} = getConnectedHook("initial-value")
    expect(result.current.map(value => typeof value)).toEqual(["string", "function"])
    // Silence mock provider act warnings
    await act(() => wait(0))
  })
})
