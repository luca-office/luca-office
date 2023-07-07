package graphql.player.queries

import database.generated.public.File
import graphql.Private
import graphql.player.PlayerContext
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait FileQuery {
  context: PlayerContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def filesForScenario(scenarioId: UUID): Future[Seq[File]] =
    fileService.allFilesForScenario(scenarioId)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def filesForSampleCompany(sampleCompanyId: UUID): Future[Seq[File]] =
    fileService.allFilesForSampleCompany(sampleCompanyId)
}
