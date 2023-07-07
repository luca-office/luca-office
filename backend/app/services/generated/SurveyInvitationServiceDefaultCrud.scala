package services.generated

import database.DatabaseContext
import database.generated.public.SurveyInvitation
import models.SurveyInvitationUpdate
import utils.DateUtils

import java.util.UUID
import scala.concurrent.ExecutionContext

trait DefaultAllSurveyInvitation {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def allSurveyInvitationsAction(surveyId: UUID): IO[Seq[SurveyInvitation], Effect.Read] =
    runIO(allSurveyInvitationsQuotation(surveyId))

  def allSurveyInvitationsQuotation(surveyId: UUID) =
    quote(query[SurveyInvitation].filter(_.surveyId == lift(surveyId)))
}

trait DefaultFindSurveyInvitation {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def findSurveyInvitationAction(id: UUID): IO[Option[SurveyInvitation], Effect.Read] =
    runIO(findSurveyInvitationQuotation(id)).map(_.headOption)

  def findSurveyInvitationQuotation(id: UUID) =
    quote(query[SurveyInvitation].filter(_.id == lift(id)))
}

trait DefaultUpdateSurveyInvitation {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def updateSurveyInvitationAction(id: UUID, update: SurveyInvitationUpdate): IO[SurveyInvitation, Effect.Write] =
    runIO(updateSurveyInvitationQuotation(id, update))

  def updateSurveyInvitationQuotation(id: UUID, update: SurveyInvitationUpdate) =
    quote(
      query[SurveyInvitation]
        .filter(_.id == lift(id))
        .update(
          _.modifiedAt -> lift(DateUtils.now),
          _.userAccountId -> lift(update.userAccountId)
        )
        .returning(surveyInvitation => surveyInvitation))
}

trait DefaultDeleteSurveyInvitation {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._

  def deleteSurveyInvitationAction(id: UUID): IO[UUID, Effect.Write] =
    runIO(deleteSurveyInvitationQuotation(id))

  def deleteSurveyInvitationQuotation(id: UUID) =
    quote(
      query[SurveyInvitation]
        .filter(_.id == lift(id))
        .delete
        .returning(_.id))
}
