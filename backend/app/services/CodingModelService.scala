package services

import com.github.jasync.sql.db.postgresql.exceptions.GenericDatabaseException
import database.DatabaseContext
import database.generated.public.CodingModel
import models.{CodingModelCreation, CodingModelUpdate}
import services.Utils.{defaultErrorHandler, isForeignKeyConstraintViolation}
import services.actions.{DuplicateCodingModel, FindCodingModelForScenario}
import services.generated._

import java.util.UUID
import javax.inject.Inject
import scala.concurrent.{ExecutionContext, Future}

class CodingModelService @Inject() (databaseContext: DatabaseContext)(implicit val executionContext: ExecutionContext)
    extends DefaultAllCodingModel
    with DefaultFindCodingModel
    with DefaultCreateCodingModel
    with DefaultUpdateCodingModel
    with DefaultDeleteCodingModel
    with FindCodingModelForScenario
    with DuplicateCodingModel
    with DefaultAllCodingDimension {
  val context = databaseContext

  import context._

  def all: Future[Seq[CodingModel]] =
    performIO(allCodingModelsAction)

  def find(id: UUID): Future[Option[CodingModel]] =
    performIO(findCodingModelAction(id))

  def findForScenario(scenarioId: UUID): Future[Option[CodingModel]] =
    performIO(findCodingModelForScenarioAction(scenarioId))

  def create(creation: CodingModelCreation): Future[CodingModel] =
    performIO(createCodingModelAction(creation))
      .recover(defaultErrorHandler)

  def update(id: UUID, update: CodingModelUpdate): Future[CodingModel] =
    performIO(updateCodingModelAction(id, update))
      .recover(defaultErrorHandler)

  def delete(id: UUID): Future[UUID] =
    performIO(deleteCodingModelAction(id))
      .recover { case throwable =>
        throwable.getCause match {
          case exception: GenericDatabaseException if isForeignKeyConstraintViolation(exception) =>
            throw EntityIsInUse
          case _ =>
            defaultErrorHandler(throwable)
        }
      }

  def duplicate(id: UUID, targetScenarioId: UUID): Future[CodingModel] =
    performIO(
      duplicateCodingModelAction(
        id = id,
        targetScenarioId = targetScenarioId,
        emailIdMapping = None,
        fileIdMapping = None,
        shouldDuplicateScenarioReferencingCriteria = false))

  def dimensionsCount(id: UUID): Future[Long] =
    run(allCodingDimensionsQuotation(id).size)
}
