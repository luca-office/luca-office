import {MockedResponse} from "@apollo/client/testing"
import {
  scenarioErpComponentErpProductsMock,
  scenarioErpComponentsMock,
  scenarioErpCustomersMock,
  scenarioErpEmployeesMock,
  scenarioErpInvoicesMock,
  scenarioErpOrderItemsMock,
  scenarioErpOrdersMock,
  scenarioErpProductsMock,
  scenarioErpSuppliersMock,
  scenarioIdMock
} from "../../../../../tests/__mocks__"
import {
  deleteScenarioErpComponentErpProductMutation,
  deleteScenarioErpComponentMutation,
  deleteScenarioErpCustomerMutation,
  deleteScenarioErpEmployeeMutation,
  deleteScenarioErpInvoiceMutation,
  deleteScenarioErpOrderItemMutation,
  deleteScenarioErpOrderMutation,
  deleteScenarioErpProductMutation,
  deleteScenarioErpSupplierMutation
} from "../../../../graphql/mutations"

const scenarioId = scenarioIdMock

const scenarioErpComponentErpProduct = scenarioErpComponentErpProductsMock[0]
const scenarioErpComponent = scenarioErpComponentsMock[0]
const scenarioErpCustomer = scenarioErpCustomersMock[0]
const scenarioErpEmployee = scenarioErpEmployeesMock[0]
const scenarioErpInvoice = scenarioErpInvoicesMock[0]
const scenarioErpOrderItem = scenarioErpOrderItemsMock[0]
const scenarioErpOrder = scenarioErpOrdersMock[0]
const scenarioErpProduct = scenarioErpProductsMock[0]
const scenarioErpSupplier = scenarioErpSuppliersMock[0]

export const deleteScenarioErpEntityResponsesMock: MockedResponse[] = [
  {
    request: {
      query: deleteScenarioErpComponentErpProductMutation,
      variables: {
        scenarioId,
        componentProductId: scenarioErpComponentErpProduct.componentProductId
      }
    },
    result: {
      data: {deleteScenarioErpComponentErpProduct: scenarioErpComponentErpProduct}
    }
  },
  {
    request: {
      query: deleteScenarioErpComponentMutation,
      variables: {scenarioId, componentId: scenarioErpComponent.componentId}
    },
    result: {
      data: {deleteScenarioErpComponent: scenarioErpComponent}
    }
  },
  {
    request: {
      query: deleteScenarioErpCustomerMutation,
      variables: {scenarioId, customerId: scenarioErpCustomer.customerId}
    },
    result: {
      data: {deleteScenarioErpCustomer: scenarioErpCustomer}
    }
  },
  {
    request: {
      query: deleteScenarioErpEmployeeMutation,
      variables: {scenarioId, employeeId: scenarioErpEmployee.employeeId}
    },
    result: {
      data: {deleteScenarioErpEmployee: scenarioErpEmployee}
    }
  },
  {
    request: {
      query: deleteScenarioErpInvoiceMutation,
      variables: {scenarioId, invoiceId: scenarioErpInvoice.invoiceId}
    },
    result: {
      data: {deleteScenarioErpInvoice: scenarioErpInvoice}
    }
  },
  {
    request: {
      query: deleteScenarioErpOrderItemMutation,
      variables: {scenarioId, orderItemId: scenarioErpOrderItem.orderItemId}
    },
    result: {
      data: {deleteScenarioErpOrderItem: scenarioErpOrderItem}
    }
  },
  {
    request: {
      query: deleteScenarioErpOrderMutation,
      variables: {scenarioId, orderId: scenarioErpOrder.orderId}
    },
    result: {
      data: {deleteScenarioErpOrder: scenarioErpOrder}
    }
  },
  {
    request: {
      query: deleteScenarioErpProductMutation,
      variables: {scenarioId, productId: scenarioErpProduct.productId}
    },
    result: {
      data: {deleteScenarioErpProduct: scenarioErpProduct}
    }
  },
  {
    request: {
      query: deleteScenarioErpSupplierMutation,
      variables: {scenarioId, supplierId: scenarioErpSupplier.supplierId}
    },
    result: {
      data: {deleteScenarioErpSupplier: scenarioErpSupplier}
    }
  }
]
