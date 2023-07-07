/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ErpOrderUpdate, DeliveryStatus, MimeType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateErpOrderMutation
// ====================================================

export interface UpdateErpOrderMutation_updateErpOrder_binaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface UpdateErpOrderMutation_updateErpOrder {
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
  binaryFile: UpdateErpOrderMutation_updateErpOrder_binaryFile | null;
}

export interface UpdateErpOrderMutation {
  updateErpOrder: UpdateErpOrderMutation_updateErpOrder;
}

export interface UpdateErpOrderMutationVariables {
  id: number;
  sampleCompanyId: string;
  update: ErpOrderUpdate;
}
