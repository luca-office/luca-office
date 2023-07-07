package graphql.backoffice.queries

import database.generated.public.{ErpComponent, ErpComponentErpProduct, ErpProduct}
import graphql.Private
import graphql.backoffice.BackofficeContext
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ErpComponentErpProductQuery {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def erpComponentErpProducts(sampleCompanyId: UUID): Future[Seq[ErpComponentErpProduct]] =
    erpComponentErpProductService.all(sampleCompanyId)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def erpProductsForErpComponent(componentId: Int, sampleCompanyId: UUID): Future[Seq[ErpProduct]] =
    erpComponentErpProductService.erpProductsForErpComponent(componentId, sampleCompanyId)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def erpComponentsForErpProduct(productId: Int, sampleCompanyId: UUID): Future[Seq[ErpComponent]] =
    erpComponentErpProductService.erpComponentsForErpProduct(productId, sampleCompanyId)
}
