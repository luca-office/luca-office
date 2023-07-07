package models

import database.generated.public.SurveyEvent

import java.util.UUID

case class ProjectModuleSurveyEvents(
    scenarioId: Option[UUID],
    questionnaireId: Option[UUID],
    surveyEvents: Seq[SurveyEvent])
