package services.generated

import database.DatabaseContext
import database.generated.public.Project
import models.ProjectUpdate
import utils.DateUtils

import java.util.UUID
import scala.concurrent.ExecutionContext

trait DefaultUpdateProject {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def updateProjectAction(id: UUID, update: ProjectUpdate) =
    runIO(updateProjectQuotation(id, update))

  def updateProjectQuotation(id: UUID, update: ProjectUpdate) =
    quote(
      query[Project]
        .filter(_.id == lift(id))
        .update(
          _.modifiedAt -> lift(DateUtils.now),
          _.name -> lift(update.name),
          _.description -> lift(update.description),
          _.usageField -> lift(update.usageField),
          _.audience -> lift(update.audience),
          _.welcomeText -> lift(update.welcomeText)
        )
        .returning(project => project))
}

trait DefaultDeleteProject {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._

  def deleteProjectAction(id: UUID) =
    runIO(deleteProjectQuotation(id))

  def deleteProjectQuotation(id: UUID) =
    quote(
      query[Project]
        .filter(_.id == lift(id))
        .delete
        .returning(_.id))
}
