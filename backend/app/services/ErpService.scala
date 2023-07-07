package services

import database.DatabaseContext
import database.generated.public._
import services.actions._
import services.generated._

import java.util.UUID
import javax.inject.Inject
import scala.concurrent.{ExecutionContext, Future}

class ErpService @Inject() (databaseContext: DatabaseContext)(implicit val executionContext: ExecutionContext)
    extends ErpServiceActions
    with CreateBulkErpComponent
    with CreateBulkErpComponentErpProduct
    with CreateBulkErpCustomer
    with CreateBulkErpEmployee
    with CreateBulkErpInvoice
    with CreateBulkErpOrderItem
    with CreateBulkErpOrder
    with CreateBulkErpProduct
    with CreateBulkErpSupplier {
  val context = databaseContext

  import context._

  def all(sampleCompanyId: UUID): Future[ErpData] =
    performIO(allErpAction(sampleCompanyId))

  def create(erpData: ErpData): Future[Unit] = {
    val action = for {
      _ <- createBulkErpCustomerAction(erpData.customers)
      _ <- createBulkErpEmployeeAction(erpData.employees)
      _ <- createBulkErpProductAction(erpData.products)
      _ <- createBulkErpSupplierAction(erpData.suppliers)
      _ <- createBulkErpComponentAction(erpData.components)
      _ <- createBulkErpComponentErpProductAction(erpData.componentProducts)
      _ <- createBulkErpOrderAction(erpData.orders)
      _ <- createBulkErpOrderItemAction(erpData.orderItems)
      _ <- createBulkErpInvoiceAction(erpData.invoices)
    } yield ()

    performIO(action.transactional)
  }

  def delete(sampleCompanyId: UUID): Future[Unit] = {
    val action = for {
      _ <- runIO(query[ErpInvoice].filter(_.sampleCompanyId == lift(sampleCompanyId)).delete)
      _ <- runIO(query[ErpOrderItem].filter(_.sampleCompanyId == lift(sampleCompanyId)).delete)
      _ <- runIO(query[ErpOrder].filter(_.sampleCompanyId == lift(sampleCompanyId)).delete)
      _ <- runIO(query[ErpComponentErpProduct].filter(_.sampleCompanyId == lift(sampleCompanyId)).delete)
      _ <- runIO(query[ErpComponent].filter(_.sampleCompanyId == lift(sampleCompanyId)).delete)
      _ <- runIO(query[ErpSupplier].filter(_.sampleCompanyId == lift(sampleCompanyId)).delete)
      _ <- runIO(query[ErpProduct].filter(_.sampleCompanyId == lift(sampleCompanyId)).delete)
      _ <- runIO(query[ErpEmployee].filter(_.sampleCompanyId == lift(sampleCompanyId)).delete)
      _ <- runIO(query[ErpCustomer].filter(_.sampleCompanyId == lift(sampleCompanyId)).delete)
    } yield ()

    performIO(action.transactional)
  }

  def rowsCount(sampleCompanyId: UUID): Future[Int] =
    run(
      query[ErpInvoice].filter(_.sampleCompanyId == lift(sampleCompanyId)).size +
        query[ErpOrderItem].filter(_.sampleCompanyId == lift(sampleCompanyId)).size +
        query[ErpOrder].filter(_.sampleCompanyId == lift(sampleCompanyId)).size +
        query[ErpComponentErpProduct].filter(_.sampleCompanyId == lift(sampleCompanyId)).size +
        query[ErpComponent].filter(_.sampleCompanyId == lift(sampleCompanyId)).size +
        query[ErpSupplier].filter(_.sampleCompanyId == lift(sampleCompanyId)).size +
        query[ErpProduct].filter(_.sampleCompanyId == lift(sampleCompanyId)).size +
        query[ErpEmployee].filter(_.sampleCompanyId == lift(sampleCompanyId)).size +
        query[ErpCustomer].filter(_.sampleCompanyId == lift(sampleCompanyId)).size)
      .map(_.toInt)
}

trait ErpServiceActions
    extends DefaultAllErpComponent
    with DefaultAllErpComponentErpProduct
    with DefaultAllErpCustomer
    with DefaultAllErpEmployee
    with DefaultAllErpInvoice
    with DefaultAllErpOrderItem
    with DefaultAllErpOrder
    with DefaultAllErpProduct
    with DefaultAllErpSupplier {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._

  def allErpAction(sampleCompanyId: UUID): IO[ErpData, Effect.Read] = for {
    components <- allErpComponentsAction(sampleCompanyId)
    componentProducts <- allErpComponentErpProductsAction(sampleCompanyId)
    customers <- allErpCustomersAction(sampleCompanyId)
    employees <- allErpEmployeesAction(sampleCompanyId)
    invoices <- allErpInvoicesAction(sampleCompanyId)
    orderItems <- allErpOrderItemsAction(sampleCompanyId)
    orders <- allErpOrdersAction(sampleCompanyId)
    products <- allErpProductsAction(sampleCompanyId)
    suppliers <- allErpSuppliersAction(sampleCompanyId)
  } yield ErpData(
    components,
    componentProducts,
    customers,
    employees,
    invoices,
    orderItems,
    orders,
    products,
    suppliers)
}

case class ErpData(
    components: Seq[ErpComponent],
    componentProducts: Seq[ErpComponentErpProduct],
    customers: Seq[ErpCustomer],
    employees: Seq[ErpEmployee],
    invoices: Seq[ErpInvoice],
    orderItems: Seq[ErpOrderItem],
    orders: Seq[ErpOrder],
    products: Seq[ErpProduct],
    suppliers: Seq[ErpSupplier])
