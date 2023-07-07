package services.actions

import database.DatabaseContext
import database.generated.public.Email
import models.EmailCreation
import services.converters.EmailConverter.toEmail

import java.util.UUID
import scala.concurrent.ExecutionContext

trait CreateBulkEmail {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def createBulkEmailAction(creationPairs: Seq[(EmailCreation, UUID)]) =
    runIO(createBulkEmailQuotation(creationPairs))

  def createBulkEmailQuotation(creationPairs: Seq[(EmailCreation, UUID)]) =
    quote(
      liftQuery(creationPairs.map { case (creation, id) => toEmail(creation).copy(id = id) })
        .foreach(email =>
          query[Email]
            .insert(email)
            .returning(email => email)))
}
