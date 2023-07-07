/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ErpSupplierCreation, Salutation, MimeType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateErpSupplierMutation
// ====================================================

export interface CreateErpSupplierMutation_createErpSupplier_binaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface CreateErpSupplierMutation_createErpSupplier {
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
  binaryFile: CreateErpSupplierMutation_createErpSupplier_binaryFile | null;
}

export interface CreateErpSupplierMutation {
  createErpSupplier: CreateErpSupplierMutation_createErpSupplier;
}

export interface CreateErpSupplierMutationVariables {
  creation: ErpSupplierCreation;
}
