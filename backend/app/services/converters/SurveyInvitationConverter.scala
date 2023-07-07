package services.converters

import database.generated.public.SurveyInvitation
import models.SurveyInvitationCreation
import utils.DateUtils

import java.util.UUID

object SurveyInvitationConverter {

  def toSurveyInvitation(creation: SurveyInvitationCreation, token: String): SurveyInvitation =
    SurveyInvitation(
      id = UUID.randomUUID(),
      createdAt = DateUtils.now,
      modifiedAt = DateUtils.now,
      token = token,
      email = Some(creation.email),
      surveyId = creation.surveyId,
      userAccountId = creation.userAccountId,
      index = -1,
      isOpenParticipation = false
    )
}
