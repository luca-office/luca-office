import {act, renderHook} from "@testing-library/react-hooks"
import wait from "waait"
import {Option} from "../../../../utils"
import {pdfBinariesMock} from "../../__mocks__/binaries.mock"
import {usePdfViewer} from "../use-pdf-viewer"

const getConnectedHook = () => renderHook(() => usePdfViewer(pdfBinariesMock, Option.none<UUID>(), jest.fn(), jest.fn))

describe("use-pdf-viewer", () => {
  describe("areControlsDisabled", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.areControlsDisabled).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("onLeftClick", () => {
    it("should be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.onLeftClick).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("onRightClick", () => {
    it("should be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.onRightClick).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("selectedPdf", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.selectedPdf).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
})
