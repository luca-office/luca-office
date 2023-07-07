package graphql.backoffice.queries

import database.generated.public.ErpComponent
import graphql.Private
import graphql.backoffice.BackofficeContext
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ErpComponentQuery {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def erpComponents(sampleCompanyId: UUID): Future[Seq[ErpComponent]] =
    erpComponentService.all(sampleCompanyId)
}
