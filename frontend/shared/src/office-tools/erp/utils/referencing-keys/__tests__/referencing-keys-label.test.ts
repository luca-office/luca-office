import {fakeTranslate} from "../../../../../../tests/utils/translate-mock"
import {ErpType} from "../../../../../enums"
import {getAccordionLabel, getAdditionalAccordionLabel} from "../referencing-keys-label"

describe("referencing-keys-label", () => {
  describe("getAccordionLabel", () => {
    it("returns correct label for ErpComponent", () => {
      expect(getAccordionLabel(fakeTranslate, ErpType.Component)).toEqual("erp_accordion__component_label")
    })
    it("returns correct label for ErpCustomer", () => {
      expect(getAccordionLabel(fakeTranslate, ErpType.Customer)).toEqual("erp_accordion__customer_label")
    })
    it("returns correct label for ErpEmployee", () => {
      expect(getAccordionLabel(fakeTranslate, ErpType.Employee)).toEqual("erp_accordion__employee_label")
    })
    it("returns correct label for ErpInvoice", () => {
      expect(getAccordionLabel(fakeTranslate, ErpType.Invoice)).toEqual("erp_accordion__invoice_label")
    })
    it("returns correct label for ErpOrder", () => {
      expect(getAccordionLabel(fakeTranslate, ErpType.Order)).toEqual("erp_accordion__order_label")
    })
    it("returns correct label for ErpOrderItem", () => {
      expect(getAccordionLabel(fakeTranslate, ErpType.OrderItem)).toEqual("erp_accordion__order_item_label")
    })
    it("returns correct label for ErpProduct", () => {
      expect(getAccordionLabel(fakeTranslate, ErpType.Product)).toEqual("erp_accordion__product_label")
    })
    it("returns correct label for ErpSupplier", () => {
      expect(getAccordionLabel(fakeTranslate, ErpType.Supplier)).toEqual("erp_accordion__supplier_label")
    })
  })
  describe("getAdditionalAccordionLabel", () => {
    it("returns correct additional label for ErpComponent", () => {
      expect(getAdditionalAccordionLabel(fakeTranslate, ErpType.Component, 1)).toEqual(
        "erp_accordion__component_additional_label"
      )
    })
    it("returns correct additional label for ErpCustomer", () => {
      expect(getAdditionalAccordionLabel(fakeTranslate, ErpType.Customer, 1)).toEqual(
        "erp_accordion__customer_additional_label"
      )
    })
    it("returns correct additional label for ErpEmployee", () => {
      expect(getAdditionalAccordionLabel(fakeTranslate, ErpType.Employee, 1)).toEqual(
        "erp_accordion__employee_additional_label"
      )
    })
    it("returns correct additional label for ErpInvoice", () => {
      expect(getAdditionalAccordionLabel(fakeTranslate, ErpType.Invoice, 1)).toEqual(
        "erp_accordion__invoice_additional_label"
      )
    })
    it("returns correct additional label for ErpOrder", () => {
      expect(getAdditionalAccordionLabel(fakeTranslate, ErpType.Order, 1)).toEqual(
        "erp_accordion__order_additional_label"
      )
    })
    it("returns correct additional label for ErpOrderItem", () => {
      expect(getAdditionalAccordionLabel(fakeTranslate, ErpType.OrderItem, 1)).toEqual(
        "erp_accordion__order_item_additional_label"
      )
    })
    it("returns correct additional label for ErpProduct", () => {
      expect(getAdditionalAccordionLabel(fakeTranslate, ErpType.Product, 1)).toEqual(
        "erp_accordion__product_additional_label"
      )
    })
    it("returns correct additional label for ErpSupplier", () => {
      expect(getAdditionalAccordionLabel(fakeTranslate, ErpType.Supplier, 1)).toEqual(
        "erp_accordion__supplier_additional_label"
      )
    })
  })
})
