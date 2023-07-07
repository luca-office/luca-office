/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MimeType } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetErpComponentsForErpProductQuery
// ====================================================

export interface GetErpComponentsForErpProductQuery_erpComponentsForErpProduct_binaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface GetErpComponentsForErpProductQuery_erpComponentsForErpProduct {
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
  binaryFile: GetErpComponentsForErpProductQuery_erpComponentsForErpProduct_binaryFile | null;
}

export interface GetErpComponentsForErpProductQuery {
  erpComponentsForErpProduct: GetErpComponentsForErpProductQuery_erpComponentsForErpProduct[];
}

export interface GetErpComponentsForErpProductQueryVariables {
  productId: number;
  sampleCompanyId: string;
}
