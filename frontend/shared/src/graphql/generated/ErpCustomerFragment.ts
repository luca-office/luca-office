/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Salutation, MimeType } from "./globalTypes";

// ====================================================
// GraphQL fragment: ErpCustomerFragment
// ====================================================

export interface ErpCustomerFragment_binaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface ErpCustomerFragment {
  __typename: "ErpCustomer";
  id: number;
  salutation: Salutation;
  firstName: string;
  lastName: string;
  company: string | null;
  addressLine: string;
  postalCode: string;
  city: string;
  country: string;
  email: string | null;
  phone: string | null;
  note: string | null;
  sampleCompanyId: string;
  binaryFileId: string | null;
  binaryFile: ErpCustomerFragment_binaryFile | null;
}
