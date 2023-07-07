/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReferenceBookContentCreation, ReferenceBookContentType, MimeType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateReferenceBookContentMutation
// ====================================================

export interface CreateReferenceBookContentMutation_createReferenceBookContent_imageBinaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface CreateReferenceBookContentMutation_createReferenceBookContent_videoBinaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface CreateReferenceBookContentMutation_createReferenceBookContent_pdfBinaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface CreateReferenceBookContentMutation_createReferenceBookContent {
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
  imageBinaryFile: CreateReferenceBookContentMutation_createReferenceBookContent_imageBinaryFile | null;
  videoBinaryFile: CreateReferenceBookContentMutation_createReferenceBookContent_videoBinaryFile | null;
  pdfBinaryFile: CreateReferenceBookContentMutation_createReferenceBookContent_pdfBinaryFile | null;
}

export interface CreateReferenceBookContentMutation {
  createReferenceBookContent: CreateReferenceBookContentMutation_createReferenceBookContent;
}

export interface CreateReferenceBookContentMutationVariables {
  creation: ReferenceBookContentCreation;
}
