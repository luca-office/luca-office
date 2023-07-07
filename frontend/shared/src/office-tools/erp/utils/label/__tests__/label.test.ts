import {fakeTranslate} from "../../../../../../tests/utils/translate-mock"
import {ErpType} from "../../../../../enums"
import {getErpLabel} from "../label"

describe("label", () => {
  describe("getErpLabel", () => {
    it("ErpComponent", () => {
      expect(
        getErpLabel({
          t: fakeTranslate,
          type: ErpType.Component,
          key: "category",
          foreignKeys: ["supplierId"]
        })
      ).toEqual("erp__table_component_label_category (erp__table_label_value_string)")
    })
    it("ErpCustomer", () => {
      expect(
        getErpLabel({
          t: fakeTranslate,
          type: ErpType.Customer,
          key: "addressLine",
          foreignKeys: []
        })
      ).toEqual("erp__table_label_address_line (erp__table_label_value_string)")
    })
    it("ErpEmployee", () => {
      expect(
        getErpLabel({
          t: fakeTranslate,
          type: ErpType.Employee,
          key: "department",
          foreignKeys: []
        })
      ).toEqual("erp__table_employee_label_department (erp__table_label_value_string)")
    })
    it("ErpInvoice", () => {
      expect(
        getErpLabel({
          t: fakeTranslate,
          type: ErpType.Invoice,
          key: "reminderFeeInCents",
          foreignKeys: ["orderId"]
        })
      ).toEqual("erp__table_invoice_label_reminder_fee (erp__table_label_value_currency)")
    })
    it("ErpOrder", () => {
      expect(
        getErpLabel({
          t: fakeTranslate,
          type: ErpType.Order,
          key: "discountInCents",
          foreignKeys: ["customerId", "employeeId"]
        })
      ).toEqual("erp__table_order_label_discount (erp__table_label_value_currency)")
    })
    it("ErpOrderItem", () => {
      expect(
        getErpLabel({
          t: fakeTranslate,
          type: ErpType.OrderItem,
          key: "quantity",
          foreignKeys: ["orderId", "productId"]
        })
      ).toEqual("erp__table_label_quantity (erp__table_label_value_number)")
    })
    it("ErpProduct", () => {
      expect(
        getErpLabel({
          t: fakeTranslate,
          type: ErpType.Product,
          key: "netPriceInCents",
          foreignKeys: []
        })
      ).toEqual("erp__table_product_label_net_price (erp__table_label_value_currency)")
    })
    it("ErpSupplier", () => {
      expect(
        getErpLabel({
          t: fakeTranslate,
          type: ErpType.Supplier,
          key: "postalCode",
          foreignKeys: []
        })
      ).toEqual("erp__table_label_postal_code (erp__table_label_value_postal_code)")
    })
    it("ErpComponentErpProduct", () => {
      expect(
        getErpLabel({
          t: fakeTranslate,
          type: ErpType.ComponentProduct,
          key: "componentId",
          foreignKeys: []
        })
      ).toEqual("erp__table_label_component_id (erp__table_label_value_number)")
    })
  })
})
