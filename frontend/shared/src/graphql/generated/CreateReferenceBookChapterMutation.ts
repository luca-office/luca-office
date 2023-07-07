/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReferenceBookChapterCreation, ReferenceBookContentType, MimeType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateReferenceBookChapterMutation
// ====================================================

export interface CreateReferenceBookChapterMutation_createReferenceBookChapter_author {
  __typename: "UserAccount";
  id: string;
  firstName: string;
  lastName: string;
}

export interface CreateReferenceBookChapterMutation_createReferenceBookChapter_articles_contents_imageBinaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface CreateReferenceBookChapterMutation_createReferenceBookChapter_articles_contents_videoBinaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface CreateReferenceBookChapterMutation_createReferenceBookChapter_articles_contents_pdfBinaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface CreateReferenceBookChapterMutation_createReferenceBookChapter_articles_contents {
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
  imageBinaryFile: CreateReferenceBookChapterMutation_createReferenceBookChapter_articles_contents_imageBinaryFile | null;
  videoBinaryFile: CreateReferenceBookChapterMutation_createReferenceBookChapter_articles_contents_videoBinaryFile | null;
  pdfBinaryFile: CreateReferenceBookChapterMutation_createReferenceBookChapter_articles_contents_pdfBinaryFile | null;
}

export interface CreateReferenceBookChapterMutation_createReferenceBookChapter_articles {
  __typename: "ReferenceBookArticle";
  id: string;
  title: string;
  referenceBookChapterId: string;
  position: number;
  contents: CreateReferenceBookChapterMutation_createReferenceBookChapter_articles_contents[];
}

export interface CreateReferenceBookChapterMutation_createReferenceBookChapter {
  __typename: "ReferenceBookChapter";
  id: string;
  title: string;
  createdAt: string;
  description: string;
  author: CreateReferenceBookChapterMutation_createReferenceBookChapter_author;
  publishedAt: string | null;
  articles: CreateReferenceBookChapterMutation_createReferenceBookChapter_articles[];
}

export interface CreateReferenceBookChapterMutation {
  createReferenceBookChapter: CreateReferenceBookChapterMutation_createReferenceBookChapter;
}

export interface CreateReferenceBookChapterMutationVariables {
  creation: ReferenceBookChapterCreation;
}
