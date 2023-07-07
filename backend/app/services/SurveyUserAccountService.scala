package services

import database.DatabaseContext
import database.generated.public.{Survey, SurveyUserAccount, UserAccount}
import services.generated._

import java.util.UUID
import javax.inject.Inject
import scala.concurrent.{ExecutionContext, Future}

class SurveyUserAccountService @Inject() (databaseContext: DatabaseContext)(implicit
    val executionContext: ExecutionContext)
    extends DefaultSurveysForUserAccount
    with DefaultUserAccountsForSurvey
    with DefaultCreateSurveyUserAccount
    with DefaultDeleteSurveyUserAccount {
  val context = databaseContext

  import context._

  def userAccountsForSurvey(SurveyId: UUID): Future[Seq[UserAccount]] =
    performIO(userAccountsForSurveyAction(SurveyId))

  def surveysForUserAccount(userAccountId: UUID): Future[Seq[Survey]] =
    performIO(surveysForUserAccountAction(userAccountId))

  def create(SurveyId: UUID, userAccountId: UUID): Future[SurveyUserAccount] =
    performIO(createSurveyUserAccountAction(SurveyId, userAccountId))

  def delete(SurveyId: UUID, userAccountId: UUID): Future[SurveyUserAccount] =
    performIO(deleteSurveyUserAccountAction(SurveyId, userAccountId))
}
