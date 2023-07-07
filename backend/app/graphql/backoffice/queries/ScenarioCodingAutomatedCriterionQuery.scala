package graphql.backoffice.queries

import graphql.Private
import graphql.backoffice.BackofficeContext
import models.ScenarioCodingAutomatedCriterionBase
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ScenarioCodingAutomatedCriterionQuery {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def scenarioCodingAutomatedCriteria(itemId: UUID): Future[Seq[ScenarioCodingAutomatedCriterionBase]] =
    scenarioCodingAutomatedCriterionService.all(itemId)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def scenarioCodingAutomatedCriterion(id: UUID): Future[Option[ScenarioCodingAutomatedCriterionBase]] =
    scenarioCodingAutomatedCriterionService.find(id)
}
