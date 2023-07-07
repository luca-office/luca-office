package services

import database.DatabaseContext
import database.generated.public.{Scenario, ScenarioUserAccount, UserAccount}
import services.generated._

import java.util.UUID
import javax.inject.Inject
import scala.concurrent.{ExecutionContext, Future}

class ScenarioUserAccountService @Inject() (databaseContext: DatabaseContext)(implicit
    val executionContext: ExecutionContext)
    extends DefaultScenariosForUserAccount
    with DefaultUserAccountsForScenario
    with DefaultCreateScenarioUserAccount
    with DefaultDeleteScenarioUserAccount {
  val context = databaseContext

  import context._

  def userAccountsForScenario(ScenarioId: UUID): Future[Seq[UserAccount]] =
    performIO(userAccountsForScenarioAction(ScenarioId))

  def scenariosForUserAccount(userAccountId: UUID): Future[Seq[Scenario]] =
    performIO(scenariosForUserAccountAction(userAccountId))

  def create(ScenarioId: UUID, userAccountId: UUID): Future[ScenarioUserAccount] =
    performIO(createScenarioUserAccountAction(ScenarioId, userAccountId))

  def delete(ScenarioId: UUID, userAccountId: UUID): Future[ScenarioUserAccount] =
    performIO(deleteScenarioUserAccountAction(ScenarioId, userAccountId))
}
