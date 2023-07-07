package models

import java.util.UUID

case class SurveyInvitationCreation(
    email: String,
    surveyId: UUID,
    userAccountId: Option[UUID]
)

case class SurveyInvitationUpdate(
    userAccountId: Option[UUID]
)
