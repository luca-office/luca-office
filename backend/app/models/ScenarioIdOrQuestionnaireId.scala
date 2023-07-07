package models

import java.util.UUID

case class ScenarioIdOrQuestionnaireId(scenarioId: Option[UUID], questionnaireId: Option[UUID])
