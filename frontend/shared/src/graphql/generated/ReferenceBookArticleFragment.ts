/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReferenceBookContentType, MimeType } from "./globalTypes";

// ====================================================
// GraphQL fragment: ReferenceBookArticleFragment
// ====================================================

export interface ReferenceBookArticleFragment_contents_imageBinaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface ReferenceBookArticleFragment_contents_videoBinaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface ReferenceBookArticleFragment_contents_pdfBinaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface ReferenceBookArticleFragment_contents {
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
  imageBinaryFile: ReferenceBookArticleFragment_contents_imageBinaryFile | null;
  videoBinaryFile: ReferenceBookArticleFragment_contents_videoBinaryFile | null;
  pdfBinaryFile: ReferenceBookArticleFragment_contents_pdfBinaryFile | null;
}

export interface ReferenceBookArticleFragment {
  __typename: "ReferenceBookArticle";
  id: string;
  title: string;
  referenceBookChapterId: string;
  position: number;
  contents: ReferenceBookArticleFragment_contents[];
}
