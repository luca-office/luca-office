package services

import database.DatabaseContext
import database.generated.public.ErpComponent
import models.{ErpComponentCreation, ErpComponentUpdate}
import services.Utils.defaultErrorHandler
import services.generated._

import java.util.UUID
import javax.inject.Inject
import scala.concurrent.{ExecutionContext, Future}

class ErpComponentService @Inject() (databaseContext: DatabaseContext)(implicit val executionContext: ExecutionContext)
    extends DefaultAllErpComponent
    with DefaultCreateErpComponent
    with DefaultUpdateErpComponent
    with DefaultDeleteErpComponent {
  val context = databaseContext

  import context._

  def all(sampleCompanyId: UUID): Future[Seq[ErpComponent]] =
    performIO(allErpComponentsAction(sampleCompanyId))

  def create(creation: ErpComponentCreation): Future[ErpComponent] =
    performIO(createErpComponentAction(creation))
      .recover(defaultErrorHandler)

  def update(id: Int, sampleCompanyId: UUID, update: ErpComponentUpdate): Future[ErpComponent] =
    performIO(updateErpComponentAction(id, sampleCompanyId, update))
      .recover(defaultErrorHandler)

  def delete(id: Int, sampleCompanyId: UUID): Future[Int] =
    performIO(deleteErpComponentAction(id, sampleCompanyId))
}
