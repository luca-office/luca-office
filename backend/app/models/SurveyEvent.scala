package models

import enums.SurveyEventType

import java.time.Instant
import java.util.UUID

sealed trait SurveyEventCreationBase {
  def surveyId: UUID
  def timestamp: Instant
  def eventType: SurveyEventType
  def index: Int
  def data: Option[String]
}

case class SurveyEventCreation(
    surveyId: UUID,
    invitationId: UUID,
    timestamp: Instant,
    eventType: SurveyEventType,
    index: Int,
    data: Option[String]
) extends SurveyEventCreationBase

case class SupervisorSurveyEventCreation(
    surveyId: UUID,
    timestamp: Instant,
    eventType: SurveyEventType,
    index: Int,
    data: Option[String]
) extends SurveyEventCreationBase
