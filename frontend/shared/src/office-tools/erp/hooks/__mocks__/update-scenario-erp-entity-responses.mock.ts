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
  updateScenarioErpComponentErpProductMutation,
  updateScenarioErpComponentMutation,
  updateScenarioErpCustomerMutation,
  updateScenarioErpEmployeeMutation,
  updateScenarioErpInvoiceMutation,
  updateScenarioErpOrderItemMutation,
  updateScenarioErpOrderMutation,
  updateScenarioErpProductMutation,
  updateScenarioErpSupplierMutation
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

export const updateScenarioErpEntityResponsesMock: MockedResponse[] = [
  {
    request: {
      query: updateScenarioErpComponentErpProductMutation,
      variables: {
        scenarioId,
        componentProductId: scenarioErpComponentErpProduct.componentProductId,
        update: {relevance: scenarioErpComponentErpProduct.relevance}
      }
    },
    result: {
      data: {updateScenarioErpComponentErpProduct: scenarioErpComponentErpProduct}
    }
  },
  {
    request: {
      query: updateScenarioErpComponentMutation,
      variables: {
        scenarioId,
        componentId: scenarioErpComponent.componentId,
        update: {relevance: scenarioErpComponent.relevance}
      }
    },
    result: {
      data: {updateScenarioErpComponent: scenarioErpComponent}
    }
  },
  {
    request: {
      query: updateScenarioErpCustomerMutation,
      variables: {
        scenarioId,
        customerId: scenarioErpCustomer.customerId,
        update: {relevance: scenarioErpCustomer.relevance}
      }
    },
    result: {
      data: {updateScenarioErpCustomer: scenarioErpCustomer}
    }
  },
  {
    request: {
      query: updateScenarioErpEmployeeMutation,
      variables: {
        scenarioId,
        employeeId: scenarioErpEmployee.employeeId,
        update: {relevance: scenarioErpEmployee.relevance}
      }
    },
    result: {
      data: {updateScenarioErpEmployee: scenarioErpEmployee}
    }
  },
  {
    request: {
      query: updateScenarioErpInvoiceMutation,
      variables: {
        scenarioId,
        invoiceId: scenarioErpInvoice.invoiceId,
        update: {relevance: scenarioErpInvoice.relevance}
      }
    },
    result: {
      data: {updateScenarioErpInvoice: scenarioErpInvoice}
    }
  },
  {
    request: {
      query: updateScenarioErpOrderItemMutation,
      variables: {
        scenarioId,
        orderItemId: scenarioErpOrderItem.orderItemId,
        update: {relevance: scenarioErpOrderItem.relevance}
      }
    },
    result: {
      data: {updateScenarioErpOrderItem: scenarioErpOrderItem}
    }
  },
  {
    request: {
      query: updateScenarioErpOrderMutation,
      variables: {
        scenarioId,
        orderId: scenarioErpOrder.orderId,
        update: {relevance: scenarioErpOrder.relevance}
      }
    },
    result: {
      data: {updateScenarioErpOrder: scenarioErpOrder}
    }
  },
  {
    request: {
      query: updateScenarioErpProductMutation,
      variables: {
        scenarioId,
        productId: scenarioErpProduct.productId,
        update: {relevance: scenarioErpProduct.relevance}
      }
    },
    result: {
      data: {updateScenarioErpProduct: scenarioErpProduct}
    }
  },
  {
    request: {
      query: updateScenarioErpSupplierMutation,
      variables: {
        scenarioId,
        supplierId: scenarioErpSupplier.supplierId,
        update: {relevance: scenarioErpSupplier.relevance}
      }
    },
    result: {
      data: {updateScenarioErpSupplier: scenarioErpSupplier}
    }
  }
]
