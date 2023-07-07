/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReferenceBookChapterScenarioId } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: DeleteReferenceBookChapterScenarioMutation
// ====================================================

export interface DeleteReferenceBookChapterScenarioMutation_deleteReferenceBookChapterScenario {
  __typename: "ReferenceBookChapterScenario";
  referenceBookChapterId: string;
  scenarioId: string;
  position: number;
}

export interface DeleteReferenceBookChapterScenarioMutation {
  deleteReferenceBookChapterScenario: DeleteReferenceBookChapterScenarioMutation_deleteReferenceBookChapterScenario;
}

export interface DeleteReferenceBookChapterScenarioMutationVariables {
  id: ReferenceBookChapterScenarioId;
}
