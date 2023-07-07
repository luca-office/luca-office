package services

import database.DatabaseContext
import database.generated.public.FreetextQuestionRating
import models.{FreetextQuestionRatingCreation, FreetextQuestionRatingUpdate}
import services.Utils.defaultErrorHandler
import services.generated._

import java.util.UUID
import javax.inject.Inject
import scala.concurrent.{ExecutionContext, Future}

class FreetextQuestionRatingService @Inject() (databaseContext: DatabaseContext)(implicit
    val executionContext: ExecutionContext)
    extends DefaultAllFreetextQuestionRating
    with DefaultFindFreetextQuestionRating
    with DefaultCreateFreetextQuestionRating
    with DefaultUpdateFreetextQuestionRating {
  val context = databaseContext

  import context._
  import database.Encoders._

  def all(ratingId: UUID): Future[Seq[FreetextQuestionRating]] =
    performIO(allFreetextQuestionRatingsAction(ratingId))

  def find(id: UUID): Future[Option[FreetextQuestionRating]] =
    performIO(findFreetextQuestionRatingAction(id))

  def findForParticipant(questionId: UUID, surveyInvitationId: UUID): Future[Option[FreetextQuestionRating]] =
    performIO(runIO(query[FreetextQuestionRating].filter(row =>
      row.questionId == lift(questionId) && row.surveyInvitationId == lift(surveyInvitationId))).map(_.headOption))

  def create(creation: FreetextQuestionRatingCreation): Future[FreetextQuestionRating] =
    performIO(createFreetextQuestionRatingAction(creation))
      .recover(defaultErrorHandler)

  def update(id: UUID, update: FreetextQuestionRatingUpdate): Future[FreetextQuestionRating] =
    performIO(updateFreetextQuestionRatingAction(id, update))
      .recover(defaultErrorHandler)
}
