package services.generated

import database.DatabaseContext
import database.generated.public.{Project, ProjectUserAccount, UserAccount}

import java.util.UUID
import scala.concurrent.ExecutionContext

trait DefaultUserAccountsForProject {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def userAccountsForProjectAction(projectId: UUID) =
    runIO(userAccountsForProjectQuotation(projectId))

  def userAccountsForProjectQuotation(projectId: UUID) =
    quote(for {
      projectUserAccount <- query[ProjectUserAccount].filter(_.projectId == lift(projectId))
      userAccount <- query[UserAccount].filter(_.id == projectUserAccount.userAccountId)
    } yield userAccount)
}

trait DefaultProjectsForUserAccount {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def projectsForUserAccountAction(userAccountId: UUID) =
    runIO(projectsForUserAccountQuotation(userAccountId))

  def projectsForUserAccountQuotation(userAccountId: UUID) =
    quote(for {
      projectUserAccount <- query[ProjectUserAccount].filter(_.userAccountId == lift(userAccountId))
      project <- query[Project].filter(_.id == projectUserAccount.projectId)
    } yield project)
}

trait DefaultCreateProjectUserAccount {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._

  def createProjectUserAccountAction(projectId: UUID, userAccountId: UUID) =
    runIO(createProjectUserAccountQuotation(projectId, userAccountId))

  def createProjectUserAccountQuotation(projectId: UUID, userAccountId: UUID) =
    quote(
      query[ProjectUserAccount]
        .insert(lift(ProjectUserAccount(projectId = projectId, userAccountId = userAccountId)))
        .returning(project => project))
}

trait DefaultDeleteProjectUserAccount {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._

  def deleteProjectUserAccountAction(projectId: UUID, userAccountId: UUID) =
    runIO(deleteProjectUserAccountQuotation(projectId, userAccountId))

  def deleteProjectUserAccountQuotation(projectId: UUID, userAccountId: UUID) =
    quote(
      query[ProjectUserAccount]
        .filter(row =>
          row.projectId == lift(projectId)
            && row.userAccountId == lift(userAccountId))
        .delete
        .returning(row => ProjectUserAccount(row.projectId, row.userAccountId)))
}
