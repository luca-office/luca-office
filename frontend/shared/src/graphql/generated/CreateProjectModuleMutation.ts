/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProjectModuleCreation, ProjectModuleType, Salutation, EmailDirectory, Relevance, FileUsageType, MimeType, SpreadsheetCellType, QuestionnaireType, QuestionType, QuestionScoringType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateProjectModuleMutation
// ====================================================

export interface CreateProjectModuleMutation_createProjectModule_scenario_author {
  __typename: "UserAccount";
  id: string;
  createdAt: string;
  modifiedAt: string;
  email: string;
  firstName: string;
  lastName: string;
  organization: string;
  salutation: Salutation;
  mayAdministrateUserAccounts: boolean;
  mayAdministrateRScripts: boolean;
  mayArchive: boolean;
  mayFinalizeWithoutPublishing: boolean;
}

export interface CreateProjectModuleMutation_createProjectModule_scenario_introductionEmail {
  __typename: "Email";
  id: string;
  createdAt: string;
  modifiedAt: string;
  sender: string | null;
  recipient: string | null;
  ccRecipients: string[];
  subject: string;
  directory: EmailDirectory;
  receptionDelayInSeconds: number;
  isInitiallyRead: boolean;
  relevance: Relevance;
  message: string;
  scenarioId: string;
}

export interface CreateProjectModuleMutation_createProjectModule_scenario_sampleCompany_author {
  __typename: "UserAccount";
  id: string;
  createdAt: string;
  modifiedAt: string;
  email: string;
  firstName: string;
  lastName: string;
  organization: string;
  salutation: Salutation;
  mayAdministrateUserAccounts: boolean;
  mayAdministrateRScripts: boolean;
  mayArchive: boolean;
  mayFinalizeWithoutPublishing: boolean;
}

export interface CreateProjectModuleMutation_createProjectModule_scenario_sampleCompany_logoFile_binaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface CreateProjectModuleMutation_createProjectModule_scenario_sampleCompany_logoFile_spreadsheet_cells {
  __typename: "SpreadsheetCell";
  id: string;
  rowIndex: number;
  columnIndex: number;
  cellType: SpreadsheetCellType;
  value: string;
  style: string | null;
  spreadsheetId: string;
}

export interface CreateProjectModuleMutation_createProjectModule_scenario_sampleCompany_logoFile_spreadsheet {
  __typename: "Spreadsheet";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  cells: CreateProjectModuleMutation_createProjectModule_scenario_sampleCompany_logoFile_spreadsheet_cells[];
}

export interface CreateProjectModuleMutation_createProjectModule_scenario_sampleCompany_logoFile_textDocument {
  __typename: "TextDocument";
  id: string;
  createdAt: string;
  modifiedAt: string;
  content: string;
}

export interface CreateProjectModuleMutation_createProjectModule_scenario_sampleCompany_logoFile {
  __typename: "File";
  id: string;
  createdAt: string;
  modifiedAt: string;
  usageType: FileUsageType;
  name: string;
  relevance: Relevance;
  tags: string[];
  directoryId: string | null;
  emailId: string | null;
  binaryFileId: string | null;
  spreadsheetId: string | null;
  binaryFile: CreateProjectModuleMutation_createProjectModule_scenario_sampleCompany_logoFile_binaryFile | null;
  binaryFileUrl: string | null;
  spreadsheet: CreateProjectModuleMutation_createProjectModule_scenario_sampleCompany_logoFile_spreadsheet | null;
  textDocumentId: string | null;
  textDocument: CreateProjectModuleMutation_createProjectModule_scenario_sampleCompany_logoFile_textDocument | null;
}

export interface CreateProjectModuleMutation_createProjectModule_scenario_sampleCompany_profileFile_binaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface CreateProjectModuleMutation_createProjectModule_scenario_sampleCompany_profileFile_spreadsheet_cells {
  __typename: "SpreadsheetCell";
  id: string;
  rowIndex: number;
  columnIndex: number;
  cellType: SpreadsheetCellType;
  value: string;
  style: string | null;
  spreadsheetId: string;
}

export interface CreateProjectModuleMutation_createProjectModule_scenario_sampleCompany_profileFile_spreadsheet {
  __typename: "Spreadsheet";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  cells: CreateProjectModuleMutation_createProjectModule_scenario_sampleCompany_profileFile_spreadsheet_cells[];
}

export interface CreateProjectModuleMutation_createProjectModule_scenario_sampleCompany_profileFile_textDocument {
  __typename: "TextDocument";
  id: string;
  createdAt: string;
  modifiedAt: string;
  content: string;
}

export interface CreateProjectModuleMutation_createProjectModule_scenario_sampleCompany_profileFile {
  __typename: "File";
  id: string;
  createdAt: string;
  modifiedAt: string;
  usageType: FileUsageType;
  name: string;
  relevance: Relevance;
  tags: string[];
  directoryId: string | null;
  emailId: string | null;
  binaryFileId: string | null;
  spreadsheetId: string | null;
  binaryFile: CreateProjectModuleMutation_createProjectModule_scenario_sampleCompany_profileFile_binaryFile | null;
  binaryFileUrl: string | null;
  spreadsheet: CreateProjectModuleMutation_createProjectModule_scenario_sampleCompany_profileFile_spreadsheet | null;
  textDocumentId: string | null;
  textDocument: CreateProjectModuleMutation_createProjectModule_scenario_sampleCompany_profileFile_textDocument | null;
}

export interface CreateProjectModuleMutation_createProjectModule_scenario_sampleCompany {
  __typename: "SampleCompany";
  id: string;
  createdAt: string;
  modifiedAt: string;
  authorId: string;
  name: string;
  description: string;
  tags: string[];
  emailSignature: string | null;
  profileFileId: string | null;
  logoFileId: string | null;
  publishedAt: string | null;
  domain: string | null;
  archivedAt: string | null;
  author: CreateProjectModuleMutation_createProjectModule_scenario_sampleCompany_author;
  directoryId: string;
  filesCount: number;
  erpRowsCount: number;
  logoFile: CreateProjectModuleMutation_createProjectModule_scenario_sampleCompany_logoFile | null;
  profileFile: CreateProjectModuleMutation_createProjectModule_scenario_sampleCompany_profileFile | null;
}

export interface CreateProjectModuleMutation_createProjectModule_scenario_codingModel_scenario_author {
  __typename: "UserAccount";
  id: string;
  createdAt: string;
  modifiedAt: string;
  email: string;
  firstName: string;
  lastName: string;
  organization: string;
  salutation: Salutation;
  mayAdministrateUserAccounts: boolean;
  mayAdministrateRScripts: boolean;
  mayArchive: boolean;
  mayFinalizeWithoutPublishing: boolean;
}

export interface CreateProjectModuleMutation_createProjectModule_scenario_codingModel_scenario_introductionEmail {
  __typename: "Email";
  id: string;
  createdAt: string;
  modifiedAt: string;
  sender: string | null;
  recipient: string | null;
  ccRecipients: string[];
  subject: string;
  directory: EmailDirectory;
  receptionDelayInSeconds: number;
  isInitiallyRead: boolean;
  relevance: Relevance;
  message: string;
  scenarioId: string;
}

export interface CreateProjectModuleMutation_createProjectModule_scenario_codingModel_scenario_sampleCompany_author {
  __typename: "UserAccount";
  id: string;
  createdAt: string;
  modifiedAt: string;
  email: string;
  firstName: string;
  lastName: string;
  organization: string;
  salutation: Salutation;
  mayAdministrateUserAccounts: boolean;
  mayAdministrateRScripts: boolean;
  mayArchive: boolean;
  mayFinalizeWithoutPublishing: boolean;
}

export interface CreateProjectModuleMutation_createProjectModule_scenario_codingModel_scenario_sampleCompany_logoFile_binaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface CreateProjectModuleMutation_createProjectModule_scenario_codingModel_scenario_sampleCompany_logoFile_spreadsheet_cells {
  __typename: "SpreadsheetCell";
  id: string;
  rowIndex: number;
  columnIndex: number;
  cellType: SpreadsheetCellType;
  value: string;
  style: string | null;
  spreadsheetId: string;
}

export interface CreateProjectModuleMutation_createProjectModule_scenario_codingModel_scenario_sampleCompany_logoFile_spreadsheet {
  __typename: "Spreadsheet";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  cells: CreateProjectModuleMutation_createProjectModule_scenario_codingModel_scenario_sampleCompany_logoFile_spreadsheet_cells[];
}

export interface CreateProjectModuleMutation_createProjectModule_scenario_codingModel_scenario_sampleCompany_logoFile_textDocument {
  __typename: "TextDocument";
  id: string;
  createdAt: string;
  modifiedAt: string;
  content: string;
}

export interface CreateProjectModuleMutation_createProjectModule_scenario_codingModel_scenario_sampleCompany_logoFile {
  __typename: "File";
  id: string;
  createdAt: string;
  modifiedAt: string;
  usageType: FileUsageType;
  name: string;
  relevance: Relevance;
  tags: string[];
  directoryId: string | null;
  emailId: string | null;
  binaryFileId: string | null;
  spreadsheetId: string | null;
  binaryFile: CreateProjectModuleMutation_createProjectModule_scenario_codingModel_scenario_sampleCompany_logoFile_binaryFile | null;
  binaryFileUrl: string | null;
  spreadsheet: CreateProjectModuleMutation_createProjectModule_scenario_codingModel_scenario_sampleCompany_logoFile_spreadsheet | null;
  textDocumentId: string | null;
  textDocument: CreateProjectModuleMutation_createProjectModule_scenario_codingModel_scenario_sampleCompany_logoFile_textDocument | null;
}

export interface CreateProjectModuleMutation_createProjectModule_scenario_codingModel_scenario_sampleCompany_profileFile_binaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface CreateProjectModuleMutation_createProjectModule_scenario_codingModel_scenario_sampleCompany_profileFile_spreadsheet_cells {
  __typename: "SpreadsheetCell";
  id: string;
  rowIndex: number;
  columnIndex: number;
  cellType: SpreadsheetCellType;
  value: string;
  style: string | null;
  spreadsheetId: string;
}

export interface CreateProjectModuleMutation_createProjectModule_scenario_codingModel_scenario_sampleCompany_profileFile_spreadsheet {
  __typename: "Spreadsheet";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  cells: CreateProjectModuleMutation_createProjectModule_scenario_codingModel_scenario_sampleCompany_profileFile_spreadsheet_cells[];
}

export interface CreateProjectModuleMutation_createProjectModule_scenario_codingModel_scenario_sampleCompany_profileFile_textDocument {
  __typename: "TextDocument";
  id: string;
  createdAt: string;
  modifiedAt: string;
  content: string;
}

export interface CreateProjectModuleMutation_createProjectModule_scenario_codingModel_scenario_sampleCompany_profileFile {
  __typename: "File";
  id: string;
  createdAt: string;
  modifiedAt: string;
  usageType: FileUsageType;
  name: string;
  relevance: Relevance;
  tags: string[];
  directoryId: string | null;
  emailId: string | null;
  binaryFileId: string | null;
  spreadsheetId: string | null;
  binaryFile: CreateProjectModuleMutation_createProjectModule_scenario_codingModel_scenario_sampleCompany_profileFile_binaryFile | null;
  binaryFileUrl: string | null;
  spreadsheet: CreateProjectModuleMutation_createProjectModule_scenario_codingModel_scenario_sampleCompany_profileFile_spreadsheet | null;
  textDocumentId: string | null;
  textDocument: CreateProjectModuleMutation_createProjectModule_scenario_codingModel_scenario_sampleCompany_profileFile_textDocument | null;
}

export interface CreateProjectModuleMutation_createProjectModule_scenario_codingModel_scenario_sampleCompany {
  __typename: "SampleCompany";
  id: string;
  createdAt: string;
  modifiedAt: string;
  authorId: string;
  name: string;
  description: string;
  tags: string[];
  emailSignature: string | null;
  profileFileId: string | null;
  logoFileId: string | null;
  publishedAt: string | null;
  domain: string | null;
  archivedAt: string | null;
  author: CreateProjectModuleMutation_createProjectModule_scenario_codingModel_scenario_sampleCompany_author;
  directoryId: string;
  filesCount: number;
  erpRowsCount: number;
  logoFile: CreateProjectModuleMutation_createProjectModule_scenario_codingModel_scenario_sampleCompany_logoFile | null;
  profileFile: CreateProjectModuleMutation_createProjectModule_scenario_codingModel_scenario_sampleCompany_profileFile | null;
}

export interface CreateProjectModuleMutation_createProjectModule_scenario_codingModel_scenario {
  __typename: "Scenario";
  id: string;
  createdAt: string;
  modifiedAt: string;
  date: string | null;
  name: string;
  description: string;
  maxDurationInSeconds: number | null;
  introductionEmailId: string | null;
  authorId: string;
  shouldDisplayTime: boolean;
  finalizedAt: string | null;
  publishedAt: string | null;
  tags: string[];
  completionEmailAddress: string | null;
  shouldHideReferenceBookChapters: boolean;
  sampleCompanyId: string | null;
  archivedAt: string | null;
  author: CreateProjectModuleMutation_createProjectModule_scenario_codingModel_scenario_author;
  introductionEmail: CreateProjectModuleMutation_createProjectModule_scenario_codingModel_scenario_introductionEmail | null;
  sampleCompany: CreateProjectModuleMutation_createProjectModule_scenario_codingModel_scenario_sampleCompany | null;
}

export interface CreateProjectModuleMutation_createProjectModule_scenario_codingModel {
  __typename: "CodingModel";
  id: string;
  createdAt: string;
  modifiedAt: string;
  title: string;
  description: string;
  scenarioId: string;
  scenario: CreateProjectModuleMutation_createProjectModule_scenario_codingModel_scenario;
  dimensionsCount: number;
}

export interface CreateProjectModuleMutation_createProjectModule_scenario {
  __typename: "Scenario";
  id: string;
  createdAt: string;
  modifiedAt: string;
  date: string | null;
  name: string;
  description: string;
  maxDurationInSeconds: number | null;
  introductionEmailId: string | null;
  authorId: string;
  shouldDisplayTime: boolean;
  finalizedAt: string | null;
  publishedAt: string | null;
  tags: string[];
  completionEmailAddress: string | null;
  shouldHideReferenceBookChapters: boolean;
  sampleCompanyId: string | null;
  archivedAt: string | null;
  author: CreateProjectModuleMutation_createProjectModule_scenario_author;
  introductionEmail: CreateProjectModuleMutation_createProjectModule_scenario_introductionEmail | null;
  sampleCompany: CreateProjectModuleMutation_createProjectModule_scenario_sampleCompany | null;
  codingModel: CreateProjectModuleMutation_createProjectModule_scenario_codingModel | null;
}

export interface CreateProjectModuleMutation_createProjectModule_questionnaire_binaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface CreateProjectModuleMutation_createProjectModule_questionnaire_author {
  __typename: "UserAccount";
  id: string;
  createdAt: string;
  modifiedAt: string;
  email: string;
  firstName: string;
  lastName: string;
  organization: string;
  salutation: Salutation;
  mayAdministrateUserAccounts: boolean;
  mayAdministrateRScripts: boolean;
  mayArchive: boolean;
  mayFinalizeWithoutPublishing: boolean;
}

export interface CreateProjectModuleMutation_createProjectModule_questionnaire_questions_binaryFile {
  __typename: "BinaryFile";
  id: string;
  createdAt: string;
  modifiedAt: string;
  filename: string;
  fileSize: number;
  mimeType: MimeType;
  url: string;
}

export interface CreateProjectModuleMutation_createProjectModule_questionnaire_questions_answers {
  __typename: "QuestionnaireAnswer";
  id: string;
  createdAt: string;
  modifiedAt: string;
  text: string;
  questionId: string;
  isCorrect: boolean;
  position: number;
}

export interface CreateProjectModuleMutation_createProjectModule_questionnaire_questions_freetextQuestionCodingCriteria {
  __typename: "FreetextQuestionCodingCriterion";
  id: string;
  createdAt: string;
  modifiedAt: string;
  description: string;
  score: number;
  questionId: string;
}

export interface CreateProjectModuleMutation_createProjectModule_questionnaire_questions {
  __typename: "QuestionnaireQuestion";
  id: string;
  createdAt: string;
  modifiedAt: string;
  text: string;
  questionType: QuestionType;
  questionnaireId: string;
  position: number;
  isAdditionalFreeTextAnswerEnabled: boolean;
  score: number;
  binaryFileId: string | null;
  binaryFile: CreateProjectModuleMutation_createProjectModule_questionnaire_questions_binaryFile | null;
  answers: CreateProjectModuleMutation_createProjectModule_questionnaire_questions_answers[];
  freetextQuestionCodingCriteria: CreateProjectModuleMutation_createProjectModule_questionnaire_questions_freetextQuestionCodingCriteria[];
  scoringType: QuestionScoringType;
}

export interface CreateProjectModuleMutation_createProjectModule_questionnaire {
  __typename: "Questionnaire";
  id: string;
  createdAt: string;
  modifiedAt: string;
  title: string;
  description: string;
  maxDurationInSeconds: number | null;
  questionnaireType: QuestionnaireType;
  finalizedAt: string | null;
  publishedAt: string | null;
  binaryFileId: string | null;
  binaryFile: CreateProjectModuleMutation_createProjectModule_questionnaire_binaryFile | null;
  authorId: string;
  author: CreateProjectModuleMutation_createProjectModule_questionnaire_author;
  questionsCount: number;
  questions: CreateProjectModuleMutation_createProjectModule_questionnaire_questions[];
}

export interface CreateProjectModuleMutation_createProjectModule {
  __typename: "ProjectModule";
  projectId: string;
  scenarioId: string | null;
  position: number;
  id: string;
  moduleType: ProjectModuleType;
  questionnaireId: string | null;
  scenario: CreateProjectModuleMutation_createProjectModule_scenario | null;
  questionnaire: CreateProjectModuleMutation_createProjectModule_questionnaire | null;
}

export interface CreateProjectModuleMutation {
  createProjectModule: CreateProjectModuleMutation_createProjectModule;
}

export interface CreateProjectModuleMutationVariables {
  creation: ProjectModuleCreation;
}
