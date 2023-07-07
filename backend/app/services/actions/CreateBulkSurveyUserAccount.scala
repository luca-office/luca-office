package services.actions

import database.DatabaseContext
import database.generated.public.SurveyUserAccount

import scala.concurrent.ExecutionContext

trait CreateBulkSurveyUserAccount {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._

  def createBulkSurveyUserAccountAction(surveyUserAccounts: Seq[SurveyUserAccount]) =
    runIO(createBulkSurveyUserAccountQuotation(surveyUserAccounts))

  def createBulkSurveyUserAccountQuotation(surveyUserAccounts: Seq[SurveyUserAccount]) =
    quote(
      liftQuery(surveyUserAccounts)
        .foreach(surveyUserAccount =>
          query[SurveyUserAccount]
            .insert(surveyUserAccount)
            .returning(surveyUserAccount => surveyUserAccount)))
}
