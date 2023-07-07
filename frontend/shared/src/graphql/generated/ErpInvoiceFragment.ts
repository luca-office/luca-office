/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PaymentStatus, MimeType } from "./globalTypes";

// ====================================================
// GraphQL fragment: ErpInvoiceFragment
// ====================================================

export interface ErpInvoiceFragment_binaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface ErpInvoiceFragment {
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
  binaryFile: ErpInvoiceFragment_binaryFile | null;
}
