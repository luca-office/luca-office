/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ErpOrderItemCreation, MimeType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateErpOrderItemMutation
// ====================================================

export interface CreateErpOrderItemMutation_createErpOrderItem_binaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface CreateErpOrderItemMutation_createErpOrderItem {
  __typename: "ErpOrderItem";
  id: number;
  quantity: number;
  sampleCompanyId: string;
  orderId: number;
  productId: number;
  totalNetInCents: number;
  binaryFileId: string | null;
  binaryFile: CreateErpOrderItemMutation_createErpOrderItem_binaryFile | null;
}

export interface CreateErpOrderItemMutation {
  createErpOrderItem: CreateErpOrderItemMutation_createErpOrderItem;
}

export interface CreateErpOrderItemMutationVariables {
  creation: ErpOrderItemCreation;
}
