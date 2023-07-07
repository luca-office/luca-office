/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

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

export enum Relevance {
  Irrelevant = "Irrelevant",
  PotentiallyHelpful = "PotentiallyHelpful",
  Required = "Required",
}

export interface DirectoryCreation {
  name: string;
  parentDirectoryId?: string | null;
  scenarioId?: string | null;
  sampleCompanyId?: string | null;
}

export interface DirectoryUpdate {
  name: string;
  parentDirectoryId?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
