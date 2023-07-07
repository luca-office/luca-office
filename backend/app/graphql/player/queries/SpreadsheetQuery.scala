package graphql.player.queries

import database.generated.public.Spreadsheet
import graphql.Private
import graphql.player.PlayerContext
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait SpreadsheetQuery {
  context: PlayerContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def spreadsheet(id: UUID): Future[Option[Spreadsheet]] =
    spreadsheetService.find(id)
}
