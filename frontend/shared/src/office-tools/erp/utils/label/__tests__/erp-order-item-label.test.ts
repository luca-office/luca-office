import {fakeTranslate} from "../../../../../../tests/utils/translate-mock"
import {getErpOrderItemLabel} from "../erp-order-item-label"

describe("erp-order-item-label", () => {
  describe("getErpOrderItemLabel", () => {
    it("id", () => {
      expect(getErpOrderItemLabel(fakeTranslate, "id", true)).toEqual(
        "erp__table_label_order_item_id (erp__table_label_value_number)"
      )
    })
    it("quantity", () => {
      expect(getErpOrderItemLabel(fakeTranslate, "quantity", true)).toEqual(
        "erp__table_label_quantity (erp__table_label_value_number)"
      )
    })
    it("sampleCompanyId", () => {
      expect(getErpOrderItemLabel(fakeTranslate, "sampleCompanyId", true)).toEqual(
        "erp__table_label_sample_company_id (erp__table_label_value_string)"
      )
    })
    it("orderId", () => {
      expect(getErpOrderItemLabel(fakeTranslate, "orderId", true)).toEqual(
        "erp__table_label_order_id (erp__table_label_value_number)"
      )
    })
    it("productId", () => {
      expect(getErpOrderItemLabel(fakeTranslate, "productId", true)).toEqual(
        "erp__table_label_product_id (erp__table_label_value_number)"
      )
    })
    it("totalNetInCents", () => {
      expect(getErpOrderItemLabel(fakeTranslate, "totalNetInCents", true)).toEqual(
        "erp__table_label_total_net (erp__table_label_value_currency)"
      )
    })
    it("binaryFileId", () => {
      expect(getErpOrderItemLabel(fakeTranslate, "binaryFileId", true)).toEqual(
        "erp__table_label_binary_file_id (erp__table_label_value_binary)"
      )
    })
  })
})
