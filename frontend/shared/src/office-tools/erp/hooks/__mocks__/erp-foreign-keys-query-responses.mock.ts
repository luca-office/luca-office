import {MockedResponse} from "@apollo/client/testing"
import {
  erpCustomersMockGraphQl,
  erpEmployeesMockGraphQl,
  erpOrdersMockGraphQl,
  erpProductsMockGraphQl,
  erpSuppliersMockGraphQl,
  sampleCompanyIdMock
} from "../../../../../tests/__mocks__/erp"
import {
  erpCustomersQuery,
  erpEmployeesQuery,
  erpOrdersQuery,
  erpProductsQuery,
  erpSuppliersQuery
} from "../../../../graphql/queries"

export const erpForeignKeysQueryResponsesMock: MockedResponse[] = [
  {
    request: {
      query: erpSuppliersQuery,
      variables: {sampleCompanyId: sampleCompanyIdMock}
    },
    result: {
      data: {
        erpSuppliers: erpSuppliersMockGraphQl
      }
    }
  },
  {
    request: {
      query: erpOrdersQuery,
      variables: {sampleCompanyId: sampleCompanyIdMock}
    },
    result: {
      data: {
        erpOrders: erpOrdersMockGraphQl
      }
    }
  },
  {
    request: {
      query: erpCustomersQuery,
      variables: {sampleCompanyId: sampleCompanyIdMock}
    },
    result: {
      data: {
        erpCustomers: erpCustomersMockGraphQl
      }
    }
  },
  {
    request: {
      query: erpEmployeesQuery,
      variables: {sampleCompanyId: sampleCompanyIdMock}
    },
    result: {
      data: {
        erpEmployees: erpEmployeesMockGraphQl
      }
    }
  },
  {
    request: {
      query: erpProductsQuery,
      variables: {sampleCompanyId: sampleCompanyIdMock}
    },
    result: {
      data: {
        erpProducts: erpProductsMockGraphQl
      }
    }
  }
]
