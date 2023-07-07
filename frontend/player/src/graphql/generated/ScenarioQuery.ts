/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ScenarioQuery
// ====================================================

export interface ScenarioQuery_scenario_sampleCompany {
  __typename: "SampleCompany";
  name: string;
}

export interface ScenarioQuery_scenario_author {
  __typename: "UserAccount";
  id: string;
  firstName: string;
  lastName: string;
}

export interface ScenarioQuery_scenario {
  __typename: "Scenario";
  id: string;
  date: string | null;
  name: string;
  description: string;
  maxDurationInSeconds: number | null;
  introductionEmailId: string | null;
  authorId: string;
  shouldDisplayTime: boolean;
  shouldHideReferenceBookChapters: boolean;
  sampleCompanyId: string | null;
  sampleCompany: ScenarioQuery_scenario_sampleCompany | null;
  completionEmailAddress: string | null;
  tags: string[];
  author: ScenarioQuery_scenario_author;
}

export interface ScenarioQuery {
  scenario: ScenarioQuery_scenario | null;
}

export interface ScenarioQueryVariables {
  id: string;
}
