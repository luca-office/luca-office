package services

import database.DatabaseContext
import database.generated.public.ErpCustomer
import models.{ErpCustomerCreation, ErpCustomerUpdate}
import services.Utils.defaultErrorHandler
import services.generated._

import java.util.UUID
import javax.inject.Inject
import scala.concurrent.{ExecutionContext, Future}

class ErpCustomerService @Inject() (databaseContext: DatabaseContext)(implicit val executionContext: ExecutionContext)
    extends DefaultAllErpCustomer
    with DefaultCreateErpCustomer
    with DefaultUpdateErpCustomer
    with DefaultDeleteErpCustomer {
  val context = databaseContext

  import context._

  def all(sampleCompanyId: UUID): Future[Seq[ErpCustomer]] =
    performIO(allErpCustomersAction(sampleCompanyId))

  def create(creation: ErpCustomerCreation): Future[ErpCustomer] =
    performIO(createErpCustomerAction(creation))
      .recover(defaultErrorHandler)

  def update(id: Int, sampleCompanyId: UUID, update: ErpCustomerUpdate): Future[ErpCustomer] =
    performIO(updateErpCustomerAction(id, sampleCompanyId, update))
      .recover(defaultErrorHandler)

  def delete(id: Int, sampleCompanyId: UUID): Future[Int] =
    performIO(deleteErpCustomerAction(id, sampleCompanyId))
}
