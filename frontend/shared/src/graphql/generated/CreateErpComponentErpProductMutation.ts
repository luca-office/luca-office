/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ErpComponentErpProductCreation } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateErpComponentErpProductMutation
// ====================================================

export interface CreateErpComponentErpProductMutation_createErpComponentErpProduct {
  __typename: "ErpComponentErpProduct";
  id: number;
  componentId: number;
  productId: number;
  sampleCompanyId: string;
  quantity: number;
}

export interface CreateErpComponentErpProductMutation {
  createErpComponentErpProduct: CreateErpComponentErpProductMutation_createErpComponentErpProduct;
}

export interface CreateErpComponentErpProductMutationVariables {
  creation: ErpComponentErpProductCreation;
}
