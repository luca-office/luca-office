package graphql.backoffice.mutations

import database.generated.public.SpreadsheetCell
import graphql.Private
import graphql.backoffice.BackofficeContext
import models.SpreadsheetCellCreation
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait SpreadsheetCellMutation {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def createSpreadsheetCell(creation: SpreadsheetCellCreation): Future[SpreadsheetCell] =
    spreadsheetCellService.create(creation)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def deleteSpreadsheetCell(id: UUID): Future[UUID] =
    spreadsheetCellService.delete(id)
}
