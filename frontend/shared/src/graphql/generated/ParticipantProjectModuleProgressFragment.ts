/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProjectModuleProgressType } from "./globalTypes";

// ====================================================
// GraphQL fragment: ParticipantProjectModuleProgressFragment
// ====================================================

export interface ParticipantProjectModuleProgressFragment {
  __typename: "ParticipantProjectModuleProgress";
  scenarioId: string | null;
  questionnaireId: string | null;
  status: ProjectModuleProgressType;
  questionsInProgressCount: number | null;
  requiredDocumentsCount: number | null;
  openedRequiredDocumentsCount: number | null;
}
