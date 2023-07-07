package graphql.backoffice.queries

import graphql.Private
import graphql.backoffice.BackofficeContext
import models.ScenarioDocuments
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ScenarioDocumentsQuery {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def scenarioDocuments(scenarioId: UUID): Future[ScenarioDocuments] =
    runWithUserAccount(userAccount => scenarioDocumentsService.all(scenarioId, userAccount.id))
}
