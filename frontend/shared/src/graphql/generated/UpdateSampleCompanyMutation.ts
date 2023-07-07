/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SampleCompanyUpdate, Salutation, FileUsageType, Relevance, MimeType, SpreadsheetCellType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateSampleCompanyMutation
// ====================================================

export interface UpdateSampleCompanyMutation_updateSampleCompany_author {
  __typename: "UserAccount";
  id: string;
  createdAt: string;
  modifiedAt: string;
  email: string;
  firstName: string;
  lastName: string;
  organization: string;
  salutation: Salutation;
  mayAdministrateUserAccounts: boolean;
  mayAdministrateRScripts: boolean;
  mayArchive: boolean;
  mayFinalizeWithoutPublishing: boolean;
}

export interface UpdateSampleCompanyMutation_updateSampleCompany_logoFile_binaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface UpdateSampleCompanyMutation_updateSampleCompany_logoFile_spreadsheet_cells {
  __typename: "SpreadsheetCell";
  id: string;
  rowIndex: number;
  columnIndex: number;
  cellType: SpreadsheetCellType;
  value: string;
  style: string | null;
  spreadsheetId: string;
}

export interface UpdateSampleCompanyMutation_updateSampleCompany_logoFile_spreadsheet {
  __typename: "Spreadsheet";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  cells: UpdateSampleCompanyMutation_updateSampleCompany_logoFile_spreadsheet_cells[];
}

export interface UpdateSampleCompanyMutation_updateSampleCompany_logoFile_textDocument {
  __typename: "TextDocument";
  id: string;
  createdAt: string;
  modifiedAt: string;
  content: string;
}

export interface UpdateSampleCompanyMutation_updateSampleCompany_logoFile {
  __typename: "File";
  id: string;
  createdAt: string;
  modifiedAt: string;
  usageType: FileUsageType;
  name: string;
  relevance: Relevance;
  tags: string[];
  directoryId: string | null;
  emailId: string | null;
  binaryFileId: string | null;
  spreadsheetId: string | null;
  binaryFile: UpdateSampleCompanyMutation_updateSampleCompany_logoFile_binaryFile | null;
  binaryFileUrl: string | null;
  spreadsheet: UpdateSampleCompanyMutation_updateSampleCompany_logoFile_spreadsheet | null;
  textDocumentId: string | null;
  textDocument: UpdateSampleCompanyMutation_updateSampleCompany_logoFile_textDocument | null;
}

export interface UpdateSampleCompanyMutation_updateSampleCompany_profileFile_binaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface UpdateSampleCompanyMutation_updateSampleCompany_profileFile_spreadsheet_cells {
  __typename: "SpreadsheetCell";
  id: string;
  rowIndex: number;
  columnIndex: number;
  cellType: SpreadsheetCellType;
  value: string;
  style: string | null;
  spreadsheetId: string;
}

export interface UpdateSampleCompanyMutation_updateSampleCompany_profileFile_spreadsheet {
  __typename: "Spreadsheet";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  cells: UpdateSampleCompanyMutation_updateSampleCompany_profileFile_spreadsheet_cells[];
}

export interface UpdateSampleCompanyMutation_updateSampleCompany_profileFile_textDocument {
  __typename: "TextDocument";
  id: string;
  createdAt: string;
  modifiedAt: string;
  content: string;
}

export interface UpdateSampleCompanyMutation_updateSampleCompany_profileFile {
  __typename: "File";
  id: string;
  createdAt: string;
  modifiedAt: string;
  usageType: FileUsageType;
  name: string;
  relevance: Relevance;
  tags: string[];
  directoryId: string | null;
  emailId: string | null;
  binaryFileId: string | null;
  spreadsheetId: string | null;
  binaryFile: UpdateSampleCompanyMutation_updateSampleCompany_profileFile_binaryFile | null;
  binaryFileUrl: string | null;
  spreadsheet: UpdateSampleCompanyMutation_updateSampleCompany_profileFile_spreadsheet | null;
  textDocumentId: string | null;
  textDocument: UpdateSampleCompanyMutation_updateSampleCompany_profileFile_textDocument | null;
}

export interface UpdateSampleCompanyMutation_updateSampleCompany {
  __typename: "SampleCompany";
  id: string;
  createdAt: string;
  modifiedAt: string;
  authorId: string;
  name: string;
  description: string;
  tags: string[];
  emailSignature: string | null;
  profileFileId: string | null;
  logoFileId: string | null;
  publishedAt: string | null;
  domain: string | null;
  archivedAt: string | null;
  author: UpdateSampleCompanyMutation_updateSampleCompany_author;
  directoryId: string;
  filesCount: number;
  erpRowsCount: number;
  logoFile: UpdateSampleCompanyMutation_updateSampleCompany_logoFile | null;
  profileFile: UpdateSampleCompanyMutation_updateSampleCompany_profileFile | null;
}

export interface UpdateSampleCompanyMutation {
  updateSampleCompany: UpdateSampleCompanyMutation_updateSampleCompany;
}

export interface UpdateSampleCompanyMutationVariables {
  id: string;
  update: SampleCompanyUpdate;
}
