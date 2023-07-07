package services.converters

import database.generated.public.SurveyEvent
import io.circe.Json
import models.{SupervisorSurveyEventCreation, SurveyEventCreation, SurveyEventCreationBase}

object SurveyEventConverter {

  def toSurveyEvent(creation: SurveyEventCreationBase, data: Option[Json]): SurveyEvent =
    creation match {
      case creation: SurveyEventCreation => toSurveyEvent(creation, data)
      case creation: SupervisorSurveyEventCreation => toSurveyEvent(creation, data)
    }

  def toSurveyEvent(creation: SurveyEventCreation, data: Option[Json]): SurveyEvent =
    SurveyEvent(
      timestamp = creation.timestamp,
      index = creation.index,
      eventType = creation.eventType,
      data = data,
      surveyId = creation.surveyId,
      invitationId = Some(creation.invitationId)
    )

  def toSurveyEvent(creation: SupervisorSurveyEventCreation, data: Option[Json]): SurveyEvent =
    SurveyEvent(
      timestamp = creation.timestamp,
      index = creation.index,
      eventType = creation.eventType,
      data = data,
      surveyId = creation.surveyId,
      invitationId = None
    )
}
