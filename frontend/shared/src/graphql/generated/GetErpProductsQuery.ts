/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MimeType } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetErpProductsQuery
// ====================================================

export interface GetErpProductsQuery_erpProducts_binaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface GetErpProductsQuery_erpProducts {
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
  binaryFile: GetErpProductsQuery_erpProducts_binaryFile | null;
}

export interface GetErpProductsQuery {
  erpProducts: GetErpProductsQuery_erpProducts[];
}

export interface GetErpProductsQueryVariables {
  sampleCompanyId: string;
}
