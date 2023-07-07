package graphql.backoffice.queries

import database.generated.public.Spreadsheet
import graphql.Private
import graphql.backoffice.BackofficeContext
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait SpreadsheetQuery {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def spreadsheet(id: UUID): Future[Option[Spreadsheet]] =
    spreadsheetService.find(id)
}
