package services.actions

import database.DatabaseContext
import database.generated.public.UserAccount
import enums.Salutation.Mrs
import models.UserAccountCreation
import org.mindrot.jbcrypt.BCrypt
import services.generated.DefaultAllUserAccount

import java.util.UUID
import scala.concurrent.ExecutionContext

trait CreateMissingUserAccounts extends DefaultAllUserAccount with CreateBulkUserAccount {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def createMissingAccountsAction(emails: Seq[String]) =
    runIO(allUserAccountsQuotation.filter(userAccount => liftQuery(emails).contains(userAccount.email)))
      .flatMap { existingAccounts =>
        val emailsWithAccount = existingAccounts.map(_.email)
        val accountCreations = emails
          .diff(emailsWithAccount)
          .map(email =>
            UserAccountCreation(
              email = email,
              password = UUID.randomUUID().toString,
              firstName = "-",
              lastName = "-",
              organization = "-",
              salutation = Mrs,
              hasConfirmedBackofficeTermsAndConditions = false
            ))
        val accountCreationPairs = accountCreations
          .map(creation => (creation, BCrypt.hashpw(creation.password, BCrypt.gensalt())))
        createBulkUserAccountAction(accountCreationPairs).map(createdAccounts =>
          Response(existingAccounts = existingAccounts, createdAccounts = createdAccounts))
      }

  case class Response(existingAccounts: Seq[UserAccount], createdAccounts: Seq[UserAccount])
}
