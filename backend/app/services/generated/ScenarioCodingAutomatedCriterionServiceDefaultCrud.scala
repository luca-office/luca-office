package services.generated

import database.DatabaseContext
import database.generated.public.ScenarioCodingAutomatedCriterion
import enums.ErpTableType._
import models._
import services.EntityNotFound
import services.converters.ScenarioCodingAutomatedCriterionConverter.toScenarioCodingAutomatedCriterion
import utils.DateUtils

import java.util.UUID
import scala.concurrent.ExecutionContext

trait DefaultAllScenarioCodingAutomatedCriterion {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def allScenarioCodingAutomatedCriteriaAction(itemId: UUID): IO[Seq[ScenarioCodingAutomatedCriterion], Effect.Read] =
    runIO(allScenarioCodingAutomatedCriteriaQuotation(itemId))

  def allScenarioCodingAutomatedCriteriaQuotation(itemId: UUID) =
    quote(query[ScenarioCodingAutomatedCriterion].filter(_.itemId == lift(itemId)))
}

trait DefaultFindScenarioCodingAutomatedCriterion {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def findScenarioCodingAutomatedCriterionAction(id: UUID): IO[Option[ScenarioCodingAutomatedCriterion], Effect.Read] =
    runIO(findScenarioCodingAutomatedCriterionQuotation(id)).map(_.headOption)

  def findScenarioCodingAutomatedCriterionQuotation(id: UUID) =
    quote(query[ScenarioCodingAutomatedCriterion].filter(_.id == lift(id)))
}

trait DefaultCreateScenarioCodingAutomatedCriterion {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def createScenarioCodingAutomatedCriterionAction(
      creation: ScenarioCodingAutomatedCriterionCreationBase): IO[ScenarioCodingAutomatedCriterion, Effect.Write] =
    runIO(createScenarioCodingAutomatedCriterionQuotation(creation))

  def createScenarioCodingAutomatedCriterionQuotation(creation: ScenarioCodingAutomatedCriterionCreationBase) =
    quote(
      query[ScenarioCodingAutomatedCriterion]
        .insert(lift(toScenarioCodingAutomatedCriterion(creation)))
        .returning(scenarioCodingAutomatedCriterion => scenarioCodingAutomatedCriterion))
}

trait DefaultUpdateScenarioCodingAutomatedCriterion extends DefaultFindScenarioCodingAutomatedCriterion {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def updateScenarioCodingAutomatedCriterionAction(id: UUID, update: ScenarioCodingAutomatedCriterionUpdateBase)
      : IO[ScenarioCodingAutomatedCriterion, Effect.Read with Effect.Write] =
    findScenarioCodingAutomatedCriterionAction(id).flatMap {
      case Some(criterion) =>
        runIO(
          query[ScenarioCodingAutomatedCriterion]
            .filter(_.id == lift(id))
            .update(lift(updateCriterion(criterion, update)))
            .returning(scenarioCodingAutomatedCriterion => scenarioCodingAutomatedCriterion))
      case _ =>
        IO.failed(EntityNotFound)
    }

  private def updateCriterion(
      criterion: ScenarioCodingAutomatedCriterion,
      update: ScenarioCodingAutomatedCriterionUpdateBase) = {
    val updatedBaseCriterion = ScenarioCodingAutomatedCriterion(
      id = criterion.id,
      createdAt = criterion.createdAt,
      modifiedAt = DateUtils.now,
      itemId = criterion.itemId,
      rule = criterion.rule,
      score = update.score,
      officeTool = None,
      value = None,
      spreadsheetRowIndex = None,
      spreadsheetColumnIndex = None,
      fileId = None,
      emailId = None,
      referenceBookArticleId = None,
      sampleCompanyId = None,
      erpComponentId = None,
      erpComponentErpProductId = None,
      erpCustomerId = None,
      erpEmployeeId = None,
      erpInvoiceId = None,
      erpOrderId = None,
      erpOrderItemId = None,
      erpProductId = None,
      erpSupplierId = None,
      featureType = None,
      rScriptId = None
    )

    update match {
      case criterionUpdate: DocumentViewScenarioCodingAutomatedCriterionUpdate =>
        updatedBaseCriterion.copy(
          fileId = criterionUpdate.fileId,
          emailId = criterionUpdate.emailId,
          referenceBookArticleId = criterionUpdate.referenceBookArticleId,
          sampleCompanyId = criterionUpdate.sampleCompanyId,
          erpComponentId = criterionUpdate.erpRowId
            .filter(_ => criterionUpdate.erpTableType.contains(Component)),
          erpComponentErpProductId = criterionUpdate.erpRowId
            .filter(_ => criterionUpdate.erpTableType.contains(ComponentProduct)),
          erpCustomerId = criterionUpdate.erpRowId
            .filter(_ => criterionUpdate.erpTableType.contains(Customer)),
          erpEmployeeId = criterionUpdate.erpRowId
            .filter(_ => criterionUpdate.erpTableType.contains(Employee)),
          erpInvoiceId = criterionUpdate.erpRowId
            .filter(_ => criterionUpdate.erpTableType.contains(Invoice)),
          erpOrderId = criterionUpdate.erpRowId
            .filter(_ => criterionUpdate.erpTableType.contains(Order)),
          erpOrderItemId = criterionUpdate.erpRowId
            .filter(_ => criterionUpdate.erpTableType.contains(OrderItem)),
          erpProductId = criterionUpdate.erpRowId
            .filter(_ => criterionUpdate.erpTableType.contains(Product)),
          erpSupplierId = criterionUpdate.erpRowId
            .filter(_ => criterionUpdate.erpTableType.contains(Supplier))
        )
      case criterionUpdate: FeatureUsageScenarioCodingAutomatedCriterionUpdate =>
        updatedBaseCriterion.copy(
          officeTool = Some(criterionUpdate.officeTool),
          featureType = Some(criterionUpdate.featureType)
        )
      case criterionUpdate: InputValueScenarioCodingAutomatedCriterionUpdate =>
        updatedBaseCriterion.copy(
          officeTool = Some(criterionUpdate.officeTool),
          value = Some(criterionUpdate.value),
          fileId = criterionUpdate.fileId,
          spreadsheetRowIndex = criterionUpdate.spreadsheetRowIndex,
          spreadsheetColumnIndex = criterionUpdate.spreadsheetColumnIndex
        )
      case criterionUpdate: RScriptScenarioCodingAutomatedCriterionUpdate =>
        updatedBaseCriterion.copy(
          rScriptId = Some(criterionUpdate.rScriptId)
        )
      case criterionUpdate: ToolUsageScenarioCodingAutomatedCriterionUpdate =>
        updatedBaseCriterion.copy(
          officeTool = Some(criterionUpdate.officeTool)
        )
    }
  }
}

trait DefaultDeleteScenarioCodingAutomatedCriterion {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._

  def deleteScenarioCodingAutomatedCriterionAction(id: UUID): IO[UUID, Effect.Write] =
    runIO(deleteScenarioCodingAutomatedCriterionQuotation(id))

  def deleteScenarioCodingAutomatedCriterionQuotation(id: UUID) =
    quote(
      query[ScenarioCodingAutomatedCriterion]
        .filter(_.id == lift(id))
        .delete
        .returning(_.id))
}
