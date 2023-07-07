/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeliveryStatus, MimeType } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetErpOrdersQuery
// ====================================================

export interface GetErpOrdersQuery_erpOrders_binaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface GetErpOrdersQuery_erpOrders {
  __typename: "ErpOrder";
  id: number;
  cashbackInCents: number | null;
  discountInCents: number | null;
  deliveryChargeInCents: number;
  deliveryStatus: DeliveryStatus;
  deliveryDate: string;
  note: string | null;
  sampleCompanyId: string;
  customerId: number;
  employeeId: number;
  binaryFileId: string | null;
  binaryFile: GetErpOrdersQuery_erpOrders_binaryFile | null;
}

export interface GetErpOrdersQuery {
  erpOrders: GetErpOrdersQuery_erpOrders[];
}

export interface GetErpOrdersQueryVariables {
  sampleCompanyId: string;
}
