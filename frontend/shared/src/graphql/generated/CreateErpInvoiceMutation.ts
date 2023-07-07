/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ErpInvoiceCreation, PaymentStatus, MimeType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateErpInvoiceMutation
// ====================================================

export interface CreateErpInvoiceMutation_createErpInvoice_binaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface CreateErpInvoiceMutation_createErpInvoice {
  __typename: "ErpInvoice";
  id: number;
  invoiceDate: string;
  dueDate: string;
  paymentTerms: string;
  amountPaidInCents: number | null;
  paymentStatus: PaymentStatus;
  reminderFeeInCents: number | null;
  defaultChargesInCents: number | null;
  note: string | null;
  sampleCompanyId: string;
  orderId: number;
  totalNetInCents: number;
  totalGrossInCents: number;
  taxAmountInCents: number;
  binaryFileId: string | null;
  binaryFile: CreateErpInvoiceMutation_createErpInvoice_binaryFile | null;
}

export interface CreateErpInvoiceMutation {
  createErpInvoice: CreateErpInvoiceMutation_createErpInvoice;
}

export interface CreateErpInvoiceMutationVariables {
  creation: ErpInvoiceCreation;
}
