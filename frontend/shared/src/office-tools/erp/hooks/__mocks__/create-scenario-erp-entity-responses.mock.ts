import {MockedResponse} from "@apollo/client/testing"
import {
  sampleCompanyIdMock,
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
import {Relevance} from "../../../../graphql/generated/globalTypes";
import {
  createScenarioErpComponentErpProductMutation,
  createScenarioErpComponentMutation,
  createScenarioErpCustomerMutation,
  createScenarioErpEmployeeMutation,
  createScenarioErpInvoiceMutation,
  createScenarioErpOrderItemMutation,
  createScenarioErpOrderMutation,
  createScenarioErpProductMutation,
  createScenarioErpSupplierMutation
} from "../../../../graphql/mutations"

const sampleCompanyId = sampleCompanyIdMock
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

export const createScenarioErpEntityResponsesMock: MockedResponse[] = [
  {
    request: {
      query: createScenarioErpComponentErpProductMutation,
      variables: {
        creation: {
          scenarioId,
          componentProductId: scenarioErpComponentErpProduct.componentProductId,
          sampleCompanyId,
          relevance: scenarioErpComponentErpProduct.relevance
        }
      }
    },
    result: {
      data: {createScenarioErpComponentErpProduct: scenarioErpComponentErpProduct}
    }
  },
  {
    request: {
      query: createScenarioErpComponentMutation,
      variables: {
        creation: {
          scenarioId,
          componentId: scenarioErpComponent.componentId,
          sampleCompanyId,
          relevance: scenarioErpComponent.relevance
        }
      }
    },
    result: {
      data: {createScenarioErpComponent: scenarioErpComponent}
    }
  },
  {
    request: {
      query: createScenarioErpCustomerMutation,
      variables: {
        creation: {
          scenarioId,
          customerId: scenarioErpCustomer.customerId,
          sampleCompanyId,
          relevance: scenarioErpCustomer.relevance
        }
      }
    },
    result: {
      data: {createScenarioErpCustomer: scenarioErpComponent}
    }
  },
  {
    request: {
      query: createScenarioErpEmployeeMutation,
      variables: {
        creation: {
          scenarioId,
          employeeId: scenarioErpEmployee.employeeId,
          sampleCompanyId,
          relevance: scenarioErpEmployee.relevance
        }
      }
    },
    result: {
      data: {createScenarioErpEmployee: scenarioErpEmployee}
    }
  },
  {
    request: {
      query: createScenarioErpInvoiceMutation,
      variables: {
        creation: {
          scenarioId,
          invoiceId: scenarioErpInvoice.invoiceId,
          sampleCompanyId,
          relevance: scenarioErpInvoice.relevance
        }
      }
    },
    result: {
      data: {createScenarioErpInvoice: scenarioErpInvoice}
    }
  },
  {
    request: {
      query: createScenarioErpOrderItemMutation,
      variables: {
        creation: {
          scenarioId,
          orderItemId: scenarioErpOrderItem.orderItemId,
          sampleCompanyId,
          relevance: scenarioErpOrderItem.relevance
        }
      }
    },
    result: {
      data: {createScenarioErpOrderItem: scenarioErpOrderItem}
    }
  },
  {
    request: {
      query: createScenarioErpOrderMutation,
      variables: {
        creation: {
          scenarioId,
          orderId: scenarioErpOrder.orderId,
          sampleCompanyId,
          relevance: scenarioErpOrder.relevance
        }
      }
    },
    result: {
      data: {createScenarioErpOrder: scenarioErpOrder}
    }
  },
  {
    request: {
      query: createScenarioErpProductMutation,
      variables: {
        creation: {
          scenarioId,
          productId: scenarioErpProduct.productId,
          sampleCompanyId,
          relevance: scenarioErpProduct.relevance
        }
      }
    },
    result: {
      data: {createScenarioErpProduct: scenarioErpProduct}
    }
  },
  {
    request: {
      query: createScenarioErpSupplierMutation,
      variables: {
        creation: {
          scenarioId,
          supplierId: scenarioErpSupplier.supplierId,
          sampleCompanyId,
          relevance: scenarioErpSupplier.relevance
        }
      }
    },
    result: {
      data: {createScenarioErpSupplier: scenarioErpSupplier}
    }
  }
]
