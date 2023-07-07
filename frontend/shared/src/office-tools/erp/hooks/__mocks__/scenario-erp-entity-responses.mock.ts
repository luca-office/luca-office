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
  scenarioErpComponentErpProductsQuery,
  scenarioErpComponentsQuery,
  scenarioErpCustomersQuery,
  scenarioErpEmployeesQuery,
  scenarioErpInvoicesQuery,
  scenarioErpOrderItemsQuery,
  scenarioErpOrdersQuery,
  scenarioErpProductsQuery,
  scenarioErpSuppliersQuery
} from "../../../../graphql/queries"

const scenarioId = scenarioIdMock

const scenarioErpComponentErpProducts = scenarioErpComponentErpProductsMock
const scenarioErpComponents = scenarioErpComponentsMock
const scenarioErpCustomers = scenarioErpCustomersMock
const scenarioErpEmployees = scenarioErpEmployeesMock
const scenarioErpInvoices = scenarioErpInvoicesMock
const scenarioErpOrderItems = scenarioErpOrderItemsMock
const scenarioErpOrders = scenarioErpOrdersMock
const scenarioErpProducts = scenarioErpProductsMock
const scenarioErpSuppliers = scenarioErpSuppliersMock

export const scenarioErpEntityResponsesMock: MockedResponse[] = [
  {
    request: {
      query: scenarioErpComponentErpProductsQuery,
      variables: {scenarioId}
    },
    result: {
      data: {scenarioErpComponentErpProducts}
    }
  },
  {
    request: {
      query: scenarioErpComponentsQuery,
      variables: {scenarioId}
    },
    result: {
      data: {scenarioErpComponents}
    }
  },
  {
    request: {
      query: scenarioErpCustomersQuery,
      variables: {scenarioId}
    },
    result: {
      data: {scenarioErpCustomers}
    }
  },
  {
    request: {
      query: scenarioErpEmployeesQuery,
      variables: {scenarioId}
    },
    result: {
      data: {scenarioErpEmployees}
    }
  },
  {
    request: {
      query: scenarioErpInvoicesQuery,
      variables: {scenarioId}
    },
    result: {
      data: {scenarioErpInvoices}
    }
  },
  {
    request: {
      query: scenarioErpOrderItemsQuery,
      variables: {scenarioId}
    },
    result: {
      data: {scenarioErpOrderItems}
    }
  },
  {
    request: {
      query: scenarioErpOrdersQuery,
      variables: {scenarioId}
    },
    result: {
      data: {scenarioErpOrders}
    }
  },
  {
    request: {
      query: scenarioErpProductsQuery,
      variables: {scenarioId}
    },
    result: {
      data: {scenarioErpProducts}
    }
  },
  {
    request: {
      query: scenarioErpSuppliersQuery,
      variables: {scenarioId}
    },
    result: {
      data: {scenarioErpSuppliers}
    }
  }
]
