package services.actions

import database.DatabaseContext
import database.generated.public.UserAccount
import models.UserAccountCreation
import services.converters.UserAccountConverter.toUserAccount

import scala.concurrent.ExecutionContext

trait CreateBulkUserAccount {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def createBulkUserAccountAction(creations: Seq[(UserAccountCreation, String)]) =
    runIO(createBulkUserAccountQuotation(creations))

  def createBulkUserAccountQuotation(creations: Seq[(UserAccountCreation, String)]) =
    quote(
      liftQuery(creations.map { case (creation, passwordHash) => toUserAccount(creation, passwordHash) })
        .foreach(userAccount =>
          query[UserAccount]
            .insert(userAccount)
            .returning(userAccount => userAccount)))
}
