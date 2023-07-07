/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReferenceBookArticleUpdate, ReferenceBookContentType, MimeType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateReferenceBookArticleMutation
// ====================================================

export interface UpdateReferenceBookArticleMutation_updateReferenceBookArticle_contents_imageBinaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface UpdateReferenceBookArticleMutation_updateReferenceBookArticle_contents_videoBinaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface UpdateReferenceBookArticleMutation_updateReferenceBookArticle_contents_pdfBinaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface UpdateReferenceBookArticleMutation_updateReferenceBookArticle_contents {
  __typename: "ReferenceBookContent";
  id: string;
  createdAt: string;
  modifiedAt: string;
  position: number;
  contentType: ReferenceBookContentType;
  text: string | null;
  imageBinaryFileId: string | null;
  videoBinaryFileId: string | null;
  referenceBookArticleId: string;
  pdfBinaryFileId: string | null;
  imageUrl: string | null;
  videoUrl: string | null;
  imageBinaryFile: UpdateReferenceBookArticleMutation_updateReferenceBookArticle_contents_imageBinaryFile | null;
  videoBinaryFile: UpdateReferenceBookArticleMutation_updateReferenceBookArticle_contents_videoBinaryFile | null;
  pdfBinaryFile: UpdateReferenceBookArticleMutation_updateReferenceBookArticle_contents_pdfBinaryFile | null;
}

export interface UpdateReferenceBookArticleMutation_updateReferenceBookArticle {
  __typename: "ReferenceBookArticle";
  id: string;
  title: string;
  referenceBookChapterId: string;
  position: number;
  contents: UpdateReferenceBookArticleMutation_updateReferenceBookArticle_contents[];
}

export interface UpdateReferenceBookArticleMutation {
  updateReferenceBookArticle: UpdateReferenceBookArticleMutation_updateReferenceBookArticle;
}

export interface UpdateReferenceBookArticleMutationVariables {
  id: string;
  update: ReferenceBookArticleUpdate;
}
