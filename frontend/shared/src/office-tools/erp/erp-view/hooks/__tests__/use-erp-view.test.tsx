import {MockedProvider} from "@apollo/client/testing"
import {act, renderHook} from "@testing-library/react-hooks"
import React from "react"
import {Provider} from "react-redux"
import wait from "waait"
import {sampleCompanyIdMock} from "../../../../../../tests/__mocks__"
import {fakeStore} from "../../../../../../tests/redux/fake-store"
import {initialSharedAppState} from "../../../../../redux/state"
import {Children} from "../../../../../styles"
import {Option} from "../../../../../utils"
import {useErpEntityQueryResponsesMock} from "../__mocks__/use-erp-entity.mock"
import {useErpView} from "../use-erp-view"

const getConnectedHook = () =>
  renderHook(() => useErpView(sampleCompanyIdMock, "TestCompany", false, Option.none()), {
    wrapper: ({children}: Children) => (
      <MockedProvider mocks={useErpEntityQueryResponsesMock} addTypename={true}>
        <Provider store={fakeStore(initialSharedAppState)}>
          <div>{children}</div>
        </Provider>
      </MockedProvider>
    )
  })

describe("UseErpView", () => {
  describe("selectErpNavigationEntry", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.selectErpNavigationNode).toBeDefined()
      await act(() => wait(0))
    })
  })
  describe("columns", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.columns).toBeDefined()

      await act(() => wait(0))
    })
  })
  describe("entities", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.entities).toBeDefined()

      await act(() => wait(0))
    })
  })
  describe("isLoading", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.isLoading).toBeDefined()

      await act(() => wait(0))
    })
  })
  describe("currentErpTypeName", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.currentErpTypeName).toBeDefined()

      await act(() => wait(0))
    })
  })
  describe("isDataSetOverlayVisible", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.isDataSetOverlayVisible).toBeDefined()

      await act(() => wait(0))
    })
  })
  describe("setIsDataSetOverlayVisible", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.setIsDataSetOverlayVisible).toBeDefined()

      await act(() => wait(0))
    })
  })
  describe("selectedEntity", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.selectedEntity).toBeDefined()

      await act(() => wait(0))
    })
  })
  describe("setSelectedEntity", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.setSelectedEntity).toBeDefined()

      await act(() => wait(0))
    })
  })
  describe("getEntity", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.getEntity).toBeDefined()

      await act(() => wait(0))
    })
  })
  describe("currentErpType", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.currentErpType).toBeDefined()

      await act(() => wait(0))
    })
  })
  describe("isImportDialogVisible", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.isImportDialogVisible).toBeDefined()

      await act(() => wait(0))
    })
  })
  describe("setIsImportDialogVisible", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.setIsImportDialogVisible).toBeDefined()

      await act(() => wait(0))
    })
  })
  describe("linkRef", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.linkRef).toBeDefined()

      await act(() => wait(0))
    })
  })
  describe("isReadOnly", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.isReadOnly).toBeDefined()

      await act(() => wait(0))
    })
  })
})
