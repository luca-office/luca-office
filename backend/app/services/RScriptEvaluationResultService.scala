package services

import database.DatabaseContext
import database.generated.public.RScriptEvaluationResult
import models.RScriptEvaluationResultCreation
import services.Utils.defaultErrorHandler
import services.generated._

import java.util.UUID
import javax.inject.Inject
import scala.concurrent.{ExecutionContext, Future}

class RScriptEvaluationResultService @Inject() (databaseContext: DatabaseContext)(implicit
    val executionContext: ExecutionContext)
    extends DefaultAllRScriptEvaluationResult
    with DefaultCreateRScriptEvaluationResult
    with ReferenceBookChapterServiceActions {
  val context = databaseContext

  import context._

  def all: Future[Seq[RScriptEvaluationResult]] =
    performIO(allRScriptEvaluationResultsAction)

  def create(creation: RScriptEvaluationResultCreation): Future[RScriptEvaluationResult] =
    performIO(createRScriptEvaluationResultAction(creation))
      .recover(defaultErrorHandler)
}

trait FindRScriptEvaluationResult {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def findRScriptEvaluationResultsForSurveyInvitationIdAndScenarioCodingAutomatedCriterion(
      surveyInvitationId: UUID,
      criterionId: UUID): IO[Option[RScriptEvaluationResult], Effect.Read] =
    runIO(
      quote(
        query[RScriptEvaluationResult]
          .filter(_.invitationId == lift(surveyInvitationId))
          .filter(rScriptEvaluationResult => rScriptEvaluationResult.criterionId == lift(criterionId)))
    ).map(_.headOption)
}
