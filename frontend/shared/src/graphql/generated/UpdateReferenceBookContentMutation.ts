/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReferenceBookContentUpdate, ReferenceBookContentType, MimeType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateReferenceBookContentMutation
// ====================================================

export interface UpdateReferenceBookContentMutation_updateReferenceBookContent_imageBinaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface UpdateReferenceBookContentMutation_updateReferenceBookContent_videoBinaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface UpdateReferenceBookContentMutation_updateReferenceBookContent_pdfBinaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface UpdateReferenceBookContentMutation_updateReferenceBookContent {
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
  imageBinaryFile: UpdateReferenceBookContentMutation_updateReferenceBookContent_imageBinaryFile | null;
  videoBinaryFile: UpdateReferenceBookContentMutation_updateReferenceBookContent_videoBinaryFile | null;
  pdfBinaryFile: UpdateReferenceBookContentMutation_updateReferenceBookContent_pdfBinaryFile | null;
}

export interface UpdateReferenceBookContentMutation {
  updateReferenceBookContent: UpdateReferenceBookContentMutation_updateReferenceBookContent;
}

export interface UpdateReferenceBookContentMutationVariables {
  id: string;
  update: ReferenceBookContentUpdate;
}
