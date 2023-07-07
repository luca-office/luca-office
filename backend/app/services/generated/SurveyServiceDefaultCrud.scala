package services.generated

import database.DatabaseContext
import database.generated.public.Survey
import models.{SurveyCreation, SurveyUpdate}
import services.converters.SurveyConverter.toSurvey
import utils.DateUtils

import java.util.UUID
import scala.concurrent.ExecutionContext

trait DefaultCreateSurvey {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def createSurveyAction(creation: SurveyCreation): IO[Survey, Effect.Write] =
    runIO(createSurveyQuotation(creation))

  def createSurveyQuotation(creation: SurveyCreation) =
    quote(
      query[Survey]
        .insert(lift(toSurvey(creation)))
        .returning(survey => survey))
}

trait DefaultUpdateSurvey {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def updateSurveyAction(id: UUID, update: SurveyUpdate): IO[Survey, Effect.Write] =
    runIO(updateSurveyQuotation(id, update))

  def updateSurveyQuotation(id: UUID, update: SurveyUpdate) =
    quote(
      query[Survey]
        .filter(_.id == lift(id))
        .update(
          _.modifiedAt -> lift(DateUtils.now),
          _.startsAt -> lift(update.startsAt),
          _.title -> lift(update.title),
          _.description -> lift(update.description),
          _.endsAt -> lift(update.endsAt),
          _.authenticationType -> lift(update.authenticationType),
          _.isOpenParticipationEnabled -> lift(update.isOpenParticipationEnabled),
          _.executionType -> lift(update.executionType)
        )
        .returning(survey => survey))
}

trait DefaultDeleteSurvey {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._

  def deleteSurveyAction(id: UUID): IO[UUID, Effect.Write] =
    runIO(deleteSurveyQuotation(id))

  def deleteSurveyQuotation(id: UUID) =
    quote(
      query[Survey]
        .filter(_.id == lift(id))
        .delete
        .returning(_.id))
}
