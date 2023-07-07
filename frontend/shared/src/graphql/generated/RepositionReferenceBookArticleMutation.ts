/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReferenceBookContentType, MimeType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: RepositionReferenceBookArticleMutation
// ====================================================

export interface RepositionReferenceBookArticleMutation_repositionReferenceBookArticle_contents_imageBinaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface RepositionReferenceBookArticleMutation_repositionReferenceBookArticle_contents_videoBinaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface RepositionReferenceBookArticleMutation_repositionReferenceBookArticle_contents_pdfBinaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface RepositionReferenceBookArticleMutation_repositionReferenceBookArticle_contents {
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
  imageBinaryFile: RepositionReferenceBookArticleMutation_repositionReferenceBookArticle_contents_imageBinaryFile | null;
  videoBinaryFile: RepositionReferenceBookArticleMutation_repositionReferenceBookArticle_contents_videoBinaryFile | null;
  pdfBinaryFile: RepositionReferenceBookArticleMutation_repositionReferenceBookArticle_contents_pdfBinaryFile | null;
}

export interface RepositionReferenceBookArticleMutation_repositionReferenceBookArticle {
  __typename: "ReferenceBookArticle";
  id: string;
  title: string;
  referenceBookChapterId: string;
  position: number;
  contents: RepositionReferenceBookArticleMutation_repositionReferenceBookArticle_contents[];
}

export interface RepositionReferenceBookArticleMutation {
  repositionReferenceBookArticle: RepositionReferenceBookArticleMutation_repositionReferenceBookArticle;
}

export interface RepositionReferenceBookArticleMutationVariables {
  id: string;
  predecessorId?: string | null;
}
