/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Relevance, MimeType } from "./globalTypes";

// ====================================================
// GraphQL query operation: ScenarioDocumentsQuery
// ====================================================

export interface ScenarioDocumentsQuery_scenarioDocuments_emails {
  __typename: "Email";
  id: string;
  relevance: Relevance;
  sender: string | null;
  receptionDelayInSeconds: number;
}

export interface ScenarioDocumentsQuery_scenarioDocuments_files_spreadsheet {
  __typename: "Spreadsheet";
  id: string;
  filename: string;
}

export interface ScenarioDocumentsQuery_scenarioDocuments_files_textDocument {
  __typename: "TextDocument";
  id: string;
}

export interface ScenarioDocumentsQuery_scenarioDocuments_files_binaryFile {
  __typename: "BinaryFile";
  id: string;
  filename: string;
  mimeType: MimeType;
}

export interface ScenarioDocumentsQuery_scenarioDocuments_files {
  __typename: "File";
  id: string;
  emailId: string | null;
  relevance: Relevance;
  spreadsheetId: string | null;
  textDocumentId: string | null;
  binaryFileId: string | null;
  name: string;
  spreadsheet: ScenarioDocumentsQuery_scenarioDocuments_files_spreadsheet | null;
  textDocument: ScenarioDocumentsQuery_scenarioDocuments_files_textDocument | null;
  binaryFile: ScenarioDocumentsQuery_scenarioDocuments_files_binaryFile | null;
}

export interface ScenarioDocumentsQuery_scenarioDocuments_erpComponents {
  __typename: "ErpComponentRelevance";
  id: number;
  relevance: Relevance;
}

export interface ScenarioDocumentsQuery_scenarioDocuments_erpComponentErpProducts {
  __typename: "ErpComponentErpProductRelevance";
  id: number;
  relevance: Relevance;
}

export interface ScenarioDocumentsQuery_scenarioDocuments_erpCustomers {
  __typename: "ErpCustomerRelevance";
  id: number;
  relevance: Relevance;
}

export interface ScenarioDocumentsQuery_scenarioDocuments_erpEmployees {
  __typename: "ErpEmployeeRelevance";
  id: number;
  relevance: Relevance;
}

export interface ScenarioDocumentsQuery_scenarioDocuments_erpInvoices {
  __typename: "ErpInvoiceRelevance";
  id: number;
  relevance: Relevance;
}

export interface ScenarioDocumentsQuery_scenarioDocuments_erpOrders {
  __typename: "ErpOrderRelevance";
  id: number;
  relevance: Relevance;
}

export interface ScenarioDocumentsQuery_scenarioDocuments_erpOrderItems {
  __typename: "ErpOrderItemRelevance";
  id: number;
  relevance: Relevance;
}

export interface ScenarioDocumentsQuery_scenarioDocuments_erpProducts {
  __typename: "ErpProductRelevance";
  id: number;
  relevance: Relevance;
}

export interface ScenarioDocumentsQuery_scenarioDocuments_erpSuppliers {
  __typename: "ErpSupplierRelevance";
  id: number;
  relevance: Relevance;
}

export interface ScenarioDocumentsQuery_scenarioDocuments {
  __typename: "ScenarioDocuments";
  emails: ScenarioDocumentsQuery_scenarioDocuments_emails[];
  files: ScenarioDocumentsQuery_scenarioDocuments_files[];
  erpComponents: ScenarioDocumentsQuery_scenarioDocuments_erpComponents[];
  erpComponentErpProducts: ScenarioDocumentsQuery_scenarioDocuments_erpComponentErpProducts[];
  erpCustomers: ScenarioDocumentsQuery_scenarioDocuments_erpCustomers[];
  erpEmployees: ScenarioDocumentsQuery_scenarioDocuments_erpEmployees[];
  erpInvoices: ScenarioDocumentsQuery_scenarioDocuments_erpInvoices[];
  erpOrders: ScenarioDocumentsQuery_scenarioDocuments_erpOrders[];
  erpOrderItems: ScenarioDocumentsQuery_scenarioDocuments_erpOrderItems[];
  erpProducts: ScenarioDocumentsQuery_scenarioDocuments_erpProducts[];
  erpSuppliers: ScenarioDocumentsQuery_scenarioDocuments_erpSuppliers[];
}

export interface ScenarioDocumentsQuery {
  scenarioDocuments: ScenarioDocumentsQuery_scenarioDocuments;
}

export interface ScenarioDocumentsQueryVariables {
  scenarioId: string;
}
