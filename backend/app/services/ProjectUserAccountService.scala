package services

import database.DatabaseContext
import database.generated.public.{Project, ProjectUserAccount, UserAccount}
import services.generated._

import java.util.UUID
import javax.inject.Inject
import scala.concurrent.{ExecutionContext, Future}

class ProjectUserAccountService @Inject() (databaseContext: DatabaseContext)(implicit
    val executionContext: ExecutionContext)
    extends DefaultProjectsForUserAccount
    with DefaultUserAccountsForProject
    with DefaultCreateProjectUserAccount
    with DefaultDeleteProjectUserAccount {
  val context = databaseContext

  import context._

  def userAccountsForProject(projectId: UUID): Future[Seq[UserAccount]] =
    performIO(userAccountsForProjectAction(projectId))

  def projectsForUserAccount(userAccountId: UUID): Future[Seq[Project]] =
    performIO(projectsForUserAccountAction(userAccountId))

  def create(projectId: UUID, userAccountId: UUID): Future[ProjectUserAccount] =
    performIO(createProjectUserAccountAction(projectId, userAccountId))

  def delete(projectId: UUID, userAccountId: UUID): Future[ProjectUserAccount] =
    performIO(deleteProjectUserAccountAction(projectId, userAccountId))
}
