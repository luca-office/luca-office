import {MockedResponse} from "@apollo/client/testing"
import {pick} from "lodash-es"
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
} from "../../../../../tests/__mocks__/erp"
import {
  ErpComponentCreation,
  ErpComponentErpProductCreation,
  ErpCustomerCreation,
  ErpEmployeeCreation,
  ErpInvoiceCreation,
  ErpOrderCreation,
  ErpOrderItemCreation,
  ErpProductCreation,
  ErpSupplierCreation
} from "../../../../graphql/generated/globalTypes"
import {
  createErpComponentErpProductMutation,
  createErpComponentMutation,
  createErpCustomerMutation,
  createErpEmployeeMutation,
  createErpInvoiceMutation,
  createErpOrderItemMutation,
  createErpOrderMutation,
  createErpProductMutation,
  createErpSupplierMutation
} from "../../../../graphql/mutations"
import {
  ErpComponent,
  ErpComponentErpProduct,
  ErpCustomer,
  ErpEmployee,
  ErpInvoice,
  ErpOrder,
  ErpOrderItem,
  ErpProduct,
  ErpSupplier
} from "../../../../models"
import {parseDateString, serialize} from "../../../../utils"

const erpComponent = erpComponentsMock[0]
const erpCustomer = erpCustomersMock[0]
const erpEmployee = erpEmployeesMock[0]
const erpInvoice = erpInvoicesMock[0]
const erpOrder = erpOrdersMock[0]
const erpOrderItem = erpOrderItemsMock[0]
const erpProduct = erpProductsMock[0]
const erpSupplier = erpSuppliersMock[0]
const erpProductErpComponent = erpComponentErpProductsMock[0]

export const createErpEntityResponsesMock: MockedResponse[] = [
  {
    request: {
      query: createErpComponentMutation,
      variables: {
        creation: pick<ErpComponent, keyof ErpComponentCreation>(erpComponent, [
          "name",
          "category",
          "purchasingPriceInCents",
          "margin",
          "packSize",
          "availableStock",
          "stockCostPerUnitInCents",
          "stockCostTotalInCents",
          "note",
          "unit",
          "supplierId",
          "binaryFileId",
          "sampleCompanyId"
        ])
      }
    },
    result: {
      data: {createErpComponent: erpComponent}
    }
  },
  {
    request: {
      query: createErpCustomerMutation,
      variables: {
        creation: pick<ErpCustomer, keyof ErpCustomerCreation>(erpCustomer, [
          "salutation",
          "firstName",
          "lastName",
          "company",
          "addressLine",
          "postalCode",
          "city",
          "country",
          "email",
          "phone",
          "note",
          "binaryFileId",
          "sampleCompanyId"
        ])
      }
    },
    result: {
      data: {createErpCustomer: erpCustomer}
    }
  },
  {
    request: {
      query: createErpEmployeeMutation,
      variables: {
        creation: {
          ...pick<ErpEmployee, keyof ErpEmployeeCreation>(erpEmployee, [
            "salutation",
            "firstName",
            "lastName",
            "addressLine",
            "postalCode",
            "city",
            "country",
            "email",
            "phone",
            "department",
            "jobTitle",
            "employmentMode",
            "site",
            "graduation",
            "furtherEducation",
            "taxClass",
            "familyStatus",
            "childCount",
            "note",
            "binaryFileId",
            "sampleCompanyId"
          ]),
          employedAt: serialize(parseDateString(erpEmployee.employedAt)),
          employmentEndsAt: erpEmployee.employmentEndsAt
            ? serialize(parseDateString(erpEmployee.employmentEndsAt))
            : null
        }
      }
    },
    result: {
      data: {createErpEmployee: erpEmployee}
    }
  },
  {
    request: {
      query: createErpInvoiceMutation,
      variables: {
        creation: {
          ...pick<ErpInvoice, keyof ErpInvoiceCreation>(erpInvoice, [
            "paymentTerms",
            "amountPaidInCents",
            "paymentStatus",
            "reminderFeeInCents",
            "defaultChargesInCents",
            "note",
            "totalNetInCents",
            "totalGrossInCents",
            "taxAmountInCents",
            "orderId",
            "binaryFileId",
            "sampleCompanyId"
          ]),
          invoiceDate: serialize(parseDateString(erpInvoice.invoiceDate)),
          dueDate: serialize(parseDateString(erpInvoice.dueDate))
        }
      }
    },
    result: {
      data: {createErpInvoice: erpInvoice}
    }
  },
  {
    request: {
      query: createErpOrderMutation,
      variables: {
        creation: {
          ...pick<ErpOrder, keyof ErpOrderCreation>(erpOrder, [
            "cashbackInCents",
            "discountInCents",
            "deliveryChargeInCents",
            "deliveryStatus",
            "note",
            "customerId",
            "employeeId",
            "binaryFileId",
            "sampleCompanyId"
          ]),
          deliveryDate: serialize(parseDateString(erpOrder.deliveryDate))
        }
      }
    },
    result: {
      data: {createErpOrder: erpOrder}
    }
  },
  {
    request: {
      query: createErpOrderItemMutation,
      variables: {
        creation: pick<ErpOrderItem, keyof ErpOrderItemCreation>(erpOrderItem, [
          "quantity",
          "totalNetInCents",
          "orderId",
          "productId",
          "binaryFileId",
          "sampleCompanyId"
        ])
      }
    },
    result: {
      data: {createErpOrderItem: erpOrderItem}
    }
  },
  {
    request: {
      query: createErpProductMutation,
      variables: {
        creation: pick<ErpProduct, keyof ErpProductCreation>(erpProduct, [
          "name",
          "netPriceInCents",
          "taxRate",
          "packSize",
          "availableStock",
          "stockCostPerUnitInCents",
          "stockCostTotalInCents",
          "unit",
          "note",
          "binaryFileId",
          "sampleCompanyId"
        ])
      }
    },
    result: {
      data: {createErpProduct: erpProduct}
    }
  },
  {
    request: {
      query: createErpSupplierMutation,
      variables: {
        creation: pick<ErpSupplier, keyof ErpSupplierCreation>(erpSupplier, [
          "salutation",
          "firstName",
          "lastName",
          "company",
          "addressLine",
          "postalCode",
          "city",
          "country",
          "email",
          "phone",
          "note",
          "binaryFileId",
          "sampleCompanyId"
        ])
      }
    },
    result: {
      data: {createErpSupplier: erpSupplier}
    }
  },
  {
    request: {
      query: createErpComponentErpProductMutation,
      variables: {
        creation: pick<ErpComponentErpProduct, keyof ErpComponentErpProductCreation>(erpProductErpComponent, [
          "componentId",
          "productId",
          "quantity",
          "sampleCompanyId"
        ])
      }
    },
    result: {
      data: {createErpComponentErpProduct: erpProductErpComponent}
    }
  }
]
