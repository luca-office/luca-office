package services

import database.DatabaseContext
import enums.SurveyEventType
import models._
import services.SurveyEventService.toDecodedSurveyEvent
import services.actions.AllSurveyEvent

import java.util.UUID
import javax.inject.Inject
import scala.concurrent.{ExecutionContext, Future}

class ChatMessageService @Inject() (databaseContext: DatabaseContext)(implicit val executionContext: ExecutionContext)
    extends AllSurveyEvent {
  val context = databaseContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def all(surveyId: UUID): Future[Seq[ChatMessage]] =
    run(
      allSurveyEventsForSurveyQuotation(surveyId)
        .filter(event =>
          event.eventType == lift(SurveyEventType.SendSupervisorChatMessage: SurveyEventType)
            || event.eventType == lift(SurveyEventType.SendParticipantChatMessage: SurveyEventType)))
      .map(surveyEvents =>
        surveyEvents
          .flatMap(toDecodedSurveyEvent(_).toOption)
          .collect {
            case DecodedSurveyEvent(timestamp, _, data: SendSupervisorChatMessage, _, _, _) =>
              SupervisorChatMessage(
                timestamp = timestamp,
                message = data.message,
                userAccountId = data.userAccountId,
                recipientInvitationId = data.recipientInvitationId)
            case DecodedSurveyEvent(timestamp, _, data: SendParticipantChatMessage, _, _, _) =>
              ParticipantChatMessage(timestamp = timestamp, message = data.message, invitationId = data.invitationId)
            case _ =>
              throw new Throwable("Unexpected event data type")
          })
}
