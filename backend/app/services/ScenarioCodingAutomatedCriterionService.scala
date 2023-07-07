package services

import database.DatabaseContext
import models.{
  ScenarioCodingAutomatedCriterionBase,
  ScenarioCodingAutomatedCriterionCreationBase,
  ScenarioCodingAutomatedCriterionUpdateBase
}
import services.Utils.defaultErrorHandler
import services.converters.ScenarioCodingAutomatedCriterionConverter.toScenarioCodingAutomatedCriterionBase
import services.generated._

import java.util.UUID
import javax.inject.Inject
import scala.concurrent.{ExecutionContext, Future}

class ScenarioCodingAutomatedCriterionService @Inject() (databaseContext: DatabaseContext)(implicit
    val executionContext: ExecutionContext)
    extends DefaultAllScenarioCodingAutomatedCriterion
    with DefaultFindScenarioCodingAutomatedCriterion
    with DefaultCreateScenarioCodingAutomatedCriterion
    with DefaultUpdateScenarioCodingAutomatedCriterion
    with DefaultDeleteScenarioCodingAutomatedCriterion {
  val context = databaseContext

  import context._

  def all(itemId: UUID): Future[Seq[ScenarioCodingAutomatedCriterionBase]] =
    performIO(allScenarioCodingAutomatedCriteriaAction(itemId).map(_.map(toScenarioCodingAutomatedCriterionBase)))

  def find(id: UUID): Future[Option[ScenarioCodingAutomatedCriterionBase]] =
    performIO(findScenarioCodingAutomatedCriterionAction(id).map(_.map(toScenarioCodingAutomatedCriterionBase)))

  def create(creation: ScenarioCodingAutomatedCriterionCreationBase): Future[ScenarioCodingAutomatedCriterionBase] =
    performIO(createScenarioCodingAutomatedCriterionAction(creation).map(toScenarioCodingAutomatedCriterionBase))
      .recover(defaultErrorHandler)

  def update(
      id: UUID,
      update: ScenarioCodingAutomatedCriterionUpdateBase): Future[ScenarioCodingAutomatedCriterionBase] =
    performIO(updateScenarioCodingAutomatedCriterionAction(id, update).map(toScenarioCodingAutomatedCriterionBase))
      .recover(defaultErrorHandler)

  def delete(id: UUID): Future[UUID] =
    performIO(deleteScenarioCodingAutomatedCriterionAction(id))
}
