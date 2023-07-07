package graphql.backoffice.queries

import database.generated.public.ErpSupplier
import graphql.Private
import graphql.backoffice.BackofficeContext
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ErpSupplierQuery {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def erpSuppliers(sampleCompanyId: UUID): Future[Seq[ErpSupplier]] =
    erpSupplierService.all(sampleCompanyId)
}
