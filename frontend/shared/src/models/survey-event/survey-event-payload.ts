import {DhxCellStyle} from "../../components/spreadsheet/dhx-spreadsheet/dhx-types"
import {ProjectModuleEndType} from "../../enums/project-module-end-type"
import {MimeType, Salutation, SpreadsheetCellType} from "../../graphql/generated/globalTypes"

export type ViewFileSurveyEventPayload = {
  readonly scenarioId: UUID
  readonly fileId: UUID
  readonly mimeType: MimeType
  readonly directoryId?: UUID
}

export type OpenFileBasePayload = {
  readonly scenarioId: UUID
  readonly fileId: UUID
}

export type ViewDirectorySurveyEventPayload = {
  readonly scenarioId: UUID
  readonly directoryId: UUID
  readonly parentDirectoryId?: UUID
}

export type ShowEmailSurveyEventPayload = {
  readonly id: UUID
  readonly scenarioId: UUID
}

export type OpenErpRowSurveyEventPayload = {
  readonly scenarioId: UUID
  readonly tableType: string
  readonly rowId: number
  readonly rowIndex: number
}

export type OpenBinaryEventPayload = {
  readonly directoryId?: UUID
  readonly fileId?: UUID
  readonly binaryFileId: UUID
  readonly binaryFileUrl: string
  readonly binaryFileTitle: string
}

export type OpenTextDocumentEventPayload = {
  readonly directoryId?: UUID
  readonly fileId: UUID
  readonly textDocumentId: UUID
  readonly textDocumentTitle: string
}

export type SpreadsheetUpdateCellSurveyEventPayload = {
  readonly fileId: UUID
  readonly spreadsheetId: UUID
  readonly rowIndex: number
  readonly columnIndex: number
  readonly cellId: UUID
  readonly value: string
  readonly scenarioId: UUID
}

export type UpdateNotesTextSurveyEventPayload = {
  readonly text: string
  readonly scenarioId: UUID
}

export type ViewReferenceBookArticleEventPayload = {
  readonly scenarioId: UUID
  readonly chapterId: UUID
  readonly articleId: UUID
}

export type SelectSpreadsheetCellEventPayload = {
  readonly cellId: UUID
  readonly columnIndex: number
  readonly rowIndex: number
  readonly spreadsheetId: UUID
  readonly fileId: UUID
}

export type SelectSpreadsheetCellRangeEventPayload = {
  readonly spreadsheetId: UUID
  readonly fileId: UUID
  readonly startCellRowIndex: number
  readonly startCellColumnIndex: number
  readonly endCellRowIndex: number
  readonly endCellColumnIndex: number
}

export type UpdateTextDocumentContentEventPayload = {
  readonly textDocumentId: UUID
  readonly content: string
  readonly fileId: UUID
  readonly scenarioId: UUID
}

export type SelectImageBinaryEventPayload = {
  readonly scenarioId: UUID
  readonly directoryId: UUID | null
  readonly fileId: UUID | null
  readonly binaryFileId: UUID
  readonly binaryFileUrl: string
  readonly binaryFileTitle: string
}

export type SelectVideoBinaryEventPayload = {
  readonly scenarioId: UUID
  readonly directoryId: UUID | null
  readonly fileId: UUID | null
  readonly binaryFileId: UUID
  readonly binaryFileUrl: string
  readonly binaryFileTitle: string
}

export type SelectPdfBinaryEventPayload = {
  readonly scenarioId: UUID
  readonly directoryId: UUID | null
  readonly fileId: UUID | null
  readonly binaryFileId: UUID
  readonly binaryFileUrl: string
  readonly binaryFileTitle: string
}

export type SelectSpreadsheetEventPayload = {
  readonly scenarioId: UUID
  readonly directoryId: UUID | null
  readonly fileId: UUID
  readonly spreadsheetId: UUID
  readonly spreadsheetTitle: string
}

export type SelectTextDocumentEventPayload = {
  readonly scenarioId: UUID
  readonly directoryId: UUID | null
  readonly fileId: UUID
  readonly textDocumentId: UUID
  readonly textDocumentTitle: string
}

// #region Questionnaire

export type QuestionnaireBasePayload = {
  readonly scenarioId: UUID
  readonly questionnaireId: UUID
}

export type QuestionnaireAnswerSelectionPayload = {
  readonly questionId: UUID
  readonly answerId: UUID
  readonly scenarioId: UUID
  readonly questionnaireId: UUID
}

export type QuestionnaireBinaryFileEventPayload = {
  readonly binaryFileId: UUID
}

export type EndQuestionnareEventPayload = {
  readonly endType: ProjectModuleEndType
  readonly questionnaireId: UUID
}

export type QuestionnaireQuestionBinaryFileEventPayload = {
  readonly binaryFileId: UUID
  readonly questionId: UUID
}

export type ReceiveSupervisorChatMessagePayload = {
  readonly message: string
}

export type ReceiveEmailPayload = {
  readonly scenarioId: UUID
  readonly emailId: UUID
  readonly interventionId: UUID | null
}

export type EvaluateInterventionPayload = {
  readonly scenarioId: UUID
  readonly occurred: boolean
  readonly interventionId: UUID
}
export type ViewReferenceBookBinaryPayload = {
  readonly scenarioId: UUID
  readonly chapterId: UUID
  readonly articleId: UUID
  readonly binaryFileId: UUID
}
export type QuestionnaireUpdateFreetextAnswer = {
  readonly questionId: UUID
  readonly value: string
  readonly questionPosition: number
  readonly answerPosition?: number
  readonly scenarioId: UUID
  readonly questionnaireId: UUID
}

// #endregion

// #region Spreadsheet

export type UpdateCellValueSurveyEventPayload = {
  readonly fileId: UUID
  readonly spreadsheetId: UUID
  readonly rowIndex: number
  readonly columnIndex: number
  readonly cellId: UUID
  readonly cellType: SpreadsheetCellType
  readonly value: string
}

export type UpdateCellTypeSurveyEventPayload = {
  readonly fileId: UUID
  readonly spreadsheetId: UUID
  readonly rowIndex: number
  readonly columnIndex: number
  readonly cellId: UUID
  readonly cellType: SpreadsheetCellType
  readonly value: string
}

export type UpdateCellStyleSurveyEventPayload = {
  readonly fileId: UUID
  readonly spreadsheetId: UUID
  readonly rowIndex: number
  readonly columnIndex: number
  readonly cellId: UUID
  readonly style: DhxCellStyle
}

// #endregion

//#region Scenario

export type EndScenarioEventPayload = {
  readonly endType: ProjectModuleEndType
  readonly scenarioId: UUID
}

//#endregion

//#region participant
export type StoreParticipantDataPayload = {
  readonly firstName: string
  readonly lastName: string
  readonly salutation: Salutation
}
