package utils

import play.api.mvc.Results.Unauthorized
import play.api.mvc._

import scala.concurrent.{ExecutionContext, Future}

object UserRequiredFilter {
  def UserRequiredFilter(implicit ec: ExecutionContext): ActionFilter[UserAccountRequest] =
    new ActionFilter[UserAccountRequest] {
      val executionContext: ExecutionContext = ec

      def filter[A](request: UserAccountRequest[A]): Future[Option[Result]] = Future.successful(
        if (request.userAccount.isEmpty)
          Some(Unauthorized)
        else
          None)
    }
}
