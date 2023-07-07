package services.generated

import database.DatabaseContext
import database.generated.public.CodingCriterion
import models.{CodingCriterionCreation, CodingCriterionUpdate}
import services.Utils.defaultErrorHandler
import services.converters.CodingCriterionConverter.toCodingCriterion
import utils.DateUtils

import java.util.UUID
import scala.concurrent.{ExecutionContext, Future}

trait DefaultAllCodingCriterion {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def allCodingCriteria(itemId: UUID): Future[Seq[CodingCriterion]] =
    performIO(allCodingCriteriaAction(itemId))

  def allCodingCriteriaAction(itemId: UUID) =
    runIO(allCodingCriteriaQuotation(itemId))

  def allCodingCriteriaQuotation(itemId: UUID) =
    quote(query[CodingCriterion].filter(_.itemId == lift(itemId)))
}

trait DefaultFindCodingCriterion {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def find(id: UUID): Future[Option[CodingCriterion]] =
    run(findQuotation(id)).map(_.headOption)

  def findQuotation(id: UUID) =
    quote(query[CodingCriterion].filter(_.id == lift(id)))
}

trait DefaultCreateCodingCriterion {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def createCodingCriterion(creation: CodingCriterionCreation): Future[CodingCriterion] =
    run(createCodingCriterionQuotation(creation))
      .recover(defaultErrorHandler)

  def createCodingCriterionAction(creation: CodingCriterionCreation) =
    runIO(createCodingCriterionQuotation(creation))

  def createCodingCriterionQuotation(creation: CodingCriterionCreation) =
    quote(
      query[CodingCriterion]
        .insert(lift(toCodingCriterion(creation)))
        .returning(codingCriterion => codingCriterion))
}

trait DefaultUpdateCodingCriterion {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def update(id: UUID, update: CodingCriterionUpdate): Future[CodingCriterion] =
    run(updateQuotation(id, update))
      .recover(defaultErrorHandler)

  def updateQuotation(id: UUID, update: CodingCriterionUpdate) =
    quote(
      query[CodingCriterion]
        .filter(_.id == lift(id))
        .update(
          _.modifiedAt -> lift(DateUtils.now),
          _.description -> lift(update.description),
          _.score -> lift(update.score)
        )
        .returning(codingCriterion => codingCriterion))
}

trait DefaultDeleteCodingCriterion {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._

  def delete(id: UUID): Future[UUID] =
    run(deleteQuotation(id))

  def deleteQuotation(id: UUID) =
    quote(
      query[CodingCriterion]
        .filter(_.id == lift(id))
        .delete
        .returning(_.id))
}
