package services.generated

import database.DatabaseContext
import database.generated.public.RScript
import models.{RScriptCreation, RScriptUpdate}
import services.converters.RScriptConverter.toRScript
import utils.DateUtils

import java.util.UUID
import scala.concurrent.ExecutionContext

trait DefaultAllRScript {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._

  def allRScriptsAction: IO[Seq[RScript], Effect.Read] =
    runIO(allRScriptsQuotation)

  def allRScriptsQuotation =
    quote(query[RScript])
}

trait DefaultFindRScript {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._

  def findRScriptAction(id: UUID): IO[Option[RScript], Effect.Read] =
    runIO(findRScriptQuotation(id)).map(_.headOption)

  def findRScriptQuotation(id: UUID) =
    quote(query[RScript].filter(_.id == lift(id)))
}

trait DefaultCreateRScript {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._

  def createRScriptAction(creation: RScriptCreation): IO[RScript, Effect.Write] =
    runIO(createRScriptQuotation(creation))

  def createRScriptQuotation(creation: RScriptCreation) =
    quote(
      query[RScript]
        .insert(lift(toRScript(creation)))
        .returning(rScript => rScript))
}

trait DefaultUpdateRScript {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._

  def updateRScriptAction(id: UUID, update: RScriptUpdate): IO[RScript, Effect.Write] =
    runIO(updateRScriptQuotation(id, update))

  def updateRScriptQuotation(id: UUID, update: RScriptUpdate) =
    quote(
      query[RScript]
        .filter(_.id == lift(id))
        .update(
          _.modifiedAt -> lift(DateUtils.now),
          _.title -> lift(update.title),
          _.description -> lift(update.description),
          _.version -> lift(update.version),
          _.gitCommitHash -> lift(update.gitCommitHash)
        )
        .returning(rScript => rScript))
}

trait DefaultDeleteRScript {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._

  def deleteRScriptAction(id: UUID): IO[UUID, Effect.Write] =
    runIO(deleteRScriptQuotation(id))

  def deleteRScriptQuotation(id: UUID) =
    quote(
      query[RScript]
        .filter(_.id == lift(id))
        .delete
        .returning(_.id))
}
