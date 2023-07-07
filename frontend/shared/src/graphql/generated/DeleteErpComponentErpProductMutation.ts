/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteErpComponentErpProductMutation
// ====================================================

export interface DeleteErpComponentErpProductMutation_deleteErpComponentErpProduct {
  __typename: "ErpComponentErpProduct";
  id: number;
  componentId: number;
  productId: number;
  sampleCompanyId: string;
  quantity: number;
}

export interface DeleteErpComponentErpProductMutation {
  deleteErpComponentErpProduct: DeleteErpComponentErpProductMutation_deleteErpComponentErpProduct;
}

export interface DeleteErpComponentErpProductMutationVariables {
  id: number;
  sampleCompanyId: string;
}
