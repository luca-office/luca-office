/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Relevance } from "./globalTypes";

// ====================================================
// GraphQL query operation: ScenarioErpInvoicesQuery
// ====================================================

export interface ScenarioErpInvoicesQuery_scenarioErpInvoices {
  __typename: "ScenarioErpInvoice";
  scenarioId: string;
  sampleCompanyId: string;
  invoiceId: number;
  relevance: Relevance;
}

export interface ScenarioErpInvoicesQuery {
  scenarioErpInvoices: ScenarioErpInvoicesQuery_scenarioErpInvoices[];
}

export interface ScenarioErpInvoicesQueryVariables {
  scenarioId: string;
}
