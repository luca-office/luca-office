package graphql.backoffice.queries

import graphql.Private
import graphql.backoffice.BackofficeContext
import models.InterventionBase
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait InterventionQuery {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def interventions(scenarioId: UUID): Future[Seq[InterventionBase]] =
    interventionService.all(scenarioId)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def intervention(id: UUID): Future[Option[InterventionBase]] =
    interventionService.find(id)
}
