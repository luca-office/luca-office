package services.generated

import database.DatabaseContext
import database.generated.public.{Survey, SurveyUserAccount, UserAccount}

import java.util.UUID
import scala.concurrent.ExecutionContext

trait DefaultUserAccountsForSurvey {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def userAccountsForSurveyAction(surveyId: UUID) =
    runIO(userAccountsForSurveyQuotation(surveyId))

  def userAccountsForSurveyQuotation(surveyId: UUID) =
    quote(for {
      surveyUserAccount <- query[SurveyUserAccount].filter(_.surveyId == lift(surveyId))
      userAccount <- query[UserAccount].filter(_.id == surveyUserAccount.userAccountId)
    } yield userAccount)
}

trait DefaultSurveysForUserAccount {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def surveysForUserAccountAction(userAccountId: UUID) =
    runIO(surveysForUserAccountQuotation(userAccountId))

  def surveysForUserAccountQuotation(userAccountId: UUID) =
    quote(for {
      surveyUserAccount <- query[SurveyUserAccount].filter(_.userAccountId == lift(userAccountId))
      survey <- query[Survey].filter(_.id == surveyUserAccount.surveyId)
    } yield survey)
}

trait DefaultCreateSurveyUserAccount {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._

  def createSurveyUserAccountAction(surveyId: UUID, userAccountId: UUID) =
    runIO(createSurveyUserAccountQuotation(surveyId, userAccountId))

  def createSurveyUserAccountQuotation(surveyId: UUID, userAccountId: UUID) =
    quote(
      query[SurveyUserAccount]
        .insert(lift(SurveyUserAccount(surveyId = surveyId, userAccountId = userAccountId)))
        .returning(survey => survey))
}

trait DefaultDeleteSurveyUserAccount {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._

  def deleteSurveyUserAccountAction(surveyId: UUID, userAccountId: UUID) =
    runIO(deleteSurveyUserAccountQuotation(surveyId, userAccountId))

  def deleteSurveyUserAccountQuotation(surveyId: UUID, userAccountId: UUID) =
    quote(
      query[SurveyUserAccount]
        .filter(row =>
          row.surveyId == lift(surveyId)
            && row.userAccountId == lift(userAccountId))
        .delete
        .returning(row => SurveyUserAccount(row.surveyId, row.userAccountId)))
}
