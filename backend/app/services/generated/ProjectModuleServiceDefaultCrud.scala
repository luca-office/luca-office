package services.generated

import database.DatabaseContext
import database.generated.public.ProjectModule

import java.util.UUID
import scala.concurrent.ExecutionContext

trait DefaultAllProjectModule {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def allProjectModulesAction(projectId: UUID): IO[Seq[ProjectModule], Effect.Read] =
    runIO(allProjectModulesQuotation(projectId))

  def allProjectModulesQuotation(projectId: UUID) =
    quote(query[ProjectModule].filter(_.projectId == lift(projectId)))
}

trait DefaultFindProjectModule {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def findProjectModuleAction(id: UUID): IO[Option[ProjectModule], Effect.Read] =
    runIO(findProjectModuleQuotation(id)).map(_.headOption)

  def findProjectModuleQuotation(id: UUID) =
    quote(query[ProjectModule].filter(_.id == lift(id)))
}

trait DefaultDeleteProjectModule {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.EnumEncoders._

  def deleteProjectModuleAction(id: UUID): IO[ProjectModule, Effect.Write] =
    runIO(deleteProjectModuleQuotation(id))

  def deleteProjectModuleQuotation(id: UUID) =
    quote(
      query[ProjectModule]
        .filter(_.id == lift(id))
        .delete
        .returning(projectModule => projectModule))
}
