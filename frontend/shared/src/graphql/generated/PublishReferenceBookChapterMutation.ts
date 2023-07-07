/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReferenceBookContentType, MimeType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: PublishReferenceBookChapterMutation
// ====================================================

export interface PublishReferenceBookChapterMutation_publishReferenceBookChapter_author {
  __typename: "UserAccount";
  id: string;
  firstName: string;
  lastName: string;
}

export interface PublishReferenceBookChapterMutation_publishReferenceBookChapter_articles_contents_imageBinaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface PublishReferenceBookChapterMutation_publishReferenceBookChapter_articles_contents_videoBinaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface PublishReferenceBookChapterMutation_publishReferenceBookChapter_articles_contents_pdfBinaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface PublishReferenceBookChapterMutation_publishReferenceBookChapter_articles_contents {
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
  imageBinaryFile: PublishReferenceBookChapterMutation_publishReferenceBookChapter_articles_contents_imageBinaryFile | null;
  videoBinaryFile: PublishReferenceBookChapterMutation_publishReferenceBookChapter_articles_contents_videoBinaryFile | null;
  pdfBinaryFile: PublishReferenceBookChapterMutation_publishReferenceBookChapter_articles_contents_pdfBinaryFile | null;
}

export interface PublishReferenceBookChapterMutation_publishReferenceBookChapter_articles {
  __typename: "ReferenceBookArticle";
  id: string;
  title: string;
  referenceBookChapterId: string;
  position: number;
  contents: PublishReferenceBookChapterMutation_publishReferenceBookChapter_articles_contents[];
}

export interface PublishReferenceBookChapterMutation_publishReferenceBookChapter {
  __typename: "ReferenceBookChapter";
  id: string;
  title: string;
  createdAt: string;
  description: string;
  author: PublishReferenceBookChapterMutation_publishReferenceBookChapter_author;
  publishedAt: string | null;
  articles: PublishReferenceBookChapterMutation_publishReferenceBookChapter_articles[];
}

export interface PublishReferenceBookChapterMutation {
  publishReferenceBookChapter: PublishReferenceBookChapterMutation_publishReferenceBookChapter;
}

export interface PublishReferenceBookChapterMutationVariables {
  id: string;
}
