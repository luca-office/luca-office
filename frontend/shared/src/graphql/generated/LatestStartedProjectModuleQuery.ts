/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: LatestStartedProjectModuleQuery
// ====================================================

export interface LatestStartedProjectModuleQuery_latestStartedProjectModule {
  __typename: "ProjectModuleStart";
  projectModuleId: string;
  startedAt: string;
}

export interface LatestStartedProjectModuleQuery {
  latestStartedProjectModule: LatestStartedProjectModuleQuery_latestStartedProjectModule | null;
}

export interface LatestStartedProjectModuleQueryVariables {
  surveyId: string;
}
