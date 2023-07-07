/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Relevance } from "./globalTypes";

// ====================================================
// GraphQL query operation: ScenarioErpSuppliersQuery
// ====================================================

export interface ScenarioErpSuppliersQuery_scenarioErpSuppliers {
  __typename: "ScenarioErpSupplier";
  scenarioId: string;
  sampleCompanyId: string;
  supplierId: number;
  relevance: Relevance;
}

export interface ScenarioErpSuppliersQuery {
  scenarioErpSuppliers: ScenarioErpSuppliersQuery_scenarioErpSuppliers[];
}

export interface ScenarioErpSuppliersQueryVariables {
  scenarioId: string;
}
