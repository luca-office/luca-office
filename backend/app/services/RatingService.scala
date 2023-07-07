package services

import database.DatabaseContext
import database.generated.public.Rating
import models.RatingCreation
import services.Utils.defaultErrorHandler
import services.generated._
import utils.DateUtils

import java.time.Instant
import java.util.UUID
import javax.inject.Inject
import scala.concurrent.{ExecutionContext, Future}

class RatingService @Inject() (databaseContext: DatabaseContext)(implicit val executionContext: ExecutionContext)
    extends DefaultAllRating
    with DefaultFindRating
    with DefaultCreateRating
    with DefaultDeleteRating {
  val context = databaseContext

  import context._
  import database.Encoders._

  def all(surveyId: UUID): Future[Seq[Rating]] =
    performIO(allRatingsAction(surveyId))

  def find(id: UUID): Future[Option[Rating]] =
    performIO(findRatingAction(id))

  def create(creation: RatingCreation, userAccountId: UUID): Future[Rating] =
    performIO(createRatingAction(creation, userAccountId))
      .recover(defaultErrorHandler)

  def finalize(userAccountId: UUID)(id: UUID): Future[Rating] = {
    val action = findRatingAction(id).flatMap {
      case None =>
        IO.failed(EntityNotFound)
      case Some(rating) if !rating.isFinalScore && rating.userAccountId != userAccountId =>
        IO.failed(InsufficientRights)
      case Some(rating) if rating.finalizedAt.isDefined =>
        IO.failed(EntityAlreadyFinalized)
      case Some(rating) =>
        if (rating.isFinalScore)
          runIO(finalizeForSurveyQuotation(rating.surveyId))
        else
          runIO(finalizeQuotation(id))
    }

    performIO(action).recover(defaultErrorHandler)
  }

  private def finalizeQuotation(id: UUID) = {
    val now = DateUtils.now
    quote(
      findRatingQuotation(id)
        .update(
          _.modifiedAt -> lift(now),
          _.finalizedAt -> lift(Some(now): Option[Instant])
        )
        .returning(rating => rating))
  }

  private def finalizeForSurveyQuotation(surveyId: UUID) = {
    val now = DateUtils.now
    quote(
      allRatingsQuotation(surveyId)
        .filter(_.finalizedAt.isEmpty)
        .update(
          _.modifiedAt -> lift(now),
          _.finalizedAt -> lift(Some(now): Option[Instant])
        )
        .returning(rating => rating))
  }

  def delete(id: UUID): Future[UUID] =
    performIO(deleteRatingAction(id))
}

trait RatingServiceActions extends DefaultAllRating with DefaultFindRating {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._

  def findFinalScoreRatingAction(surveyId: UUID): IO[Option[Rating], Effect.Read] =
    runIO(allRatingsQuotation(surveyId).filter(_.isFinalScore)).map(_.headOption)
}
