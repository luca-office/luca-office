package services

import database.DatabaseContext
import database.generated.public.FreetextQuestionRatingCriterionSelection
import models.FreetextQuestionRatingCriterionSelectionCreation
import services.Utils.defaultErrorHandler
import services.generated._

import java.util.UUID
import javax.inject.Inject
import scala.concurrent.{ExecutionContext, Future}

class FreetextQuestionRatingCriterionSelectionService @Inject() (databaseContext: DatabaseContext)(implicit
    val executionContext: ExecutionContext)
    extends DefaultAllFreetextQuestionRatingCriterionSelection
    with DefaultCreateFreetextQuestionRatingCriterionSelection
    with DefaultDeleteFreetextQuestionRatingCriterionSelection {
  val context = databaseContext

  import context._

  def all(freetextQuestionRatingId: UUID): Future[Seq[FreetextQuestionRatingCriterionSelection]] =
    performIO(allFreetextQuestionRatingCriterionSelectionsAction(freetextQuestionRatingId))

  def create(
      creation: FreetextQuestionRatingCriterionSelectionCreation): Future[FreetextQuestionRatingCriterionSelection] =
    performIO(createFreetextQuestionRatingCriterionSelectionAction(creation))
      .recover(defaultErrorHandler)

  def delete(freetextQuestionRatingId: UUID, criterionId: UUID): Future[FreetextQuestionRatingCriterionSelection] =
    performIO(deleteFreetextQuestionRatingCriterionSelectionAction(freetextQuestionRatingId, criterionId))
}

trait FreetextQuestionRatingCriterionSelectionServiceActions extends DefaultAllFreetextQuestionRating {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._

  def allFreetextQuestionRatingCriterionSelectionsAction(
      ratingId: UUID,
      questionId: UUID,
      invitationId: UUID): IO[Seq[FreetextQuestionRatingCriterionSelection], Effect.Read] =
    runIO(for {
      freetextQuestionRating <- allFreetextQuestionRatingsQuotation(ratingId)
        .filter(_.surveyInvitationId == lift(invitationId))
        .filter(_.questionId == lift(questionId))
      criterionSelection <- query[FreetextQuestionRatingCriterionSelection]
        .filter(_.freetextQuestionRatingId == freetextQuestionRating.id)
    } yield criterionSelection)
}
