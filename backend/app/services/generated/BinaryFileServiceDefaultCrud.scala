package services.generated

import database.DatabaseContext
import database.generated.public.BinaryFile
import models.BinaryFileCreation
import services.Utils.defaultErrorHandler
import services.converters.BinaryFileConverter.toBinaryFile

import java.util.UUID
import scala.concurrent.{ExecutionContext, Future}

trait DefaultAllBinaryFile {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def all: Future[Seq[BinaryFile]] =
    run(allQuotation)

  def allQuotation =
    quote(query[BinaryFile])
}

trait DefaultFindBinaryFile {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def find(id: UUID): Future[Option[BinaryFile]] =
    run(findQuotation(id)).map(_.headOption)

  def findQuotation(id: UUID) =
    quote(query[BinaryFile].filter(_.id == lift(id)))
}

trait DefaultCreateBinaryFile {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def create(creation: BinaryFileCreation): Future[BinaryFile] =
    run(createQuotation(creation))
      .recover(defaultErrorHandler)

  def createQuotation(creation: BinaryFileCreation) =
    quote(
      query[BinaryFile]
        .insert(lift(toBinaryFile(creation)))
        .returning(binaryFile => binaryFile))
}
