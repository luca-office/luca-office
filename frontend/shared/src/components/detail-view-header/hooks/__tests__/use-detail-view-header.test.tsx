import {act, renderHook} from "@testing-library/react-hooks"
import * as React from "react"
import wait from "waait"
import {ButtonConfig} from "../../../../models"
import {useDetailViewHeader} from "../use-detail-view-header"

const spy = jest.fn()
const operationButton: ButtonConfig = {
  onClick: spy,
  orlyTextKey: "confirm_button",
  orlyConfirmKey: "confirm_button",
  disabled: false,
  labelKey: "placeholder"
}
const getConnectedHook = () => renderHook(() => useDetailViewHeader(operationButton))
const getConnectedHookInactive = () =>
  renderHook(() =>
    useDetailViewHeader({
      onClick: spy,
      disabled: false,
      labelKey: "placeholder"
    })
  )

describe("use-detail-view-header", () => {
  describe("operationConfirmationVisible", () => {
    it("should be false", async () => {
      const {result} = getConnectedHook()
      expect(result.current.operationConfirmationVisible).toBeFalsy()
    })
  })
  describe("onOperationButtonClick", () => {
    it("should not trigger confirmation", async () => {
      const {result} = getConnectedHook()

      if (result.current.onOperationButtonClick) {
        act(() => result.current.onOperationButtonClick!())
        // Silence mock provider act warnings
        await act(() => wait(0))
        expect(spy).not.toHaveBeenCalled()
      }
    })

    it("should trigger confirmation if no orly is defined", async () => {
      const {result} = getConnectedHookInactive()

      if (result.current.onOperationButtonClick) {
        act(() => result.current.onOperationButtonClick!())
        // Silence mock provider act warnings
        await act(() => wait(0))
        expect(spy).toHaveBeenCalled()
      }
    })
  })
})
