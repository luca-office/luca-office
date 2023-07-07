import {ErpType} from "../../../enums"
import {
  getErpComponentErpProductTemplate,
  getErpComponentTemplate,
  getErpCustomerTemplate,
  getErpEmployeeTemplate,
  getErpInvoiceTemplate,
  getErpOrderItemTemplate,
  getErpOrderTemplate,
  getErpProductTemplate,
  getErpSupplierTemplate
} from "../config/create-templates"

// eslint-disable-next-line consistent-return
export const getCreateTemplate = (sampleCompanyId: UUID, type: ErpType) => {
  switch (type) {
    case ErpType.Component:
      return getErpComponentTemplate(sampleCompanyId)
    case ErpType.Customer:
      return getErpCustomerTemplate(sampleCompanyId)
    case ErpType.Employee:
      return getErpEmployeeTemplate(sampleCompanyId)
    case ErpType.Invoice:
      return getErpInvoiceTemplate(sampleCompanyId)
    case ErpType.Order:
      return getErpOrderTemplate(sampleCompanyId)
    case ErpType.OrderItem:
      return getErpOrderItemTemplate(sampleCompanyId)
    case ErpType.Product:
      return getErpProductTemplate(sampleCompanyId)
    case ErpType.Supplier:
      return getErpSupplierTemplate(sampleCompanyId)
    case ErpType.ComponentProduct:
      return getErpComponentErpProductTemplate(sampleCompanyId)
  }
}
