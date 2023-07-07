package services.actions

import database.DatabaseContext
import database.generated.public.SurveyEvent
import enums.SurveyEventType
import enums.SurveyEventType.{SendParticipantChatMessage, SendSupervisorChatMessage, StoreParticipantData}
import services.generated.DefaultAllEmail

import java.util.UUID
import scala.concurrent.ExecutionContext

trait AllSurveyEvent extends AllDirectory with DefaultAllEmail {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def allSurveyEventsForSurveyAction(surveyId: UUID): IO[Seq[SurveyEvent], Effect.Read] =
    runIO(allSurveyEventsForSurveyQuotation(surveyId))

  def allSurveyEventsForSurveyQuotation(surveyId: UUID) =
    quote(query[SurveyEvent].filter(_.surveyId == lift(surveyId)).sortBy(_.index))

  def allSurveyEventsForParticipantAction(invitationId: UUID): IO[Seq[SurveyEvent], Effect.Read] =
    runIO(allSurveyEventsForParticipantQuotation(invitationId))

  def allSurveyEventsForParticipantQuotation(invitationId: UUID) =
    quote(query[SurveyEvent].filter(_.invitationId.contains(lift(invitationId))))

  def allSurveyEventsForSupervisorAction(surveyId: UUID): IO[Seq[SurveyEvent], Effect.Read] =
    runIO(allSurveyEventsForSupervisorQuotation(surveyId))

  def allSurveyEventsForSupervisorQuotation(surveyId: UUID) =
    quote(query[SurveyEvent].filter(surveyEvent =>
      surveyEvent.surveyId == lift(surveyId) && surveyEvent.invitationId.isEmpty))

  def allSurveyEventsForScenarioAction(surveyId: UUID, scenarioId: UUID): IO[Seq[SurveyEvent], Effect.Read] =
    runIO(allSurveyEventsForScenarioQuotation(surveyId, scenarioId))

  def allSurveyEventsForScenarioQuotation(surveyId: UUID, scenarioId: UUID) =
    quote(
      query[SurveyEvent]
        .filter(surveyEvent =>
          surveyEvent.surveyId == lift(surveyId)
            && (isOfScenario(scenarioId)
              || surveyEvent.eventType == lift(StoreParticipantData: SurveyEventType)))
        .sortBy(_.index))

  def allSurveyEventsForQuestionnaireAction(surveyId: UUID, questionnaireId: UUID): IO[Seq[SurveyEvent], Effect.Read] =
    runIO(allSurveyEventsForQuestionnaireQuotation(surveyId, questionnaireId))

  def allSurveyEventsForQuestionnaireQuotation(surveyId: UUID, questionnaireId: UUID) =
    quote(
      query[SurveyEvent]
        .filter(surveyEvent =>
          surveyEvent.surveyId == lift(surveyId)
            && (isOfQuestionnaire(questionnaireId)
              || surveyEvent.eventType == lift(StoreParticipantData: SurveyEventType)))
        .sortBy(_.index))

  def allSurveyEventsForParticipantForScenarioAction(
      invitationId: UUID,
      scenarioId: UUID): IO[Seq[SurveyEvent], Effect.Read] =
    runIO(allSurveyEventsForParticipantForScenarioQuotation(invitationId, scenarioId))

  def allSurveyEventsForParticipantForScenarioQuotation(invitationId: UUID, scenarioId: UUID) =
    quote(
      query[SurveyEvent]
        .filter(surveyEvent =>
          (surveyEvent.invitationId.contains(lift(invitationId))
            && (isOfScenario(scenarioId)
              || surveyEvent.eventType == lift(StoreParticipantData: SurveyEventType)
              || surveyEvent.eventType == lift(SendParticipantChatMessage: SurveyEventType)))
            || (surveyEvent.eventType == lift(SendSupervisorChatMessage: SurveyEventType)
              && hasRecipientInvitationId(invitationId)))
        .sortBy(_.index))

  def allSurveyEventsForParticipantForQuestionnaireAction(
      invitationId: UUID,
      questionnaireId: UUID): IO[Seq[SurveyEvent], Effect.Read] =
    runIO(allSurveyEventsForParticipantForQuestionnaireQuotation(invitationId, questionnaireId))

  def allSurveyEventsForParticipantForQuestionnaireQuotation(invitationId: UUID, questionnaireId: UUID) =
    quote(
      query[SurveyEvent]
        .filter(surveyEvent =>
          (surveyEvent.invitationId.contains(lift(invitationId))
            && (isOfQuestionnaire(questionnaireId)
              || surveyEvent.eventType == lift(StoreParticipantData: SurveyEventType)
              || surveyEvent.eventType == lift(SendParticipantChatMessage: SurveyEventType)))
            || (surveyEvent.eventType == lift(SendSupervisorChatMessage: SurveyEventType)
              && hasRecipientInvitationId(invitationId)))
        .sortBy(_.index))

  private def isOfScenario(scenarioId: UUID) =
    quote(infix"(data ->> 'scenarioId')::uuid = ${lift(scenarioId)}".asCondition)

  private def isOfQuestionnaire(questionnaireId: UUID) =
    quote(infix"(data ->> 'questionnaireId')::uuid = ${lift(questionnaireId)}".asCondition)

  private def hasRecipientInvitationId(invitationId: UUID) =
    quote(infix"(data ->> 'recipientInvitationId')::uuid = ${lift(invitationId)}".asCondition)
}
