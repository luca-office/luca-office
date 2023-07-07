package models

import java.util.UUID

case class FreetextAnswer(surveyInvitationId: UUID, questionnaireId: UUID, questionId: UUID, text: String)
