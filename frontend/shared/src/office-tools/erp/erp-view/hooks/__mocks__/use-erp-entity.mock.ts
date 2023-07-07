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
} from "../../../../../../tests/__mocks__"
import {sampleCompaniesMock} from "../../../../../graphql/__mocks__"
import {
  erpComponentErpProductsQuery,
  erpComponentsQuery,
  erpCustomersQuery,
  erpEmployeesQuery,
  erpInvoicesQuery,
  erpOrderItemsQuery,
  erpOrdersQuery,
  erpProductsQuery,
  erpSuppliersQuery,
  sampleCompanyQuery
} from "../../../../../graphql/queries"

export const useErpEntityQueryResponsesMock: Array<MockedResponse> = [
  {
    request: {
      query: erpComponentsQuery,
      variables: {sampleCompanyId: sampleCompanyIdMock}
    },
    result: {
      data: {
        erpComponents: erpComponentsMockGraphQl
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
      query: erpInvoicesQuery,
      variables: {sampleCompanyId: sampleCompanyIdMock}
    },
    result: {
      data: {
        erpInvoices: erpInvoicesMockGraphQl
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
      query: erpOrderItemsQuery,
      variables: {sampleCompanyId: sampleCompanyIdMock}
    },
    result: {
      data: {
        erpOrderItems: erpOrderItemsMockGraphQl
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
  },
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
      query: erpComponentErpProductsQuery,
      variables: {sampleCompanyId: sampleCompanyIdMock}
    },
    result: {
      data: {
        erpComponentErpProducts: erpComponentErpProductsMockGraphQl
      }
    }
  },
  {
    request: {
      query: sampleCompanyQuery,
      variables: {id: sampleCompanyIdMock}
    },
    result: {
      data: {
        sampleCompany: {...sampleCompaniesMock[0], id: sampleCompanyIdMock}
      }
    }
  }
]
