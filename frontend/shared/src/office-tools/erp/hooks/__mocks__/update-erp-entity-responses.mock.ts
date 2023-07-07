import {MockedResponse} from "@apollo/client/testing"
import {pick} from "lodash-es"
import {
  erpComponentErpProductsMockGraphQl,
  erpComponentsMockGraphQl,
  erpCustomersMockGraphQl,
  erpEmployeesMockGraphQl,
  erpInvoicesMockGraphQl,
  erpOrderItemsMockGraphQl,
  erpOrdersMockGraphQl,
  erpProductsMockGraphQl,
  erpSuppliersMockGraphQl
} from "../../../../../tests/__mocks__/erp"
import {
  updateErpComponentErpProductMutation,
  updateErpComponentMutation,
  updateErpCustomerMutation,
  updateErpEmployeeMutation,
  updateErpInvoiceMutation,
  updateErpOrderItemMutation,
  updateErpOrderMutation,
  updateErpProductMutation,
  updateErpSupplierMutation
} from "../../../../graphql/mutations"

const erpComponent = erpComponentsMockGraphQl[0]
const erpCustomer = erpCustomersMockGraphQl[0]
const erpEmployee = erpEmployeesMockGraphQl[0]
const erpInvoice = erpInvoicesMockGraphQl[0]
const erpOrder = erpOrdersMockGraphQl[0]
const erpOrderItem = erpOrderItemsMockGraphQl[0]
const erpProduct = erpProductsMockGraphQl[0]
const erpSupplier = erpSuppliersMockGraphQl[0]
const erpProductErpComponent = erpComponentErpProductsMockGraphQl[0]

export const updateErpEntityResponsesMock: MockedResponse[] = [
  {
    request: {
      query: updateErpComponentMutation,
      variables: {
        id: erpComponent.id,
        sampleCompanyId: erpComponent.sampleCompanyId,
        update: pick(erpComponent, ["name", "category", "purchasingPriceInCents", "margin", "supplierId"])
      }
    },
    result: {
      data: {
        updateErpComponent: erpComponent
      }
    }
  },
  {
    request: {
      query: updateErpCustomerMutation,
      variables: {
        id: erpCustomer.id,
        sampleCompanyId: erpCustomer.sampleCompanyId,
        update: pick(erpCustomer, [
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
          "note"
        ])
      }
    },
    result: {
      data: {
        updateErpCustomer: erpCustomer
      }
    }
  },
  {
    request: {
      query: updateErpEmployeeMutation,
      variables: {
        id: erpEmployee.id,
        sampleCompanyId: erpEmployee.sampleCompanyId,
        update: pick(erpEmployee, [
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
          "assessment",
          "employedAt",
          "employmentEndsAt"
        ])
      }
    },
    result: {
      data: {
        updateErpEmployee: erpEmployee
      }
    }
  },
  {
    request: {
      query: updateErpInvoiceMutation,
      variables: {
        id: erpInvoice.id,
        sampleCompanyId: erpInvoice.sampleCompanyId,
        update: pick(erpInvoice, [
          "paymentTerms",
          "amountPaidInCents",
          "paymentStatus",
          "reminderFeeInCents",
          "defaultChargesInCents",
          "note",
          "orderId",
          "invoiceDate",
          "dueDate"
        ])
      }
    },
    result: {
      data: {
        updateErpInvoice: erpInvoice
      }
    }
  },
  {
    request: {
      query: updateErpOrderMutation,
      variables: {
        id: erpOrder.id,
        sampleCompanyId: erpOrder.sampleCompanyId,
        update: pick(erpOrder, [
          "cashbackInCents",
          "discountInCents",
          "deliveryChargeInCents",
          "deliveryStatus",
          "note",
          "customerId",
          "employeeId",
          "deliveryDate"
        ])
      }
    },
    result: {
      data: {
        updateErpOrder: erpOrder
      }
    }
  },
  {
    request: {
      query: updateErpOrderItemMutation,
      variables: {
        id: erpOrderItem.id,
        sampleCompanyId: erpOrderItem.sampleCompanyId,
        update: pick(erpOrderItem, ["quantity"])
      }
    },
    result: {
      data: {
        updateErpOrderItem: erpOrderItem
      }
    }
  },
  {
    request: {
      query: updateErpProductMutation,
      variables: {
        id: erpProduct.id,
        sampleCompanyId: erpProduct.sampleCompanyId,
        update: pick(erpProduct, ["name", "netPriceInCents", "taxRate"])
      }
    },
    result: {
      data: {
        updateErpProduct: erpProduct
      }
    }
  },
  {
    request: {
      query: updateErpSupplierMutation,
      variables: {
        id: erpSupplier.id,
        sampleCompanyId: erpSupplier.sampleCompanyId,
        update: pick(erpSupplier, [
          "firstName",
          "lastName",
          "company",
          "addressLine",
          "postalCode",
          "city",
          "country",
          "email",
          "phone",
          "note"
        ])
      }
    },
    result: {
      data: {
        updateErpSupplier: erpSupplier
      }
    }
  },
  {
    request: {
      query: updateErpComponentErpProductMutation,
      variables: {
        id: erpProductErpComponent.id,
        sampleCompanyId: erpProductErpComponent.sampleCompanyId,
        update: pick(erpProductErpComponent, ["quantity"])
      }
    },
    result: {
      data: {
        updateErpComponentErpProduct: erpProductErpComponent
      }
    }
  }
]
