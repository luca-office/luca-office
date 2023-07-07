package services.actions

import database.DatabaseContext
import database.generated.public.ScenarioCodingAutomatedCriterion
import models.ScenarioCodingAutomatedCriterionCreation
import services.converters.ScenarioCodingAutomatedCriterionConverter.toScenarioCodingAutomatedCriterion

import scala.concurrent.ExecutionContext

trait CreateBulkScenarioCodingAutomatedCriterion {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def createBulkScenarioCodingAutomatedCriterionAction(creations: Seq[ScenarioCodingAutomatedCriterionCreation])
      : IO[Seq[ScenarioCodingAutomatedCriterion], Effect.Write] =
    runIO(
      liftQuery(creations.map(toScenarioCodingAutomatedCriterion))
        .foreach(scenarioCodingAutomatedCriterion =>
          query[ScenarioCodingAutomatedCriterion]
            .insert(scenarioCodingAutomatedCriterion)
            .returning(scenarioCodingAutomatedCriterion => scenarioCodingAutomatedCriterion)))
}
