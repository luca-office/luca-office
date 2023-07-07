/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReferenceBookContentType, MimeType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: ArchiveReferenceBookChapterMutation
// ====================================================

export interface ArchiveReferenceBookChapterMutation_archiveReferenceBookChapter_author {
  __typename: "UserAccount";
  id: string;
  firstName: string;
  lastName: string;
}

export interface ArchiveReferenceBookChapterMutation_archiveReferenceBookChapter_articles_contents_imageBinaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface ArchiveReferenceBookChapterMutation_archiveReferenceBookChapter_articles_contents_videoBinaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface ArchiveReferenceBookChapterMutation_archiveReferenceBookChapter_articles_contents_pdfBinaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface ArchiveReferenceBookChapterMutation_archiveReferenceBookChapter_articles_contents {
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
  imageBinaryFile: ArchiveReferenceBookChapterMutation_archiveReferenceBookChapter_articles_contents_imageBinaryFile | null;
  videoBinaryFile: ArchiveReferenceBookChapterMutation_archiveReferenceBookChapter_articles_contents_videoBinaryFile | null;
  pdfBinaryFile: ArchiveReferenceBookChapterMutation_archiveReferenceBookChapter_articles_contents_pdfBinaryFile | null;
}

export interface ArchiveReferenceBookChapterMutation_archiveReferenceBookChapter_articles {
  __typename: "ReferenceBookArticle";
  id: string;
  title: string;
  referenceBookChapterId: string;
  position: number;
  contents: ArchiveReferenceBookChapterMutation_archiveReferenceBookChapter_articles_contents[];
}

export interface ArchiveReferenceBookChapterMutation_archiveReferenceBookChapter {
  __typename: "ReferenceBookChapter";
  id: string;
  title: string;
  createdAt: string;
  description: string;
  author: ArchiveReferenceBookChapterMutation_archiveReferenceBookChapter_author;
  publishedAt: string | null;
  articles: ArchiveReferenceBookChapterMutation_archiveReferenceBookChapter_articles[];
}

export interface ArchiveReferenceBookChapterMutation {
  archiveReferenceBookChapter: ArchiveReferenceBookChapterMutation_archiveReferenceBookChapter;
}

export interface ArchiveReferenceBookChapterMutationVariables {
  id: string;
}
