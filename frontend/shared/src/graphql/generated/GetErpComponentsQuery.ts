/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MimeType } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetErpComponentsQuery
// ====================================================

export interface GetErpComponentsQuery_erpComponents_binaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface GetErpComponentsQuery_erpComponents {
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
  binaryFile: GetErpComponentsQuery_erpComponents_binaryFile | null;
}

export interface GetErpComponentsQuery {
  erpComponents: GetErpComponentsQuery_erpComponents[];
}

export interface GetErpComponentsQueryVariables {
  sampleCompanyId: string;
}
