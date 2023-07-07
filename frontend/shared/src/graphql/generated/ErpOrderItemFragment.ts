/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MimeType } from "./globalTypes";

// ====================================================
// GraphQL fragment: ErpOrderItemFragment
// ====================================================

export interface ErpOrderItemFragment_binaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface ErpOrderItemFragment {
  __typename: "ErpOrderItem";
  id: number;
  quantity: number;
  sampleCompanyId: string;
  orderId: number;
  productId: number;
  totalNetInCents: number;
  binaryFileId: string | null;
  binaryFile: ErpOrderItemFragment_binaryFile | null;
}
