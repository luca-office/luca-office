import {ErpType} from "../../../../enums"
import {isFloat} from "../number"

describe("number", () => {
  describe("isFloat", () => {
    it("returns correct values for ErpComponent", () => {
      expect(isFloat(ErpType.Component, "id")).toEqual(false)
      expect(isFloat(ErpType.Component, "name")).toEqual(false)
      expect(isFloat(ErpType.Component, "category")).toEqual(false)
      expect(isFloat(ErpType.Component, "purchasingPriceInCents")).toEqual(false)
      expect(isFloat(ErpType.Component, "margin")).toEqual(true)
      expect(isFloat(ErpType.Component, "supplierId")).toEqual(false)
      expect(isFloat(ErpType.Component, "packSize")).toEqual(false)
      expect(isFloat(ErpType.Component, "availableStock")).toEqual(false)
      expect(isFloat(ErpType.Component, "stockCostPerUnitInCents")).toEqual(false)
      expect(isFloat(ErpType.Component, "stockCostTotalInCents")).toEqual(false)
      expect(isFloat(ErpType.Component, "binaryFileId")).toEqual(false)
      expect(isFloat(ErpType.Component, "unit")).toEqual(false)
      expect(isFloat(ErpType.Component, "note")).toEqual(false)
    })
    it("returns correct values for ErpCustomer", () => {
      expect(isFloat(ErpType.Customer, "id")).toEqual(false)
      expect(isFloat(ErpType.Customer, "salutation")).toEqual(false)
      expect(isFloat(ErpType.Customer, "firstName")).toEqual(false)
      expect(isFloat(ErpType.Customer, "lastName")).toEqual(false)
      expect(isFloat(ErpType.Customer, "company")).toEqual(false)
      expect(isFloat(ErpType.Customer, "addressLine")).toEqual(false)
      expect(isFloat(ErpType.Customer, "postalCode")).toEqual(false)
      expect(isFloat(ErpType.Customer, "city")).toEqual(false)
      expect(isFloat(ErpType.Customer, "country")).toEqual(false)
      expect(isFloat(ErpType.Customer, "email")).toEqual(false)
      expect(isFloat(ErpType.Customer, "phone")).toEqual(false)
      expect(isFloat(ErpType.Customer, "note")).toEqual(false)
      expect(isFloat(ErpType.Customer, "sampleCompanyId")).toEqual(false)
      expect(isFloat(ErpType.Customer, "binaryFileId")).toEqual(false)
    })
    it("returns correct values for ErpEmployee", () => {
      expect(isFloat(ErpType.Employee, "id")).toEqual(false)
      expect(isFloat(ErpType.Employee, "salutation")).toEqual(false)
      expect(isFloat(ErpType.Employee, "firstName")).toEqual(false)
      expect(isFloat(ErpType.Employee, "lastName")).toEqual(false)
      expect(isFloat(ErpType.Employee, "addressLine")).toEqual(false)
      expect(isFloat(ErpType.Employee, "postalCode")).toEqual(false)
      expect(isFloat(ErpType.Employee, "city")).toEqual(false)
      expect(isFloat(ErpType.Employee, "country")).toEqual(false)
      expect(isFloat(ErpType.Employee, "email")).toEqual(false)
      expect(isFloat(ErpType.Employee, "phone")).toEqual(false)
      expect(isFloat(ErpType.Employee, "department")).toEqual(false)
      expect(isFloat(ErpType.Employee, "jobTitle")).toEqual(false)
      expect(isFloat(ErpType.Employee, "employmentMode")).toEqual(false)
      expect(isFloat(ErpType.Employee, "employedAt")).toEqual(false)
      expect(isFloat(ErpType.Employee, "employmentEndsAt")).toEqual(false)
      expect(isFloat(ErpType.Employee, "site")).toEqual(false)
      expect(isFloat(ErpType.Employee, "graduation")).toEqual(false)
      expect(isFloat(ErpType.Employee, "furtherEducation")).toEqual(false)
      expect(isFloat(ErpType.Employee, "taxClass")).toEqual(false)
      expect(isFloat(ErpType.Employee, "familyStatus")).toEqual(false)
      expect(isFloat(ErpType.Employee, "childCount")).toEqual(false)
      expect(isFloat(ErpType.Employee, "sampleCompanyId")).toEqual(false)
      expect(isFloat(ErpType.Employee, "binaryFileId")).toEqual(false)
      expect(isFloat(ErpType.Employee, "note")).toEqual(false)
    })
    it("returns correct values for ErpInvoice", () => {
      expect(isFloat(ErpType.Invoice, "id")).toEqual(false)
      expect(isFloat(ErpType.Invoice, "invoiceDate")).toEqual(false)
      expect(isFloat(ErpType.Invoice, "dueDate")).toEqual(false)
      expect(isFloat(ErpType.Invoice, "paymentTerms")).toEqual(false)
      expect(isFloat(ErpType.Invoice, "amountPaidInCents")).toEqual(false)
      expect(isFloat(ErpType.Invoice, "paymentStatus")).toEqual(false)
      expect(isFloat(ErpType.Invoice, "reminderFeeInCents")).toEqual(false)
      expect(isFloat(ErpType.Invoice, "defaultChargesInCents")).toEqual(false)
      expect(isFloat(ErpType.Invoice, "note")).toEqual(false)
      expect(isFloat(ErpType.Invoice, "sampleCompanyId")).toEqual(false)
      expect(isFloat(ErpType.Invoice, "orderId")).toEqual(false)
      expect(isFloat(ErpType.Invoice, "totalNetInCents")).toEqual(false)
      expect(isFloat(ErpType.Invoice, "totalGrossInCents")).toEqual(false)
      expect(isFloat(ErpType.Invoice, "taxAmountInCents")).toEqual(false)
      expect(isFloat(ErpType.Invoice, "binaryFileId")).toEqual(false)
    })
    it("returns correct values for ErpOrder", () => {
      expect(isFloat(ErpType.Order, "id")).toEqual(false)
      expect(isFloat(ErpType.Order, "cashbackInCents")).toEqual(false)
      expect(isFloat(ErpType.Order, "discountInCents")).toEqual(false)
      expect(isFloat(ErpType.Order, "deliveryChargeInCents")).toEqual(false)
      expect(isFloat(ErpType.Order, "deliveryStatus")).toEqual(false)
      expect(isFloat(ErpType.Order, "deliveryDate")).toEqual(false)
      expect(isFloat(ErpType.Order, "note")).toEqual(false)
      expect(isFloat(ErpType.Order, "sampleCompanyId")).toEqual(false)
      expect(isFloat(ErpType.Order, "customerId")).toEqual(false)
      expect(isFloat(ErpType.Order, "employeeId")).toEqual(false)
      expect(isFloat(ErpType.Order, "binaryFileId")).toEqual(false)
    })
    it("returns correct values for ErpOrderItem", () => {
      expect(isFloat(ErpType.OrderItem, "id")).toEqual(false)
      expect(isFloat(ErpType.OrderItem, "quantity")).toEqual(false)
      expect(isFloat(ErpType.OrderItem, "sampleCompanyId")).toEqual(false)
      expect(isFloat(ErpType.OrderItem, "orderId")).toEqual(false)
      expect(isFloat(ErpType.OrderItem, "productId")).toEqual(false)
      expect(isFloat(ErpType.OrderItem, "totalNetInCents")).toEqual(false)
      expect(isFloat(ErpType.OrderItem, "binaryFileId")).toEqual(false)
    })
    it("returns correct values for ErpSupplier", () => {
      expect(isFloat(ErpType.Supplier, "id")).toEqual(false)
      expect(isFloat(ErpType.Supplier, "firstName")).toEqual(false)
      expect(isFloat(ErpType.Supplier, "lastName")).toEqual(false)
      expect(isFloat(ErpType.Supplier, "company")).toEqual(false)
      expect(isFloat(ErpType.Supplier, "addressLine")).toEqual(false)
      expect(isFloat(ErpType.Supplier, "postalCode")).toEqual(false)
      expect(isFloat(ErpType.Supplier, "city")).toEqual(false)
      expect(isFloat(ErpType.Supplier, "country")).toEqual(false)
      expect(isFloat(ErpType.Supplier, "email")).toEqual(false)
      expect(isFloat(ErpType.Supplier, "phone")).toEqual(false)
      expect(isFloat(ErpType.Supplier, "note")).toEqual(false)
      expect(isFloat(ErpType.Supplier, "sampleCompanyId")).toEqual(false)
      expect(isFloat(ErpType.Supplier, "binaryFileId")).toEqual(false)
      expect(isFloat(ErpType.Supplier, "salutation")).toEqual(false)
    })
    it("returns correct values for ErpProduct", () => {
      expect(isFloat(ErpType.Product, "id")).toEqual(false)
      expect(isFloat(ErpType.Product, "name")).toEqual(false)
      expect(isFloat(ErpType.Product, "netPriceInCents")).toEqual(false)
      expect(isFloat(ErpType.Product, "taxRate")).toEqual(true)
      expect(isFloat(ErpType.Product, "sampleCompanyId")).toEqual(false)
      expect(isFloat(ErpType.Product, "binaryFileId")).toEqual(false)
      expect(isFloat(ErpType.Product, "unit")).toEqual(false)
      expect(isFloat(ErpType.Product, "note")).toEqual(false)
      expect(isFloat(ErpType.Product, "packSize")).toEqual(false)
      expect(isFloat(ErpType.Product, "availableStock")).toEqual(false)
      expect(isFloat(ErpType.Product, "stockCostPerUnitInCents")).toEqual(false)
      expect(isFloat(ErpType.Product, "stockCostTotalInCents")).toEqual(false)
    })
    it("returns correct values for ErpComponentErpProduct", () => {
      expect(isFloat(ErpType.ComponentProduct, "componentId")).toEqual(false)
      expect(isFloat(ErpType.ComponentProduct, "productId")).toEqual(false)
      expect(isFloat(ErpType.ComponentProduct, "quantity")).toEqual(false)
      expect(isFloat(ErpType.ComponentProduct, "sampleCompanyId")).toEqual(false)
    })
  })
})