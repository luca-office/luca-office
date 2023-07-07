package graphql.backoffice.queries

import database.generated.public.ErpCustomer
import graphql.Private
import graphql.backoffice.BackofficeContext
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ErpCustomerQuery {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def erpCustomers(sampleCompanyId: UUID): Future[Seq[ErpCustomer]] =
    erpCustomerService.all(sampleCompanyId)
}
