package graphql.backoffice.queries

import database.generated.public.Directory
import graphql.Private
import graphql.backoffice.BackofficeContext
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait DirectoryQuery {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def directoriesForScenario(scenarioId: UUID): Future[Seq[Directory]] =
    directoryService.allDirectoriesForScenario(scenarioId)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def directoriesForSampleCompany(sampleCompanyId: UUID): Future[Seq[Directory]] =
    directoryService.allDirectoriesForSampleCompany(sampleCompanyId)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def directory(id: UUID): Future[Option[Directory]] =
    directoryService.find(id)
}
