package services.generated

import database.DatabaseContext
import database.generated.public.CodingItem
import models.{AutomatedCodingItemUpdate, CodingItemUpdateBase, ManualCodingItemUpdate}
import utils.DateUtils

import java.util.UUID
import scala.concurrent.ExecutionContext

trait DefaultAllCodingItem {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def allCodingItemsAction(dimensionId: UUID): IO[Seq[CodingItem], Effect.Read] =
    runIO(allCodingItemsQuotation(dimensionId))

  def allCodingItemsQuotation(dimensionId: UUID) =
    quote(query[CodingItem].filter(_.dimensionId == lift(dimensionId)))
}

trait DefaultFindCodingItem {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def findCodingItemAction(id: UUID): IO[Option[CodingItem], Effect.Read] =
    runIO(findCodingItemQuotation(id)).map(_.headOption)

  def findCodingItemQuotation(id: UUID) =
    quote(query[CodingItem].filter(_.id == lift(id)))
}

trait DefaultUpdateCodingItem {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def updateCodingItemAction(id: UUID, update: CodingItemUpdateBase): IO[CodingItem, Effect.Write] =
    update match {
      case automatedCodingItemUpdate: AutomatedCodingItemUpdate =>
        runIO(updateAutomatedCodingItemQuotation(id, automatedCodingItemUpdate))
      case manualCodingItemUpdate: ManualCodingItemUpdate =>
        runIO(updateManualCodingItemQuotation(id, manualCodingItemUpdate))
    }

  def updateAutomatedCodingItemQuotation(id: UUID, update: AutomatedCodingItemUpdate) =
    quote(
      query[CodingItem]
        .filter(_.id == lift(id))
        .update(
          _.modifiedAt -> lift(DateUtils.now),
          _.title -> lift(update.title),
          _.description -> lift(update.description)
        )
        .returning(codingItem => codingItem))

  def updateManualCodingItemQuotation(id: UUID, update: ManualCodingItemUpdate) =
    quote(
      query[CodingItem]
        .filter(_.id == lift(id))
        .update(
          _.modifiedAt -> lift(DateUtils.now),
          _.title -> lift(update.title),
          _.description -> lift(update.description),
          _.scoringType -> lift(update.scoringType)
        )
        .returning(codingItem => codingItem))
}

trait DefaultDeleteCodingItem {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._

  def deleteCodingItemAction(id: UUID): IO[UUID, Effect.Write] =
    runIO(deleteCodingItemQuotation(id))

  def deleteCodingItemQuotation(id: UUID) =
    quote(
      query[CodingItem]
        .filter(_.id == lift(id))
        .delete
        .returning(_.id))
}
