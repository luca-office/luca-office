/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum AuthenticationType {
  OnlyAnonymous = "OnlyAnonymous",
  OnlyRegistered = "OnlyRegistered",
  RegisteredOrAnonymous = "RegisteredOrAnonymous",
}

export enum EmailDirectory {
  Draft = "Draft",
  Inbox = "Inbox",
  Sent = "Sent",
  Trash = "Trash",
}

export enum MimeType {
  ApplicationPdf = "ApplicationPdf",
  ImageGif = "ImageGif",
  ImageJpeg = "ImageJpeg",
  ImagePng = "ImagePng",
  ImageSvg = "ImageSvg",
  Spreadsheet = "Spreadsheet",
  TextHtml = "TextHtml",
  VideoMp4 = "VideoMp4",
}

export enum ProjectModuleProgressType {
  Completed = "Completed",
  InProgress = "InProgress",
}

export enum QuestionScoringType {
  Analytical = "Analytical",
  Holistic = "Holistic",
  None = "None",
}

export enum QuestionType {
  FreeText = "FreeText",
  MultipleChoice = "MultipleChoice",
  SingleChoice = "SingleChoice",
}

export enum QuestionnaireType {
  Global = "Global",
  RuntimeSurvey = "RuntimeSurvey",
}

export enum Relevance {
  Irrelevant = "Irrelevant",
  PotentiallyHelpful = "PotentiallyHelpful",
  Required = "Required",
}

export enum Salutation {
  Mr = "Mr",
  Mrs = "Mrs",
  NonBinary = "NonBinary",
}

export enum SpreadsheetCellType {
  Currency = "Currency",
  Date = "Date",
  General = "General",
  Number = "Number",
  Percent = "Percent",
  Text = "Text",
}

export enum SurveyExecutionType {
  AutomaticAsynchronous = "AutomaticAsynchronous",
  ManualAsynchronous = "ManualAsynchronous",
  ManualSynchronous = "ManualSynchronous",
}

export enum UsageField {
  Company = "Company",
  Demonstration = "Demonstration",
  Other = "Other",
  Research = "Research",
  School = "School",
}

export interface UserAccountCreation {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  organization: string;
  salutation: Salutation;
  hasConfirmedBackofficeTermsAndConditions: boolean;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
