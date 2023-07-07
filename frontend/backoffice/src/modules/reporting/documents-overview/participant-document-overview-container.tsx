import React from "react"
import {ErpType, IconName} from "shared/enums"
import {Relevance, SurveyEventType} from "shared/graphql/generated/globalTypes"
import {SurveyEvent} from "shared/models"
import {useLucaTranslation} from "shared/translations"
import {convertMillisecondsToSeconds, getIconNameFromMimeType, isDefined} from "shared/utils"
import {
  ScenarioDocumentsQuery_scenarioDocuments_erpComponentErpProducts,
  ScenarioDocumentsQuery_scenarioDocuments_erpComponents,
  ScenarioDocumentsQuery_scenarioDocuments_erpCustomers,
  ScenarioDocumentsQuery_scenarioDocuments_erpEmployees,
  ScenarioDocumentsQuery_scenarioDocuments_erpInvoices,
  ScenarioDocumentsQuery_scenarioDocuments_erpOrderItems,
  ScenarioDocumentsQuery_scenarioDocuments_erpOrders,
  ScenarioDocumentsQuery_scenarioDocuments_erpProducts,
  ScenarioDocumentsQuery_scenarioDocuments_erpSuppliers
} from "../../../graphql/generated/ScenarioDocumentsQuery"
import {useScenarioDocuments} from "../../../graphql/hooks/queries/reporting/use-scenario-documents"
import {getCurrentScenarioTime} from "../activity-overview/utils/get-current-scenario-time"
import {getSurveyEventTime} from "../activity-overview/utils/get-tool-usage-from-survey-events"
import {ParticipantDocumentOverview} from "./participant-document-overview"
import {getErpOpenRowEvent, getErpRowName} from "./utils/get-erp-row-data"

export interface ParticipantDocumentOverviewContainerProps {
  readonly surveyEvents: SurveyEvent[]
  readonly scenarioId: UUID
  readonly participantName: string
  readonly onClose: () => void
}

export interface Document {
  readonly id: UUID | number
  readonly name: string | undefined
  readonly icon: IconName
  readonly relevance: Relevance
  readonly openedAfterSeconds: number | undefined
  readonly delayInSeconds: number | undefined
}

const fileOpenBinaryEvents = [
  SurveyEventType.OpenVideoBinary,
  SurveyEventType.OpenPdfBinary,
  SurveyEventType.OpenImageBinary
]

type ErpRowDocumentType =
  | ScenarioDocumentsQuery_scenarioDocuments_erpComponents
  | ScenarioDocumentsQuery_scenarioDocuments_erpComponentErpProducts
  | ScenarioDocumentsQuery_scenarioDocuments_erpCustomers
  | ScenarioDocumentsQuery_scenarioDocuments_erpEmployees
  | ScenarioDocumentsQuery_scenarioDocuments_erpInvoices
  | ScenarioDocumentsQuery_scenarioDocuments_erpOrders
  | ScenarioDocumentsQuery_scenarioDocuments_erpOrderItems
  | ScenarioDocumentsQuery_scenarioDocuments_erpProducts
  | ScenarioDocumentsQuery_scenarioDocuments_erpSuppliers

export const ParticipantDocumentOverviewContainer: React.FC<ParticipantDocumentOverviewContainerProps> = ({
  surveyEvents,
  scenarioId,
  participantName,
  onClose
}) => {
  const {t} = useLucaTranslation()

  const {scenarioDocuments, scenarioDocumentsLoading} = useScenarioDocuments(scenarioId)

  const [filterBy, setFilterBy] = React.useState<Relevance | null>(null)
  const startEvent = surveyEvents.find(event => event.eventType === SurveyEventType.StartScenario)
  const scenarioStartTime = startEvent?.timestamp.getTime()

  const getErpDocument = (erpRow: ErpRowDocumentType, erpType: ErpType): Document => {
    const openEvent = getErpOpenRowEvent(surveyEvents, erpType, erpRow.id)
    return {
      id: erpRow.id,
      relevance: erpRow.relevance,
      name: getErpRowName(erpType, erpRow.id, t),
      icon: IconName.Database,
      delayInSeconds: undefined,
      openedAfterSeconds:
        openEvent !== undefined && scenarioStartTime !== undefined
          ? convertMillisecondsToSeconds(getSurveyEventTime(openEvent, scenarioStartTime))
          : undefined
    }
  }
  const documents: Document[] = scenarioDocuments
    .map(scenarioDocuments => {
      return [
        ...scenarioDocuments.emails.map(
          (email): Document => {
            const openEvent = surveyEvents.find(
              event => event.eventType === SurveyEventType.ShowEmail && event.data?.id === email.id
            )
            return {
              id: email.id,
              relevance: email.relevance,
              name: email.sender ?? undefined,
              icon: IconName.Email,
              delayInSeconds: email.receptionDelayInSeconds,
              openedAfterSeconds:
                openEvent !== undefined && scenarioStartTime !== undefined
                  ? convertMillisecondsToSeconds(getSurveyEventTime(openEvent, scenarioStartTime))
                  : undefined
            }
          }
        ),
        ...scenarioDocuments.files.map(
          (file): Document => {
            const openEvent = surveyEvents.find(
              event =>
                event.data?.fileId === file.id &&
                (fileOpenBinaryEvents.includes(event.eventType) ||
                  (event.eventType === SurveyEventType.OpenTextDocument &&
                    event.data?.textDocumentId === file.textDocumentId) ||
                  (event.eventType === SurveyEventType.OpenSpreadsheet &&
                    event.data?.spreadsheetId === file.spreadsheetId))
            )
            return {
              id: file.id,
              relevance: file.relevance,
              name: file.name,
              icon: isDefined(file.binaryFile)
                ? getIconNameFromMimeType(file.binaryFile.mimeType)
                : file.textDocument !== undefined
                ? IconName.TextEditor
                : IconName.TableCalculation,
              delayInSeconds: scenarioDocuments.emails.find(email => email.id === file.emailId)
                ?.receptionDelayInSeconds,
              openedAfterSeconds:
                openEvent !== undefined && scenarioStartTime !== undefined
                  ? convertMillisecondsToSeconds(getSurveyEventTime(openEvent, scenarioStartTime))
                  : undefined
            }
          }
        ),
        ...scenarioDocuments.erpSuppliers.map(erpRow => getErpDocument(erpRow, ErpType.Supplier)),
        ...scenarioDocuments.erpInvoices.map(erpRow => getErpDocument(erpRow, ErpType.Invoice)),
        ...scenarioDocuments.erpProducts.map(erpRow => getErpDocument(erpRow, ErpType.Product)),
        ...scenarioDocuments.erpComponentErpProducts.map(erpRow => getErpDocument(erpRow, ErpType.ComponentProduct)),
        ...scenarioDocuments.erpOrderItems.map(erpRow => getErpDocument(erpRow, ErpType.OrderItem)),
        ...scenarioDocuments.erpComponents.map(erpRow => getErpDocument(erpRow, ErpType.Component)),
        ...scenarioDocuments.erpEmployees.map(erpRow => getErpDocument(erpRow, ErpType.Employee)),
        ...scenarioDocuments.erpOrders.map(erpRow => getErpDocument(erpRow, ErpType.Order)),
        ...scenarioDocuments.erpCustomers.map(erpRow => getErpDocument(erpRow, ErpType.Customer))
      ]
    })
    .getOrElse([])

  const progressTime = getCurrentScenarioTime(surveyEvents)

  return (
    <ParticipantDocumentOverview
      documents={documents}
      participantName={participantName}
      filterBy={filterBy}
      setFilterBy={setFilterBy}
      onDismiss={onClose}
      scenarioProgressTime={progressTime}
      loading={scenarioDocumentsLoading}
    />
  )
}
