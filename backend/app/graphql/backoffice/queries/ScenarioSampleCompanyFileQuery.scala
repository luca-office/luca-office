package graphql.backoffice.queries

import database.generated.public.ScenarioSampleCompanyFile
import graphql.Private
import graphql.backoffice.BackofficeContext
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ScenarioSampleCompanyFileQuery {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def scenarioSampleCompanyFiles(scenarioId: UUID): Future[Seq[ScenarioSampleCompanyFile]] =
    scenarioSampleCompanyFileService.all(scenarioId)
}
