/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReferenceBookContentType, MimeType } from "./globalTypes";

// ====================================================
// GraphQL query operation: ReferenceBookChapterQuery
// ====================================================

export interface ReferenceBookChapterQuery_referenceBookChapter_author {
  __typename: "UserAccount";
  id: string;
  firstName: string;
  lastName: string;
}

export interface ReferenceBookChapterQuery_referenceBookChapter_articles_contents_imageBinaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface ReferenceBookChapterQuery_referenceBookChapter_articles_contents_videoBinaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface ReferenceBookChapterQuery_referenceBookChapter_articles_contents_pdfBinaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface ReferenceBookChapterQuery_referenceBookChapter_articles_contents {
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
  imageBinaryFile: ReferenceBookChapterQuery_referenceBookChapter_articles_contents_imageBinaryFile | null;
  videoBinaryFile: ReferenceBookChapterQuery_referenceBookChapter_articles_contents_videoBinaryFile | null;
  pdfBinaryFile: ReferenceBookChapterQuery_referenceBookChapter_articles_contents_pdfBinaryFile | null;
}

export interface ReferenceBookChapterQuery_referenceBookChapter_articles {
  __typename: "ReferenceBookArticle";
  id: string;
  title: string;
  referenceBookChapterId: string;
  position: number;
  contents: ReferenceBookChapterQuery_referenceBookChapter_articles_contents[];
}

export interface ReferenceBookChapterQuery_referenceBookChapter {
  __typename: "ReferenceBookChapter";
  id: string;
  title: string;
  createdAt: string;
  description: string;
  author: ReferenceBookChapterQuery_referenceBookChapter_author;
  publishedAt: string | null;
  articles: ReferenceBookChapterQuery_referenceBookChapter_articles[];
}

export interface ReferenceBookChapterQuery {
  referenceBookChapter: ReferenceBookChapterQuery_referenceBookChapter | null;
}

export interface ReferenceBookChapterQueryVariables {
  id: string;
}
