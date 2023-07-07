/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ErpOrderItemUpdate, MimeType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateErpOrderItemMutation
// ====================================================

export interface UpdateErpOrderItemMutation_updateErpOrderItem_binaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface UpdateErpOrderItemMutation_updateErpOrderItem {
  __typename: "ErpOrderItem";
  id: number;
  quantity: number;
  sampleCompanyId: string;
  orderId: number;
  productId: number;
  totalNetInCents: number;
  binaryFileId: string | null;
  binaryFile: UpdateErpOrderItemMutation_updateErpOrderItem_binaryFile | null;
}

export interface UpdateErpOrderItemMutation {
  updateErpOrderItem: UpdateErpOrderItemMutation_updateErpOrderItem;
}

export interface UpdateErpOrderItemMutationVariables {
  id: number;
  sampleCompanyId: string;
  update: ErpOrderItemUpdate;
}
