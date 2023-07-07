/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ErpComponentCreation, MimeType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateErpComponentMutation
// ====================================================

export interface CreateErpComponentMutation_createErpComponent_binaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface CreateErpComponentMutation_createErpComponent {
  __typename: "ErpComponent";
  id: number;
  name: string;
  category: string;
  purchasingPriceInCents: number;
  margin: number;
  sampleCompanyId: string;
  supplierId: number;
  packSize: number;
  availableStock: number;
  stockCostPerUnitInCents: number;
  stockCostTotalInCents: number;
  binaryFileId: string | null;
  unit: string;
  note: string | null;
  binaryFile: CreateErpComponentMutation_createErpComponent_binaryFile | null;
}

export interface CreateErpComponentMutation {
  createErpComponent: CreateErpComponentMutation_createErpComponent;
}

export interface CreateErpComponentMutationVariables {
  creation: ErpComponentCreation;
}
