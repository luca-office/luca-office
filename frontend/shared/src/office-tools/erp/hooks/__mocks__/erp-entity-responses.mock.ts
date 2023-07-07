import {MockedResponse} from "@apollo/client/testing"
import {
  erpComponentErpProductsMockGraphQl,
  erpComponentsMockGraphQl,
  erpCustomersMockGraphQl,
  erpEmployeesMockGraphQl,
  erpInvoicesMockGraphQl,
  erpOrderItemsMockGraphQl,
  erpOrdersMockGraphQl,
  erpProductsMockGraphQl,
  erpSuppliersMockGraphQl,
  sampleCompanyIdMock
} from "../../../../../tests/__mocks__"
import {
  erpComponentErpProductsQuery,
  erpComponentsQuery,
  erpCustomersQuery,
  erpEmployeesQuery,
  erpInvoicesQuery,
  erpOrderItemsQuery,
  erpOrdersQuery,
  erpProductsQuery,
  erpSuppliersQuery
} from "../../../../graphql/queries"

const sampleCompanyId = sampleCompanyIdMock

const erpComponents = erpComponentsMockGraphQl
const erpCustomers = erpCustomersMockGraphQl
const erpEmployees = erpEmployeesMockGraphQl
const erpInvoices = erpInvoicesMockGraphQl
const erpOrders = erpOrdersMockGraphQl
const erpOrderItems = erpOrderItemsMockGraphQl
const erpProducts = erpProductsMockGraphQl
const erpSuppliers = erpSuppliersMockGraphQl
const erpComponentErpProducts = erpComponentErpProductsMockGraphQl

export const erpEntityResponsesMock: MockedResponse[] = [
  {
    request: {
      query: erpComponentsQuery,
      variables: {sampleCompanyId}
    },
    result: {
      data: {erpComponents}
    }
  },
  {
    request: {
      query: erpCustomersQuery,
      variables: {sampleCompanyId}
    },
    result: {
      data: {erpCustomers}
    }
  },
  {
    request: {
      query: erpEmployeesQuery,
      variables: {sampleCompanyId}
    },
    result: {
      data: {erpEmployees}
    }
  },
  {
    request: {
      query: erpInvoicesQuery,
      variables: {sampleCompanyId}
    },
    result: {
      data: {erpInvoices}
    }
  },
  {
    request: {
      query: erpOrdersQuery,
      variables: {sampleCompanyId}
    },
    result: {
      data: {erpOrders}
    }
  },
  {
    request: {
      query: erpOrderItemsQuery,
      variables: {sampleCompanyId}
    },
    result: {
      data: {erpOrderItems}
    }
  },
  {
    request: {
      query: erpProductsQuery,
      variables: {sampleCompanyId}
    },
    result: {
      data: {erpProducts}
    }
  },
  {
    request: {
      query: erpSuppliersQuery,
      variables: {sampleCompanyId}
    },
    result: {
      data: {erpSuppliers}
    }
  },
  {
    request: {
      query: erpComponentErpProductsQuery,
      variables: {sampleCompanyId}
    },
    result: {
      data: {erpComponentErpProducts}
    }
  }
]
