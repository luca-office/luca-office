package services.actions

import database.DatabaseContext
import database.generated.public.{SampleCompany, UserAccount}
import models.SampleCompanyUpdate
import services.{EntityNotFound, SampleCompanyServiceActions}
import services.converters.SampleCompanyConverter.toSampleCompanyCreation
import services.generated._

import java.util.UUID
import scala.concurrent.ExecutionContext

trait DuplicateSampleCompany
    extends SampleCompanyServiceActions
    with DefaultUpdateSampleCompany
    with CreateSampleCompany
    with DuplicateDirectoriesAndFiles
    with DefaultAllErpComponentErpProduct
    with DefaultAllErpComponent
    with DefaultAllErpCustomer
    with DefaultAllErpEmployee
    with DefaultAllErpInvoice
    with DefaultAllErpOrderItem
    with DefaultAllErpOrder
    with DefaultAllErpProduct
    with DefaultAllErpSupplier
    with CreateBulkErpComponentErpProduct
    with CreateBulkErpComponent
    with CreateBulkErpCustomer
    with CreateBulkErpEmployee
    with CreateBulkErpInvoice
    with CreateBulkErpOrderItem
    with CreateBulkErpOrder
    with CreateBulkErpProduct
    with CreateBulkErpSupplier {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._

  def duplicateSampleCompanyAction(userAccount: UserAccount)(
      id: UUID): IO[SampleCompany, Effect.Read with Effect.Write with Effect.Transaction] =
    findSampleCompanyAction(id, userAccount).flatMap {
      case Some(sampleCompany) =>
        for {
          duplicatedSampleCompany <- createSampleCompanyAction(userAccount.id)(toSampleCompanyCreation(sampleCompany))
          duplicatedSampleCompanyLogoFileId = UUID.randomUUID()
          duplicatedSampleCompanyProfileFileId = UUID.randomUUID()
          customFileIdMapping = Map[UUID, UUID]() ++
            sampleCompany.logoFileId.map(_ -> duplicatedSampleCompanyLogoFileId) ++
            sampleCompany.profileFileId.map(_ -> duplicatedSampleCompanyProfileFileId)
          _ <- duplicateDirectoriesAndFilesForSampleCompanyAction(
            id,
            duplicatedSampleCompany.id,
            customFileIdMapping.get)
          _ <- duplicateErpAction(id, duplicatedSampleCompany.id)
          _ <- updateSampleCompanyAction(
            duplicatedSampleCompany.id,
            SampleCompanyUpdate(
              name = duplicatedSampleCompany.name,
              description = duplicatedSampleCompany.description,
              tags = duplicatedSampleCompany.tags,
              emailSignature = duplicatedSampleCompany.emailSignature,
              logoFileId = sampleCompany.logoFileId.map(_ => duplicatedSampleCompanyLogoFileId),
              profileFileId = sampleCompany.profileFileId.map(_ => duplicatedSampleCompanyProfileFileId),
              domain = duplicatedSampleCompany.domain
            )
          )
        } yield duplicatedSampleCompany
      case None =>
        IO.failed(EntityNotFound)
    }.transactional

  private def duplicateErpAction(sampleCompanyId: UUID, duplicatedSampleCompanyId: UUID) =
    for {
      _ <- duplicateErpCustomersAction(sampleCompanyId, duplicatedSampleCompanyId)
      _ <- duplicateErpEmployeesAction(sampleCompanyId, duplicatedSampleCompanyId)
      _ <- duplicateErpProductsAction(sampleCompanyId, duplicatedSampleCompanyId)
      _ <- duplicateErpSuppliersAction(sampleCompanyId, duplicatedSampleCompanyId)
      _ <- duplicateErpComponentsAction(sampleCompanyId, duplicatedSampleCompanyId)
      _ <- duplicateErpComponentErpProductsAction(sampleCompanyId, duplicatedSampleCompanyId)
      _ <- duplicateErpOrdersAction(sampleCompanyId, duplicatedSampleCompanyId)
      _ <- duplicateErpOrderItemsAction(sampleCompanyId, duplicatedSampleCompanyId)
      _ <- duplicateErpInvoicesAction(sampleCompanyId, duplicatedSampleCompanyId)
    } yield ()

  private def duplicateErpComponentErpProductsAction(sampleCompanyId: UUID, duplicatedSampleCompanyId: UUID) =
    allErpComponentErpProductsAction(sampleCompanyId).flatMap(erpComponentErpProducts =>
      createBulkErpComponentErpProductAction(erpComponentErpProducts.map(erpComponentErpProduct =>
        erpComponentErpProduct.copy(sampleCompanyId = duplicatedSampleCompanyId))))

  private def duplicateErpComponentsAction(sampleCompanyId: UUID, duplicatedSampleCompanyId: UUID) =
    allErpComponentsAction(sampleCompanyId).flatMap(erpComponents =>
      createBulkErpComponentAction(
        erpComponents.map(erpComponent => erpComponent.copy(sampleCompanyId = duplicatedSampleCompanyId))))

  private def duplicateErpCustomersAction(sampleCompanyId: UUID, duplicatedSampleCompanyId: UUID) =
    allErpCustomersAction(sampleCompanyId).flatMap(erpCustomers =>
      createBulkErpCustomerAction(
        erpCustomers.map(erpCustomer => erpCustomer.copy(sampleCompanyId = duplicatedSampleCompanyId))))

  private def duplicateErpEmployeesAction(sampleCompanyId: UUID, duplicatedSampleCompanyId: UUID) =
    allErpEmployeesAction(sampleCompanyId).flatMap(erpEmployees =>
      createBulkErpEmployeeAction(
        erpEmployees.map(erpEmployee => erpEmployee.copy(sampleCompanyId = duplicatedSampleCompanyId))))

  private def duplicateErpInvoicesAction(sampleCompanyId: UUID, duplicatedSampleCompanyId: UUID) =
    allErpInvoicesAction(sampleCompanyId).flatMap(erpInvoices =>
      createBulkErpInvoiceAction(
        erpInvoices.map(erpInvoice => erpInvoice.copy(sampleCompanyId = duplicatedSampleCompanyId))))

  private def duplicateErpOrderItemsAction(sampleCompanyId: UUID, duplicatedSampleCompanyId: UUID) =
    allErpOrderItemsAction(sampleCompanyId).flatMap(erpOrderItems =>
      createBulkErpOrderItemAction(
        erpOrderItems.map(erpOrderItem => erpOrderItem.copy(sampleCompanyId = duplicatedSampleCompanyId))))

  private def duplicateErpOrdersAction(sampleCompanyId: UUID, duplicatedSampleCompanyId: UUID) =
    allErpOrdersAction(sampleCompanyId).flatMap(erpOrders =>
      createBulkErpOrderAction(erpOrders.map(erpOrder => erpOrder.copy(sampleCompanyId = duplicatedSampleCompanyId))))

  private def duplicateErpProductsAction(sampleCompanyId: UUID, duplicatedSampleCompanyId: UUID) =
    allErpProductsAction(sampleCompanyId).flatMap(erpProducts =>
      createBulkErpProductAction(
        erpProducts.map(erpProduct => erpProduct.copy(sampleCompanyId = duplicatedSampleCompanyId))))

  private def duplicateErpSuppliersAction(sampleCompanyId: UUID, duplicatedSampleCompanyId: UUID) =
    allErpSuppliersAction(sampleCompanyId).flatMap(erpSuppliers =>
      createBulkErpSupplierAction(
        erpSuppliers.map(erpSupplier => erpSupplier.copy(sampleCompanyId = duplicatedSampleCompanyId))))
}
