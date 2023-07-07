package services.generated

import database.DatabaseContext
import database.generated.public.CodingModel
import models.{CodingModelCreation, CodingModelUpdate}
import services.converters.CodingModelConverter.toCodingModel
import utils.DateUtils

import java.util.UUID
import scala.concurrent.ExecutionContext

trait DefaultAllCodingModel {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def allCodingModelsAction: IO[Seq[CodingModel], Effect.Read] =
    runIO(allCodingModelsQuotation)

  def allCodingModelsQuotation =
    quote(query[CodingModel])
}

trait DefaultFindCodingModel {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def findCodingModelAction(id: UUID): IO[Option[CodingModel], Effect.Read] =
    runIO(findCodingModelQuotation(id)).map(_.headOption)

  def findCodingModelQuotation(id: UUID) =
    quote(query[CodingModel].filter(_.id == lift(id)))
}

trait DefaultCreateCodingModel {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def createCodingModelAction(creation: CodingModelCreation): IO[CodingModel, Effect.Write] =
    runIO(createCodingModelQuotation(creation))

  def createCodingModelQuotation(creation: CodingModelCreation) =
    quote(
      query[CodingModel]
        .insert(lift(toCodingModel(creation)))
        .returning(codingModel => codingModel))
}

trait DefaultUpdateCodingModel {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def updateCodingModelAction(id: UUID, update: CodingModelUpdate): IO[CodingModel, Effect.Write] =
    runIO(updateCodingModelQuotation(id, update))

  def updateCodingModelQuotation(id: UUID, update: CodingModelUpdate) =
    quote(
      query[CodingModel]
        .filter(_.id == lift(id))
        .update(
          _.modifiedAt -> lift(DateUtils.now),
          _.title -> lift(update.title),
          _.description -> lift(update.description)
        )
        .returning(codingModel => codingModel))
}

trait DefaultDeleteCodingModel {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._

  def deleteCodingModelAction(id: UUID): IO[UUID, Effect.Write] =
    runIO(deleteCodingModelQuotation(id))

  def deleteCodingModelQuotation(id: UUID) =
    quote(
      query[CodingModel]
        .filter(_.id == lift(id))
        .delete
        .returning(_.id))
}
