import {maxBy, orderBy} from "lodash-es"
import {InterventionType, QuestionType, SurveyEventCreation, SurveyEventType} from "../graphql/generated/globalTypes"
import {
  EmailOpeningIntervention,
  ErpRowOpeningIntervention,
  FileOpeningIntervention,
  Intervention,
  NotesContentIntervention,
  OpenErpRowSurveyEventPayload,
  OpenFileBasePayload,
  QuestionnaireAnswerSelectionPayload,
  RuntimeSurveyAnswerSelectionIntervention,
  ShowEmailSurveyEventPayload,
  SpreadsheetCellContentIntervention,
  SpreadsheetUpdateCellSurveyEventPayload,
  TextDocumentContentIntervention,
  UpdateNotesTextSurveyEventPayload,
  UpdateTextDocumentContentEventPayload
} from "../models"
import {parseDateString} from "."
import {first, isEmpty} from "./array"

export interface QuestionConfig {
  readonly type: QuestionType
  readonly id: UUID
}

export type CleanSurveyEvent = Pick<SurveyEventCreation, "data" | "eventType" | "timestamp">

export interface RuntimeSurveyEventsWithPayload extends Omit<CleanSurveyEvent, "data"> {
  readonly payload: QuestionnaireAnswerSelectionPayload
}

export const fileWasOpened = (scenarioId: UUID, fileId: UUID, surveyEvents: Array<CleanSurveyEvent>) => {
  const surveyEventTypes = [
    SurveyEventType.OpenImageBinary,
    SurveyEventType.OpenPdfBinary,
    SurveyEventType.OpenSpreadsheet,
    SurveyEventType.OpenTextDocument,
    SurveyEventType.OpenVideoBinary
  ]

  return surveyEvents
    .filter(event => surveyEventTypes.includes(event.eventType))
    .some(event => {
      if (event.data) {
        const viewFileSurveyEventPayload = JSON.parse(event.data) as OpenFileBasePayload
        return viewFileSurveyEventPayload.scenarioId === scenarioId && viewFileSurveyEventPayload.fileId === fileId
      }
      return false
    })
}

export const emailWasOpened = (scenarioId: UUID, emailId: UUID, surveyEvents: Array<CleanSurveyEvent>) =>
  surveyEvents
    .filter(event => event.eventType === SurveyEventType.ShowEmail)
    .some(event => {
      if (event.data) {
        const showEmailSurveyEventPayload = JSON.parse(event.data) as ShowEmailSurveyEventPayload
        return showEmailSurveyEventPayload.scenarioId === scenarioId && showEmailSurveyEventPayload.id === emailId
      }
      return false
    })

export const notesDoesNotContainValues = (
  scenarioId: UUID,
  valuesToCheck: string[],
  surveyEvents: Array<CleanSurveyEvent>
) => {
  const parsedEvents = surveyEvents
    .filter(event => event.eventType === SurveyEventType.UpdateNotesText)
    .map(event => ({
      ...event,
      data: JSON.parse(event.data!) as UpdateNotesTextSurveyEventPayload
    }))
    .filter(event => event.data.scenarioId === scenarioId)

  const lastEvent = maxBy(parsedEvents, event => event.timestamp)
  const lastText = lastEvent?.data.text.toLowerCase()

  return !valuesToCheck.some(value => lastText?.includes(value.toLowerCase()))
}
export const textDocumentDoesNotContainValues = (
  scenarioId: UUID,
  textDocumentId: UUID,
  valuesToCheck: string[],
  surveyEvents: Array<CleanSurveyEvent>
) => {
  const parsedEvents = surveyEvents
    .filter(event => event.eventType === SurveyEventType.UpdateTextDocumentContent)
    .map(event => ({
      ...event,
      data: JSON.parse(event.data!) as UpdateTextDocumentContentEventPayload
    }))
    .filter(event => event.data.scenarioId === scenarioId && event.data.textDocumentId === textDocumentId)

  const lastEvent = maxBy(parsedEvents, event => event.timestamp)
  const lastText = lastEvent?.data.content.toLowerCase()

  return !valuesToCheck.some(value => lastText?.includes(value.toLowerCase()))
}

export const runtimeSurveyAnswerSelectionCheck = (
  answerId: UUID,
  isNegated: boolean,
  surveyEvents: Array<CleanSurveyEvent>,
  questionConfig?: QuestionConfig
) => {
  const sortedAndFilteredEvents = orderBy(
    surveyEvents.filter(
      event =>
        event.eventType === SurveyEventType.DeselectQuestionnaireAnswer ||
        event.eventType === SurveyEventType.SelectQuestionnaireAnswer
    ),
    event => event.timestamp,
    "desc"
  )

  const eventsWithParsedPayload: RuntimeSurveyEventsWithPayload[] = sortedAndFilteredEvents.map(surveyEvent => ({
    ...surveyEvent,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    payload: JSON.parse(surveyEvent.data!) as QuestionnaireAnswerSelectionPayload
  }))

  const filteredForAnswer = eventsWithParsedPayload.filter(event => event.payload.answerId === answerId)

  if (questionConfig?.type === QuestionType.SingleChoice) {
    const filteredForQuestion = eventsWithParsedPayload.filter(
      surveyEvent => surveyEvent.payload.questionId === questionConfig.id
    )

    if (isEmpty(filteredForQuestion) && isNegated) {
      return true
    } else {
      return first(filteredForQuestion).exists(surveyEvent =>
        isNegated ? surveyEvent.payload.answerId !== answerId : surveyEvent.payload.answerId === answerId
      )
    }
  } else if (questionConfig?.type === QuestionType.MultipleChoice) {
    const deselectIsLatestEvent = first(filteredForAnswer).exists(
      event => event.eventType === SurveyEventType.DeselectQuestionnaireAnswer
    )

    const selectIsLatestEvent = first(filteredForAnswer).exists(
      event => event.eventType === SurveyEventType.SelectQuestionnaireAnswer
    )

    return isNegated ? deselectIsLatestEvent || isEmpty(filteredForAnswer) : selectIsLatestEvent
  } else {
    return false
  }
}

export const erpDataSetWasOpened = (
  scenarioId: UUID,
  erpRowId: number,
  erpTableType: string,
  surveyEvents: Array<CleanSurveyEvent>
) => {
  return surveyEvents
    .filter(event => event.eventType === SurveyEventType.ErpOpenRow)
    .some(event => {
      if (event.data) {
        const openErpRowSurveyEventPayload = JSON.parse(event.data) as OpenErpRowSurveyEventPayload

        return (
          openErpRowSurveyEventPayload.scenarioId === scenarioId &&
          openErpRowSurveyEventPayload.rowId === erpRowId &&
          openErpRowSurveyEventPayload.tableType === erpTableType
        )
      }
      return false
    })
}

export interface SpreadsheetCellContentInterventionCheckConfig {
  columnIndex: number
  rowIndex: number
  fileId: UUID
  scenarioId: UUID
  valuesToCheck: string[] // was string separated by semicolon
  isNegated: boolean
  surveyEvents: CleanSurveyEvent[]
}

export const spreadsheetCellContentValueCheck = ({
  isNegated,
  surveyEvents,
  valuesToCheck,
  columnIndex,
  rowIndex,
  fileId,
  scenarioId
}: SpreadsheetCellContentInterventionCheckConfig) => {
  const filteredAndParsedEvents = surveyEvents
    .filter(event => event.eventType === SurveyEventType.UpdateSpreadsheetCellValue)
    .map(event => ({
      ...event,
      data: JSON.parse(event!.data!) as SpreadsheetUpdateCellSurveyEventPayload
    }))

  const lastValueForCellId = maxBy(
    filteredAndParsedEvents.filter(
      event =>
        event.data.columnIndex === columnIndex &&
        event.data.rowIndex === rowIndex &&
        event.data.fileId === fileId &&
        event.data.scenarioId === scenarioId
    ),
    event => parseDateString(event.timestamp)
  )?.data.value

  return isNegated
    ? valuesToCheck.every(value => value !== lastValueForCellId)
    : valuesToCheck.some(value => value === lastValueForCellId)
}

export const checkIfInterventionConditionIsFulfilled = (
  intervention: Intervention,
  surveyEvents: Array<CleanSurveyEvent>,
  questionConfig?: QuestionConfig
) => {
  switch (intervention.interventionType) {
    case InterventionType.FileOpening: {
      const fileOpeningIntervention = intervention as FileOpeningIntervention
      return !fileWasOpened(fileOpeningIntervention.scenarioId, fileOpeningIntervention.fileId, surveyEvents)
    }
    case InterventionType.EmailOpening: {
      const emailOpeningInterventions = intervention as EmailOpeningIntervention
      return !emailWasOpened(emailOpeningInterventions.scenarioId, emailOpeningInterventions.emailId, surveyEvents)
    }
    case InterventionType.NotesContent: {
      const notesContentIntervention = intervention as NotesContentIntervention
      return notesDoesNotContainValues(
        notesContentIntervention.scenarioId,
        notesContentIntervention.value.split(";"),
        surveyEvents
      )
    }
    case InterventionType.TextDocumentContent: {
      const textDocumentsContentIntervention = intervention as TextDocumentContentIntervention
      return textDocumentDoesNotContainValues(
        textDocumentsContentIntervention.scenarioId,
        textDocumentsContentIntervention.textDocumentId,
        textDocumentsContentIntervention.value.split(";"),
        surveyEvents
      )
    }
    case InterventionType.RuntimeSurveyAnswerSelection: {
      const runtimeSurveyAnswerSelectionIntervention = intervention as RuntimeSurveyAnswerSelectionIntervention
      return runtimeSurveyAnswerSelectionCheck(
        runtimeSurveyAnswerSelectionIntervention.answerId,
        runtimeSurveyAnswerSelectionIntervention.isNegated,
        surveyEvents,
        questionConfig
      )
    }
    case InterventionType.ErpRowOpening: {
      const erpRowOpeningIntervention = intervention as ErpRowOpeningIntervention
      return !erpDataSetWasOpened(
        erpRowOpeningIntervention.scenarioId,
        erpRowOpeningIntervention.erpRowId,
        erpRowOpeningIntervention.erpTableType,
        surveyEvents
      )
    }
    case InterventionType.SpreadsheetCellContent: {
      const spreadsheetCellContentIntervention = intervention as SpreadsheetCellContentIntervention

      return spreadsheetCellContentValueCheck({
        columnIndex: spreadsheetCellContentIntervention.spreadsheetColumnIndex,
        rowIndex: spreadsheetCellContentIntervention.spreadsheetRowIndex,
        scenarioId: spreadsheetCellContentIntervention.scenarioId,
        fileId: spreadsheetCellContentIntervention.fileId,
        isNegated: spreadsheetCellContentIntervention.isNegated,
        surveyEvents,
        valuesToCheck: spreadsheetCellContentIntervention.value.split(";")
      })
    }
  }
}
