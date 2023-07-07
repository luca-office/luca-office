package services

import database.DatabaseContext
import database.generated.public.SurveyEvent
import enums.Relevance.{PotentiallyHelpful, Required}
import enums.{ErpTableType, Relevance}
import models._
import services.actions.{AllFile, AllSurveyEvent}
import services.generated._

import java.util.UUID
import javax.inject.Inject
import scala.concurrent.{ExecutionContext, Future}

class ScenarioDocumentsService @Inject() (databaseContext: DatabaseContext)(implicit
    val executionContext: ExecutionContext)
    extends ScenarioDocumentsServiceActions
    with ScenarioServiceActions
    with DefaultAllEmail
    with AllFile
    with DefaultAllScenarioSampleCompanyFile
    with DefaultAllErpComponent
    with DefaultAllErpComponentErpProduct
    with DefaultAllErpCustomer
    with DefaultAllErpEmployee
    with DefaultAllErpInvoice
    with DefaultAllErpOrder
    with DefaultAllErpOrderItem
    with DefaultAllErpProduct
    with DefaultAllErpSupplier
    with DefaultAllScenarioErpComponent
    with DefaultAllScenarioErpComponentErpProduct
    with DefaultAllScenarioErpCustomer
    with DefaultAllScenarioErpEmployee
    with DefaultAllScenarioErpInvoice
    with DefaultAllScenarioErpOrder
    with DefaultAllScenarioErpOrderItem
    with DefaultAllScenarioErpProduct
    with DefaultAllScenarioErpSupplier
    with QuillUtils {
  val context = databaseContext

  import context._

  def all(scenarioId: UUID, userAccountId: UUID): Future[ScenarioDocuments] = {
    val action = for {
      scenario <- findScenarioAction(scenarioId, userAccountId).flatMap(liftIOOrFail(EntityNotFound))

      emails <- allEmailsAction(scenarioId)

      scenarioFiles <- allFilesForScenarioAction(scenarioId)
      sampleCompanyFiles <- scenario.sampleCompanyId.map(allFilesForSampleCompanyAction).getOrElse(IO.successful(Nil))
      scenarioSampleCompanyFiles <- allScenarioSampleCompanyFileAction(scenarioId)

      erpComponents <- scenario.sampleCompanyId.map(allErpComponentsAction).getOrElse(IO.successful(Nil))
      erpComponentErpProducts <- scenario.sampleCompanyId
        .map(allErpComponentErpProductsAction)
        .getOrElse(IO.successful(Nil))
      erpCustomers <- scenario.sampleCompanyId.map(allErpCustomersAction).getOrElse(IO.successful(Nil))
      erpEmployees <- scenario.sampleCompanyId.map(allErpEmployeesAction).getOrElse(IO.successful(Nil))
      erpInvoices <- scenario.sampleCompanyId.map(allErpInvoicesAction).getOrElse(IO.successful(Nil))
      erpOrders <- scenario.sampleCompanyId.map(allErpOrdersAction).getOrElse(IO.successful(Nil))
      erpOrderItems <- scenario.sampleCompanyId.map(allErpOrderItemsAction).getOrElse(IO.successful(Nil))
      erpProducts <- scenario.sampleCompanyId.map(allErpProductsAction).getOrElse(IO.successful(Nil))
      erpSuppliers <- scenario.sampleCompanyId.map(allErpSuppliersAction).getOrElse(IO.successful(Nil))

      scenarioErpComponents <- allScenarioErpComponentsAction(scenarioId)
      scenarioErpComponentErpProducts <- allScenarioErpComponentErpProductsAction(scenarioId)
      scenarioErpCustomers <- allScenarioErpCustomersAction(scenarioId)
      scenarioErpEmployees <- allScenarioErpEmployeesAction(scenarioId)
      scenarioErpInvoices <- allScenarioErpInvoicesAction(scenarioId)
      scenarioErpOrders <- allScenarioErpOrdersAction(scenarioId)
      scenarioErpOrderItems <- allScenarioErpOrderItemsAction(scenarioId)
      scenarioErpProducts <- allScenarioErpProductsAction(scenarioId)
      scenarioErpSuppliers <- allScenarioErpSuppliersAction(scenarioId)
    } yield {
      val sampleCompanyFileRelevanceMap = scenarioSampleCompanyFiles
        .map(scenarioSampleCompanyFile => scenarioSampleCompanyFile.fileId -> scenarioSampleCompanyFile.relevance)
        .toMap
      val sampleCompanyFilesWithScenarioRelevances = sampleCompanyFiles
        .map(file => file.copy(relevance = sampleCompanyFileRelevanceMap.getOrElse(file.id, PotentiallyHelpful)))

      val erpComponentRelevanceMap = scenarioErpComponents.map(entity => entity.componentId -> entity.relevance).toMap
      val erpComponentErpProductRelevanceMap =
        scenarioErpComponentErpProducts.map(entity => entity.componentProductId -> entity.relevance).toMap
      val erpCustomerRelevanceMap = scenarioErpCustomers.map(entity => entity.customerId -> entity.relevance).toMap
      val erpEmployeeRelevanceMap = scenarioErpEmployees.map(entity => entity.employeeId -> entity.relevance).toMap
      val erpInvoiceRelevanceMap = scenarioErpInvoices.map(entity => entity.invoiceId -> entity.relevance).toMap
      val erpOrderRelevanceMap = scenarioErpOrders.map(entity => entity.orderId -> entity.relevance).toMap
      val erpOrderItemRelevanceMap = scenarioErpOrderItems.map(entity => entity.orderItemId -> entity.relevance).toMap
      val erpProductRelevanceMap = scenarioErpProducts.map(entity => entity.productId -> entity.relevance).toMap
      val erpSupplierRelevanceMap = scenarioErpSuppliers.map(entity => entity.supplierId -> entity.relevance).toMap

      val erpComponentRelevances = erpComponents.map(entity =>
        ErpComponentRelevance(entity.id, erpComponentRelevanceMap.getOrElse(entity.id, PotentiallyHelpful)))
      val erpComponentErpProductRelevances = erpComponentErpProducts.map(entity =>
        ErpComponentErpProductRelevance(
          entity.id,
          erpComponentErpProductRelevanceMap.getOrElse(entity.id, PotentiallyHelpful)))
      val erpCustomerRelevances = erpCustomers.map(entity =>
        ErpCustomerRelevance(entity.id, erpCustomerRelevanceMap.getOrElse(entity.id, PotentiallyHelpful)))
      val erpEmployeeRelevances = erpEmployees.map(entity =>
        ErpEmployeeRelevance(entity.id, erpEmployeeRelevanceMap.getOrElse(entity.id, PotentiallyHelpful)))
      val erpInvoiceRelevances = erpInvoices.map(entity =>
        ErpInvoiceRelevance(entity.id, erpInvoiceRelevanceMap.getOrElse(entity.id, PotentiallyHelpful)))
      val erpOrderRelevances = erpOrders.map(entity =>
        ErpOrderRelevance(entity.id, erpOrderRelevanceMap.getOrElse(entity.id, PotentiallyHelpful)))
      val erpOrderItemRelevances = erpOrderItems.map(entity =>
        ErpOrderItemRelevance(entity.id, erpOrderItemRelevanceMap.getOrElse(entity.id, PotentiallyHelpful)))
      val erpProductRelevances = erpProducts.map(entity =>
        ErpProductRelevance(entity.id, erpProductRelevanceMap.getOrElse(entity.id, PotentiallyHelpful)))
      val erpSupplierRelevances = erpSuppliers.map(entity =>
        ErpSupplierRelevance(entity.id, erpSupplierRelevanceMap.getOrElse(entity.id, PotentiallyHelpful)))

      ScenarioDocuments(
        emails = emails,
        files = scenarioFiles ++ sampleCompanyFilesWithScenarioRelevances,
        erpComponents = erpComponentRelevances,
        erpComponentErpProducts = erpComponentErpProductRelevances,
        erpCustomers = erpCustomerRelevances,
        erpEmployees = erpEmployeeRelevances,
        erpInvoices = erpInvoiceRelevances,
        erpOrders = erpOrderRelevances,
        erpOrderItems = erpOrderItemRelevances,
        erpProducts = erpProductRelevances,
        erpSuppliers = erpSupplierRelevances
      )
    }

    performIO(action)
  }

  def openedRequiredDocumentsCount(invitationId: UUID, scenarioId: UUID): Future[Int] =
    performIO(
      openedRequiredDocumentsCountAction(invitationId, scenarioId)
        .map { case (openedRequiredDocumentsCount, _) => openedRequiredDocumentsCount })
}

trait ScenarioDocumentsServiceActions
    extends ScenarioServiceActions
    with DefaultAllEmail
    with AllFile
    with RatingServiceActions
    with DefaultAllScenarioSampleCompanyFile
    with DefaultAllScenarioErpComponent
    with DefaultAllScenarioErpComponentErpProduct
    with DefaultAllScenarioErpCustomer
    with DefaultAllScenarioErpEmployee
    with DefaultAllScenarioErpInvoice
    with DefaultAllScenarioErpOrder
    with DefaultAllScenarioErpOrderItem
    with DefaultAllScenarioErpProduct
    with DefaultAllScenarioErpSupplier
    with AllSurveyEvent {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def openedRequiredDocumentsCountAction(
      invitationId: UUID,
      scenarioId: UUID): IO[(Int, Int), Effect.Read with Effect.Read] =
    for {
      surveyEvents <- allSurveyEventsForParticipantForScenarioAction(invitationId, scenarioId)
      requiredDocumentIds <- requiredDocumentIdsAction(scenarioId)
    } yield {
      val eventDataItems = surveyEvents
        .collect { case SurveyEvent(_, eventType, Some(data), _, _, _) =>
          SurveyEventService.decodeData(data, eventType)
        }
        .collect { case Right(eventData) => eventData }

      val requiredDocumentsCount = Seq(
        requiredDocumentIds.emailIds.size,
        requiredDocumentIds.scenarioFileIds.size,
        requiredDocumentIds.sampleCompanyFileIds.size,
        requiredDocumentIds.erpComponentIds.size,
        requiredDocumentIds.erpComponentErpProductIds.size,
        requiredDocumentIds.erpCustomerIds.size,
        requiredDocumentIds.erpEmployeeIds.size,
        requiredDocumentIds.erpInvoiceIds.size,
        requiredDocumentIds.erpOrderIds.size,
        requiredDocumentIds.erpOrderItemIds.size,
        requiredDocumentIds.erpProductIds.size,
        requiredDocumentIds.erpSupplierIds.size
      ).sum

      (openedRequiredDocumentsCount(requiredDocumentIds, eventDataItems), requiredDocumentsCount)
    }

  def requiredDocumentIdsAction(scenarioId: UUID): IO[RequiredDocumentIds, Effect.Read] =
    for {
      emailIds <- runIO(allEmailsQuotation(scenarioId).filter(_.relevance == lift(Required: Relevance)).map(_.id))
      scenarioFileIds <- runIO(
        allFilesForScenarioQuotation(scenarioId).filter(_.relevance == lift(Required: Relevance)).map(_.id))
      sampleCompanyFileIds <- runIO(
        allScenarioSampleCompanyFileQuotation(scenarioId)
          .filter(_.relevance == lift(Required: Relevance))
          .map(_.fileId))
      erpComponentIds <- runIO(
        allScenarioErpComponentsQuotation(scenarioId)
          .filter(_.relevance == lift(Required: Relevance))
          .map(_.componentId))
      erpComponentErpProductIds <- runIO(
        allScenarioErpComponentErpProductsQuotation(scenarioId)
          .filter(_.relevance == lift(Required: Relevance))
          .map(_.componentProductId))
      erpCustomerIds <- runIO(
        allScenarioErpCustomersQuotation(scenarioId).filter(_.relevance == lift(Required: Relevance)).map(_.customerId))
      erpEmployeeIds <- runIO(
        allScenarioErpEmployeesQuotation(scenarioId).filter(_.relevance == lift(Required: Relevance)).map(_.employeeId))
      erpInvoiceIds <- runIO(
        allScenarioErpInvoicesQuotation(scenarioId).filter(_.relevance == lift(Required: Relevance)).map(_.invoiceId))
      erpOrderIds <- runIO(
        allScenarioErpOrdersQuotation(scenarioId).filter(_.relevance == lift(Required: Relevance)).map(_.orderId))
      erpOrderItemIds <- runIO(
        allScenarioErpOrderItemsQuotation(scenarioId)
          .filter(_.relevance == lift(Required: Relevance))
          .map(_.orderItemId))
      erpProductIds <- runIO(
        allScenarioErpProductsQuotation(scenarioId).filter(_.relevance == lift(Required: Relevance)).map(_.productId))
      erpSupplierIds <- runIO(
        allScenarioErpSuppliersQuotation(scenarioId).filter(_.relevance == lift(Required: Relevance)).map(_.supplierId))
    } yield RequiredDocumentIds(
      emailIds = emailIds,
      scenarioFileIds = scenarioFileIds,
      sampleCompanyFileIds = sampleCompanyFileIds,
      erpComponentIds = erpComponentIds,
      erpComponentErpProductIds = erpComponentErpProductIds,
      erpCustomerIds = erpCustomerIds,
      erpEmployeeIds = erpEmployeeIds,
      erpInvoiceIds = erpInvoiceIds,
      erpOrderIds = erpOrderIds,
      erpOrderItemIds = erpOrderItemIds,
      erpProductIds = erpProductIds,
      erpSupplierIds = erpSupplierIds
    )

  def openedRequiredDocumentsCount(
      requiredDocumentIds: RequiredDocumentIds,
      eventDataItems: Seq[SurveyEventData]): Int = {
    val viewedFileIds = eventDataItems.collect {
      case data: OpenImageBinary if data.fileId.isDefined =>
        data.fileId.get
      case data: OpenVideoBinary if data.fileId.isDefined =>
        data.fileId.get
      case data: OpenPdfBinary if data.fileId.isDefined =>
        data.fileId.get
      case data: OpenSpreadsheet =>
        data.fileId
      case data: OpenTextDocument =>
        data.fileId
    }
    val viewedEmailIds = eventDataItems.collect { case data: ShowEmail => data.id }
    val viewedErpRowDataItems = eventDataItems.collect { case data: ErpOpenRow => data }
    val viewedErpRowDataItemsGrouped = viewedErpRowDataItems.groupMap(_.tableType)(_.rowId)
    val viewedErpComponentIds = viewedErpRowDataItemsGrouped.getOrElse(ErpTableType.Component, Nil)
    val viewedErpComponentErpProductIds = viewedErpRowDataItemsGrouped.getOrElse(ErpTableType.ComponentProduct, Nil)
    val viewedErpCustomerIds = viewedErpRowDataItemsGrouped.getOrElse(ErpTableType.Customer, Nil)
    val viewedErpEmployeeIds = viewedErpRowDataItemsGrouped.getOrElse(ErpTableType.Employee, Nil)
    val viewedErpInvoiceIds = viewedErpRowDataItemsGrouped.getOrElse(ErpTableType.Invoice, Nil)
    val viewedErpOrderIds = viewedErpRowDataItemsGrouped.getOrElse(ErpTableType.Order, Nil)
    val viewedErpOrderItemIds = viewedErpRowDataItemsGrouped.getOrElse(ErpTableType.OrderItem, Nil)
    val viewedErpProductIds = viewedErpRowDataItemsGrouped.getOrElse(ErpTableType.Product, Nil)
    val viewedErpSupplierIds = viewedErpRowDataItemsGrouped.getOrElse(ErpTableType.Supplier, Nil)

    Seq(
      (requiredDocumentIds.scenarioFileIds ++ requiredDocumentIds.sampleCompanyFileIds, viewedFileIds),
      (requiredDocumentIds.emailIds, viewedEmailIds),
      (requiredDocumentIds.erpComponentIds, viewedErpComponentIds),
      (requiredDocumentIds.erpComponentErpProductIds, viewedErpComponentErpProductIds),
      (requiredDocumentIds.erpCustomerIds, viewedErpCustomerIds),
      (requiredDocumentIds.erpEmployeeIds, viewedErpEmployeeIds),
      (requiredDocumentIds.erpInvoiceIds, viewedErpInvoiceIds),
      (requiredDocumentIds.erpOrderIds, viewedErpOrderIds),
      (requiredDocumentIds.erpOrderItemIds, viewedErpOrderItemIds),
      (requiredDocumentIds.erpProductIds, viewedErpProductIds),
      (requiredDocumentIds.erpSupplierIds, viewedErpSupplierIds)
    ).map { case (requiredItemIds, viewedItemIds) => requiredItemIds.intersect(viewedItemIds).length }.sum
  }

  case class RequiredDocumentIds(
      emailIds: Seq[UUID],
      scenarioFileIds: Seq[UUID],
      sampleCompanyFileIds: Seq[UUID],
      erpComponentIds: Seq[Int],
      erpComponentErpProductIds: Seq[Int],
      erpCustomerIds: Seq[Int],
      erpEmployeeIds: Seq[Int],
      erpInvoiceIds: Seq[Int],
      erpOrderIds: Seq[Int],
      erpOrderItemIds: Seq[Int],
      erpProductIds: Seq[Int],
      erpSupplierIds: Seq[Int])
}
