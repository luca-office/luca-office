package models

import database.generated.public.SurveyInvitation

case class SurveyInvitationAndEvents(
    surveyInvitation: SurveyInvitation,
    surveyEventsForLatestInProgressProjectModule: Option[ProjectModuleSurveyEvents])
