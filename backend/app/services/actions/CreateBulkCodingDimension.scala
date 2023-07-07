package services.actions

import database.DatabaseContext
import database.generated.public.CodingDimension
import models.CodingDimensionCreation
import services.converters.CodingDimensionConverter.toCodingDimension

import java.util.UUID
import scala.concurrent.ExecutionContext

trait CreateBulkCodingDimension {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def createBulkCodingDimensionAction(
      creationTuples: Seq[(CodingDimensionCreation, UUID, BigDecimal)]): IO[Seq[CodingDimension], Effect.Write] =
    runIO(
      liftQuery(creationTuples.map { case (creation, id, position) =>
        toCodingDimension(creation, position).copy(id = id)
      })
        .foreach(codingDimension =>
          query[CodingDimension].insert(codingDimension).returning(codingDimension => codingDimension)))
}
