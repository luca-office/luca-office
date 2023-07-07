/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProjectModuleResultsFragment
// ====================================================

export interface ProjectModuleResultsFragment_participantResults {
  __typename: "ParticipantProjectModuleResult";
  surveyInvitationId: string;
  participantName: string | null;
  score: number | null;
}

export interface ProjectModuleResultsFragment {
  __typename: "ProjectModuleResults";
  projectModuleId: string;
  participantResults: ProjectModuleResultsFragment_participantResults[];
  averageScore: number | null;
  maximumScore: number;
}
