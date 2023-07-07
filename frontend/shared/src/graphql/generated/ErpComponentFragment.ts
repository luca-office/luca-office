/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MimeType } from "./globalTypes";

// ====================================================
// GraphQL fragment: ErpComponentFragment
// ====================================================

export interface ErpComponentFragment_binaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface ErpComponentFragment {
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
  binaryFile: ErpComponentFragment_binaryFile | null;
}
