package services.actions

import database.DatabaseContext
import database.generated.public.Intervention
import models.InterventionCreation
import services.converters.InterventionConverter.toIntervention

import scala.concurrent.ExecutionContext

trait CreateBulkIntervention {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def createBulkInterventionAction(creations: Seq[InterventionCreation]): IO[Seq[Intervention], Effect.Write] =
    runIO(liftQuery(creations.map(toIntervention)).foreach(intervention =>
      query[Intervention].insert(intervention).returning(intervention => intervention)))
}
