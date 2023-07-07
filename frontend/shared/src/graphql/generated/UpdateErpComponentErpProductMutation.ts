/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ErpComponentErpProductUpdate } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateErpComponentErpProductMutation
// ====================================================

export interface UpdateErpComponentErpProductMutation_updateErpComponentErpProduct {
  __typename: "ErpComponentErpProduct";
  id: number;
  componentId: number;
  productId: number;
  sampleCompanyId: string;
  quantity: number;
}

export interface UpdateErpComponentErpProductMutation {
  updateErpComponentErpProduct: UpdateErpComponentErpProductMutation_updateErpComponentErpProduct;
}

export interface UpdateErpComponentErpProductMutationVariables {
  id: number;
  sampleCompanyId: string;
  update: ErpComponentErpProductUpdate;
}
