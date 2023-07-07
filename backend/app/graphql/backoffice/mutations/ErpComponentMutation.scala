package graphql.backoffice.mutations

import database.generated.public.ErpComponent
import graphql.Private
import graphql.backoffice.BackofficeContext
import models.{ErpComponentCreation, ErpComponentUpdate}
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ErpComponentMutation {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def createErpComponent(creation: ErpComponentCreation): Future[ErpComponent] =
    erpComponentService.create(creation)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def updateErpComponent(id: Int, sampleCompanyId: UUID, update: ErpComponentUpdate): Future[ErpComponent] =
    erpComponentService.update(id, sampleCompanyId, update)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def deleteErpComponent(id: Int, sampleCompanyId: UUID): Future[Int] =
    erpComponentService.delete(id, sampleCompanyId)
}
