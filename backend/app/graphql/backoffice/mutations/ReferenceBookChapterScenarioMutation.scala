package graphql.backoffice.mutations

import database.generated.public.ReferenceBookChapterScenario
import graphql.Private
import graphql.backoffice.BackofficeContext
import models.ReferenceBookChapterScenarioId
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import scala.concurrent.Future

trait ReferenceBookChapterScenarioMutation {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def createReferenceBookChapterScenario(
      creation: ReferenceBookChapterScenarioId): Future[ReferenceBookChapterScenario] =
    referenceBookChapterScenarioService.create(creation)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def deleteReferenceBookChapterScenario(id: ReferenceBookChapterScenarioId): Future[ReferenceBookChapterScenario] =
    referenceBookChapterScenarioService.delete(id)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def repositionReferenceBookChapterScenario(
      id: ReferenceBookChapterScenarioId,
      predecessorId: Option[ReferenceBookChapterScenarioId]): Future[ReferenceBookChapterScenario] =
    referenceBookChapterScenarioService.reposition(id, predecessorId)
}
