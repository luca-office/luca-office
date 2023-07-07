import {useApolloClient} from "@apollo/client"
import * as React from "react"
import {ErpType} from "../../../enums"
import {
  ScenarioErpComponentErpProductsQuery,
  ScenarioErpComponentErpProductsQueryVariables
} from "../../../graphql/generated/ScenarioErpComponentErpProductsQuery"
import {
  ScenarioErpComponentsQuery,
  ScenarioErpComponentsQueryVariables
} from "../../../graphql/generated/ScenarioErpComponentsQuery"
import {
  ScenarioErpCustomersQuery,
  ScenarioErpCustomersQueryVariables
} from "../../../graphql/generated/ScenarioErpCustomersQuery"
import {
  ScenarioErpEmployeesQuery,
  ScenarioErpEmployeesQueryVariables
} from "../../../graphql/generated/ScenarioErpEmployeesQuery"
import {
  ScenarioErpInvoicesQuery,
  ScenarioErpInvoicesQueryVariables
} from "../../../graphql/generated/ScenarioErpInvoicesQuery"
import {
  ScenarioErpOrderItemsQuery,
  ScenarioErpOrderItemsQueryVariables
} from "../../../graphql/generated/ScenarioErpOrderItemsQuery"
import {
  ScenarioErpOrdersQuery,
  ScenarioErpOrdersQueryVariables
} from "../../../graphql/generated/ScenarioErpOrdersQuery"
import {
  ScenarioErpProductsQuery,
  ScenarioErpProductsQueryVariables
} from "../../../graphql/generated/ScenarioErpProductsQuery"
import {
  ScenarioErpSuppliersQuery,
  ScenarioErpSuppliersQueryVariables
} from "../../../graphql/generated/ScenarioErpSuppliersQuery"
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
} from "../../../graphql/queries"
import {
  ScenarioErpComponent,
  ScenarioErpComponentErpProduct,
  ScenarioErpCustomer,
  ScenarioErpEmployee,
  ScenarioErpEntity,
  ScenarioErpEntitySelector,
  ScenarioErpInvoice,
  ScenarioErpOrder,
  ScenarioErpOrderItem,
  ScenarioErpProduct,
  ScenarioErpSupplier
} from "../../../models"
import {find, Option} from "../../../utils"
import {toScenarioErpEntity} from "../utils"

export interface UseScenarioErpEntityHook {
  readonly loading: boolean
  readonly getScenarioErpEntity: (
    type: ErpType,
    selector: ScenarioErpEntitySelector
  ) => Promise<Option<ScenarioErpEntity>>
}

export const useScenarioErpEntity = (scenarioId: UUID): UseScenarioErpEntityHook => {
  const client = useApolloClient()

  const [loading, setLoading] = React.useState<boolean>(false)

  const [scenarioErpComponentErpProducts, setScenarioErpComponentErpProducts] = React.useState<
    ScenarioErpComponentErpProduct[]
  >([])
  const [scenarioErpComponents, setScenarioErpComponents] = React.useState<ScenarioErpComponent[]>([])
  const [scenarioErpCustomers, setScenarioErpCustomers] = React.useState<ScenarioErpCustomer[]>([])
  const [scenarioErpEmployees, setScenarioErpEmployees] = React.useState<ScenarioErpEmployee[]>([])
  const [scenarioErpInvoices, setScenarioErpInvoices] = React.useState<ScenarioErpInvoice[]>([])
  const [scenarioErpOrderItems, setScenarioErpOrderItems] = React.useState<ScenarioErpOrderItem[]>([])
  const [scenarioErpOrders, setScenarioErpOrders] = React.useState<ScenarioErpOrder[]>([])
  const [scenarioErpProducts, setScenarioErpProducts] = React.useState<ScenarioErpProduct[]>([])
  const [scenarioErpSuppliers, setScenarioErpSuppliers] = React.useState<ScenarioErpSupplier[]>([])

  const getScenarioErpComponentErpProduct = (selector: ScenarioErpEntitySelector) => {
    const {componentProductId} = selector
    const findEntity = (entities: ScenarioErpComponentErpProduct[]) =>
      find(
        scenarioErpComponentErpProduct => scenarioErpComponentErpProduct.componentProductId === componentProductId,
        entities
      ).map(scenarioErpComponentErpProduct =>
        toScenarioErpEntity(scenarioErpComponentErpProduct, ["componentProductId"])
      )

    if (!scenarioErpComponentErpProducts.length) {
      return client
        .query<ScenarioErpComponentErpProductsQuery, ScenarioErpComponentErpProductsQueryVariables>({
          query: scenarioErpComponentErpProductsQuery,
          variables: {scenarioId},
          fetchPolicy: "network-only"
        })
        .then(result => {
          const entities = result.data?.scenarioErpComponentErpProducts ?? []
          setScenarioErpComponentErpProducts(entities)
          return findEntity(entities)
        })
    }
    return Promise.resolve(findEntity(scenarioErpComponentErpProducts))
  }

  const getScenarioErpComponent = (selector: ScenarioErpEntitySelector) => {
    const findEntity = (entities: ScenarioErpComponent[]) =>
      find(
        scenarioErpComponent => scenarioErpComponent.componentId === selector.componentId,
        entities
      ).map(scenarioErpComponent => toScenarioErpEntity(scenarioErpComponent, ["componentId"]))

    if (!scenarioErpComponents.length) {
      return client
        .query<ScenarioErpComponentsQuery, ScenarioErpComponentsQueryVariables>({
          query: scenarioErpComponentsQuery,
          variables: {scenarioId},
          fetchPolicy: "network-only"
        })
        .then(result => {
          const entities = result.data?.scenarioErpComponents ?? []
          setScenarioErpComponents(entities)
          return findEntity(entities)
        })
    }
    return Promise.resolve(findEntity(scenarioErpComponents))
  }

  const getScenarioErpCustomer = (selector: ScenarioErpEntitySelector) => {
    const findEntity = (entities: ScenarioErpCustomer[]) =>
      find(
        scenarioErpCustomer => scenarioErpCustomer.customerId === selector.customerId,
        entities
      ).map(scenarioErpCustomer => toScenarioErpEntity(scenarioErpCustomer, ["customerId"]))

    if (!scenarioErpCustomers.length) {
      return client
        .query<ScenarioErpCustomersQuery, ScenarioErpCustomersQueryVariables>({
          query: scenarioErpCustomersQuery,
          variables: {scenarioId},
          fetchPolicy: "network-only"
        })
        .then(result => {
          const entities = result.data?.scenarioErpCustomers ?? []
          setScenarioErpCustomers(entities)
          return findEntity(entities)
        })
    }
    return Promise.resolve(findEntity(scenarioErpCustomers))
  }

  const getScenarioErpEmployee = (selector: ScenarioErpEntitySelector) => {
    const findEntity = (entities: ScenarioErpEmployee[]) =>
      find(
        scenarioErpEmployee => scenarioErpEmployee.employeeId === selector.employeeId,
        entities
      ).map(scenarioErpEmployee => toScenarioErpEntity(scenarioErpEmployee, ["employeeId"]))

    if (!scenarioErpEmployees.length) {
      return client
        .query<ScenarioErpEmployeesQuery, ScenarioErpEmployeesQueryVariables>({
          query: scenarioErpEmployeesQuery,
          variables: {scenarioId},
          fetchPolicy: "network-only"
        })
        .then(result => {
          const entities = result.data?.scenarioErpEmployees ?? []
          setScenarioErpEmployees(entities)
          return findEntity(entities)
        })
    }
    return Promise.resolve(findEntity(scenarioErpEmployees))
  }

  const getScenarioErpInvoice = (selector: ScenarioErpEntitySelector) => {
    const findEntity = (entities: ScenarioErpInvoice[]) =>
      find(
        scenarioErpInvoice => scenarioErpInvoice.invoiceId === selector.invoiceId,
        entities
      ).map(scenarioErpInvoice => toScenarioErpEntity(scenarioErpInvoice, ["invoiceId"]))

    if (!scenarioErpInvoices.length) {
      return client
        .query<ScenarioErpInvoicesQuery, ScenarioErpInvoicesQueryVariables>({
          query: scenarioErpInvoicesQuery,
          variables: {scenarioId},
          fetchPolicy: "network-only"
        })
        .then(result => {
          const entities = result.data?.scenarioErpInvoices ?? []
          setScenarioErpInvoices(entities)
          return findEntity(entities)
        })
    }
    return Promise.resolve(findEntity(scenarioErpInvoices))
  }

  const getScenarioErpOrderItem = (selector: ScenarioErpEntitySelector) => {
    const findEntity = (entities: ScenarioErpOrderItem[]) =>
      find(
        scenarioErpOrderItem => scenarioErpOrderItem.orderItemId === selector.orderItemId,
        entities
      ).map(scenarioErpOrderItem => toScenarioErpEntity(scenarioErpOrderItem, ["orderItemId"]))

    if (!scenarioErpOrderItems.length) {
      return client
        .query<ScenarioErpOrderItemsQuery, ScenarioErpOrderItemsQueryVariables>({
          query: scenarioErpOrderItemsQuery,
          variables: {scenarioId},
          fetchPolicy: "network-only"
        })
        .then(result => {
          const entities = result.data?.scenarioErpOrderItems ?? []
          setScenarioErpOrderItems(entities)
          return findEntity(entities)
        })
    }
    return Promise.resolve(findEntity(scenarioErpOrderItems))
  }

  const getScenarioErpOrder = (selector: ScenarioErpEntitySelector) => {
    const findEntity = (entities: ScenarioErpOrder[]) =>
      find(scenarioErpOrder => scenarioErpOrder.orderId === selector.orderId, entities).map(scenarioErpOrder =>
        toScenarioErpEntity(scenarioErpOrder, ["orderId"])
      )

    if (!scenarioErpOrders.length) {
      return client
        .query<ScenarioErpOrdersQuery, ScenarioErpOrdersQueryVariables>({
          query: scenarioErpOrdersQuery,
          variables: {scenarioId},
          fetchPolicy: "network-only"
        })
        .then(result => {
          const entities = result.data?.scenarioErpOrders ?? []
          setScenarioErpOrders(entities)
          return findEntity(entities)
        })
    }
    return Promise.resolve(findEntity(scenarioErpOrders))
  }

  const getScenarioErpProduct = (selector: ScenarioErpEntitySelector) => {
    const findEntity = (entities: ScenarioErpProduct[]) =>
      find(
        scenarioErpProduct => scenarioErpProduct.productId === selector.productId,
        entities
      ).map(scenarioErpProduct => toScenarioErpEntity(scenarioErpProduct, ["productId"]))

    if (!scenarioErpProducts.length) {
      return client
        .query<ScenarioErpProductsQuery, ScenarioErpProductsQueryVariables>({
          query: scenarioErpProductsQuery,
          variables: {scenarioId},
          fetchPolicy: "network-only"
        })
        .then(result => {
          const entities = result.data?.scenarioErpProducts ?? []
          setScenarioErpProducts(entities)
          return findEntity(entities)
        })
    }
    return Promise.resolve(findEntity(scenarioErpProducts))
  }

  const getScenarioErpSupplier = (selector: ScenarioErpEntitySelector) => {
    const findEntity = (entities: ScenarioErpSupplier[]) =>
      find(
        scenarioErpSupplier => scenarioErpSupplier.supplierId === selector.supplierId,
        entities
      ).map(scenarioErpSupplier => toScenarioErpEntity(scenarioErpSupplier, ["supplierId"]))

    if (!scenarioErpProducts.length) {
      return client
        .query<ScenarioErpSuppliersQuery, ScenarioErpSuppliersQueryVariables>({
          query: scenarioErpSuppliersQuery,
          variables: {scenarioId},
          fetchPolicy: "network-only"
        })
        .then(result => {
          const entities = result.data?.scenarioErpSuppliers ?? []
          setScenarioErpSuppliers(entities)
          return findEntity(entities)
        })
    }
    return Promise.resolve(findEntity(scenarioErpSuppliers))
  }

  const getScenarioErpEntity = (
    type: ErpType,
    selector: ScenarioErpEntitySelector
  ): Promise<Option<ScenarioErpEntity>> => {
    let getEntity = null
    switch (type) {
      case ErpType.Component:
        getEntity = getScenarioErpComponent
        break
      case ErpType.Customer:
        getEntity = getScenarioErpCustomer
        break
      case ErpType.Employee:
        getEntity = getScenarioErpEmployee
        break
      case ErpType.Invoice:
        getEntity = getScenarioErpInvoice
        break
      case ErpType.Order:
        getEntity = getScenarioErpOrder
        break
      case ErpType.OrderItem:
        getEntity = getScenarioErpOrderItem
        break
      case ErpType.Product:
        getEntity = getScenarioErpProduct
        break
      case ErpType.Supplier:
        getEntity = getScenarioErpSupplier
        break
      case ErpType.ComponentProduct:
        getEntity = getScenarioErpComponentErpProduct
    }

    if (!getEntity) {
      return Promise.reject()
    }

    setLoading(true)
    return getEntity(selector)
      .then(entityOption => {
        setLoading(false)
        return entityOption
      })
      .catch(error => {
        setLoading(false)
        return error
      })
  }

  return {loading, getScenarioErpEntity}
}
