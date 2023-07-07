package graphql.backoffice.mutations

import database.generated.public.ErpCustomer
import graphql.Private
import graphql.backoffice.BackofficeContext
import models.{ErpCustomerCreation, ErpCustomerUpdate}
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ErpCustomerMutation {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def createErpCustomer(creation: ErpCustomerCreation): Future[ErpCustomer] =
    erpCustomerService.create(creation)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def updateErpCustomer(id: Int, sampleCompanyId: UUID, update: ErpCustomerUpdate): Future[ErpCustomer] =
    erpCustomerService.update(id, sampleCompanyId, update)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def deleteErpCustomer(id: Int, sampleCompanyId: UUID): Future[Int] =
    erpCustomerService.delete(id, sampleCompanyId)
}
