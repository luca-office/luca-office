package graphql.player.queries

import database.generated.public.Directory
import graphql.Private
import graphql.player.PlayerContext
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait DirectoryQuery {
  context: PlayerContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def directoriesForScenario(scenarioId: UUID): Future[Seq[Directory]] =
    directoryService.allDirectoriesForScenario(scenarioId)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def directoriesForSampleCompany(sampleCompanyId: UUID): Future[Seq[Directory]] =
    directoryService.allDirectoriesForSampleCompany(sampleCompanyId)
}
