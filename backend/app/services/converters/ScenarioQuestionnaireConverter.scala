package services.converters

import database.generated.public.ScenarioQuestionnaire
import models.ScenarioQuestionnaireCreation

object ScenarioQuestionnaireConverter {

  def toScenarioQuestionnaire(creation: ScenarioQuestionnaireCreation): ScenarioQuestionnaire =
    ScenarioQuestionnaire(
      scenarioId = creation.scenarioId,
      questionnaireId = creation.questionnaireId,
      activationDelayInSeconds = creation.activationDelayInSeconds)
}
