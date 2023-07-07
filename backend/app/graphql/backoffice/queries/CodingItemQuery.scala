package graphql.backoffice.queries

import graphql.Private
import graphql.backoffice.BackofficeContext
import models.CodingItemBase
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}
import services.AutomatedCodingCriterionEvaluationResult

import java.util.UUID
import scala.concurrent.Future

trait CodingItemQuery {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def codingItems(dimensionId: UUID): Future[Seq[CodingItemBase]] =
    codingItemService.all(dimensionId)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def codingItem(id: UUID): Future[Option[CodingItemBase]] =
    codingItemService.find(id)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def evaluationResultsForAutomatedCodingItem(
      id: UUID,
      surveyInvitationId: UUID,
      scenarioId: UUID): Future[Seq[AutomatedCodingCriterionEvaluationResult]] =
    codingItemService.evaluationResults(id, surveyInvitationId, scenarioId)
}
