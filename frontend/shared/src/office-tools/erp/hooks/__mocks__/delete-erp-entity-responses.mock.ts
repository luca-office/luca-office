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
  erpSuppliersMockGraphQl
} from "../../../../../tests/__mocks__"
import {
  deleteErpComponentErpProductMutation,
  deleteErpComponentMutation,
  deleteErpCustomerMutation,
  deleteErpEmployeeMutation,
  deleteErpInvoiceMutation,
  deleteErpOrderItemMutation,
  deleteErpOrderMutation,
  deleteErpProductMutation,
  deleteErpSupplierMutation
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

export const deleteErpEntityResponsesMock: MockedResponse[] = [
  {
    request: {
      query: deleteErpComponentMutation,
      variables: {id: erpComponent.id, sampleCompanyId: erpComponent.sampleCompanyId}
    },
    result: {
      data: {
        deleteErpComponent: erpComponent.id
      }
    }
  },
  {
    request: {
      query: deleteErpCustomerMutation,
      variables: {id: erpCustomer.id, sampleCompanyId: erpCustomer.sampleCompanyId}
    },
    result: {
      data: {
        deleteErpCustomer: erpCustomer.id
      }
    }
  },
  {
    request: {
      query: deleteErpEmployeeMutation,
      variables: {id: erpEmployee.id, sampleCompanyId: erpEmployee.sampleCompanyId}
    },
    result: {
      data: {
        deleteErpEmployee: erpEmployee.id
      }
    }
  },
  {
    request: {
      query: deleteErpInvoiceMutation,
      variables: {id: erpInvoice.id, sampleCompanyId: erpInvoice.sampleCompanyId}
    },
    result: {
      data: {
        deleteErpInvoice: erpInvoice.id
      }
    }
  },
  {
    request: {
      query: deleteErpOrderMutation,
      variables: {id: erpOrder.id, sampleCompanyId: erpOrder.sampleCompanyId}
    },
    result: {
      data: {
        deleteErpOrder: erpOrder.id
      }
    }
  },
  {
    request: {
      query: deleteErpOrderItemMutation,
      variables: {id: erpOrderItem.id, sampleCompanyId: erpOrderItem.sampleCompanyId}
    },
    result: {
      data: {
        deleteErpOrderItem: erpOrderItem.id
      }
    }
  },
  {
    request: {
      query: deleteErpProductMutation,
      variables: {id: erpProduct.id, sampleCompanyId: erpProduct.sampleCompanyId}
    },
    result: {
      data: {
        deleteErpProduct: erpProduct.id
      }
    }
  },
  {
    request: {
      query: deleteErpSupplierMutation,
      variables: {id: erpSupplier.id, sampleCompanyId: erpSupplier.sampleCompanyId}
    },
    result: {
      data: {
        deleteErpSupplier: erpSupplier.id
      }
    }
  },
  {
    request: {
      query: deleteErpComponentErpProductMutation,
      variables: {
        id: erpProductErpComponent.id,
        sampleCompanyId: erpProductErpComponent.sampleCompanyId
      }
    },
    result: {
      data: {
        deleteErpComponentErpProduct: erpProductErpComponent
      }
    }
  }
]
