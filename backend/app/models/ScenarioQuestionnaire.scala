package models

import java.util.UUID

case class ScenarioQuestionnaireCreation(
    scenarioId: UUID,
    questionnaireId: UUID,
    activationDelayInSeconds: Int
)

case class ScenarioQuestionnaireUpdate(
    activationDelayInSeconds: Int
)
