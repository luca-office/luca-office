package models

import enums.SurveyEventType

import java.time.Instant
import java.util.UUID

case class DecodedSurveyEvent(
    timestamp: Instant,
    eventType: SurveyEventType,
    data: SurveyEventData,
    surveyId: UUID,
    index: Int,
    invitationId: Option[UUID])
