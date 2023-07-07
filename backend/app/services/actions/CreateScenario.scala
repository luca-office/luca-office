package services.actions

import database.DatabaseContext
import database.generated.public.Scenario
import models.ScenarioCreation
import services.Utils.defaultErrorHandler
import services.converters.ScenarioConverter.toScenario

import java.util.UUID
import scala.concurrent.ExecutionContext

trait CreateScenario {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def createScenarioAction(userAccountId: UUID)(creation: ScenarioCreation) =
    runIO(createScenarioQuotation(userAccountId)(creation))
      .recover(defaultErrorHandler)

  def createScenarioQuotation(userAccountId: UUID)(creation: ScenarioCreation) =
    quote(
      query[Scenario]
        .insert(lift(toScenario(creation, userAccountId)))
        .returning(scenario => scenario))
}
