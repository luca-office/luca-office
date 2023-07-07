/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Salutation, MimeType } from "./globalTypes";

// ====================================================
// GraphQL fragment: ErpSupplierFragment
// ====================================================

export interface ErpSupplierFragment_binaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface ErpSupplierFragment {
  __typename: "ErpSupplier";
  id: number;
  firstName: string;
  lastName: string;
  company: string;
  addressLine: string;
  postalCode: string;
  city: string;
  country: string;
  email: string;
  phone: string;
  note: string | null;
  sampleCompanyId: string;
  binaryFileId: string | null;
  salutation: Salutation;
  binaryFile: ErpSupplierFragment_binaryFile | null;
}
