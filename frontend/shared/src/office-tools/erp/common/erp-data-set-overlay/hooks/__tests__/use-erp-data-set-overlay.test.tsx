import {MockedProvider} from "@apollo/client/testing"
import {act, renderHook} from "@testing-library/react-hooks"
import * as React from "react"
import {Provider} from "react-redux"
import wait from "waait"
import {erpComponentsMock, sampleCompanyIdMock} from "../../../../../../../tests/__mocks__"
import {fakeStore} from "../../../../../../../tests/redux/fake-store"
import {initialSharedAppState} from "../../../../../../redux/state"
import {Children} from "../../../../../../styles"
import {createErpEntityResponsesMock} from "../../../../hooks/__mocks__/create-erp-entity-responses.mock"
import {deleteErpEntityResponsesMock} from "../../../../hooks/__mocks__/delete-erp-entity-responses.mock"
import {erpForeignKeysQueryResponsesMock} from "../../../../hooks/__mocks__/erp-foreign-keys-query-responses.mock"
import {erpReferencingPrimaryKeysQueryResponsesMock} from "../../../../hooks/__mocks__/erp-referencing-primary-keys-query-responses.mock"
import {updateErpEntityResponsesMock} from "../../../../hooks/__mocks__/update-erp-entity-responses.mock"
import {ErpDataSetMode, useErpDataSetOverlay} from "../use-erp-data-set-overlay"

const erpComponent = erpComponentsMock[0]

const getConnectedHook = () =>
  renderHook(
    () =>
      useErpDataSetOverlay({
        mode: ErpDataSetMode.Default,
        sampleCompanyId: sampleCompanyIdMock,
        data: erpComponent,
        getEntity: jest.fn(),
        onDismiss: jest.fn(),
        dataIndex: 0
      }),
    {
      wrapper: ({children}: Children) => (
        <MockedProvider
          mocks={[
            ...createErpEntityResponsesMock,
            ...updateErpEntityResponsesMock,
            ...deleteErpEntityResponsesMock,
            ...erpForeignKeysQueryResponsesMock,
            ...erpReferencingPrimaryKeysQueryResponsesMock
          ]}
          addTypename={true}>
          <Provider store={fakeStore(initialSharedAppState)}>
            <div>{children}</div>
          </Provider>
        </MockedProvider>
      )
    }
  )

describe("use-erp-data-set-overlay", () => {
  describe("currentStackEntity", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.currentStackEntity).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("modalTitleStack", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.modalTitleStack).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("formMethods", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.formMethods).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("goBack", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.goBack).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("navigateToEntity", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.navigateToEntity).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("dataLoading", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.dataLoading).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("actionLoading", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.actionLoading).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("updateErpEntity", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.updateErpEntity).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("formValuesChanged", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.formValuesChanged).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("deleteErpEntity", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.deleteErpEntity).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("autoCompleteLists", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.autoCompleteLists).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("referencingPrimaryKeys", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.referencingPrimaryKeys).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("currentBinaryFile", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.currentBinaryFile).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("shouldCreateCurrentEntity", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.shouldCreateCurrentEntity).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("sectionRef", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.sectionRef).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("sectionScrollSubject", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.sectionScrollSubject).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("scenarioErpSelector", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.scenarioErpSelector).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("deleteOrlyVisible", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.deleteOrlyVisible).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("setDeleteOrlyVisible", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.setDeleteOrlyVisible).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
})
