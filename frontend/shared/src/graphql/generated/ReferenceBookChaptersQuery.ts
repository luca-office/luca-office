/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReferenceBookContentType, MimeType } from "./globalTypes";

// ====================================================
// GraphQL query operation: ReferenceBookChaptersQuery
// ====================================================

export interface ReferenceBookChaptersQuery_referenceBookChapters_author {
  __typename: "UserAccount";
  id: string;
  firstName: string;
  lastName: string;
}

export interface ReferenceBookChaptersQuery_referenceBookChapters_articles_contents_imageBinaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface ReferenceBookChaptersQuery_referenceBookChapters_articles_contents_videoBinaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface ReferenceBookChaptersQuery_referenceBookChapters_articles_contents_pdfBinaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface ReferenceBookChaptersQuery_referenceBookChapters_articles_contents {
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
  imageBinaryFile: ReferenceBookChaptersQuery_referenceBookChapters_articles_contents_imageBinaryFile | null;
  videoBinaryFile: ReferenceBookChaptersQuery_referenceBookChapters_articles_contents_videoBinaryFile | null;
  pdfBinaryFile: ReferenceBookChaptersQuery_referenceBookChapters_articles_contents_pdfBinaryFile | null;
}

export interface ReferenceBookChaptersQuery_referenceBookChapters_articles {
  __typename: "ReferenceBookArticle";
  id: string;
  title: string;
  referenceBookChapterId: string;
  position: number;
  contents: ReferenceBookChaptersQuery_referenceBookChapters_articles_contents[];
}

export interface ReferenceBookChaptersQuery_referenceBookChapters {
  __typename: "ReferenceBookChapter";
  id: string;
  title: string;
  createdAt: string;
  description: string;
  author: ReferenceBookChaptersQuery_referenceBookChapters_author;
  publishedAt: string | null;
  articles: ReferenceBookChaptersQuery_referenceBookChapters_articles[];
}

export interface ReferenceBookChaptersQuery {
  referenceBookChapters: ReferenceBookChaptersQuery_referenceBookChapters[];
}
