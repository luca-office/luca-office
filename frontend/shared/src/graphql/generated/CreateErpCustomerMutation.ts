/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ErpCustomerCreation, Salutation, MimeType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateErpCustomerMutation
// ====================================================

export interface CreateErpCustomerMutation_createErpCustomer_binaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface CreateErpCustomerMutation_createErpCustomer {
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
  binaryFile: CreateErpCustomerMutation_createErpCustomer_binaryFile | null;
}

export interface CreateErpCustomerMutation {
  createErpCustomer: CreateErpCustomerMutation_createErpCustomer;
}

export interface CreateErpCustomerMutationVariables {
  creation: ErpCustomerCreation;
}
