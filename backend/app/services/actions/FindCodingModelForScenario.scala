package services.actions

import database.DatabaseContext
import database.generated.public.CodingModel

import java.util.UUID
import scala.concurrent.ExecutionContext

trait FindCodingModelForScenario {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def findCodingModelForScenarioAction(scenarioId: UUID): IO[Option[CodingModel], Effect.Read] =
    runIO(findCodingModelForScenarioQuotation(scenarioId)).map(_.headOption)

  def findCodingModelForScenarioQuotation(scenarioId: UUID) =
    quote(query[CodingModel].filter(_.scenarioId == lift(scenarioId)))
}
