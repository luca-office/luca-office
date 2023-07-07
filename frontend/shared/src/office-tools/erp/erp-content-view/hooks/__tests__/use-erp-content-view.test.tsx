import {act, renderHook} from "@testing-library/react-hooks"
import {ErpEntity} from "../../../../../models"
import {Option} from "../../../../../utils"
import {ErpTableColumn} from "../../../erp-table"
import {erpColumnsMock} from "../../__mocks__/erp-columns.mock"
import {erpComponentMockEntities} from "../../__mocks__/erp-entities.mock"
import {useErpContentView} from "../use-erp-content-view"

jest.mock("lodash-es/debounce", () => jest.fn(fn => fn))

const getConnectedHook = <T extends ErpEntity>(entities: Option<Array<T>>, columns: Option<Array<ErpTableColumn>>) =>
  renderHook(() => useErpContentView(entities, columns))

afterAll(() => {
  jest.unmock("lodash-es/debounce")
})

describe("UseErpContentView", () => {
  describe("visibleEntries", () => {
    it("should default to be defined", () => {
      const {result} = getConnectedHook(Option.of(erpComponentMockEntities), Option.of(erpColumnsMock))
      expect(result.current.visibleRows).toBeDefined()
    })

    it("should have the correct length", () => {
      const {result} = getConnectedHook(Option.of(erpComponentMockEntities), Option.of(erpColumnsMock))
      expect(result.current.visibleRows.getOrElse([]).length).toBe(erpComponentMockEntities.length)
    })

    it("should have the correct length after search", async () => {
      const {result} = getConnectedHook(Option.of(erpComponentMockEntities), Option.of(erpColumnsMock))

      act(() => {
        result.current.onSearch("Komponente 0")
      })

      expect(result.current.visibleRows.getOrElse([]).length).toBe(1)
    })
  })

  describe("onSearch", () => {
    it("should default to be defined", () => {
      const {result} = getConnectedHook(Option.of(erpComponentMockEntities), Option.of(erpColumnsMock))
      expect(result.current.onSearch).toBeDefined()
    })
  })

  describe("selectedEntity", () => {
    it("should default to be defined", () => {
      const {result} = getConnectedHook(Option.of(erpComponentMockEntities), Option.of(erpColumnsMock))
      expect(result.current.selectedEntity).toBeDefined()
    })
  })

  describe("setSelectedEntity", () => {
    it("should default to be defined", () => {
      const {result} = getConnectedHook(Option.of(erpComponentMockEntities), Option.of(erpColumnsMock))
      expect(result.current.setSelectedEntity).toBeDefined()
    })
  })

  describe("selectedRowsCount", () => {
    it("has correct value", () => {
      const {result} = getConnectedHook(Option.of(erpComponentMockEntities), Option.of(erpColumnsMock))
      expect(result.current.selectedRowsCount).toEqual(0)
    })
  })
})
