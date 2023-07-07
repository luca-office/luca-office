package services.actions

import database.DatabaseContext
import database.generated.public.File
import models.FileCreation
import services.converters.FileConverter.toFile

import java.util.UUID
import scala.concurrent.ExecutionContext

trait CreateBulkFile {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def createBulkFileAction(creations: Seq[(FileCreation, UUID)]) =
    runIO(createBulkFileQuotation(creations))

  def createBulkFileQuotation(creations: Seq[(FileCreation, UUID)]) =
    quote(
      liftQuery(creations.map { case (creation, id) => toFile(creation).copy(id = id) })
        .foreach(file =>
          query[File]
            .insert(file)
            .returning(file => file)))
}
