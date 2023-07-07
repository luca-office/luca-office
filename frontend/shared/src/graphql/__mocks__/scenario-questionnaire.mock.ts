import {ScenarioQuestionnaireFragment} from "../generated/ScenarioQuestionnaireFragment"
import {questionnaireMock} from "./questionnaire-question.mock"
import {scenariosMock} from "./scenarios.mock"

export const scenarioQuestionnaireMock: ScenarioQuestionnaireFragment = {
  __typename: "ScenarioQuestionnaire",
  scenarioId: scenariosMock[0].id,
  questionnaireId: questionnaireMock.id,
  activationDelayInSeconds: 0,
  questionnaire: questionnaireMock
}
