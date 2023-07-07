import {fakeTranslate} from "../../../../../../tests/utils/translate-mock"
import {getErpOrderLabel} from "../erp-order-label"

describe("erp-order-label", () => {
  describe("getErpOrderLabel", () => {
    it("id", () => {
      expect(getErpOrderLabel(fakeTranslate, "id", true)).toEqual(
        "erp__table_label_order_id (erp__table_label_value_number)"
      )
    })
    it("cashbackInCents", () => {
      expect(getErpOrderLabel(fakeTranslate, "cashbackInCents", true)).toEqual(
        "erp__table_order_label_cashback (erp__table_label_value_currency)"
      )
    })
    it("discountInCents", () => {
      expect(getErpOrderLabel(fakeTranslate, "discountInCents", true)).toEqual(
        "erp__table_order_label_discount (erp__table_label_value_currency)"
      )
    })
    it("deliveryChargeInCents", () => {
      expect(getErpOrderLabel(fakeTranslate, "deliveryChargeInCents", true)).toEqual(
        "erp__table_order_label_delivery_charge (erp__table_label_value_currency)"
      )
    })
    it("deliveryStatus", () => {
      expect(getErpOrderLabel(fakeTranslate, "deliveryStatus", true)).toEqual(
        "erp__table_order_label_delivery_status (erp__table_label_value_delivery_status)"
      )
    })
    it("deliveryDate", () => {
      expect(getErpOrderLabel(fakeTranslate, "deliveryDate", true)).toEqual(
        "erp__table_order_label_delivery_date (erp__table_label_value_date)"
      )
    })
    it("note", () => {
      expect(getErpOrderLabel(fakeTranslate, "note", true)).toEqual(
        "erp__table_label_note (erp__table_label_value_string)"
      )
    })
    it("sampleCompanyId", () => {
      expect(getErpOrderLabel(fakeTranslate, "sampleCompanyId", true)).toEqual(
        "erp__table_label_sample_company_id (erp__table_label_value_string)"
      )
    })
    it("customerId", () => {
      expect(getErpOrderLabel(fakeTranslate, "customerId", true)).toEqual(
        "erp__table_order_label_customer_id (erp__table_label_value_number)"
      )
    })
    it("employeeId", () => {
      expect(getErpOrderLabel(fakeTranslate, "employeeId", true)).toEqual(
        "erp__table_label_employee_id (erp__table_label_value_number)"
      )
    })
    it("binaryFileId", () => {
      expect(getErpOrderLabel(fakeTranslate, "binaryFileId", true)).toEqual(
        "erp__table_label_binary_file_id (erp__table_label_value_binary)"
      )
    })
  })
})
