package graphql.backoffice.queries

import database.generated.public.File
import graphql.Private
import graphql.backoffice.BackofficeContext
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait FileQuery {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def filesForScenario(scenarioId: UUID): Future[Seq[File]] =
    fileService.allFilesForScenario(scenarioId)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def filesForSampleCompany(sampleCompanyId: UUID): Future[Seq[File]] =
    fileService.allFilesForSampleCompany(sampleCompanyId)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def file(id: UUID): Future[Option[File]] =
    fileService.find(id)
}
