import {sortBy} from "lodash-es"
import {BinaryViewerTool, ErpType, OfficeTool, OfficeWindowType} from "shared/enums"
import {Relevance, SurveyEventType} from "shared/graphql/generated/globalTypes"
import {SurveyEvent} from "shared/models"
import {convertMillisecondsToSeconds, Option} from "shared/utils"
import {ScenarioDocumentsQuery_scenarioDocuments as ScenarioDocuments} from "../../../../graphql/generated/ScenarioDocumentsQuery"
import {getCurrentScenarioTime} from "./get-current-scenario-time"
import {getSurveyEventTime} from "./get-tool-usage-from-survey-events"

export interface Activity {
  readonly opened: number
  readonly closed: number
}

interface OpenDocument {
  readonly startTime: number
  readonly document: UUID | number
  readonly documentType: DocumentType
}

interface State {
  readonly openDocument: OpenDocument | undefined
  readonly toolStack: OfficeWindowType[]
  readonly openTool: OfficeWindowType | undefined
  readonly toolToDocumentMap: Map<OfficeWindowType, Document>
}

export interface ActivityByRelevance {
  required: Activity[]
  inactive: Activity[]
  irrelevant: Activity[]
}

enum DocumentEMailFileType {
  EmaiL = "Email",
  File = "File"
}

const DocumentType = {...DocumentEMailFileType, ...ErpType}

interface Document {
  readonly id: UUID | number
  readonly documentType: DocumentType
}

type DocumentType = DocumentEMailFileType | ErpType

export const getDocumentActivityFromSurveyEvents = (
  surveyEvents: SurveyEvent[],
  scenarioDocuments: ScenarioDocuments
): Option<ActivityByRelevance> => {
  let state: State = {openDocument: undefined, toolStack: [], toolToDocumentMap: new Map(), openTool: undefined}

  const documentActivityByRelevance: ActivityByRelevance = {
    required: [],
    irrelevant: [],
    inactive: []
  }

  const startEvent = surveyEvents.find(event => event.eventType === SurveyEventType.StartScenario)
  if (startEvent === undefined) return Option.none()
  const scenarioStartTime = startEvent.timestamp.getTime()

  const scenarioFinished = surveyEvents.find(event => event.eventType === SurveyEventType.EndScenario) !== undefined

  const createUsageEntry = (eventTime: number) => {
    if (state.openDocument !== undefined) {
      let relevance: Relevance | undefined
      switch (state.openDocument.documentType) {
        case DocumentType.EmaiL:
          relevance = scenarioDocuments.emails.find(email => email.id === state.openDocument?.document)?.relevance
          break
        case DocumentType.File:
          relevance = scenarioDocuments.files.find(
            file =>
              file.binaryFileId === state.openDocument?.document ||
              file.textDocumentId === state.openDocument?.document ||
              file.spreadsheetId === state.openDocument?.document
          )?.relevance
          break
        case DocumentType.Component:
          relevance = scenarioDocuments.erpComponents.find(component => component.id === state.openDocument?.document)
            ?.relevance
          break
        case DocumentType.ComponentProduct:
          relevance = scenarioDocuments.erpComponentErpProducts.find(
            componentProduct => componentProduct.id === state.openDocument?.document
          )?.relevance
          break
        case DocumentType.Product:
          relevance = scenarioDocuments.erpProducts.find(product => product.id === state.openDocument?.document)
            ?.relevance
          break
        case DocumentType.Customer:
          relevance = scenarioDocuments.erpCustomers.find(customer => customer.id === state.openDocument?.document)
            ?.relevance
          break
        case DocumentType.Employee:
          relevance = scenarioDocuments.erpEmployees.find(employee => employee.id === state.openDocument?.document)
            ?.relevance
          break
        case DocumentType.Invoice:
          relevance = scenarioDocuments.erpInvoices.find(invoice => invoice.id === state.openDocument?.document)
            ?.relevance
          break
        case DocumentType.Order:
          relevance = scenarioDocuments.erpOrders.find(order => order.id === state.openDocument?.document)?.relevance
          break
        case DocumentType.OrderItem:
          relevance = scenarioDocuments.erpOrderItems.find(orderItem => orderItem.id === state.openDocument?.document)
            ?.relevance
          break
        case DocumentType.Supplier:
          relevance = scenarioDocuments.erpSuppliers.find(supplier => supplier.id === state.openDocument?.document)
            ?.relevance
          break
      }

      const activity = {
        opened: convertMillisecondsToSeconds(state.openDocument.startTime),
        closed: convertMillisecondsToSeconds(eventTime)
      }

      switch (relevance) {
        case Relevance.PotentiallyHelpful:
        case Relevance.Irrelevant:
          documentActivityByRelevance.irrelevant.push(activity)
          break
        case Relevance.Required:
          documentActivityByRelevance.required.push(activity)
          break
      }
    }
  }

  const openDocument = (eventTime: number, documentId: UUID, tool: OfficeWindowType, documentType: DocumentType) => {
    state.toolToDocumentMap.set(tool, {id: documentId, documentType})
    createUsageEntry(eventTime)
    state = {...state, openDocument: {document: documentId, startTime: eventTime, documentType}}
  }

  const closeDocument = (eventTime: number, documentId: UUID) => {
    if (documentId === state.openDocument?.document) {
      createUsageEntry(eventTime)
      state = {...state, openDocument: undefined}
    }
  }

  surveyEvents.forEach((event, i) => {
    const eventTime = getSurveyEventTime(event, scenarioStartTime)
    switch (event.eventType) {
      case SurveyEventType.RestoreTool: {
        createUsageEntry(eventTime)
        if (state.openTool !== undefined) {
          state.toolStack.push(state.openTool)
        }
        const restoredTool = event.data?.tool as OfficeWindowType
        const restoredDocument = state.toolToDocumentMap.get(restoredTool)
        state = {
          ...state,
          openTool: restoredTool,
          toolStack: state.toolStack.filter(tool => tool !== restoredTool),
          openDocument:
            restoredDocument !== undefined
              ? {
                  startTime: eventTime,
                  document: restoredDocument.id,
                  documentType: restoredDocument.documentType
                }
              : undefined
        }
        break
      }

      case SurveyEventType.MinimizeTool:
      case SurveyEventType.CloseTool: {
        if (state.toolToDocumentMap.get(event.data?.tool as OfficeWindowType) === state.openDocument) {
          createUsageEntry(eventTime)
          state = {...state, openDocument: undefined}
        }

        const restoredTool = state.toolStack.pop()
        if (restoredTool !== undefined) {
          const restoredDocument = state.toolToDocumentMap.get(restoredTool)
          if (restoredDocument !== undefined) {
            state = {
              ...state,
              openDocument: {
                document: restoredDocument.id,
                startTime: eventTime,
                documentType: restoredDocument.documentType
              }
            }
          }
        }
        break
      }

      case SurveyEventType.ShowEmail: {
        const documentId = event.data?.id as UUID
        openDocument(eventTime, documentId, OfficeTool.EmailClient, DocumentType.EmaiL)
        break
      }
      case SurveyEventType.SelectImageBinary:
      case SurveyEventType.OpenImageBinary:
      case SurveyEventType.SelectVideoBinary:
      case SurveyEventType.OpenVideoBinary:
      case SurveyEventType.SelectPdfBinary:
      case SurveyEventType.OpenPdfBinary: {
        const documentId = event.data?.fileId as UUID
        openDocument(eventTime, documentId, BinaryViewerTool.PDFViewer, DocumentType.File)
        break
      }

      case SurveyEventType.SelectTextDocument:
      case SurveyEventType.OpenTextDocument: {
        const documentId = event.data?.textDocumentId as UUID
        openDocument(eventTime, documentId, BinaryViewerTool.TextEditor, DocumentType.File)
        break
      }

      case SurveyEventType.OpenSpreadsheet:
      case SurveyEventType.SelectSpreadsheet: {
        const documentId = event.data?.spreadsheetId as UUID
        openDocument(eventTime, documentId, BinaryViewerTool.SpreadsheetEditor, DocumentType.File)
        break
      }

      case SurveyEventType.ErpOpenRow: {
        const documentId = event.data?.rowId as UUID
        const erpType = event.data?.tableType as ErpType
        openDocument(eventTime, documentId, OfficeTool.Erp, erpType)
        break
      }

      case SurveyEventType.CloseTextDocument: {
        const documentId = event.data?.textDocumentId as UUID
        closeDocument(eventTime, documentId)
        break
      }

      case SurveyEventType.CloseImageBinary:
      case SurveyEventType.CloseVideoBinary:
      case SurveyEventType.ClosePdfBinary: {
        const documentId = event.data?.fileId as UUID
        closeDocument(eventTime, documentId)
        break
      }

      case SurveyEventType.ErpCloseRow: {
        const documentId = event.data?.rowId as UUID
        closeDocument(eventTime, documentId)
        break
      }

      case SurveyEventType.CloseSpreadsheet: {
        const documentId = event.data?.spreadsheetId as UUID
        closeDocument(eventTime, documentId)
        break
      }

      case SurveyEventType.EndScenario: {
        createUsageEntry(eventTime)
        break
      }
    }
    if (i === surveyEvents.length - 1 && !scenarioFinished) {
      createUsageEntry(eventTime)
    }
  })

  documentActivityByRelevance.required = documentActivityByRelevance.required.filter(
    document => document.opened !== document.closed
  )
  documentActivityByRelevance.irrelevant = documentActivityByRelevance.irrelevant.filter(
    document => document.opened !== document.closed
  )

  const activeDocuments = sortBy(
    [...documentActivityByRelevance.required, ...documentActivityByRelevance.irrelevant],
    document => document.opened
  )

  activeDocuments.forEach((activeDocument, i) => {
    if (i === 0) {
      documentActivityByRelevance.inactive.push({opened: 0, closed: activeDocument.opened})
    } else if (i > 0) {
      const inactive = {opened: activeDocuments[i - 1]?.closed, closed: activeDocument.opened}
      documentActivityByRelevance.inactive.push(inactive)
    }
    if (i === activeDocuments.length - 1) {
      documentActivityByRelevance.inactive.push({
        opened: activeDocument.closed,
        closed: getCurrentScenarioTime(surveyEvents)
      })
    }
  })

  if (activeDocuments.length === 0) {
    documentActivityByRelevance.inactive.push({opened: 0, closed: getCurrentScenarioTime(surveyEvents)})
  }

  return Option.of(documentActivityByRelevance)
}
