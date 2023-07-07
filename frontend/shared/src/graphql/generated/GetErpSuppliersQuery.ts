/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Salutation, MimeType } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetErpSuppliersQuery
// ====================================================

export interface GetErpSuppliersQuery_erpSuppliers_binaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface GetErpSuppliersQuery_erpSuppliers {
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
  binaryFile: GetErpSuppliersQuery_erpSuppliers_binaryFile | null;
}

export interface GetErpSuppliersQuery {
  erpSuppliers: GetErpSuppliersQuery_erpSuppliers[];
}

export interface GetErpSuppliersQueryVariables {
  sampleCompanyId: string;
}
