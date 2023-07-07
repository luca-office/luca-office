/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ErpCustomerUpdate, Salutation, MimeType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateErpCustomerMutation
// ====================================================

export interface UpdateErpCustomerMutation_updateErpCustomer_binaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface UpdateErpCustomerMutation_updateErpCustomer {
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
  binaryFile: UpdateErpCustomerMutation_updateErpCustomer_binaryFile | null;
}

export interface UpdateErpCustomerMutation {
  updateErpCustomer: UpdateErpCustomerMutation_updateErpCustomer;
}

export interface UpdateErpCustomerMutationVariables {
  id: number;
  sampleCompanyId: string;
  update: ErpCustomerUpdate;
}
