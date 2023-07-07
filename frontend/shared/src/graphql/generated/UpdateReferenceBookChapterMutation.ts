/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReferenceBookChapterUpdate, ReferenceBookContentType, MimeType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateReferenceBookChapterMutation
// ====================================================

export interface UpdateReferenceBookChapterMutation_updateReferenceBookChapter_author {
  __typename: "UserAccount";
  id: string;
  firstName: string;
  lastName: string;
}

export interface UpdateReferenceBookChapterMutation_updateReferenceBookChapter_articles_contents_imageBinaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface UpdateReferenceBookChapterMutation_updateReferenceBookChapter_articles_contents_videoBinaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface UpdateReferenceBookChapterMutation_updateReferenceBookChapter_articles_contents_pdfBinaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface UpdateReferenceBookChapterMutation_updateReferenceBookChapter_articles_contents {
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
  imageBinaryFile: UpdateReferenceBookChapterMutation_updateReferenceBookChapter_articles_contents_imageBinaryFile | null;
  videoBinaryFile: UpdateReferenceBookChapterMutation_updateReferenceBookChapter_articles_contents_videoBinaryFile | null;
  pdfBinaryFile: UpdateReferenceBookChapterMutation_updateReferenceBookChapter_articles_contents_pdfBinaryFile | null;
}

export interface UpdateReferenceBookChapterMutation_updateReferenceBookChapter_articles {
  __typename: "ReferenceBookArticle";
  id: string;
  title: string;
  referenceBookChapterId: string;
  position: number;
  contents: UpdateReferenceBookChapterMutation_updateReferenceBookChapter_articles_contents[];
}

export interface UpdateReferenceBookChapterMutation_updateReferenceBookChapter {
  __typename: "ReferenceBookChapter";
  id: string;
  title: string;
  createdAt: string;
  description: string;
  author: UpdateReferenceBookChapterMutation_updateReferenceBookChapter_author;
  publishedAt: string | null;
  articles: UpdateReferenceBookChapterMutation_updateReferenceBookChapter_articles[];
}

export interface UpdateReferenceBookChapterMutation {
  updateReferenceBookChapter: UpdateReferenceBookChapterMutation_updateReferenceBookChapter;
}

export interface UpdateReferenceBookChapterMutationVariables {
  id: string;
  update: ReferenceBookChapterUpdate;
}
