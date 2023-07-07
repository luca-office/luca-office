package graphql.backoffice.queries

import database.generated.public.FreetextQuestionRatingCriterionSelection
import graphql.Private
import graphql.backoffice.BackofficeContext
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait FreetextQuestionRatingCriterionSelectionQuery {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def freetextQuestionRatingCriterionSelections(
      freetextQuestionRatingId: UUID): Future[Seq[FreetextQuestionRatingCriterionSelection]] =
    freetextQuestionRatingCriterionSelectionService.all(freetextQuestionRatingId)
}
