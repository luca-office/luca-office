package models

import enums.{AuthenticationType, SurveyExecutionType}

import java.time.Instant
import java.util.UUID

case class SurveyCreation(
    title: String,
    description: String,
    startsAt: Option[Instant],
    endsAt: Option[Instant],
    authenticationType: AuthenticationType,
    isTestSurvey: Boolean,
    isOpenParticipationEnabled: Boolean,
    projectId: UUID,
    executionType: SurveyExecutionType
)

case class SurveyUpdate(
    title: String,
    description: String,
    startsAt: Option[Instant],
    endsAt: Option[Instant],
    authenticationType: AuthenticationType,
    isOpenParticipationEnabled: Boolean,
    executionType: SurveyExecutionType
)
