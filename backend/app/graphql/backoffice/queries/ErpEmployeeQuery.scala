package graphql.backoffice.queries

import database.generated.public.ErpEmployee
import graphql.Private
import graphql.backoffice.BackofficeContext
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ErpEmployeeQuery {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def erpEmployees(sampleCompanyId: UUID): Future[Seq[ErpEmployee]] =
    erpEmployeeService.all(sampleCompanyId)
}
