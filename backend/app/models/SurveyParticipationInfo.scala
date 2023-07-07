package models

import database.generated.public.SurveyInvitation
import enums.SurveyParticipationStatus

case class SurveyParticipationInfo(
    surveyInvitation: SurveyInvitation,
    surveyParticipationStatus: SurveyParticipationStatus
)
