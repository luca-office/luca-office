/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ErpEmployeeUpdate, Salutation, EmploymentMode, FamilyStatus, MimeType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateErpEmployeeMutation
// ====================================================

export interface UpdateErpEmployeeMutation_updateErpEmployee_binaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface UpdateErpEmployeeMutation_updateErpEmployee {
  __typename: "ErpEmployee";
  id: number;
  salutation: Salutation;
  firstName: string;
  lastName: string;
  addressLine: string;
  postalCode: string;
  city: string;
  country: string;
  email: string | null;
  phone: string | null;
  department: string;
  jobTitle: string;
  employmentMode: EmploymentMode;
  employedAt: string;
  employmentEndsAt: string | null;
  site: string;
  graduation: string | null;
  furtherEducation: string[];
  taxClass: string;
  familyStatus: FamilyStatus;
  childCount: number | null;
  sampleCompanyId: string;
  binaryFileId: string | null;
  note: string | null;
  binaryFile: UpdateErpEmployeeMutation_updateErpEmployee_binaryFile | null;
}

export interface UpdateErpEmployeeMutation {
  updateErpEmployee: UpdateErpEmployeeMutation_updateErpEmployee;
}

export interface UpdateErpEmployeeMutationVariables {
  id: number;
  sampleCompanyId: string;
  update: ErpEmployeeUpdate;
}
