package graphql.backoffice.queries

import database.generated.public.SampleCompany
import graphql.Private
import graphql.backoffice.BackofficeContext
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait SampleCompanyQuery {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def sampleCompanies: Future[Seq[SampleCompany]] =
    runWithUserAccount(sampleCompanyService.all)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def sampleCompany(id: UUID): Future[Option[SampleCompany]] =
    runWithUserAccount(userAccount => sampleCompanyService.find(id, userAccount))
}
