package graphql.backoffice.mutations

import database.generated.public.ScenarioSampleCompanyFile
import graphql.Private
import graphql.backoffice.BackofficeContext
import models.{ScenarioSampleCompanyFileCreation, ScenarioSampleCompanyFileUpdate}
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ScenarioSampleCompanyFileMutation {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def createScenarioSampleCompanyFile(creation: ScenarioSampleCompanyFileCreation): Future[ScenarioSampleCompanyFile] =
    scenarioSampleCompanyFileService.create(creation)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def updateScenarioSampleCompanyFile(
      scenarioId: UUID,
      fileId: UUID,
      update: ScenarioSampleCompanyFileUpdate): Future[ScenarioSampleCompanyFile] =
    scenarioSampleCompanyFileService.update(scenarioId, fileId, update)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def deleteScenarioSampleCompanyFile(scenarioId: UUID, fileId: UUID): Future[ScenarioSampleCompanyFile] =
    scenarioSampleCompanyFileService.delete(scenarioId, fileId)
}
