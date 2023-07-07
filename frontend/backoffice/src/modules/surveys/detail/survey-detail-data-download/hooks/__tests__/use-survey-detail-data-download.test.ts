import {act, renderHook} from "@testing-library/react-hooks"
import wait from "waait"
import {useSurveyDetailDataDownload} from "../use-survey-detail-data-download"

const getConnectedHook = () => renderHook(() => useSurveyDetailDataDownload())

describe("use-survey-detail-data-download", () => {
  describe("isConfirmModalVisible", () => {
    it("should default to be false", async () => {
      const {result} = getConnectedHook()
      expect(result.current.isConfirmModalVisible).toEqual(false)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
    it("should be true after showConfirmModal was called", async () => {
      const {result} = getConnectedHook()
      result.current.showConfirmModal()
      expect(result.current.isConfirmModalVisible).toEqual(true)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("showConfirmModal", () => {
    it("should default be a function", async () => {
      const {result} = getConnectedHook()
      expect(typeof result.current.showConfirmModal).toEqual("function")
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
    it("correctly updates isConfirmModalVisible", async () => {
      const {result} = getConnectedHook()
      expect(result.current.isConfirmModalVisible).toEqual(false)
      result.current.showConfirmModal()
      expect(result.current.isConfirmModalVisible).toEqual(true)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("hideConfirmModal", () => {
    it("should default be a function", async () => {
      const {result} = getConnectedHook()
      expect(typeof result.current.hideConfirmModal).toEqual("function")
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
    it("correctly updates isConfirmModalVisible", async () => {
      const {result} = getConnectedHook()
      expect(result.current.isConfirmModalVisible).toEqual(false)
      result.current.showConfirmModal()
      expect(result.current.isConfirmModalVisible).toEqual(true)
      result.current.hideConfirmModal()
      expect(result.current.isConfirmModalVisible).toEqual(false)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
})
