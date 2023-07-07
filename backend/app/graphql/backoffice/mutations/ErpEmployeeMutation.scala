package graphql.backoffice.mutations

import database.generated.public.ErpEmployee
import graphql.Private
import graphql.backoffice.BackofficeContext
import models.{ErpEmployeeCreation, ErpEmployeeUpdate}
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ErpEmployeeMutation {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def createErpEmployee(creation: ErpEmployeeCreation): Future[ErpEmployee] =
    erpEmployeeService.create(creation)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def updateErpEmployee(id: Int, sampleCompanyId: UUID, update: ErpEmployeeUpdate): Future[ErpEmployee] =
    erpEmployeeService.update(id, sampleCompanyId, update)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def deleteErpEmployee(id: Int, sampleCompanyId: UUID): Future[Int] =
    erpEmployeeService.delete(id, sampleCompanyId)
}
