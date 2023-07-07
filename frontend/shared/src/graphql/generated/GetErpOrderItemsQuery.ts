/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MimeType } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetErpOrderItemsQuery
// ====================================================

export interface GetErpOrderItemsQuery_erpOrderItems_binaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface GetErpOrderItemsQuery_erpOrderItems {
  __typename: "ErpOrderItem";
  id: number;
  quantity: number;
  sampleCompanyId: string;
  orderId: number;
  productId: number;
  totalNetInCents: number;
  binaryFileId: string | null;
  binaryFile: GetErpOrderItemsQuery_erpOrderItems_binaryFile | null;
}

export interface GetErpOrderItemsQuery {
  erpOrderItems: GetErpOrderItemsQuery_erpOrderItems[];
}

export interface GetErpOrderItemsQueryVariables {
  sampleCompanyId: string;
}
