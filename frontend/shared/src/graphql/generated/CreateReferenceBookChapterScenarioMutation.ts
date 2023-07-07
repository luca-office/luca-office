/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReferenceBookChapterScenarioId } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateReferenceBookChapterScenarioMutation
// ====================================================

export interface CreateReferenceBookChapterScenarioMutation_createReferenceBookChapterScenario {
  __typename: "ReferenceBookChapterScenario";
  referenceBookChapterId: string;
  scenarioId: string;
  position: number;
}

export interface CreateReferenceBookChapterScenarioMutation {
  createReferenceBookChapterScenario: CreateReferenceBookChapterScenarioMutation_createReferenceBookChapterScenario;
}

export interface CreateReferenceBookChapterScenarioMutationVariables {
  creation: ReferenceBookChapterScenarioId;
}
