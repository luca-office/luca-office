package graphql.backoffice.mutations

import database.generated.public.CodingModel
import graphql.Private
import graphql.backoffice.BackofficeContext
import models.{CodingModelCreation, CodingModelUpdate}
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait CodingModelMutation {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def createCodingModel(creation: CodingModelCreation): Future[CodingModel] =
    codingModelService.create(creation)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def updateCodingModel(id: UUID, update: CodingModelUpdate): Future[CodingModel] =
    codingModelService.update(id, update)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def deleteCodingModel(id: UUID): Future[UUID] =
    codingModelService.delete(id)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def duplicateCodingModel(id: UUID, targetScenarioId: UUID): Future[CodingModel] =
    codingModelService.duplicate(id, targetScenarioId)
}
