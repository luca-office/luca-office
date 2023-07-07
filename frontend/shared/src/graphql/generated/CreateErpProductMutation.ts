/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ErpProductCreation, MimeType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateErpProductMutation
// ====================================================

export interface CreateErpProductMutation_createErpProduct_binaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface CreateErpProductMutation_createErpProduct {
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
  binaryFile: CreateErpProductMutation_createErpProduct_binaryFile | null;
}

export interface CreateErpProductMutation {
  createErpProduct: CreateErpProductMutation_createErpProduct;
}

export interface CreateErpProductMutationVariables {
  creation: ErpProductCreation;
}
