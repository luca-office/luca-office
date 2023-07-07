package graphql.backoffice.mutations

import database.generated.public.FreetextQuestionCodingCriterion
import graphql.Private
import graphql.backoffice.BackofficeContext
import models.{FreetextQuestionCodingCriterionCreation, FreetextQuestionCodingCriterionUpdate}
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait FreetextQuestionCodingCriterionMutation {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def createFreetextQuestionCodingCriterion(
      creation: FreetextQuestionCodingCriterionCreation): Future[FreetextQuestionCodingCriterion] =
    freetextQuestionCodingCriterionService.create(creation)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def updateFreetextQuestionCodingCriterion(
      id: UUID,
      update: FreetextQuestionCodingCriterionUpdate): Future[FreetextQuestionCodingCriterion] =
    freetextQuestionCodingCriterionService.update(id, update)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def deleteFreetextQuestionCodingCriterion(id: UUID): Future[UUID] =
    freetextQuestionCodingCriterionService.delete(id)
}
