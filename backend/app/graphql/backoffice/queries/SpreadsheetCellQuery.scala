package graphql.backoffice.queries

import database.generated.public.SpreadsheetCell
import graphql.Private
import graphql.backoffice.BackofficeContext
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait SpreadsheetCellQuery {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def spreadsheetCells(spreadsheetId: UUID): Future[Seq[SpreadsheetCell]] =
    spreadsheetCellService.all(spreadsheetId)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def spreadsheetCell(id: UUID): Future[Option[SpreadsheetCell]] =
    spreadsheetCellService.find(id)
}
