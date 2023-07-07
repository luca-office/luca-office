import {fakeTranslate} from "../../../../../../tests/utils/translate-mock"
import {getErpSupplierLabel} from "../erp-supplier-label"

describe("erp-supplier-label", () => {
  describe("getErpSupplierLabel", () => {
    it("id", () => {
      expect(getErpSupplierLabel(fakeTranslate, "id", true)).toEqual(
        "erp__table_label_supplier_id (erp__table_label_value_number)"
      )
    })
    it("firstName", () => {
      expect(getErpSupplierLabel(fakeTranslate, "firstName", true)).toEqual(
        "erp__table_label_first_name (erp__table_label_value_string)"
      )
    })
    it("lastName", () => {
      expect(getErpSupplierLabel(fakeTranslate, "lastName", true)).toEqual(
        "erp__table_label_last_name (erp__table_label_value_string)"
      )
    })
    it("company", () => {
      expect(getErpSupplierLabel(fakeTranslate, "company", true)).toEqual(
        "erp__table_label_company (erp__table_label_value_string)"
      )
    })
    it("addressLine", () => {
      expect(getErpSupplierLabel(fakeTranslate, "addressLine", true)).toEqual(
        "erp__table_label_address_line (erp__table_label_value_string)"
      )
    })
    it("postalCode", () => {
      expect(getErpSupplierLabel(fakeTranslate, "postalCode", true)).toEqual(
        "erp__table_label_postal_code (erp__table_label_value_postal_code)"
      )
    })
    it("city", () => {
      expect(getErpSupplierLabel(fakeTranslate, "city", true)).toEqual(
        "erp__table_label_city (erp__table_label_value_string)"
      )
    })
    it("country", () => {
      expect(getErpSupplierLabel(fakeTranslate, "country", true)).toEqual(
        "erp__table_label_country (erp__table_label_value_string)"
      )
    })
    it("email", () => {
      expect(getErpSupplierLabel(fakeTranslate, "email", true)).toEqual(
        "erp__table_label_email (erp__table_label_value_email)"
      )
    })
    it("phone", () => {
      expect(getErpSupplierLabel(fakeTranslate, "phone", true)).toEqual(
        "erp__table_label_phone (erp__table_label_value_phone)"
      )
    })
    it("note", () => {
      expect(getErpSupplierLabel(fakeTranslate, "note", true)).toEqual(
        "erp__table_label_note (erp__table_label_value_string)"
      )
    })
    it("sampleCompanyId", () => {
      expect(getErpSupplierLabel(fakeTranslate, "sampleCompanyId", true)).toEqual(
        "erp__table_label_sample_company_id (erp__table_label_value_string)"
      )
    })
    it("binaryFileId", () => {
      expect(getErpSupplierLabel(fakeTranslate, "binaryFileId", true)).toEqual(
        "erp__table_label_binary_file_id (erp__table_label_value_binary)"
      )
    })
    it("salutation", () => {
      expect(getErpSupplierLabel(fakeTranslate, "salutation", true)).toEqual(
        "erp__table_label_salutation (erp__table_label_value_salutation)"
      )
    })
  })
})
