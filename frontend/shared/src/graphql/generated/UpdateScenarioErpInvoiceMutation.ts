/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ScenarioErpInvoiceUpdate, Relevance } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateScenarioErpInvoiceMutation
// ====================================================

export interface UpdateScenarioErpInvoiceMutation_updateScenarioErpInvoice {
  __typename: "ScenarioErpInvoice";
  scenarioId: string;
  sampleCompanyId: string;
  invoiceId: number;
  relevance: Relevance;
}

export interface UpdateScenarioErpInvoiceMutation {
  updateScenarioErpInvoice: UpdateScenarioErpInvoiceMutation_updateScenarioErpInvoice;
}

export interface UpdateScenarioErpInvoiceMutationVariables {
  scenarioId: string;
  invoiceId: number;
  update: ScenarioErpInvoiceUpdate;
}
