package graphql.backoffice.mutations

import database.generated.public.ScenarioErpEmployee
import graphql.Private
import graphql.backoffice.BackofficeContext
import models.{ScenarioErpEmployeeCreation, ScenarioErpEmployeeUpdate}
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ScenarioErpEmployeeMutation {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def createScenarioErpEmployee(creation: ScenarioErpEmployeeCreation): Future[ScenarioErpEmployee] =
    scenarioErpEmployeeService.create(creation)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def updateScenarioErpEmployee(
      scenarioId: UUID,
      employeeId: Int,
      update: ScenarioErpEmployeeUpdate): Future[ScenarioErpEmployee] =
    scenarioErpEmployeeService.update(scenarioId, employeeId, update)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def deleteScenarioErpEmployee(scenarioId: UUID, employeeId: Int): Future[ScenarioErpEmployee] =
    scenarioErpEmployeeService.delete(scenarioId, employeeId)
}
