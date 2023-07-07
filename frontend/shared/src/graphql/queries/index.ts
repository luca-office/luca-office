import * as chatMessages from "./chat-messages.graphql"
import * as checkLogin from "./check-login.graphql"
import * as freetextAnswersForQuestionnaire from "./freetext-answers-for-questionnaire.graphql"
import * as rScripts from "./r-scripts/r-scripts.graphql"
import * as spreadsheet from "./spreadsheet.graphql"
import * as userAccounts from "./user-accounts.graphql"

export * from "./coding-models"
export * from "./email"
export * from "./erp"
export * from "./file"
export * from "./project"
export * from "./questionnaire"
export * from "./ratings"
export * from "./reference-book-chapter"
export * from "./reporting"
export * from "./sample-company"
export * from "./scenario"
export * from "./scenario-erp"
export * from "./survey"

export const checkLoginQuery = checkLogin
export const rScriptsQuery = rScripts
export const userAccountsQuery = userAccounts
export const spreadsheetQuery = spreadsheet
export const chatMessagesQuery = chatMessages
export const freetextAnswersForQuestionnaireQuery = freetextAnswersForQuestionnaire
