package services

import database.DatabaseContext
import database.generated.public.ErpEmployee
import models.{ErpEmployeeCreation, ErpEmployeeUpdate}
import services.Utils.defaultErrorHandler
import services.generated._

import java.util.UUID
import javax.inject.Inject
import scala.concurrent.{ExecutionContext, Future}

class ErpEmployeeService @Inject() (databaseContext: DatabaseContext)(implicit val executionContext: ExecutionContext)
    extends DefaultAllErpEmployee
    with DefaultCreateErpEmployee
    with DefaultUpdateErpEmployee
    with DefaultDeleteErpEmployee {
  val context = databaseContext

  import context._

  def all(sampleCompanyId: UUID): Future[Seq[ErpEmployee]] =
    performIO(allErpEmployeesAction(sampleCompanyId))

  def create(creation: ErpEmployeeCreation): Future[ErpEmployee] =
    performIO(createErpEmployeeAction(creation))
      .recover(defaultErrorHandler)

  def update(id: Int, sampleCompanyId: UUID, update: ErpEmployeeUpdate): Future[ErpEmployee] =
    performIO(updateErpEmployeeAction(id, sampleCompanyId, update))
      .recover(defaultErrorHandler)

  def delete(id: Int, sampleCompanyId: UUID): Future[Int] =
    performIO(deleteErpEmployeeAction(id, sampleCompanyId))
}
