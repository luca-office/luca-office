/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EmailDirectory, Relevance } from "./globalTypes";

// ====================================================
// GraphQL query operation: EmailQuery
// ====================================================

export interface EmailQuery_email {
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

export interface EmailQuery {
  email: EmailQuery_email | null;
}

export interface EmailQueryVariables {
  id: string;
}
