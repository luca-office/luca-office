package services.generated

import database.DatabaseContext
import database.generated.public.Scenario
import models.ScenarioUpdate
import utils.DateUtils

import java.util.UUID
import scala.concurrent.ExecutionContext

trait DefaultUpdateScenario {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def updateScenarioAction(id: UUID, update: ScenarioUpdate) =
    runIO(updateScenarioQuotation(id, update))

  def updateScenarioQuotation(id: UUID, update: ScenarioUpdate) =
    quote(
      query[Scenario]
        .filter(_.id == lift(id))
        .update(
          _.modifiedAt -> lift(DateUtils.now),
          _.date -> lift(update.date),
          _.name -> lift(update.name),
          _.description -> lift(update.description),
          _.maxDurationInSeconds -> lift(update.maxDurationInSeconds),
          _.introductionEmailId -> lift(update.introductionEmailId),
          _.shouldDisplayTime -> lift(update.shouldDisplayTime),
          _.tags -> lift(update.tags),
          _.completionEmailAddress -> lift(update.completionEmailAddress),
          _.shouldHideReferenceBookChapters -> lift(update.shouldHideReferenceBookChapters),
          _.sampleCompanyId -> lift(update.sampleCompanyId)
        )
        .returning(scenario => scenario))
}

trait DefaultDeleteScenario {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._

  def deleteScenarioAction(id: UUID) =
    runIO(deleteScenarioQuotation(id))

  def deleteScenarioQuotation(id: UUID) =
    quote(
      query[Scenario]
        .filter(_.id == lift(id))
        .delete
        .returning(_.id))
}
