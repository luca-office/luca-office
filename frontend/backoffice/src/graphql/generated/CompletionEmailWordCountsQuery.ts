/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CompletionEmailWordCountsQuery
// ====================================================

export interface CompletionEmailWordCountsQuery_completionEmailWordCounts {
  __typename: "CompletionEmailWordCount";
  invitationId: string;
  wordCount: number | null;
}

export interface CompletionEmailWordCountsQuery {
  completionEmailWordCounts: CompletionEmailWordCountsQuery_completionEmailWordCounts[];
}

export interface CompletionEmailWordCountsQueryVariables {
  surveyId: string;
  scenarioId: string;
}
