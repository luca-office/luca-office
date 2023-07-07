/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReferenceBookArticleCreation, ReferenceBookContentType, MimeType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateReferenceBookArticleMutation
// ====================================================

export interface CreateReferenceBookArticleMutation_createReferenceBookArticle_contents_imageBinaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface CreateReferenceBookArticleMutation_createReferenceBookArticle_contents_videoBinaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface CreateReferenceBookArticleMutation_createReferenceBookArticle_contents_pdfBinaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface CreateReferenceBookArticleMutation_createReferenceBookArticle_contents {
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
  imageBinaryFile: CreateReferenceBookArticleMutation_createReferenceBookArticle_contents_imageBinaryFile | null;
  videoBinaryFile: CreateReferenceBookArticleMutation_createReferenceBookArticle_contents_videoBinaryFile | null;
  pdfBinaryFile: CreateReferenceBookArticleMutation_createReferenceBookArticle_contents_pdfBinaryFile | null;
}

export interface CreateReferenceBookArticleMutation_createReferenceBookArticle {
  __typename: "ReferenceBookArticle";
  id: string;
  title: string;
  referenceBookChapterId: string;
  position: number;
  contents: CreateReferenceBookArticleMutation_createReferenceBookArticle_contents[];
}

export interface CreateReferenceBookArticleMutation {
  createReferenceBookArticle: CreateReferenceBookArticleMutation_createReferenceBookArticle;
}

export interface CreateReferenceBookArticleMutationVariables {
  creation: ReferenceBookArticleCreation;
}
