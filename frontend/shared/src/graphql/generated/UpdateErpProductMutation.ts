/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ErpProductUpdate, MimeType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateErpProductMutation
// ====================================================

export interface UpdateErpProductMutation_updateErpProduct_binaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface UpdateErpProductMutation_updateErpProduct {
  __typename: "ErpProduct";
  id: number;
  name: string;
  netPriceInCents: number;
  taxRate: number;
  sampleCompanyId: string;
  binaryFileId: string | null;
  unit: string;
  note: string | null;
  packSize: number;
  availableStock: number;
  stockCostPerUnitInCents: number;
  stockCostTotalInCents: number;
  binaryFile: UpdateErpProductMutation_updateErpProduct_binaryFile | null;
}

export interface UpdateErpProductMutation {
  updateErpProduct: UpdateErpProductMutation_updateErpProduct;
}

export interface UpdateErpProductMutationVariables {
  id: number;
  sampleCompanyId: string;
  update: ErpProductUpdate;
}
