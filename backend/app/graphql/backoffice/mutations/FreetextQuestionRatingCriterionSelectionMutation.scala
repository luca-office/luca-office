package graphql.backoffice.mutations

import database.generated.public.FreetextQuestionRatingCriterionSelection
import graphql.Private
import graphql.backoffice.BackofficeContext
import models.FreetextQuestionRatingCriterionSelectionCreation
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait FreetextQuestionRatingCriterionSelectionMutation {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def createFreetextQuestionRatingCriterionSelection(
      creation: FreetextQuestionRatingCriterionSelectionCreation): Future[FreetextQuestionRatingCriterionSelection] =
    freetextQuestionRatingCriterionSelectionService.create(creation)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def deleteFreetextQuestionRatingCriterionSelection(
      freetextQuestionRatingId: UUID,
      criterionId: UUID): Future[FreetextQuestionRatingCriterionSelection] =
    freetextQuestionRatingCriterionSelectionService.delete(freetextQuestionRatingId, criterionId)
}
