/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MimeType } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetErpProductsForErpComponentQuery
// ====================================================

export interface GetErpProductsForErpComponentQuery_erpProductsForErpComponent_binaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface GetErpProductsForErpComponentQuery_erpProductsForErpComponent {
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
  binaryFile: GetErpProductsForErpComponentQuery_erpProductsForErpComponent_binaryFile | null;
}

export interface GetErpProductsForErpComponentQuery {
  erpProductsForErpComponent: GetErpProductsForErpComponentQuery_erpProductsForErpComponent[];
}

export interface GetErpProductsForErpComponentQueryVariables {
  componentId: number;
  sampleCompanyId: string;
}
