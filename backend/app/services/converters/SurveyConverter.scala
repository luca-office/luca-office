package services.converters

import database.generated.public.Survey
import models.SurveyCreation
import utils.DateUtils

import java.util.UUID

object SurveyConverter {

  def toSurvey(creation: SurveyCreation): Survey =
    Survey(
      id = UUID.randomUUID(),
      createdAt = DateUtils.now,
      modifiedAt = DateUtils.now,
      title = creation.title,
      description = creation.description,
      startsAt = creation.startsAt,
      endsAt = creation.endsAt,
      authenticationType = creation.authenticationType,
      projectId = creation.projectId,
      isTestSurvey = creation.isTestSurvey,
      isOpenParticipationEnabled = creation.isOpenParticipationEnabled,
      executionType = creation.executionType
    )
}
