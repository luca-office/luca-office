import {partial} from "lodash-es"
import React from "react"
import {ToolRenderConfig} from "../components"
import {styles as desktopStyles} from "../components/desktop/desktop.styles"
import {BinaryViewerTool, OfficeTool, OfficeWindowType} from "../enums"
import {ErpSurveyEvents} from "../models"
import {
  CalculatorContainer,
  CalculatorState,
  CalculatorSurveyEvents,
  EmailClientContainer,
  EmailClientState,
  EmailClientStateActions,
  EmailClientSurveyEvents,
  ErpContainer,
  FilesAndDirectoriesContainer,
  FilesAndDirectoriesState,
  FilesAndDirectoriesStateActions,
  FilesAndDirectoriesSurveyEvents,
  ImageViewerContainer,
  NotesContainer,
  NotesContainerState,
  NotesContainerStateActions,
  NotesContainerSurveyEvents,
  PdfViewerContainer,
  PdfViewerSurveyEvents,
  ReferenceBookToolContainer,
  ReferenceBookToolState,
  ReferenceBookToolStateActions,
  ReferenceBookToolSurveyEvents,
  SpreadsheetViewerContainer,
  SpreadsheetViewerState,
  SpreadsheetViewerStateActions,
  SpreadsheetViewerSurveyEvents,
  TextDocumentsContainerState,
  TextDocumentsContainerStateActions,
  TextDocumentSurveyEvents,
  TextEditorContainer,
  VideoViewerContainer,
  VideoViewerContainerSurveyEvents
} from "../office-tools"
import {UseBinaryViewerHook} from "../redux/hooks"
import {Option} from "../utils"
import {ChatComposer, ChatContainer} from "./chat"
import {EmailClientRemoteState} from "./email-client"
import {EmailClientRemoteStateHookProps} from "./email-client/hook/use-email-client-remote-state"
import {FilesAndDirectoriesRemoteState} from "./files-and-directories"
import {ImageViewerSurveyEvents} from "./image-viewer/image-viewer-container"
import {ReferenceBookToolRemoteState} from "./reference-book"

interface PlayerHooks {
  readonly useCalculatorState: () => CalculatorState
  readonly useCalculatorSurveyEvents: (scenarioId: UUID) => CalculatorSurveyEvents
  readonly useEmailClientState: () => EmailClientState
  readonly useEmailClientRemoteState: (props: EmailClientRemoteStateHookProps) => EmailClientRemoteState
  readonly useEmailClientStateActions: () => EmailClientStateActions
  readonly useEmailClientSurveyEvents: (scenarioId: UUID) => EmailClientSurveyEvents
  readonly useErpSurveyEvents: (scenarioId: UUID) => ErpSurveyEvents
  readonly useFilesAndDirectoriesState: () => FilesAndDirectoriesState
  readonly useFilesAndDirectoriesRemoteState: (
    scenarioId: UUID,
    sampleCompanyIdOption: Option<UUID>
  ) => FilesAndDirectoriesRemoteState
  readonly useFilesAndDirectoriesStateActions: () => FilesAndDirectoriesStateActions
  readonly useFilesAndDirectoriesSurveyEvents: (scenarioId: UUID) => FilesAndDirectoriesSurveyEvents
  readonly useImageViewerState: () => UseBinaryViewerHook
  readonly useNotesState: () => NotesContainerState
  readonly useNotesStateActions: () => NotesContainerStateActions
  readonly useNotesSurveyEvents: (scenarioId: UUID) => NotesContainerSurveyEvents
  readonly usePdfViewerState: () => UseBinaryViewerHook
  readonly useImageViewerSurveyEvents: () => ImageViewerSurveyEvents
  readonly usePdfViewerSurveyEvents: () => PdfViewerSurveyEvents
  readonly useReferenceBookToolState: () => ReferenceBookToolState
  readonly useReferenceBookToolRemoteState: (scenarioId: UUID) => ReferenceBookToolRemoteState
  readonly useReferenceBookToolStateActions: () => ReferenceBookToolStateActions
  readonly useReferenceBookToolSurveyEvents: () => ReferenceBookToolSurveyEvents
  readonly useSpreadsheetViewerState: () => SpreadsheetViewerState
  readonly useSpreadsheetViewerStateActions: () => SpreadsheetViewerStateActions
  readonly useSpreadsheetViewerSurveyEvents: (scenarioId: UUID) => SpreadsheetViewerSurveyEvents
  readonly useVideoViewerState: () => UseBinaryViewerHook
  readonly useVideoViewerSurveyEvents: (scenarioId: UUID) => VideoViewerContainerSurveyEvents
  readonly useTextDocumentsState: () => TextDocumentsContainerState
  readonly useTextDocumentsStateActions: () => TextDocumentsContainerStateActions
  readonly useTextDocumentsSurveyEvents: (scenarioId: UUID) => TextDocumentSurveyEvents
  readonly useChatComposer: () => ChatComposer
  readonly resetFinishMail?: boolean
}

export const createRenderTool = ({
  useCalculatorState,
  useCalculatorSurveyEvents,
  useEmailClientState,
  useEmailClientRemoteState,
  useEmailClientStateActions,
  useEmailClientSurveyEvents,
  useErpSurveyEvents,
  useFilesAndDirectoriesState,
  useFilesAndDirectoriesRemoteState,
  useFilesAndDirectoriesStateActions,
  useFilesAndDirectoriesSurveyEvents,
  useImageViewerState,
  useImageViewerSurveyEvents,
  useNotesState,
  useNotesStateActions,
  useNotesSurveyEvents,
  usePdfViewerState,
  usePdfViewerSurveyEvents,
  useReferenceBookToolState,
  useReferenceBookToolRemoteState,
  useReferenceBookToolStateActions,
  useReferenceBookToolSurveyEvents,
  useSpreadsheetViewerState,
  useSpreadsheetViewerStateActions,
  useSpreadsheetViewerSurveyEvents,
  useVideoViewerState,
  useVideoViewerSurveyEvents,
  useTextDocumentsState,
  useTextDocumentsStateActions,
  useTextDocumentsSurveyEvents,
  useChatComposer,
  resetFinishMail
}: PlayerHooks) => ({
  tool,
  openedIndex,
  isMinimized,
  isClosed,
  interventions,
  onClose,
  onMinimize,
  scenario,
  scenarioCompletionEmailAddress,
  onCompletionMailSent
}: ToolRenderConfig) => {
  const index = !isMinimized ? openedIndex : -1
  const getKey = (tool: OfficeWindowType) => `${tool}-${isClosed}`

  switch (tool) {
    case OfficeTool.Calculator:
      return (
        <CalculatorContainer
          key={getKey(tool)}
          onClose={onClose}
          onMinimize={onMinimize}
          customStyles={[
            desktopStyles.nonFullScreenWindow,
            desktopStyles.calculatorWindow,
            desktopStyles.zIndex(index)
          ]}
          useState={useCalculatorState}
          useSurveyEvents={partial(useCalculatorSurveyEvents, scenario.id)}
        />
      )
    case OfficeTool.Chat:
      return (
        <ChatContainer
          customStyles={[desktopStyles.nonFullScreenWindow, desktopStyles.chatWindow, desktopStyles.zIndex(index)]}
          key={getKey(tool)}
          onClose={onClose}
          onMinimize={onMinimize}
          useChatComposer={useChatComposer}
        />
      )
    case OfficeTool.EmailClient:
      return (
        <EmailClientContainer
          key={getKey(tool)}
          scenarioId={scenario.id}
          onClose={onClose}
          onMinimize={onMinimize}
          interventions={interventions}
          sampleCompanyId={Option.of(scenario.sampleCompanyId)}
          sampleCompanyTitle={Option.of(scenario.sampleCompany?.name)}
          onCompletionMailSent={onCompletionMailSent}
          scenarioCompletionEmailAddress={scenarioCompletionEmailAddress}
          customStyles={[desktopStyles.fullScreenWindow, desktopStyles.zIndex(index)]}
          useState={useEmailClientState}
          useRemoteState={useEmailClientRemoteState}
          useStateActions={useEmailClientStateActions}
          useSurveyEvents={partial(useEmailClientSurveyEvents, scenario.id)}
          resetFinishMail={resetFinishMail}
          useFilesAndDirectoriesState={useFilesAndDirectoriesState}
          useFilesAndDirectoriesStateActions={useFilesAndDirectoriesStateActions}
          useFilesAndDirectoriesRemoteState={useFilesAndDirectoriesRemoteState}
          useFilesAndDirectoriesSurveyEvents={useFilesAndDirectoriesSurveyEvents}
        />
      )
    case OfficeTool.ReferenceBookViewer:
      return (
        <ReferenceBookToolContainer
          key={getKey(tool)}
          onClose={onClose}
          onMinimize={onMinimize}
          scenarioId={scenario.id}
          customStyles={[desktopStyles.fullScreenWindow, desktopStyles.zIndex(index)]}
          useState={useReferenceBookToolState}
          useRemoteState={useReferenceBookToolRemoteState}
          useStateActions={useReferenceBookToolStateActions}
          useSurveyEvents={useReferenceBookToolSurveyEvents}
        />
      )
    case OfficeTool.FileBrowser:
      return (
        <FilesAndDirectoriesContainer
          sampleCompanyId={Option.of(scenario.sampleCompanyId)}
          sampleCompanyTitle={Option.of(scenario.sampleCompany?.name)}
          key={getKey(tool)}
          onClose={onClose}
          onMinimize={onMinimize}
          scenarioId={scenario.id}
          customStyles={[desktopStyles.fullScreenWindow, desktopStyles.zIndex(index)]}
          useState={useFilesAndDirectoriesState}
          useRemoteState={useFilesAndDirectoriesRemoteState}
          useStateActions={useFilesAndDirectoriesStateActions}
          useSurveyEvents={partial(useFilesAndDirectoriesSurveyEvents, scenario.id)}
        />
      )
    case OfficeTool.Erp:
      return (
        <ErpContainer
          customStyles={[desktopStyles.fullScreenWindow, desktopStyles.zIndex(index)]}
          key={getKey(tool)}
          onClose={onClose}
          scenarioId={scenario.id}
          onMinimize={onMinimize}
          sampleCompanyId={Option.of(scenario.sampleCompanyId)}
          sampleCompanyName={Option.of(scenario.sampleCompany?.name)}
          useSurveyEvents={partial(useErpSurveyEvents, scenario.id)}
        />
      )
    case OfficeTool.Notes:
      return (
        <NotesContainer
          customStyles={[
            desktopStyles.nonFullScreenWindow,
            desktopStyles.calculatorWindow,
            desktopStyles.zIndex(index)
          ]}
          key={getKey(tool)}
          scenarioId={scenario.id}
          onClose={onClose}
          onMinimize={onMinimize}
          useState={useNotesState}
          useStateActions={useNotesStateActions}
          useSurveyEvents={partial(useNotesSurveyEvents, scenario.id)}
        />
      )
    case BinaryViewerTool.TextEditor:
      return (
        <TextEditorContainer
          customStyles={[desktopStyles.fullScreenWindow, desktopStyles.zIndex(index)]}
          key={getKey(tool)}
          useState={useTextDocumentsState}
          useStateActions={useTextDocumentsStateActions}
          useSurveyEvents={partial(useTextDocumentsSurveyEvents, scenario.id)}
          scenarioId={scenario.id}
          onClose={onClose}
          onMinimize={onMinimize}
          sampleCompanyIdOption={Option.of(scenario.sampleCompanyId)}
        />
      )
    case BinaryViewerTool.ImageViewer:
      return (
        <ImageViewerContainer
          customStyles={[desktopStyles.fullScreenWindow, desktopStyles.zIndex(index)]}
          key={getKey(tool)}
          onClose={onClose}
          onMinimize={onMinimize}
          useState={useImageViewerState}
          useSurveyEvents={useImageViewerSurveyEvents}
        />
      )
    case BinaryViewerTool.PDFViewer:
      return (
        <PdfViewerContainer
          customStyles={[desktopStyles.fullScreenWindow, desktopStyles.zIndex(index)]}
          key={getKey(tool)}
          onClose={onClose}
          onMinimize={onMinimize}
          useState={usePdfViewerState}
          useSurveyEvents={usePdfViewerSurveyEvents}
        />
      )
    case BinaryViewerTool.VideoPlayer:
      return (
        <VideoViewerContainer
          key={getKey(tool)}
          onClose={onClose}
          customStyles={[desktopStyles.fullScreenWindow, desktopStyles.zIndex(index)]}
          onMinimize={onMinimize}
          useState={useVideoViewerState}
          useSurveyEvents={partial(useVideoViewerSurveyEvents, scenario.id)}
        />
      )
    case BinaryViewerTool.SpreadsheetEditor:
      return (
        <SpreadsheetViewerContainer
          key={getKey(tool)}
          onClose={onClose}
          customStyles={[desktopStyles.fullScreenWindow, desktopStyles.zIndex(index)]}
          onMinimize={onMinimize}
          scenarioId={scenario.id}
          sampleCompanyIdOption={Option.of(scenario.sampleCompanyId)}
          useState={useSpreadsheetViewerState}
          useStateActions={useSpreadsheetViewerStateActions}
          useSurveyEvents={partial(useSpreadsheetViewerSurveyEvents, scenario.id)}
        />
      )
    default:
      return null
  }
}
