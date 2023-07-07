/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReferenceBookContentType, MimeType } from "./globalTypes";

// ====================================================
// GraphQL fragment: ReferenceBookChapterFragment
// ====================================================

export interface ReferenceBookChapterFragment_author {
  __typename: "UserAccount";
  id: string;
  firstName: string;
  lastName: string;
}

export interface ReferenceBookChapterFragment_articles_contents_imageBinaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface ReferenceBookChapterFragment_articles_contents_videoBinaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface ReferenceBookChapterFragment_articles_contents_pdfBinaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface ReferenceBookChapterFragment_articles_contents {
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
  imageBinaryFile: ReferenceBookChapterFragment_articles_contents_imageBinaryFile | null;
  videoBinaryFile: ReferenceBookChapterFragment_articles_contents_videoBinaryFile | null;
  pdfBinaryFile: ReferenceBookChapterFragment_articles_contents_pdfBinaryFile | null;
}

export interface ReferenceBookChapterFragment_articles {
  __typename: "ReferenceBookArticle";
  id: string;
  title: string;
  referenceBookChapterId: string;
  position: number;
  contents: ReferenceBookChapterFragment_articles_contents[];
}

export interface ReferenceBookChapterFragment {
  __typename: "ReferenceBookChapter";
  id: string;
  title: string;
  createdAt: string;
  description: string;
  author: ReferenceBookChapterFragment_author;
  publishedAt: string | null;
  articles: ReferenceBookChapterFragment_articles[];
}
