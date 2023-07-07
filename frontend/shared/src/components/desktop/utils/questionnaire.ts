import {ScenarioQuestionnairesQuery_scenarioQuestionnaires} from "../../../graphql/generated/ScenarioQuestionnairesQuery"

export const questionnaireTypeForQuestionId = (
  questionId: UUID,
  questionnaireId: UUID,
  scenarioQuestionnaires: ScenarioQuestionnairesQuery_scenarioQuestionnaires[]
) =>
  scenarioQuestionnaires
    .filter(scenarioQuestionnaire => scenarioQuestionnaire.questionnaireId === questionnaireId)
    .map(scenarioQuestionnaires => scenarioQuestionnaires.questionnaire)
    .flatMap(questionnaire => questionnaire.questions)
    .find(question => question.id === questionId)?.questionType
