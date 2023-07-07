/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EmailCreation, EmailDirectory, Relevance } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateEmailMutation
// ====================================================

export interface CreateEmailMutation_createEmail {
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

export interface CreateEmailMutation {
  createEmail: CreateEmailMutation_createEmail;
}

export interface CreateEmailMutationVariables {
  creation: EmailCreation;
}
