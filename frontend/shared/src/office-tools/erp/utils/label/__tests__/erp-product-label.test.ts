import {fakeTranslate} from "../../../../../../tests/utils/translate-mock"
import {getErpProductLabel} from "../erp-product-label"

describe("erp-product-label", () => {
  describe("getErpProductLabel", () => {
    it("id", () => {
      expect(getErpProductLabel(fakeTranslate, "id", true)).toEqual(
        "erp__table_label_product_id (erp__table_label_value_number)"
      )
    })
    it("name", () => {
      expect(getErpProductLabel(fakeTranslate, "name", true)).toEqual(
        "erp__table_label_name (erp__table_label_value_string)"
      )
    })
    it("netPriceInCents", () => {
      expect(getErpProductLabel(fakeTranslate, "netPriceInCents", true)).toEqual(
        "erp__table_product_label_net_price (erp__table_label_value_currency)"
      )
    })
    it("taxRate", () => {
      expect(getErpProductLabel(fakeTranslate, "taxRate", true)).toEqual(
        "erp__table_product_label_tax_rate (erp__table_label_value_number)"
      )
    })
    it("sampleCompanyId", () => {
      expect(getErpProductLabel(fakeTranslate, "sampleCompanyId", true)).toEqual(
        "erp__table_label_sample_company_id (erp__table_label_value_string)"
      )
    })
    it("binaryFileId", () => {
      expect(getErpProductLabel(fakeTranslate, "binaryFileId", true)).toEqual(
        "erp__table_label_binary_file_id (erp__table_label_value_binary)"
      )
    })
    it("unit", () => {
      expect(getErpProductLabel(fakeTranslate, "unit", true)).toEqual(
        "erp__table_label_unit (erp__table_label_value_string)"
      )
    })
    it("note", () => {
      expect(getErpProductLabel(fakeTranslate, "note", true)).toEqual(
        "erp__table_label_note (erp__table_label_value_string)"
      )
    })
    it("packSize", () => {
      expect(getErpProductLabel(fakeTranslate, "packSize", true)).toEqual(
        "erp__table_label_pack_size (erp__table_label_value_number)"
      )
    })
    it("availableStock", () => {
      expect(getErpProductLabel(fakeTranslate, "availableStock", true)).toEqual(
        "erp__table_label_available_stock (erp__table_label_value_number)"
      )
    })
    it("stockCostPerUnitInCents", () => {
      expect(getErpProductLabel(fakeTranslate, "stockCostPerUnitInCents", true)).toEqual(
        "erp__table_label_stock_cost_per_unit (erp__table_label_value_currency)"
      )
    })
    it("stockCostTotalInCents", () => {
      expect(getErpProductLabel(fakeTranslate, "stockCostTotalInCents", true)).toEqual(
        "erp__table_label_stock_cost_total (erp__table_label_value_currency)"
      )
    })
  })
})
