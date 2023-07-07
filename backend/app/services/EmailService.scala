package services

import database.DatabaseContext
import javax.inject.Inject
import services.generated._

import scala.concurrent.ExecutionContext

class EmailService @Inject() (databaseContext: DatabaseContext)(implicit val executionContext: ExecutionContext)
    extends DefaultAllEmail
    with DefaultFindEmail
    with DefaultCreateEmail
    with DefaultUpdateEmail
    with DefaultDeleteEmail {
  val context = databaseContext
}
