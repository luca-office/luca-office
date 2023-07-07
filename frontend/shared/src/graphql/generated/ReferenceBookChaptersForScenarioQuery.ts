/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReferenceBookContentType, MimeType } from "./globalTypes";

// ====================================================
// GraphQL query operation: ReferenceBookChaptersForScenarioQuery
// ====================================================

export interface ReferenceBookChaptersForScenarioQuery_referenceBookChaptersForScenario_author {
  __typename: "UserAccount";
  id: string;
  firstName: string;
  lastName: string;
}

export interface ReferenceBookChaptersForScenarioQuery_referenceBookChaptersForScenario_articles_contents_imageBinaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface ReferenceBookChaptersForScenarioQuery_referenceBookChaptersForScenario_articles_contents_videoBinaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface ReferenceBookChaptersForScenarioQuery_referenceBookChaptersForScenario_articles_contents_pdfBinaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface ReferenceBookChaptersForScenarioQuery_referenceBookChaptersForScenario_articles_contents {
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
  imageBinaryFile: ReferenceBookChaptersForScenarioQuery_referenceBookChaptersForScenario_articles_contents_imageBinaryFile | null;
  videoBinaryFile: ReferenceBookChaptersForScenarioQuery_referenceBookChaptersForScenario_articles_contents_videoBinaryFile | null;
  pdfBinaryFile: ReferenceBookChaptersForScenarioQuery_referenceBookChaptersForScenario_articles_contents_pdfBinaryFile | null;
}

export interface ReferenceBookChaptersForScenarioQuery_referenceBookChaptersForScenario_articles {
  __typename: "ReferenceBookArticle";
  id: string;
  title: string;
  referenceBookChapterId: string;
  position: number;
  contents: ReferenceBookChaptersForScenarioQuery_referenceBookChaptersForScenario_articles_contents[];
}

export interface ReferenceBookChaptersForScenarioQuery_referenceBookChaptersForScenario {
  __typename: "ReferenceBookChapter";
  id: string;
  title: string;
  createdAt: string;
  description: string;
  author: ReferenceBookChaptersForScenarioQuery_referenceBookChaptersForScenario_author;
  publishedAt: string | null;
  articles: ReferenceBookChaptersForScenarioQuery_referenceBookChaptersForScenario_articles[];
}

export interface ReferenceBookChaptersForScenarioQuery {
  referenceBookChaptersForScenario: ReferenceBookChaptersForScenarioQuery_referenceBookChaptersForScenario[];
}

export interface ReferenceBookChaptersForScenarioQueryVariables {
  scenarioId: string;
}
