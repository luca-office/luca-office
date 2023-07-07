import {MockedProvider} from "@apollo/client/testing"
import * as React from "react"
import {PropsWithChildren} from "react"
import {
  erpComponentsQuery,
  erpCustomersQuery,
  erpEmployeesQuery,
  erpInvoicesQuery,
  erpOrderItemsQuery,
  erpOrdersQuery,
  erpProductsQuery,
  erpSuppliersQuery
} from "../../../src/graphql/queries"
import {sampleCompanyIdMock} from "./common"
import {erpComponentsMock} from "./erp-components"
import {erpCustomersMock} from "./erp-customers"
import {erpEmployeesMock} from "./erp-employee"
import {erpInvoicesMock} from "./erp-invoices"
import {erpOrderItemsMock} from "./erp-order-items"
import {erpOrdersMock} from "./erp-orders"
import {erpProductsMock} from "./erp-products"
import {erpSuppliersMock} from "./erp-suppliers"

export const MockedErpProvider: React.FC<PropsWithChildren<any>> = ({children}) => (
  <MockedProvider
    {...{
      addTypename: false,
      mocks: [
        {
          request: {query: erpComponentsQuery, variables: {sampleCompanyId: sampleCompanyIdMock}},
          result: {data: {erpComponents: erpComponentsMock}}
        },
        {
          request: {query: erpCustomersQuery, variables: {sampleCompanyId: sampleCompanyIdMock}},
          result: {data: {erpCustomers: erpCustomersMock}}
        },
        {
          request: {query: erpEmployeesQuery, variables: {sampleCompanyId: sampleCompanyIdMock}},
          result: {data: {erpEmployees: erpEmployeesMock}}
        },
        {
          request: {query: erpInvoicesQuery, variables: {sampleCompanyId: sampleCompanyIdMock}},
          result: {data: {erpInvoices: erpInvoicesMock}}
        },
        {
          request: {query: erpOrdersQuery, variables: {sampleCompanyId: sampleCompanyIdMock}},
          result: {data: {erpOrders: erpOrdersMock}}
        },
        {
          request: {query: erpOrderItemsQuery, variables: {sampleCompanyId: sampleCompanyIdMock}},
          result: {data: {erpOrderItems: erpOrderItemsMock}}
        },
        {
          request: {query: erpProductsQuery, variables: {sampleCompanyId: sampleCompanyIdMock}},
          result: {data: {erpProducts: erpProductsMock}}
        },
        {
          request: {query: erpSuppliersQuery, variables: {sampleCompanyId: sampleCompanyIdMock}},
          result: {data: {erpSuppliers: erpSuppliersMock}}
        }
      ]
    }}>
    {children}
  </MockedProvider>
)
