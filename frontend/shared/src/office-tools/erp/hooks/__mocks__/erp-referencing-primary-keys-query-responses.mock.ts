import {MockedResponse} from "@apollo/client/testing"
import {
  erpComponentErpProductsMockGraphQl,
  erpComponentsMockGraphQl,
  erpInvoicesMockGraphQl,
  erpOrderItemsMockGraphQl,
  erpOrdersMockGraphQl,
  sampleCompanyIdMock
} from "../../../../../tests/__mocks__/erp"
import {
  erpComponentErpProductsQuery,
  erpComponentsQuery,
  erpInvoicesQuery,
  erpOrderItemsQuery,
  erpOrdersQuery
} from "../../../../graphql/queries"

export const erpReferencingPrimaryKeysQueryResponsesMock: MockedResponse[] = [
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
      query: erpComponentErpProductsQuery,
      variables: {sampleCompanyId: sampleCompanyIdMock}
    },
    result: {
      data: {
        erpComponentErpProducts: erpComponentErpProductsMockGraphQl
      }
    }
  }
]
