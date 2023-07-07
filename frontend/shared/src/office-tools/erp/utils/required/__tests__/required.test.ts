import {ErpType} from "../../../../../enums"
import {
  isErpComponentErpProductKeyRequired,
  isErpComponentKeyRequired,
  isErpCustomerKeyRequired,
  isErpEmployeeKeyRequired,
  isErpInvoiceKeyRequired,
  isErpOrderItemKeyRequired,
  isErpOrderKeyRequired,
  isErpProductKeyRequired,
  isErpSupplierKeyRequired,
  isRequired
} from "../required"

describe("required", () => {
  describe("isErpComponentErpProductKeyRequired", () => {
    it("returns correct value for componentId", () => {
      expect(isErpComponentErpProductKeyRequired("componentId")).toEqual(true)
    })
    it("returns correct value for productId", () => {
      expect(isErpComponentErpProductKeyRequired("productId")).toEqual(true)
    })
    it("returns correct value for sampleCompanyId", () => {
      expect(isErpComponentErpProductKeyRequired("sampleCompanyId")).toEqual(false)
    })
    it("returns correct value for quantity", () => {
      expect(isErpComponentErpProductKeyRequired("quantity")).toEqual(false)
    })
  })
  describe("isErpComponentKeyRequired", () => {
    it("returns correct value for id", () => {
      expect(isErpComponentKeyRequired("id")).toEqual(true)
    })
    it("returns correct value for name", () => {
      expect(isErpComponentKeyRequired("name")).toEqual(true)
    })
    it("returns correct value for category", () => {
      expect(isErpComponentKeyRequired("category")).toEqual(true)
    })
    it("returns correct value for purchasingPriceInCents", () => {
      expect(isErpComponentKeyRequired("purchasingPriceInCents")).toEqual(true)
    })
    it("returns correct value for margin", () => {
      expect(isErpComponentKeyRequired("margin")).toEqual(true)
    })
    it("returns correct value for supplierId", () => {
      expect(isErpComponentKeyRequired("supplierId")).toEqual(true)
    })
    it("returns correct value for packSize", () => {
      expect(isErpComponentKeyRequired("packSize")).toEqual(true)
    })
    it("returns correct value for availableStock", () => {
      expect(isErpComponentKeyRequired("availableStock")).toEqual(true)
    })
    it("returns correct value for stockCostPerUnitInCents", () => {
      expect(isErpComponentKeyRequired("stockCostPerUnitInCents")).toEqual(true)
    })
    it("returns correct value for stockCostTotalInCents", () => {
      expect(isErpComponentKeyRequired("stockCostTotalInCents")).toEqual(true)
    })
    it("returns correct value for binaryFileId", () => {
      expect(isErpComponentKeyRequired("binaryFileId")).toEqual(false)
    })
    it("returns correct value for unit", () => {
      expect(isErpComponentKeyRequired("unit")).toEqual(true)
    })
    it("returns correct value for note", () => {
      expect(isErpComponentKeyRequired("note")).toEqual(false)
    })
  })
  describe("isErpCustomerKeyRequired", () => {
    it("returns correct value for id", () => {
      expect(isErpCustomerKeyRequired("id")).toEqual(true)
    })
    it("returns correct value for salutation", () => {
      expect(isErpCustomerKeyRequired("salutation")).toEqual(true)
    })
    it("returns correct value for firstName", () => {
      expect(isErpCustomerKeyRequired("firstName")).toEqual(true)
    })
    it("returns correct value for lastName", () => {
      expect(isErpCustomerKeyRequired("lastName")).toEqual(true)
    })
    it("returns correct value for company", () => {
      expect(isErpCustomerKeyRequired("company")).toEqual(false)
    })
    it("returns correct value for addressLine", () => {
      expect(isErpCustomerKeyRequired("addressLine")).toEqual(true)
    })
    it("returns correct value for postalCode", () => {
      expect(isErpCustomerKeyRequired("postalCode")).toEqual(true)
    })
    it("returns correct value for city", () => {
      expect(isErpCustomerKeyRequired("city")).toEqual(true)
    })
    it("returns correct value for country", () => {
      expect(isErpCustomerKeyRequired("country")).toEqual(true)
    })
    it("returns correct value for email", () => {
      expect(isErpCustomerKeyRequired("email")).toEqual(false)
    })
    it("returns correct value for phone", () => {
      expect(isErpCustomerKeyRequired("phone")).toEqual(false)
    })
    it("returns correct value for note", () => {
      expect(isErpCustomerKeyRequired("note")).toEqual(false)
    })
    it("returns correct value for binaryFileId", () => {
      expect(isErpCustomerKeyRequired("binaryFileId")).toEqual(false)
    })
  })
  describe("isErpEmployeeKeyRequired", () => {
    it("returns correct value for id", () => {
      expect(isErpEmployeeKeyRequired("id")).toEqual(true)
    })
    it("returns correct value for salutation", () => {
      expect(isErpEmployeeKeyRequired("salutation")).toEqual(true)
    })
    it("returns correct value for firstName", () => {
      expect(isErpEmployeeKeyRequired("firstName")).toEqual(true)
    })
    it("returns correct value for lastName", () => {
      expect(isErpEmployeeKeyRequired("lastName")).toEqual(true)
    })
    it("returns correct value for addressLine", () => {
      expect(isErpEmployeeKeyRequired("addressLine")).toEqual(true)
    })
    it("returns correct value for postalCode", () => {
      expect(isErpEmployeeKeyRequired("postalCode")).toEqual(true)
    })
    it("returns correct value for city", () => {
      expect(isErpEmployeeKeyRequired("city")).toEqual(true)
    })
    it("returns correct value for country", () => {
      expect(isErpEmployeeKeyRequired("country")).toEqual(true)
    })
    it("returns correct value for email", () => {
      expect(isErpEmployeeKeyRequired("email")).toEqual(false)
    })
    it("returns correct value for phone", () => {
      expect(isErpEmployeeKeyRequired("phone")).toEqual(false)
    })
    it("returns correct value for department", () => {
      expect(isErpEmployeeKeyRequired("department")).toEqual(true)
    })
    it("returns correct value for jobTitle", () => {
      expect(isErpEmployeeKeyRequired("jobTitle")).toEqual(true)
    })
    it("returns correct value for employmentMode", () => {
      expect(isErpEmployeeKeyRequired("employmentMode")).toEqual(true)
    })
    it("returns correct value for employedAt", () => {
      expect(isErpEmployeeKeyRequired("employedAt")).toEqual(true)
    })
    it("returns correct value for employmentEndsAt", () => {
      expect(isErpEmployeeKeyRequired("employmentEndsAt")).toEqual(false)
    })
    it("returns correct value for graduation", () => {
      expect(isErpEmployeeKeyRequired("graduation")).toEqual(false)
    })
    it("returns correct value for furtherEducation", () => {
      expect(isErpEmployeeKeyRequired("furtherEducation")).toEqual(false)
    })
    it("returns correct value for taxClass", () => {
      expect(isErpEmployeeKeyRequired("taxClass")).toEqual(true)
    })
    it("returns correct value for familyStatus", () => {
      expect(isErpEmployeeKeyRequired("familyStatus")).toEqual(true)
    })
    it("returns correct value for childCount", () => {
      expect(isErpEmployeeKeyRequired("childCount")).toEqual(false)
    })
    it("returns correct value for binaryFileId", () => {
      expect(isErpEmployeeKeyRequired("binaryFileId")).toEqual(false)
    })
    it("returns correct value for note", () => {
      expect(isErpEmployeeKeyRequired("note")).toEqual(false)
    })
  })
  describe("isErpInvoiceKeyRequired", () => {
    it("returns correct value for id", () => {
      expect(isErpInvoiceKeyRequired("id")).toEqual(true)
    })
    it("returns correct value for invoiceDate", () => {
      expect(isErpInvoiceKeyRequired("invoiceDate")).toEqual(true)
    })
    it("returns correct value for dueDate", () => {
      expect(isErpInvoiceKeyRequired("dueDate")).toEqual(true)
    })
    it("returns correct value for paymentTerms", () => {
      expect(isErpInvoiceKeyRequired("paymentTerms")).toEqual(true)
    })
    it("returns correct value for amountPaidInCents", () => {
      expect(isErpInvoiceKeyRequired("amountPaidInCents")).toEqual(false)
    })
    it("returns correct value for paymentStatus", () => {
      expect(isErpInvoiceKeyRequired("paymentStatus")).toEqual(true)
    })
    it("returns correct value for reminderFeeInCents", () => {
      expect(isErpInvoiceKeyRequired("reminderFeeInCents")).toEqual(false)
    })
    it("returns correct value for defaultChargesInCents", () => {
      expect(isErpInvoiceKeyRequired("defaultChargesInCents")).toEqual(false)
    })
    it("returns correct value for note", () => {
      expect(isErpInvoiceKeyRequired("note")).toEqual(false)
    })
    it("returns correct value for orderId", () => {
      expect(isErpInvoiceKeyRequired("orderId")).toEqual(true)
    })
    it("returns correct value for totalNetInCents", () => {
      expect(isErpInvoiceKeyRequired("totalNetInCents")).toEqual(true)
    })
    it("returns correct value for totalGrossInCents", () => {
      expect(isErpInvoiceKeyRequired("totalGrossInCents")).toEqual(true)
    })
    it("returns correct value for taxAmountInCents", () => {
      expect(isErpInvoiceKeyRequired("taxAmountInCents")).toEqual(true)
    })
    it("returns correct value for binaryFileId", () => {
      expect(isErpInvoiceKeyRequired("binaryFileId")).toEqual(false)
    })
  })
  describe("isErpOrderItemKeyRequired", () => {
    it("returns correct value for id", () => {
      expect(isErpOrderItemKeyRequired("id")).toEqual(true)
    })
    it("returns correct value for quantity", () => {
      expect(isErpOrderItemKeyRequired("quantity")).toEqual(true)
    })
    it("returns correct value for orderId", () => {
      expect(isErpOrderItemKeyRequired("orderId")).toEqual(true)
    })
    it("returns correct value for productId", () => {
      expect(isErpOrderItemKeyRequired("productId")).toEqual(true)
    })
    it("returns correct value for totalNetInCents", () => {
      expect(isErpOrderItemKeyRequired("totalNetInCents")).toEqual(true)
    })
    it("returns correct value for binaryFileId", () => {
      expect(isErpOrderItemKeyRequired("binaryFileId")).toEqual(false)
    })
  })
  describe("isErpOrderKeyRequired", () => {
    it("returns correct value for id", () => {
      expect(isErpOrderKeyRequired("id")).toEqual(true)
    })
    it("returns correct value for cashbackInCents", () => {
      expect(isErpOrderKeyRequired("cashbackInCents")).toEqual(false)
    })
    it("returns correct value for discountInCents", () => {
      expect(isErpOrderKeyRequired("discountInCents")).toEqual(false)
    })
    it("returns correct value for deliveryChargeInCents", () => {
      expect(isErpOrderKeyRequired("deliveryChargeInCents")).toEqual(true)
    })
    it("returns correct value for deliveryStatus", () => {
      expect(isErpOrderKeyRequired("deliveryStatus")).toEqual(true)
    })
    it("returns correct value for deliveryDate", () => {
      expect(isErpOrderKeyRequired("deliveryDate")).toEqual(true)
    })
    it("returns correct value for note", () => {
      expect(isErpOrderKeyRequired("note")).toEqual(false)
    })
    it("returns correct value for customerId", () => {
      expect(isErpOrderKeyRequired("customerId")).toEqual(true)
    })
    it("returns correct value for employeeId", () => {
      expect(isErpOrderKeyRequired("employeeId")).toEqual(true)
    })
    it("returns correct value for binaryFileId", () => {
      expect(isErpOrderKeyRequired("binaryFileId")).toEqual(false)
    })
  })
  describe("isErpProductKeyRequired", () => {
    it("returns correct value for id", () => {
      expect(isErpProductKeyRequired("id")).toEqual(true)
    })
    it("returns correct value for name", () => {
      expect(isErpProductKeyRequired("name")).toEqual(true)
    })
    it("returns correct value for netPriceInCents", () => {
      expect(isErpProductKeyRequired("netPriceInCents")).toEqual(true)
    })
    it("returns correct value for taxRate", () => {
      expect(isErpProductKeyRequired("taxRate")).toEqual(true)
    })
    it("returns correct value for binaryFileId", () => {
      expect(isErpProductKeyRequired("binaryFileId")).toEqual(false)
    })
    it("returns correct value for unit", () => {
      expect(isErpProductKeyRequired("unit")).toEqual(true)
    })
    it("returns correct value for note", () => {
      expect(isErpProductKeyRequired("note")).toEqual(false)
    })
    it("returns correct value for packSize", () => {
      expect(isErpProductKeyRequired("packSize")).toEqual(true)
    })
    it("returns correct value for availableStock", () => {
      expect(isErpProductKeyRequired("availableStock")).toEqual(true)
    })
    it("returns correct value for stockCostPerUnitInCents", () => {
      expect(isErpProductKeyRequired("stockCostPerUnitInCents")).toEqual(true)
    })
    it("returns correct value for stockCostTotalInCents", () => {
      expect(isErpProductKeyRequired("stockCostTotalInCents")).toEqual(true)
    })
  })
  describe("isErpSupplierKeyRequired", () => {
    it("returns correct value for id", () => {
      expect(isErpSupplierKeyRequired("id")).toEqual(true)
    })
    it("returns correct value for firstName", () => {
      expect(isErpSupplierKeyRequired("firstName")).toEqual(true)
    })
    it("returns correct value for lastName", () => {
      expect(isErpSupplierKeyRequired("lastName")).toEqual(true)
    })
    it("returns correct value for company", () => {
      expect(isErpSupplierKeyRequired("company")).toEqual(true)
    })
    it("returns correct value for addressLine", () => {
      expect(isErpSupplierKeyRequired("addressLine")).toEqual(true)
    })
    it("returns correct value for postalCode", () => {
      expect(isErpSupplierKeyRequired("postalCode")).toEqual(true)
    })
    it("returns correct value for city", () => {
      expect(isErpSupplierKeyRequired("city")).toEqual(true)
    })
    it("returns correct value for country", () => {
      expect(isErpSupplierKeyRequired("country")).toEqual(true)
    })
    it("returns correct value for email", () => {
      expect(isErpSupplierKeyRequired("email")).toEqual(true)
    })
    it("returns correct value for phone", () => {
      expect(isErpSupplierKeyRequired("phone")).toEqual(true)
    })
    it("returns correct value for note", () => {
      expect(isErpSupplierKeyRequired("note")).toEqual(false)
    })
    it("returns correct value for binaryFileId", () => {
      expect(isErpSupplierKeyRequired("binaryFileId")).toEqual(false)
    })
    it("returns correct value for salutation", () => {
      expect(isErpSupplierKeyRequired("salutation")).toEqual(true)
    })
  })
  describe("isRequired", () => {
    it("returns correct value for ErpComponent", () => {
      expect(
        isRequired<ErpType.Component>({type: ErpType.Component, key: "category"})
      ).toEqual(true)
    })
    it("returns correct value for ErpCustomer", () => {
      expect(
        isRequired<ErpType.Customer>({type: ErpType.Customer, key: "addressLine"})
      ).toEqual(true)
    })
    it("returns correct value for ErpEmployee", () => {
      expect(
        isRequired<ErpType.Employee>({type: ErpType.Employee, key: "department"})
      ).toEqual(true)
    })
    it("returns correct value for ErpInvoice", () => {
      expect(
        isRequired<ErpType.Invoice>({type: ErpType.Invoice, key: "reminderFeeInCents"})
      ).toEqual(false)
    })
    it("returns correct value for ErpOrder", () => {
      expect(
        isRequired<ErpType.Order>({type: ErpType.Order, key: "discountInCents"})
      ).toEqual(false)
    })
    it("returns correct value for ErpOrderItem", () => {
      expect(
        isRequired<ErpType.OrderItem>({type: ErpType.OrderItem, key: "quantity"})
      ).toEqual(true)
    })
    it("returns correct value for ErpProduct", () => {
      expect(
        isRequired<ErpType.Product>({type: ErpType.Product, key: "netPriceInCents"})
      ).toEqual(true)
    })
    it("returns correct value for ErpSupplier", () => {
      expect(
        isRequired<ErpType.Supplier>({type: ErpType.Supplier, key: "postalCode"})
      ).toEqual(true)
    })
    it("returns correct value for ErpComponentErpProduct", () => {
      expect(
        isRequired<ErpType.ComponentProduct>({type: ErpType.ComponentProduct, key: "componentId"})
      ).toEqual(true)
    })
  })
})
