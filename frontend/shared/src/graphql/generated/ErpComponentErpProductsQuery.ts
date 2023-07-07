/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ErpComponentErpProductsQuery
// ====================================================

export interface ErpComponentErpProductsQuery_erpComponentErpProducts {
  __typename: "ErpComponentErpProduct";
  id: number;
  componentId: number;
  productId: number;
  sampleCompanyId: string;
  quantity: number;
}

export interface ErpComponentErpProductsQuery {
  erpComponentErpProducts: ErpComponentErpProductsQuery_erpComponentErpProducts[];
}

export interface ErpComponentErpProductsQueryVariables {
  sampleCompanyId: string;
}
