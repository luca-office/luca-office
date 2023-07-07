/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { QuestionType } from "./globalTypes";

// ====================================================
// GraphQL query operation: ScenarioQuestionnairesQuery
// ====================================================

export interface ScenarioQuestionnairesQuery_scenarioQuestionnaires_questionnaire_questions {
  __typename: "QuestionnaireQuestion";
  id: string;
  questionType: QuestionType;
}

export interface ScenarioQuestionnairesQuery_scenarioQuestionnaires_questionnaire {
  __typename: "Questionnaire";
  questions: ScenarioQuestionnairesQuery_scenarioQuestionnaires_questionnaire_questions[];
}

export interface ScenarioQuestionnairesQuery_scenarioQuestionnaires {
  __typename: "ScenarioQuestionnaire";
  scenarioId: string;
  questionnaireId: string;
  activationDelayInSeconds: number;
  questionnaire: ScenarioQuestionnairesQuery_scenarioQuestionnaires_questionnaire;
}

export interface ScenarioQuestionnairesQuery {
  scenarioQuestionnaires: ScenarioQuestionnairesQuery_scenarioQuestionnaires[];
}

export interface ScenarioQuestionnairesQueryVariables {
  scenarioId: string;
}
