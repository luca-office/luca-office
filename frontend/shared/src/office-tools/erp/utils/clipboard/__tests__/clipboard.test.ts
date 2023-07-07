import {
  erpComponentErpProductsMock,
  erpComponentsMock,
  erpCustomersMock,
  erpEmployeesMock,
  erpInvoicesMock,
  erpOrderItemsMock,
  erpOrdersMock,
  erpProductsMock,
  erpSuppliersMock
} from "../../../../../../tests/__mocks__"
import {fakeTranslate} from "../../../../../../tests/utils/translate-mock"
import {convertCentsToEuro, formatDate, parseDateString} from "../../../../../utils"
import {
  getDeliveryStatusLabel,
  getEmploymentModeLabel,
  getFamilyStatusLabel,
  getPaymentStatusLabel,
  getSalutationLabel
} from "../../common"
import {getErpClipboardString} from "../clipboard"

const erpComponent = erpComponentsMock[0]
const erpCustomer = erpCustomersMock[0]
const erpEmployee = erpEmployeesMock[0]
const erpInvoice = erpInvoicesMock[0]
const erpOrder = erpOrdersMock[0]
const erpOrderItem = erpOrderItemsMock[0]
const erpProduct = erpProductsMock[0]
const erpSupplier = erpSuppliersMock[0]
const erpComponentErpProduct = erpComponentErpProductsMock[0]

describe("clipboard", () => {
  describe("getErpClipboardString", () => {
    it("ErpComponent", () => {
      expect(getErpClipboardString(fakeTranslate, erpComponent)).toEqual(
        `erp__table_label_component_id:${erpComponent.id};erp__table_label_name:${
          erpComponent.name
        };erp__table_component_label_category:${
          erpComponent.category
        };erp__table_component_label_purchasing_price:${convertCentsToEuro(
          erpComponent.purchasingPriceInCents
        )};erp__table_component_label_margin:${erpComponent.margin};erp__table_label_pack_size:${
          erpComponent.packSize
        };erp__table_label_available_stock:${
          erpComponent.availableStock
        };erp__table_label_stock_cost_per_unit:${convertCentsToEuro(
          erpComponent.stockCostPerUnitInCents
        )};erp__table_label_stock_cost_total:${convertCentsToEuro(
          erpComponent.stockCostTotalInCents
        )};erp__table_label_supplier_id:${erpComponent.supplierId};erp__table_label_binary_file_id:${
          erpComponent.binaryFileId
        };erp__table_label_note:${erpComponent.note};erp__table_label_unit:${erpComponent.unit};binaryFile:${
          erpComponent.binaryFile
        }`
      )
    })
    it("ErpCustomer", () => {
      expect(getErpClipboardString(fakeTranslate, erpCustomer)).toEqual(
        `erp__table_order_label_customer_id:${erpCustomer.id};erp__table_label_salutation:${getSalutationLabel(
          fakeTranslate,
          erpCustomer.salutation
        )};erp__table_label_first_name:${erpCustomer.firstName};erp__table_label_last_name:${
          erpCustomer.lastName
        };erp__table_label_company:${erpCustomer.company};erp__table_label_address_line:${
          erpCustomer.addressLine
        };erp__table_label_postal_code:${erpCustomer.postalCode};erp__table_label_city:${
          erpCustomer.city
        };erp__table_label_country:${erpCustomer.country};erp__table_label_email:${
          erpCustomer.email
        };erp__table_label_phone:${erpCustomer.phone};erp__table_label_note:${
          erpCustomer.note
        };erp__table_label_binary_file_id:${erpCustomer.binaryFileId};binaryFile:${erpCustomer.binaryFile}`
      )
    })
    it("ErpEmployee", () => {
      expect(getErpClipboardString(fakeTranslate, erpEmployee)).toEqual(
        `erp__table_label_employee_id:${erpEmployee.id};erp__table_label_salutation:${getSalutationLabel(
          fakeTranslate,
          erpEmployee.salutation
        )};erp__table_label_first_name:${erpEmployee.firstName};erp__table_label_last_name:${
          erpEmployee.lastName
        };erp__table_label_address_line:${erpEmployee.addressLine};erp__table_label_postal_code:${
          erpEmployee.postalCode
        };erp__table_label_city:${erpEmployee.city};erp__table_label_country:${
          erpEmployee.country
        };erp__table_label_email:${erpEmployee.email};erp__table_label_phone:${
          erpEmployee.phone
        };erp__table_employee_label_department:${erpEmployee.department};erp__table_employee_label_job_title:${
          erpEmployee.jobTitle
        };erp__table_employee_label_employment_mode:${getEmploymentModeLabel(
          fakeTranslate,
          erpEmployee.employmentMode
        )};erp__table_employee_label_employed_at:${formatDate(
          parseDateString(erpEmployee.employedAt)
        )};erp__table_employee_label_employment_ends_at:${
          erpEmployee.employmentEndsAt
        };erp__table_employee_label_site:${erpEmployee.site};erp__table_employee_label_graduation:${
          erpEmployee.graduation
        };erp__table_employee_label_further_education:${erpEmployee.furtherEducation.join(
          ","
        )};erp__table_employee_label_tax_class:${
          erpEmployee.taxClass
        };erp__table_employee_label_family_status:${getFamilyStatusLabel(
          fakeTranslate,
          erpEmployee.familyStatus
        )};erp__table_employee_label_child_count:${erpEmployee.childCount};erp__table_label_binary_file_id:${
          erpEmployee.binaryFileId
        };erp__table_label_note:${erpEmployee.note};binaryFile:${erpEmployee.binaryFile}`
      )
    })
    it("ErpInvoice", () => {
      expect(getErpClipboardString(fakeTranslate, erpInvoice)).toEqual(
        `erp__table_label_invoice_id:${erpInvoice.id};erp__table_invoice_label_invoice_date:${formatDate(
          parseDateString(erpInvoice.invoiceDate)
        )};erp__table_invoice_label_due_date:${formatDate(
          parseDateString(erpInvoice.dueDate)
        )};erp__table_invoice_label_payment_terms:${
          erpInvoice.paymentTerms
        };erp__table_invoice_label_amount_paid:${convertCentsToEuro(
          erpInvoice.amountPaidInCents ?? 0
        )};erp__table_invoice_label_payment_status:${getPaymentStatusLabel(
          fakeTranslate,
          erpInvoice.paymentStatus
        )};erp__table_invoice_label_reminder_fee:${convertCentsToEuro(
          erpInvoice.reminderFeeInCents ?? 0
        )};erp__table_invoice_label_default_charges:${convertCentsToEuro(
          erpInvoice.defaultChargesInCents ?? 0
        )};erp__table_label_note:${erpInvoice.note};erp__table_label_total_net:${convertCentsToEuro(
          erpInvoice.totalNetInCents
        )};erp__table_invoice_label_total_gross:${convertCentsToEuro(
          erpInvoice.totalGrossInCents
        )};erp__table_invoice_label_tax_amount:${convertCentsToEuro(
          erpInvoice.taxAmountInCents
        )};erp__table_label_order_id:${erpInvoice.orderId};erp__table_label_binary_file_id:${
          erpInvoice.binaryFileId
        };binaryFile:${erpInvoice.binaryFile}`
      )
    })
    it("ErpOrder", () => {
      expect(getErpClipboardString(fakeTranslate, erpOrder)).toEqual(
        `erp__table_label_order_id:${erpOrder.id};erp__table_order_label_cashback:${convertCentsToEuro(
          erpOrder.cashbackInCents ?? 0
        )};erp__table_order_label_discount:${convertCentsToEuro(
          erpOrder.discountInCents ?? 0
        )};erp__table_order_label_delivery_charge:${convertCentsToEuro(
          erpOrder.deliveryChargeInCents
        )};erp__table_order_label_delivery_status:${getDeliveryStatusLabel(
          fakeTranslate,
          erpOrder.deliveryStatus
        )};erp__table_order_label_delivery_date:${formatDate(
          parseDateString(erpOrder.deliveryDate)
        )};erp__table_label_note:${erpOrder.note};erp__table_order_label_customer_id:${
          erpOrder.customerId
        };erp__table_label_employee_id:${erpOrder.employeeId};erp__table_label_binary_file_id:${
          erpOrder.binaryFileId
        };binaryFile:${erpOrder.binaryFile}`
      )
    })
    it("ErpOrderItem", () => {
      expect(getErpClipboardString(fakeTranslate, erpOrderItem)).toEqual(
        `erp__table_label_order_item_id:${erpOrderItem.id};erp__table_label_quantity:${
          erpOrderItem.quantity
        };erp__table_label_total_net:${convertCentsToEuro(erpOrderItem.totalNetInCents)};erp__table_label_order_id:${
          erpOrderItem.orderId
        };erp__table_label_product_id:${erpOrderItem.productId};erp__table_label_binary_file_id:${
          erpOrderItem.binaryFileId
        };binaryFile:${erpOrderItem.binaryFile}`
      )
    })
    it("ErpProduct", () => {
      expect(getErpClipboardString(fakeTranslate, erpProduct)).toEqual(
        `erp__table_label_product_id:${erpProduct.id};erp__table_label_name:${
          erpProduct.name
        };erp__table_product_label_net_price:${convertCentsToEuro(
          erpProduct.netPriceInCents
        )};erp__table_product_label_tax_rate:${erpProduct.taxRate};erp__table_label_binary_file_id:${
          erpProduct.binaryFileId
        };erp__table_label_unit:${erpProduct.unit};erp__table_label_note:${
          erpProduct.note
        };erp__table_label_available_stock:${erpProduct.availableStock};erp__table_label_pack_size:${
          erpProduct.packSize
        };erp__table_label_stock_cost_per_unit:${convertCentsToEuro(
          erpProduct.stockCostPerUnitInCents
        )};erp__table_label_stock_cost_total:${convertCentsToEuro(erpProduct.stockCostTotalInCents)};binaryFile:${
          erpProduct.binaryFile
        }`
      )
    })
    it("ErpSupplier", () => {
      expect(getErpClipboardString(fakeTranslate, erpSupplier)).toEqual(
        `erp__table_label_supplier_id:${erpSupplier.id};erp__table_label_first_name:${
          erpSupplier.firstName
        };erp__table_label_last_name:${erpSupplier.lastName};erp__table_label_company:${
          erpSupplier.company
        };erp__table_label_address_line:${erpSupplier.addressLine};erp__table_label_postal_code:${
          erpSupplier.postalCode
        };erp__table_label_city:${erpSupplier.city};erp__table_label_country:${
          erpSupplier.country
        };erp__table_label_email:${erpSupplier.email};erp__table_label_phone:${
          erpSupplier.phone
        };erp__table_label_note:${erpSupplier.note};erp__table_label_binary_file_id:${
          erpSupplier.binaryFileId
        };erp__table_label_salutation:${getSalutationLabel(fakeTranslate, erpSupplier.salutation)};binaryFile:${
          erpSupplier.binaryFile
        }`
      )
    })
    it("ErpComponentErpProduct", () => {
      expect(getErpClipboardString(fakeTranslate, erpComponentErpProduct)).toEqual(
        `erp__table_label_component_id:${erpComponentErpProduct.componentId};erp__table_label_product_id:${erpComponentErpProduct.productId};erp__table_label_quantity:${erpComponentErpProduct.quantity}`
      )
    })
  })
})
