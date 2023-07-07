import {fakeTranslate} from "../../../../../../tests/utils/translate-mock"
import {getErpCustomerLabel} from "../erp-customer-label"

describe("erp-customer-label", () => {
  describe("getErpCustomerLabel", () => {
    it("id", () => {
      expect(getErpCustomerLabel(fakeTranslate, "id", true)).toEqual(
        "erp__table_order_label_customer_id (erp__table_label_value_number)"
      )
    })
    it("salutation", () => {
      expect(getErpCustomerLabel(fakeTranslate, "salutation", true)).toEqual(
        "erp__table_label_salutation (erp__table_label_value_salutation)"
      )
    })
    it("firstName", () => {
      expect(getErpCustomerLabel(fakeTranslate, "firstName", true)).toEqual(
        "erp__table_label_first_name (erp__table_label_value_string)"
      )
    })
    it("lastName", () => {
      expect(getErpCustomerLabel(fakeTranslate, "lastName", true)).toEqual(
        "erp__table_label_last_name (erp__table_label_value_string)"
      )
    })
    it("company", () => {
      expect(getErpCustomerLabel(fakeTranslate, "company", true)).toEqual(
        "erp__table_label_company (erp__table_label_value_string)"
      )
    })
    it("addressLine", () => {
      expect(getErpCustomerLabel(fakeTranslate, "addressLine", true)).toEqual(
        "erp__table_label_address_line (erp__table_label_value_string)"
      )
    })
    it("postalCode", () => {
      expect(getErpCustomerLabel(fakeTranslate, "postalCode", true)).toEqual(
        "erp__table_label_postal_code (erp__table_label_value_postal_code)"
      )
    })
    it("city", () => {
      expect(getErpCustomerLabel(fakeTranslate, "city", true)).toEqual(
        "erp__table_label_city (erp__table_label_value_string)"
      )
    })
    it("country", () => {
      expect(getErpCustomerLabel(fakeTranslate, "country", true)).toEqual(
        "erp__table_label_country (erp__table_label_value_string)"
      )
    })
    it("email", () => {
      expect(getErpCustomerLabel(fakeTranslate, "email", true)).toEqual(
        "erp__table_label_email (erp__table_label_value_email)"
      )
    })
    it("phone", () => {
      expect(getErpCustomerLabel(fakeTranslate, "phone", true)).toEqual(
        "erp__table_label_phone (erp__table_label_value_phone)"
      )
    })
    it("note", () => {
      expect(getErpCustomerLabel(fakeTranslate, "note", true)).toEqual(
        "erp__table_label_note (erp__table_label_value_string)"
      )
    })
    it("sampleCompanyId", () => {
      expect(getErpCustomerLabel(fakeTranslate, "sampleCompanyId", true)).toEqual(
        "erp__table_label_sample_company_id (erp__table_label_value_string)"
      )
    })
    it("binaryFileId", () => {
      expect(getErpCustomerLabel(fakeTranslate, "binaryFileId", true)).toEqual(
        "erp__table_label_binary_file_id (erp__table_label_value_binary)"
      )
    })
  })
})
