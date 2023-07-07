package services

import org.scalatestplus.play._
import org.scalatestplus.play.guice._
import play.api.test._
import services.helpers.CreationUtils
import services.helpers.Factories.{userAccountFactory, userAccountUpdateFactory}

import scala.concurrent.Await
import scala.concurrent.duration.Duration

class UserAccountServiceSpec extends PlaySpec with GuiceOneAppPerTest with Injecting {

  "UserAccountService" should {

    "create an user account" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val result = createUserAccount

      result.email mustBe "email-1"
      result.firstName mustBe "firstName"
      result.lastName mustBe "lastName"
      result.organization mustBe "organization"
    }

    "update an user account without changing claims" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val userAccountService = inject[UserAccountService]
      val user = createUserAccount
      val ownUserAccount = userAccountFactory
      val update = userAccountUpdateFactory.copy(lastName = "Doe")
      val result = Await.result(userAccountService.update(ownUserAccount)(user.id, update), Duration.Inf)

      result.firstName mustBe "firstName"
      result.lastName mustBe "Doe"
    }

    "update an user account with unauthorized changing claims" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val userAccountService = inject[UserAccountService]
      val user = createUserAccount
      val ownUserAccount = userAccountFactory
      val update = userAccountUpdateFactory.copy(mayAdministrateUserAccounts = true)
      val action = userAccountService.update(ownUserAccount)(user.id, update)

      intercept[ApiError](Await.result(action, Duration.Inf))
    }

    "update an user account" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val userAccountService = inject[UserAccountService]
      val user = createUserAccount
      val ownUserAccount = userAccountFactory.copy(mayAdministrateUserAccounts = true)
      val update = userAccountUpdateFactory.copy(mayArchive = true)
      val result = Await.result(userAccountService.update(ownUserAccount)(user.id, update), Duration.Inf)

      result.firstName mustBe "firstName"
      result.lastName mustBe "lastName"
      result.mayArchive mustBe true
    }

    "retrieve all user accounts" in {
      val creationUtils = inject[CreationUtils]

      import creationUtils._

      val userAccountService = inject[UserAccountService]
      createUserAccounts(5)
      val result = Await.result(userAccountService.all, Duration.Inf)

      result.length mustBe 5
    }
  }
}
