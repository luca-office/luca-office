package models

import java.time.Instant
import java.util.UUID

sealed trait ChatMessage {
  def timestamp: Instant
  def message: String
}

case class SupervisorChatMessage(
    timestamp: Instant,
    message: String,
    userAccountId: UUID,
    recipientInvitationId: UUID
) extends ChatMessage

case class ParticipantChatMessage(
    timestamp: Instant,
    message: String,
    invitationId: UUID
) extends ChatMessage
