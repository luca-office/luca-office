/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ErpComponentUpdate, MimeType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateErpComponentMutation
// ====================================================

export interface UpdateErpComponentMutation_updateErpComponent_binaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface UpdateErpComponentMutation_updateErpComponent {
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
  binaryFile: UpdateErpComponentMutation_updateErpComponent_binaryFile | null;
}

export interface UpdateErpComponentMutation {
  updateErpComponent: UpdateErpComponentMutation_updateErpComponent;
}

export interface UpdateErpComponentMutationVariables {
  id: number;
  sampleCompanyId: string;
  update: ErpComponentUpdate;
}
