import {renderHook} from "@testing-library/react-hooks"
import {act} from "react-test-renderer"
import {CalculatorKey} from "../../enums/calculator-key"
import {useCalculatorButtons} from "../use-calculator-buttons"

const mockOnButtonClick = jest.fn()

const getConnectedHook = ({
  respectFocus = true,
  isFocussed = false
}: {respectFocus?: boolean; isFocussed?: boolean} = {}) =>
  renderHook(() =>
    useCalculatorButtons({onButtonClick: mockOnButtonClick, isCalculatorFocussed: isFocussed, respectFocus})
  )

describe("use-calculator-buttons", () => {
  describe("keydown event", () => {
    it("does not fire while not being focussed (default)", () => {
      getConnectedHook()

      act(() => {
        document.dispatchEvent(new KeyboardEvent("keydown", {key: "/"}))
      })
      expect(mockOnButtonClick).toHaveBeenCalledTimes(0)
    })
    it("correctly handles event", () => {
      getConnectedHook({respectFocus: false, isFocussed: true})

      act(() => {
        document.dispatchEvent(new KeyboardEvent("keydown", {key: "/"}))
      })
      expect(mockOnButtonClick).toHaveBeenCalledTimes(1)
      expect(mockOnButtonClick).toHaveBeenCalledWith(CalculatorKey.Divide)

      act(() => {
        document.dispatchEvent(new KeyboardEvent("keydown", {key: "*"}))
      })
      expect(mockOnButtonClick).toHaveBeenCalledTimes(2)
      expect(mockOnButtonClick).toHaveBeenCalledWith(CalculatorKey.Multiply)

      act(() => {
        document.dispatchEvent(new KeyboardEvent("keydown", {key: "A"}))
      })
      expect(mockOnButtonClick).toHaveBeenCalledTimes(2)
    })
  })
})
