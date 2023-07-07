package utils

import database.generated.public.UserAccount
import play.api.mvc._
import services.UserAccountService

import java.util.UUID
import javax.inject.Inject
import scala.concurrent.{ExecutionContext, Future}
import scala.util.{Failure, Success, Try}

class UserAccountRequest[A](
    val userAccount: Option[UserAccount],
    val playerParticipantToken: Option[String],
    request: Request[A])
    extends WrappedRequest[A](request)

class OptionUserAction @Inject() (val parser: BodyParsers.Default, userAccountService: UserAccountService)(implicit
    val executionContext: ExecutionContext)
    extends ActionBuilder[UserAccountRequest, AnyContent]
    with ActionTransformer[Request, UserAccountRequest] {

  def transform[A](request: Request[A]): Future[UserAccountRequest[A]] = {
    val participantToken = request.headers
      .get(UserAction.participantTokenHeaderKey)
      .filter(_ != "null")

    UserAction.retrieveUserAccountId(request.session) match {
      case Success(userId) =>
        userAccountService
          .find(userId)
          .map(user => new UserAccountRequest(user, participantToken, request))

      case Failure(_) =>
        Future.successful(new UserAccountRequest(None, participantToken, request))
    }
  }
}

object UserAction {
  val userAccountIdSessionKey = "userAccountId"
  val participantTokenHeaderKey = "Participant-Token"

  def retrieveUserAccountId[A](session: Session): Try[UUID] =
    Try(UUID.fromString(session.get(userAccountIdSessionKey).get))
}
