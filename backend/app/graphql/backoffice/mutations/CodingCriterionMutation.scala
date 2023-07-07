package graphql.backoffice.mutations

import database.generated.public.CodingCriterion
import graphql.Private
import graphql.backoffice.BackofficeContext
import models.{CodingCriterionCreation, CodingCriterionUpdate}
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait CodingCriterionMutation {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def createCodingCriterion(creation: CodingCriterionCreation): Future[CodingCriterion] =
    codingCriterionService.createCodingCriterion(creation)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def updateCodingCriterion(id: UUID, update: CodingCriterionUpdate): Future[CodingCriterion] =
    codingCriterionService.update(id, update)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def deleteCodingCriterion(id: UUID): Future[UUID] =
    codingCriterionService.delete(id)
}
