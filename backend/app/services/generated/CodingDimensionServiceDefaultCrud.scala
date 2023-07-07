package services.generated

import database.DatabaseContext
import database.generated.public.CodingDimension
import models.CodingDimensionUpdate
import utils.DateUtils

import java.util.UUID
import scala.concurrent.ExecutionContext

trait DefaultAllCodingDimension {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def allCodingDimensionsAction(modelId: UUID): IO[Seq[CodingDimension], Effect.Read] =
    runIO(allCodingDimensionsQuotation(modelId))

  def allCodingDimensionsQuotation(modelId: UUID) =
    quote(query[CodingDimension].filter(_.codingModelId == lift(modelId)))
}

trait DefaultFindCodingDimension {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def findCodingDimensionAction(id: UUID): IO[Option[CodingDimension], Effect.Read] =
    runIO(findCodingDimensionQuotation(id)).map(_.headOption)

  def findCodingDimensionQuotation(id: UUID) =
    quote(query[CodingDimension].filter(_.id == lift(id)))
}

trait DefaultUpdateCodingDimension {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def updateCodingDimensionQuotation(id: UUID, update: CodingDimensionUpdate) =
    quote(
      query[CodingDimension]
        .filter(_.id == lift(id))
        .update(
          _.modifiedAt -> lift(DateUtils.now),
          _.title -> lift(update.title),
          _.description -> lift(update.description),
          _.parentDimensionId -> lift(update.parentDimensionId)
        )
        .returning(codingDimension => codingDimension))
}

trait DefaultDeleteCodingDimension {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._

  def deleteCodingDimensionQuotation(id: UUID) =
    quote(
      query[CodingDimension]
        .filter(_.id == lift(id))
        .delete
        .returning(_.id))
}
