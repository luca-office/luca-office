import {fakeTranslate} from "../../../../../../tests/utils/translate-mock"
import {getErpComponentForProductLabel} from "../erp-component-erp-product-label"

describe("erp-component-erp-product-label", () => {
  describe("getErpComponentForProductLabel", () => {
    it("componentId", () => {
      expect(getErpComponentForProductLabel(fakeTranslate, "componentId", true)).toEqual(
        "erp__table_label_component_id (erp__table_label_value_number)"
      )
    })
    it("productId", () => {
      expect(getErpComponentForProductLabel(fakeTranslate, "productId", true)).toEqual(
        "erp__table_label_product_id (erp__table_label_value_number)"
      )
    })
    it("quantity", () => {
      expect(getErpComponentForProductLabel(fakeTranslate, "quantity", true)).toEqual(
        "erp__table_label_quantity (erp__table_label_value_number)"
      )
    })
    it("sampleCompanyId", () => {
      expect(getErpComponentForProductLabel(fakeTranslate, "sampleCompanyId", true)).toEqual(
        "erp__table_label_sample_company_id (erp__table_label_value_string)"
      )
    })
  })
})
