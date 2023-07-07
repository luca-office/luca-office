/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ErpSupplierUpdate, Salutation, MimeType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateErpSupplierMutation
// ====================================================

export interface UpdateErpSupplierMutation_updateErpSupplier_binaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface UpdateErpSupplierMutation_updateErpSupplier {
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
  binaryFile: UpdateErpSupplierMutation_updateErpSupplier_binaryFile | null;
}

export interface UpdateErpSupplierMutation {
  updateErpSupplier: UpdateErpSupplierMutation_updateErpSupplier;
}

export interface UpdateErpSupplierMutationVariables {
  id: number;
  sampleCompanyId: string;
  update: ErpSupplierUpdate;
}
