import {
  CommonDataState,
  EmailsState,
  initialCommonDataState,
  initialEmailsState,
  initialNotesState,
  initialSpreadsheetState,
  initialSurveyEventsState,
  initialSurveyInvitationState,
  initialTextDocumentState,
  NotesState,
  SpreadsheetState,
  SurveyInvitationState,
  TextDocumentsState
} from "./data"
import {ChatState, initialChatState} from "./data/chat-state"
import {initialProjectResumptionState, ProjectResumptionState} from "./data/project-resumption-state"
import {SurveyEventsState} from "./data/survey-events-state"

export type DataState = Readonly<{
  readonly common: CommonDataState
  readonly surveyInvitation: SurveyInvitationState
  readonly surveyEvents: SurveyEventsState
  readonly emails: EmailsState
  readonly spreadsheets: SpreadsheetState
  readonly notes: NotesState
  readonly textDocuments: TextDocumentsState
  readonly chat: ChatState
  readonly projectResumption: ProjectResumptionState
}>

export const initialDataState: DataState = {
  common: initialCommonDataState,
  surveyInvitation: initialSurveyInvitationState,
  surveyEvents: initialSurveyEventsState,
  emails: initialEmailsState,
  spreadsheets: initialSpreadsheetState,
  notes: initialNotesState,
  textDocuments: initialTextDocumentState,
  chat: initialChatState,
  projectResumption: initialProjectResumptionState
}
