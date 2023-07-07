/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ScenarioErpInvoiceCreation, Relevance } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateScenarioErpInvoiceMutation
// ====================================================

export interface CreateScenarioErpInvoiceMutation_createScenarioErpInvoice {
  __typename: "ScenarioErpInvoice";
  scenarioId: string;
  sampleCompanyId: string;
  invoiceId: number;
  relevance: Relevance;
}

export interface CreateScenarioErpInvoiceMutation {
  createScenarioErpInvoice: CreateScenarioErpInvoiceMutation_createScenarioErpInvoice;
}

export interface CreateScenarioErpInvoiceMutationVariables {
  creation: ScenarioErpInvoiceCreation;
}
