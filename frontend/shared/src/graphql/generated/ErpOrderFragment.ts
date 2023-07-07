/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeliveryStatus, MimeType } from "./globalTypes";

// ====================================================
// GraphQL fragment: ErpOrderFragment
// ====================================================

export interface ErpOrderFragment_binaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface ErpOrderFragment {
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
  binaryFile: ErpOrderFragment_binaryFile | null;
}
