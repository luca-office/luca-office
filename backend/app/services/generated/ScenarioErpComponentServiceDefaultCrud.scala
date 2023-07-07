package services.generated

import database.DatabaseContext
import database.generated.public.ScenarioErpComponent
import models.{ScenarioErpComponentCreation, ScenarioErpComponentUpdate}
import services.converters.ScenarioErpComponentConverter.toScenarioErpComponent

import java.util.UUID
import scala.concurrent.ExecutionContext

trait DefaultAllScenarioErpComponent {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def allScenarioErpComponentsAction(scenarioId: UUID) =
    runIO(allScenarioErpComponentsQuotation(scenarioId))

  def allScenarioErpComponentsQuotation(scenarioId: UUID) =
    quote(query[ScenarioErpComponent].filter(_.scenarioId == lift(scenarioId)))
}

trait DefaultFindScenarioErpComponent {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def findScenarioErpComponentAction(scenarioId: UUID, componentId: Int) =
    runIO(findScenarioErpComponentQuotation(scenarioId, componentId)).map(_.headOption)

  def findScenarioErpComponentQuotation(scenarioId: UUID, componentId: Int) =
    quote(
      query[ScenarioErpComponent]
        .filter(row => row.scenarioId == lift(scenarioId) && row.componentId == lift(componentId)))
}

trait DefaultCreateScenarioErpComponent {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def createScenarioErpComponentAction(creation: ScenarioErpComponentCreation) =
    runIO(createScenarioErpComponentQuotation(creation))

  def createScenarioErpComponentQuotation(creation: ScenarioErpComponentCreation) =
    quote(
      query[ScenarioErpComponent]
        .insert(lift(toScenarioErpComponent(creation)))
        .returning(scenarioErpComponent => scenarioErpComponent))
}

trait DefaultUpdateScenarioErpComponent {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def updateScenarioErpComponentAction(scenarioId: UUID, componentId: Int, update: ScenarioErpComponentUpdate) =
    runIO(updateScenarioErpComponentQuotation(scenarioId, componentId, update))

  def updateScenarioErpComponentQuotation(scenarioId: UUID, componentId: Int, update: ScenarioErpComponentUpdate) =
    quote(
      query[ScenarioErpComponent]
        .filter(row => row.scenarioId == lift(scenarioId) && row.componentId == lift(componentId))
        .update(_.relevance -> lift(update.relevance))
        .returning(scenarioErpComponent => scenarioErpComponent))
}

trait DefaultDeleteScenarioErpComponent {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.EnumEncoders._

  def deleteScenarioErpComponentAction(scenarioId: UUID, componentId: Int) =
    runIO(deleteScenarioErpComponentQuotation(scenarioId, componentId))

  def deleteScenarioErpComponentQuotation(scenarioId: UUID, componentId: Int) =
    quote(
      query[ScenarioErpComponent]
        .filter(row => row.scenarioId == lift(scenarioId) && row.componentId == lift(componentId))
        .delete
        .returning(scenarioErpComponent => scenarioErpComponent))
}
