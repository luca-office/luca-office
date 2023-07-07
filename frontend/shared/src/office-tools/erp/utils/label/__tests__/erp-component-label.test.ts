import {fakeTranslate} from "../../../../../../tests/utils/translate-mock"
import {getErpComponentLabel} from "../erp-component-label"

describe("erp-component-label", () => {
  describe("getErpComponentLabel", () => {
    it("id", () => {
      expect(getErpComponentLabel(fakeTranslate, "id", true)).toEqual(
        "erp__table_label_component_id (erp__table_label_value_number)"
      )
    })
    it("name", () => {
      expect(getErpComponentLabel(fakeTranslate, "name", true)).toEqual(
        "erp__table_label_name (erp__table_label_value_string)"
      )
    })
    it("category", () => {
      expect(getErpComponentLabel(fakeTranslate, "category", true)).toEqual(
        "erp__table_component_label_category (erp__table_label_value_string)"
      )
    })
    it("purchasingPriceInCents", () => {
      expect(getErpComponentLabel(fakeTranslate, "purchasingPriceInCents", true)).toEqual(
        "erp__table_component_label_purchasing_price (erp__table_label_value_currency)"
      )
    })
    it("margin", () => {
      expect(getErpComponentLabel(fakeTranslate, "margin", true)).toEqual(
        "erp__table_component_label_margin (erp__table_label_value_number)"
      )
    })

    it("supplierId", () => {
      expect(getErpComponentLabel(fakeTranslate, "supplierId", true)).toEqual(
        "erp__table_label_supplier_id (erp__table_label_value_number)"
      )
    })
    it("packSize", () => {
      expect(getErpComponentLabel(fakeTranslate, "packSize", true)).toEqual(
        "erp__table_label_pack_size (erp__table_label_value_number)"
      )
    })
    it("availableStock", () => {
      expect(getErpComponentLabel(fakeTranslate, "availableStock", true)).toEqual(
        "erp__table_label_available_stock (erp__table_label_value_number)"
      )
    })
    it("stockCostPerUnitInCents", () => {
      expect(getErpComponentLabel(fakeTranslate, "stockCostPerUnitInCents", true)).toEqual(
        "erp__table_label_stock_cost_per_unit (erp__table_label_value_currency)"
      )
    })
    it("stockCostTotalInCents", () => {
      expect(getErpComponentLabel(fakeTranslate, "stockCostTotalInCents", true)).toEqual(
        "erp__table_label_stock_cost_total (erp__table_label_value_currency)"
      )
    })
    it("binaryFileId", () => {
      expect(getErpComponentLabel(fakeTranslate, "binaryFileId", true)).toEqual(
        "erp__table_label_binary_file_id (erp__table_label_value_binary)"
      )
    })
    it("unit", () => {
      expect(getErpComponentLabel(fakeTranslate, "unit", true)).toEqual(
        "erp__table_label_unit (erp__table_label_value_string)"
      )
    })
    it("note", () => {
      expect(getErpComponentLabel(fakeTranslate, "note", true)).toEqual(
        "erp__table_label_note (erp__table_label_value_string)"
      )
    })
  })
})
