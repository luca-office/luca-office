package services.generated

import database.DatabaseContext
import database.generated.public.ReferenceBookChapter
import models.ReferenceBookChapterUpdate
import utils.DateUtils

import java.util.UUID
import scala.concurrent.ExecutionContext

trait DefaultUpdateReferenceBookChapter {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def updateReferenceBookChapterAction(id: UUID, update: ReferenceBookChapterUpdate) =
    runIO(updateReferenceBookChapterQuotation(id, update))

  def updateReferenceBookChapterQuotation(id: UUID, update: ReferenceBookChapterUpdate) =
    quote(
      query[ReferenceBookChapter]
        .filter(_.id == lift(id))
        .update(
          _.modifiedAt -> lift(DateUtils.now),
          _.title -> lift(update.title),
          _.description -> lift(update.description)
        )
        .returning(referenceBookChapter => referenceBookChapter))
}
