package services

import database.DatabaseContext
import models.{InterventionBase, InterventionBaseCreation, InterventionBaseUpdate}
import services.Utils.defaultErrorHandler
import services.converters.InterventionConverter.toInterventionBase
import services.generated._

import java.util.UUID
import javax.inject.Inject
import scala.concurrent.{ExecutionContext, Future}

class InterventionService @Inject() (databaseContext: DatabaseContext)(implicit val executionContext: ExecutionContext)
    extends DefaultAllIntervention
    with DefaultFindIntervention
    with DefaultCreateIntervention
    with DefaultUpdateIntervention
    with DefaultDeleteIntervention {
  val context = databaseContext

  import context._

  def all(scenarioId: UUID): Future[Seq[InterventionBase]] =
    performIO(allInterventionsAction(scenarioId).map(_.map(toInterventionBase)))

  def find(id: UUID): Future[Option[InterventionBase]] =
    performIO(findInterventionAction(id).map(_.map(toInterventionBase)))

  def create(creation: InterventionBaseCreation): Future[InterventionBase] =
    performIO(createInterventionAction(creation).map(toInterventionBase))
      .recover(defaultErrorHandler)

  def update(id: UUID, update: InterventionBaseUpdate): Future[InterventionBase] =
    performIO(updateInterventionAction(id, update).map(toInterventionBase))
      .recover(defaultErrorHandler)

  def delete(id: UUID): Future[UUID] =
    performIO(deleteInterventionAction(id))
}
