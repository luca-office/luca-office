package services.actions

import database.DatabaseContext
import database.generated.public.Directory
import models.DirectoryCreation
import services.converters.DirectoryConverter.toDirectory

import java.util.UUID
import scala.concurrent.ExecutionContext

trait CreateBulkDirectory {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def createBulkDirectoryAction(creations: Seq[(DirectoryCreation, UUID)]) =
    runIO(createBulkDirectoryQuotation(creations))

  def createBulkDirectoryQuotation(creations: Seq[(DirectoryCreation, UUID)]) =
    quote(
      liftQuery(creations.map { case (creation, id) => toDirectory(creation).copy(id = id) })
        .foreach(directory =>
          query[Directory]
            .insert(directory)
            .returning(directory => directory)))
}
