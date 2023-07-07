/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ErpInvoiceUpdate, PaymentStatus, MimeType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateErpInvoiceMutation
// ====================================================

export interface UpdateErpInvoiceMutation_updateErpInvoice_binaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface UpdateErpInvoiceMutation_updateErpInvoice {
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
  binaryFile: UpdateErpInvoiceMutation_updateErpInvoice_binaryFile | null;
}

export interface UpdateErpInvoiceMutation {
  updateErpInvoice: UpdateErpInvoiceMutation_updateErpInvoice;
}

export interface UpdateErpInvoiceMutationVariables {
  id: number;
  sampleCompanyId: string;
  update: ErpInvoiceUpdate;
}
