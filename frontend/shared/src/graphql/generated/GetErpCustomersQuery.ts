/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Salutation, MimeType } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetErpCustomersQuery
// ====================================================

export interface GetErpCustomersQuery_erpCustomers_binaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface GetErpCustomersQuery_erpCustomers {
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
  binaryFile: GetErpCustomersQuery_erpCustomers_binaryFile | null;
}

export interface GetErpCustomersQuery {
  erpCustomers: GetErpCustomersQuery_erpCustomers[];
}

export interface GetErpCustomersQueryVariables {
  sampleCompanyId: string;
}
