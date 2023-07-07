package services.actions

import database.DatabaseContext
import database.generated.public.CodingItem
import models.CodingItemCreationBase
import services.converters.CodingItemConverter.toCodingItem

import scala.concurrent.ExecutionContext

trait CreateBulkCodingItem {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def createBulkCodingItemAction(
      creationPairs: Seq[(CodingItemCreationBase, BigDecimal)]): IO[Seq[CodingItem], Effect.Write] =
    runIO(createBulkCodingItemQuotation(creationPairs))

  def createBulkCodingItemQuotation(creationPairs: Seq[(CodingItemCreationBase, BigDecimal)]) =
    quote(
      liftQuery(creationPairs.map { case (creation, position) => toCodingItem(creation, position) })
        .foreach(codingItem =>
          query[CodingItem]
            .insert(codingItem)
            .returning(codingItem => codingItem)))
}
