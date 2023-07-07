/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReferenceBookContentType, MimeType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: RepositionReferenceBookContentMutation
// ====================================================

export interface RepositionReferenceBookContentMutation_repositionReferenceBookContent_imageBinaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface RepositionReferenceBookContentMutation_repositionReferenceBookContent_videoBinaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface RepositionReferenceBookContentMutation_repositionReferenceBookContent_pdfBinaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface RepositionReferenceBookContentMutation_repositionReferenceBookContent {
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
  imageBinaryFile: RepositionReferenceBookContentMutation_repositionReferenceBookContent_imageBinaryFile | null;
  videoBinaryFile: RepositionReferenceBookContentMutation_repositionReferenceBookContent_videoBinaryFile | null;
  pdfBinaryFile: RepositionReferenceBookContentMutation_repositionReferenceBookContent_pdfBinaryFile | null;
}

export interface RepositionReferenceBookContentMutation {
  repositionReferenceBookContent: RepositionReferenceBookContentMutation_repositionReferenceBookContent;
}

export interface RepositionReferenceBookContentMutationVariables {
  id: string;
  predecessorId?: string | null;
}
