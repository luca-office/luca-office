/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReferenceBookChapterScenarioId } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: RepositionReferenceBookChapterScenarioMutation
// ====================================================

export interface RepositionReferenceBookChapterScenarioMutation_repositionReferenceBookChapterScenario {
  __typename: "ReferenceBookChapterScenario";
  referenceBookChapterId: string;
  scenarioId: string;
  position: number;
}

export interface RepositionReferenceBookChapterScenarioMutation {
  repositionReferenceBookChapterScenario: RepositionReferenceBookChapterScenarioMutation_repositionReferenceBookChapterScenario;
}

export interface RepositionReferenceBookChapterScenarioMutationVariables {
  id: ReferenceBookChapterScenarioId;
  predecessorId?: ReferenceBookChapterScenarioId | null;
}
