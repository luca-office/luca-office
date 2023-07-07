package services.generated

import database.DatabaseContext
import database.generated.public.{Scenario, ScenarioUserAccount, UserAccount}

import java.util.UUID
import scala.concurrent.ExecutionContext

trait DefaultUserAccountsForScenario {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def userAccountsForScenarioAction(scenarioId: UUID) =
    runIO(userAccountsForScenarioQuotation(scenarioId))

  def userAccountsForScenarioQuotation(scenarioId: UUID) =
    quote(for {
      scenarioUserAccount <- query[ScenarioUserAccount].filter(_.scenarioId == lift(scenarioId))
      userAccount <- query[UserAccount].filter(_.id == scenarioUserAccount.userAccountId)
    } yield userAccount)
}

trait DefaultScenariosForUserAccount {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def scenariosForUserAccountAction(userAccountId: UUID) =
    runIO(scenariosForUserAccountQuotation(userAccountId))

  def scenariosForUserAccountQuotation(userAccountId: UUID) =
    quote(for {
      scenarioUserAccount <- query[ScenarioUserAccount].filter(_.userAccountId == lift(userAccountId))
      scenario <- query[Scenario].filter(_.id == scenarioUserAccount.scenarioId)
    } yield scenario)
}

trait DefaultCreateScenarioUserAccount {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._

  def createScenarioUserAccountAction(scenarioId: UUID, userAccountId: UUID) =
    runIO(createScenarioUserAccountQuotation(scenarioId, userAccountId))

  def createScenarioUserAccountQuotation(scenarioId: UUID, userAccountId: UUID) =
    quote(
      query[ScenarioUserAccount]
        .insert(lift(ScenarioUserAccount(scenarioId = scenarioId, userAccountId = userAccountId)))
        .returning(scenario => scenario))
}

trait DefaultDeleteScenarioUserAccount {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._

  def deleteScenarioUserAccountAction(scenarioId: UUID, userAccountId: UUID) =
    runIO(deleteScenarioUserAccountQuotation(scenarioId, userAccountId))

  def deleteScenarioUserAccountQuotation(scenarioId: UUID, userAccountId: UUID) =
    quote(
      query[ScenarioUserAccount]
        .filter(row =>
          row.scenarioId == lift(scenarioId)
            && row.userAccountId == lift(userAccountId))
        .delete
        .returning(row => ScenarioUserAccount(row.scenarioId, row.userAccountId)))
}
