package graphql.backoffice.queries

import database.generated.public.ErpProduct
import graphql.Private
import graphql.backoffice.BackofficeContext
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ErpProductQuery {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def erpProducts(sampleCompanyId: UUID): Future[Seq[ErpProduct]] =
    erpProductService.all(sampleCompanyId)
}
