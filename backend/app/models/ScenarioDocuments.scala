package models

import database.generated.public.{Email, File}
import enums.Relevance

case class ScenarioDocuments(
    emails: Seq[Email],
    files: Seq[File],
    erpComponents: Seq[ErpComponentRelevance],
    erpComponentErpProducts: Seq[ErpComponentErpProductRelevance],
    erpCustomers: Seq[ErpCustomerRelevance],
    erpEmployees: Seq[ErpEmployeeRelevance],
    erpInvoices: Seq[ErpInvoiceRelevance],
    erpOrders: Seq[ErpOrderRelevance],
    erpOrderItems: Seq[ErpOrderItemRelevance],
    erpProducts: Seq[ErpProductRelevance],
    erpSuppliers: Seq[ErpSupplierRelevance]
)

case class ErpComponentRelevance(id: Int, relevance: Relevance)
case class ErpComponentErpProductRelevance(id: Int, relevance: Relevance)
case class ErpCustomerRelevance(id: Int, relevance: Relevance)
case class ErpEmployeeRelevance(id: Int, relevance: Relevance)
case class ErpInvoiceRelevance(id: Int, relevance: Relevance)
case class ErpOrderRelevance(id: Int, relevance: Relevance)
case class ErpOrderItemRelevance(id: Int, relevance: Relevance)
case class ErpProductRelevance(id: Int, relevance: Relevance)
case class ErpSupplierRelevance(id: Int, relevance: Relevance)
