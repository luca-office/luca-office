/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Relevance } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: DeleteScenarioErpInvoiceMutation
// ====================================================

export interface DeleteScenarioErpInvoiceMutation_deleteScenarioErpInvoice {
  __typename: "ScenarioErpInvoice";
  scenarioId: string;
  sampleCompanyId: string;
  invoiceId: number;
  relevance: Relevance;
}

export interface DeleteScenarioErpInvoiceMutation {
  deleteScenarioErpInvoice: DeleteScenarioErpInvoiceMutation_deleteScenarioErpInvoice;
}

export interface DeleteScenarioErpInvoiceMutationVariables {
  scenarioId: string;
  invoiceId: number;
}
