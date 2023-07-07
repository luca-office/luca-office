/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ErpOrderCreation, DeliveryStatus, MimeType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateErpOrderMutation
// ====================================================

export interface CreateErpOrderMutation_createErpOrder_binaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface CreateErpOrderMutation_createErpOrder {
  __typename: "ErpOrder";
  id: number;
  cashbackInCents: number | null;
  discountInCents: number | null;
  deliveryChargeInCents: number;
  deliveryStatus: DeliveryStatus;
  deliveryDate: string;
  note: string | null;
  sampleCompanyId: string;
  customerId: number;
  employeeId: number;
  binaryFileId: string | null;
  binaryFile: CreateErpOrderMutation_createErpOrder_binaryFile | null;
}

export interface CreateErpOrderMutation {
  createErpOrder: CreateErpOrderMutation_createErpOrder;
}

export interface CreateErpOrderMutationVariables {
  creation: ErpOrderCreation;
}
