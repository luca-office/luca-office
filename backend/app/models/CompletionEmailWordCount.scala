package models

import java.util.UUID

case class CompletionEmailWordCount(invitationId: UUID, wordCount: Option[Int])
