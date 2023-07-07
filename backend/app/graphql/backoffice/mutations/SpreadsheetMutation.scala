package graphql.backoffice.mutations

import database.generated.public.Spreadsheet
import graphql.Private
import graphql.backoffice.BackofficeContext
import models.SpreadsheetCellCreation
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait SpreadsheetMutation {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def updateSpreadsheet(id: UUID, cellCreations: Seq[SpreadsheetCellCreation]): Future[Spreadsheet] =
    spreadsheetService.updateCells(id, cellCreations)
}
