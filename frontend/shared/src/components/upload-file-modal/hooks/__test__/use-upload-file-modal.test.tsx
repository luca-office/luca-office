import {act, renderHook} from "@testing-library/react-hooks"
import wait from "waait"
import {useUploadFileModal} from "../use-upload-file-modal"

const onUploadSuccess = jest.fn()

const getConnectedHook = () => renderHook(() => useUploadFileModal({onUploadSuccess, isLimitedToSingleItem: false}))

describe("useUploadFileModal", () => {
  describe("selectedFileType", () => {
    it("should default to empty Option", async () => {
      const {result} = getConnectedHook()
      expect(result.current.acceptedFileTypes).toHaveLength(0)
      await act(() => wait(0))
    })
  })

  describe("setSelectedFileType", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.setAcceptedFileTypes).toBeDefined()
      await act(() => wait(0))
    })
  })

  describe("selectFiles", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.selectFiles).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })

  describe("deselectFile", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.deselectFile).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })

  describe("selectedFiles", () => {
    it("should default to be an empty array", async () => {
      const {result} = getConnectedHook()
      expect(result.current.selectedFiles).toHaveLength(0)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })

  describe("uploadBinaries", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.uploadBinaries).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })

  describe("isUploading", () => {
    it("should default to be false", async () => {
      const {result} = getConnectedHook()
      expect(result.current.isUploading).toBe(false)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
})
