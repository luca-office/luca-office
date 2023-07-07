import {omit} from "lodash-es"
import {useForm} from "react-hook-form"
import {ErpType} from "../../../enums"
import {
  ErpComponent,
  ErpComponentErpProduct,
  ErpCustomer,
  ErpEmployee,
  ErpEntity,
  ErpInvoice,
  ErpOrder,
  ErpOrderItem,
  ErpProduct,
  ErpSupplier
} from "../../../models"

export const useErpFormMethods = (data: ErpEntity) => {
  const defaultValues = omit(data, ["type"])

  switch (data.type) {
    case ErpType.Component:
      return useForm<ErpComponent>({defaultValues})
    case ErpType.Customer:
      return useForm<ErpCustomer>({defaultValues})
    case ErpType.Employee:
      return useForm<ErpEmployee>({defaultValues})
    case ErpType.Invoice:
      return useForm<ErpInvoice>({defaultValues})
    case ErpType.Order:
      return useForm<ErpOrder>({defaultValues})
    case ErpType.OrderItem:
      return useForm<ErpOrderItem>({defaultValues})
    case ErpType.Product:
      return useForm<ErpProduct>({defaultValues})
    case ErpType.Supplier:
      return useForm<ErpSupplier>({defaultValues})
    case ErpType.ComponentProduct:
      return useForm<ErpComponentErpProduct>({defaultValues})
    default:
      return useForm<ErpEntity>({defaultValues})
  }
}
