package graphql

import database.generated.public._
import models._
import sangria.macros.derive._
import sangria.schema.ObjectType

object ErpOutputObjectTypes {
  import EnumTypes._
  import ScalarAliases._

  implicit val ScenarioErpComponentObjectType: ObjectType[ContextBase, ScenarioErpComponent] =
    deriveObjectType[ContextBase, ScenarioErpComponent]()
  implicit val ScenarioErpComponentErpProductObjectType: ObjectType[ContextBase, ScenarioErpComponentErpProduct] =
    deriveObjectType[ContextBase, ScenarioErpComponentErpProduct]()
  implicit val ScenarioErpCustomerObjectType: ObjectType[ContextBase, ScenarioErpCustomer] =
    deriveObjectType[ContextBase, ScenarioErpCustomer]()
  implicit val ScenarioErpEmployeeObjectType: ObjectType[ContextBase, ScenarioErpEmployee] =
    deriveObjectType[ContextBase, ScenarioErpEmployee]()
  implicit val ScenarioErpInvoiceObjectType: ObjectType[ContextBase, ScenarioErpInvoice] =
    deriveObjectType[ContextBase, ScenarioErpInvoice]()
  implicit val ScenarioErpOrderObjectType: ObjectType[ContextBase, ScenarioErpOrder] =
    deriveObjectType[ContextBase, ScenarioErpOrder]()
  implicit val ScenarioErpOrderItemObjectType: ObjectType[ContextBase, ScenarioErpOrderItem] =
    deriveObjectType[ContextBase, ScenarioErpOrderItem]()
  implicit val ScenarioErpProductObjectType: ObjectType[ContextBase, ScenarioErpProduct] =
    deriveObjectType[ContextBase, ScenarioErpProduct]()
  implicit val ScenarioErpSupplierObjectType: ObjectType[ContextBase, ScenarioErpSupplier] =
    deriveObjectType[ContextBase, ScenarioErpSupplier]()

  implicit val ErpComponentRelevanceObjectType: ObjectType[ContextBase, ErpComponentRelevance] =
    deriveObjectType[ContextBase, ErpComponentRelevance]()
  implicit val ErpComponentErpProductRelevanceObjectType: ObjectType[ContextBase, ErpComponentErpProductRelevance] =
    deriveObjectType[ContextBase, ErpComponentErpProductRelevance]()
  implicit val ErpCustomerRelevanceObjectType: ObjectType[ContextBase, ErpCustomerRelevance] =
    deriveObjectType[ContextBase, ErpCustomerRelevance]()
  implicit val ErpEmployeeRelevanceObjectType: ObjectType[ContextBase, ErpEmployeeRelevance] =
    deriveObjectType[ContextBase, ErpEmployeeRelevance]()
  implicit val ErpInvoiceRelevanceObjectType: ObjectType[ContextBase, ErpInvoiceRelevance] =
    deriveObjectType[ContextBase, ErpInvoiceRelevance]()
  implicit val ErpOrderRelevanceObjectType: ObjectType[ContextBase, ErpOrderRelevance] =
    deriveObjectType[ContextBase, ErpOrderRelevance]()
  implicit val ErpOrderItemRelevanceObjectType: ObjectType[ContextBase, ErpOrderItemRelevance] =
    deriveObjectType[ContextBase, ErpOrderItemRelevance]()
  implicit val ErpProductRelevanceObjectType: ObjectType[ContextBase, ErpProductRelevance] =
    deriveObjectType[ContextBase, ErpProductRelevance]()
  implicit val ErpSupplierRelevanceObjectType: ObjectType[ContextBase, ErpSupplierRelevance] =
    deriveObjectType[ContextBase, ErpSupplierRelevance]()
}
