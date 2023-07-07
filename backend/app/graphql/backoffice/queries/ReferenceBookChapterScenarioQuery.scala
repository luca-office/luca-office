package graphql.backoffice.queries

import database.generated.public.{ReferenceBookChapter, Scenario}
import graphql.Private
import graphql.backoffice.BackofficeContext
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ReferenceBookChapterScenarioQuery {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def scenariosForReferenceBookChapter(referenceBookChapterId: UUID): Future[Seq[Scenario]] =
    referenceBookChapterScenarioService.scenariosForReferenceBookChapter(referenceBookChapterId)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def referenceBookChaptersForScenario(scenarioId: UUID): Future[Seq[ReferenceBookChapter]] =
    referenceBookChapterScenarioService.referenceBookChaptersForScenario(scenarioId)
}
