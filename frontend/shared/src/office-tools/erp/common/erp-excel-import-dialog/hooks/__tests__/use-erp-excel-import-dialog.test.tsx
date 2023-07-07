import {MockedProvider} from "@apollo/client/testing"
import {act, renderHook} from "@testing-library/react-hooks"
import * as React from "react"
import wait from "waait"
import {sampleCompanyIdMock} from "../../../../../../../tests/__mocks__"
import {Children} from "../../../../../../styles"
import {erpEntityResponsesMock} from "../../../../hooks/__mocks__/erp-entity-responses.mock"
import {useErpExcelImportDialog} from "../use-erp-excel-import-dialog"

const onDismissMock = jest.fn()

const getConnectedHook = () =>
  renderHook(() => useErpExcelImportDialog(sampleCompanyIdMock, onDismissMock), {
    wrapper: ({children}: Children) => (
      <MockedProvider mocks={erpEntityResponsesMock} addTypename={true}>
        <div>{children}</div>
      </MockedProvider>
    )
  })

describe("use-erp-excel-import-dialog", () => {
  describe("file", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.file).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("selectFile", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.selectFile).toBeDefined()
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
  describe("uploading", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.uploading).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("uploadSuccessful", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.uploadSuccessful).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("uploadFile", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.uploadFile).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("fileUploaded", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.fileUploaded).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
})
