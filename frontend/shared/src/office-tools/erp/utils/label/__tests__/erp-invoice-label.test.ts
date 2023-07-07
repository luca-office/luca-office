import {fakeTranslate} from "../../../../../../tests/utils/translate-mock"
import {getErpInvoiceLabel} from "../erp-invoice-label"

describe("erp-invoice-label", () => {
  describe("getErpInvoiceLabel", () => {
    it("id", () => {
      expect(getErpInvoiceLabel(fakeTranslate, "id", true)).toEqual(
        "erp__table_label_invoice_id (erp__table_label_value_number)"
      )
    })
    it("invoiceDate", () => {
      expect(getErpInvoiceLabel(fakeTranslate, "invoiceDate", true)).toEqual(
        "erp__table_invoice_label_invoice_date (erp__table_label_value_date)"
      )
    })
    it("dueDate", () => {
      expect(getErpInvoiceLabel(fakeTranslate, "dueDate", true)).toEqual(
        "erp__table_invoice_label_due_date (erp__table_label_value_date)"
      )
    })
    it("paymentTerms", () => {
      expect(getErpInvoiceLabel(fakeTranslate, "paymentTerms", true)).toEqual(
        "erp__table_invoice_label_payment_terms (erp__table_label_value_string)"
      )
    })
    it("amountPaidInCents", () => {
      expect(getErpInvoiceLabel(fakeTranslate, "amountPaidInCents", true)).toEqual(
        "erp__table_invoice_label_amount_paid (erp__table_label_value_currency)"
      )
    })
    it("paymentStatus", () => {
      expect(getErpInvoiceLabel(fakeTranslate, "paymentStatus", true)).toEqual(
        "erp__table_invoice_label_payment_status (erp__table_label_value_payment_status)"
      )
    })
    it("reminderFeeInCents", () => {
      expect(getErpInvoiceLabel(fakeTranslate, "reminderFeeInCents", true)).toEqual(
        "erp__table_invoice_label_reminder_fee (erp__table_label_value_currency)"
      )
    })
    it("defaultChargesInCents", () => {
      expect(getErpInvoiceLabel(fakeTranslate, "defaultChargesInCents", true)).toEqual(
        "erp__table_invoice_label_default_charges (erp__table_label_value_currency)"
      )
    })
    it("note", () => {
      expect(getErpInvoiceLabel(fakeTranslate, "note", true)).toEqual(
        "erp__table_label_note (erp__table_label_value_string)"
      )
    })
    it("sampleCompanyId", () => {
      expect(getErpInvoiceLabel(fakeTranslate, "sampleCompanyId", true)).toEqual(
        "erp__table_label_sample_company_id (erp__table_label_value_string)"
      )
    })
    it("orderId", () => {
      expect(getErpInvoiceLabel(fakeTranslate, "orderId", true)).toEqual(
        "erp__table_label_order_id (erp__table_label_value_number)"
      )
    })
    it("totalNetInCents", () => {
      expect(getErpInvoiceLabel(fakeTranslate, "totalNetInCents", true)).toEqual(
        "erp__table_label_total_net (erp__table_label_value_currency)"
      )
    })
    it("totalGrossInCents", () => {
      expect(getErpInvoiceLabel(fakeTranslate, "totalGrossInCents", true)).toEqual(
        "erp__table_invoice_label_total_gross (erp__table_label_value_currency)"
      )
    })
    it("taxAmountInCents", () => {
      expect(getErpInvoiceLabel(fakeTranslate, "taxAmountInCents", true)).toEqual(
        "erp__table_invoice_label_tax_amount (erp__table_label_value_currency)"
      )
    })
    it("binaryFileId", () => {
      expect(getErpInvoiceLabel(fakeTranslate, "binaryFileId", true)).toEqual(
        "erp__table_label_binary_file_id (erp__table_label_value_binary)"
      )
    })
  })
})
