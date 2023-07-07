package models

import java.util.UUID

sealed trait ActorMessage {
  def surveyId: UUID
}

case class ConnectParticipantMessage(surveyId: UUID, invitationId: UUID) extends ActorMessage
case class DisconnectParticipantMessage(surveyId: UUID, invitationId: UUID) extends ActorMessage

case class ConnectSupervisorMessage(surveyId: UUID, userAccountId: UUID) extends ActorMessage
case class DisconnectSupervisorMessage(surveyId: UUID, userAccountId: UUID) extends ActorMessage

case class StartSurveyMessage(surveyId: UUID) extends ActorMessage
case class EndSurveyMessage(surveyId: UUID) extends ActorMessage
case class StartQuestionnaireMessage(surveyId: UUID, questionnaireId: UUID) extends ActorMessage
case class StartScenarioMessage(surveyId: UUID, scenarioId: UUID) extends ActorMessage

case class SendSupervisorChatMessageMessage(surveyId: UUID, recipientInvitationId: UUID, message: String)
    extends ActorMessage
case class SendParticipantChatMessageMessage(surveyId: UUID, invitationId: UUID, message: String) extends ActorMessage

case class AvailableParticipantsMessage(surveyId: UUID, invitationIds: Seq[UUID]) extends ActorMessage
