import {fakeTranslate} from "../../../../../../tests/utils/translate-mock"
import {getErpEmployeeLabel} from "../erp-employee-label"

describe("erp-employee-label", () => {
  describe("getErpEmployeeLabel", () => {
    it("id", () => {
      expect(getErpEmployeeLabel(fakeTranslate, "id", true)).toEqual(
        "erp__table_label_employee_id (erp__table_label_value_number)"
      )
    })
    it("salutation", () => {
      expect(getErpEmployeeLabel(fakeTranslate, "salutation", true)).toEqual(
        "erp__table_label_salutation (erp__table_label_value_salutation)"
      )
    })
    it("firstName", () => {
      expect(getErpEmployeeLabel(fakeTranslate, "firstName", true)).toEqual(
        "erp__table_label_first_name (erp__table_label_value_string)"
      )
    })
    it("lastName", () => {
      expect(getErpEmployeeLabel(fakeTranslate, "lastName", true)).toEqual(
        "erp__table_label_last_name (erp__table_label_value_string)"
      )
    })
    it("addressLine", () => {
      expect(getErpEmployeeLabel(fakeTranslate, "addressLine", true)).toEqual(
        "erp__table_label_address_line (erp__table_label_value_string)"
      )
    })
    it("postalCode", () => {
      expect(getErpEmployeeLabel(fakeTranslate, "postalCode", true)).toEqual(
        "erp__table_label_postal_code (erp__table_label_value_postal_code)"
      )
    })
    it("city", () => {
      expect(getErpEmployeeLabel(fakeTranslate, "city", true)).toEqual(
        "erp__table_label_city (erp__table_label_value_string)"
      )
    })
    it("country", () => {
      expect(getErpEmployeeLabel(fakeTranslate, "country", true)).toEqual(
        "erp__table_label_country (erp__table_label_value_string)"
      )
    })
    it("email", () => {
      expect(getErpEmployeeLabel(fakeTranslate, "email", true)).toEqual(
        "erp__table_label_email (erp__table_label_value_email)"
      )
    })
    it("phone", () => {
      expect(getErpEmployeeLabel(fakeTranslate, "phone", true)).toEqual(
        "erp__table_label_phone (erp__table_label_value_phone)"
      )
    })
    it("department", () => {
      expect(getErpEmployeeLabel(fakeTranslate, "department", true)).toEqual(
        "erp__table_employee_label_department (erp__table_label_value_string)"
      )
    })
    it("jobTitle", () => {
      expect(getErpEmployeeLabel(fakeTranslate, "jobTitle", true)).toEqual(
        "erp__table_employee_label_job_title (erp__table_label_value_string)"
      )
    })
    it("employmentMode", () => {
      expect(getErpEmployeeLabel(fakeTranslate, "employmentMode", true)).toEqual(
        "erp__table_employee_label_employment_mode (erp__table_label_value_employment)"
      )
    })
    it("employedAt", () => {
      expect(getErpEmployeeLabel(fakeTranslate, "employedAt", true)).toEqual(
        "erp__table_employee_label_employed_at (erp__table_label_value_date)"
      )
    })
    it("employmentEndsAt", () => {
      expect(getErpEmployeeLabel(fakeTranslate, "employmentEndsAt", true)).toEqual(
        "erp__table_employee_label_employment_ends_at (erp__table_label_value_date)"
      )
    })
    it("site", () => {
      expect(getErpEmployeeLabel(fakeTranslate, "site", true)).toEqual(
        "erp__table_employee_label_site (erp__table_label_value_string)"
      )
    })
    it("graduation", () => {
      expect(getErpEmployeeLabel(fakeTranslate, "graduation", true)).toEqual(
        "erp__table_employee_label_graduation (erp__table_label_value_string)"
      )
    })
    it("furtherEducation", () => {
      expect(getErpEmployeeLabel(fakeTranslate, "furtherEducation", true)).toEqual(
        "erp__table_employee_label_further_education (erp__table_label_value_string)"
      )
    })
    it("taxClass", () => {
      expect(getErpEmployeeLabel(fakeTranslate, "taxClass", true)).toEqual(
        "erp__table_employee_label_tax_class (erp__table_label_value_string)"
      )
    })
    it("familyStatus", () => {
      expect(getErpEmployeeLabel(fakeTranslate, "familyStatus", true)).toEqual(
        "erp__table_employee_label_family_status (erp__table_label_value_family_status)"
      )
    })
    it("childCount", () => {
      expect(getErpEmployeeLabel(fakeTranslate, "childCount", true)).toEqual(
        "erp__table_employee_label_child_count (erp__table_label_value_number)"
      )
    })
    it("sampleCompanyId", () => {
      expect(getErpEmployeeLabel(fakeTranslate, "sampleCompanyId", true)).toEqual(
        "erp__table_label_sample_company_id (erp__table_label_value_string)"
      )
    })
    it("binaryFileId", () => {
      expect(getErpEmployeeLabel(fakeTranslate, "binaryFileId", true)).toEqual(
        "erp__table_label_binary_file_id (erp__table_label_value_binary)"
      )
    })
    it("note", () => {
      expect(getErpEmployeeLabel(fakeTranslate, "note", true)).toEqual(
        "erp__table_label_note (erp__table_label_value_string)"
      )
    })
  })
})
