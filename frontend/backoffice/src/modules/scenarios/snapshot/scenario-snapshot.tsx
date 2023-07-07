import {css} from "@emotion/react"
import {CSSInterpolation} from "@emotion/serialize"
import {noop} from "lodash-es"
import * as React from "react"
import {Desktop, PlaceholderConfig, Taskbar} from "shared/components"
import {findVisibleWindows} from "shared/components/desktop/utils"
import {createRenderTool} from "shared/office-tools"
import {boxHeightLarge, CustomStyle, headerHeight, subHeaderHeight, zIndexToolbar} from "shared/styles"
import {last, Option} from "shared/utils"
import {useCalculatorSnapshotState, useCalculatorSnapshotSurveyEvents} from "./hooks/calculator"
import {chatComposer, useChatRemoteState, useChatState} from "./hooks/chat"
import {
  useEmailClientSnapshotState,
  useEmailClientSnapshotStateActions,
  useEmailClientSnapshotSurveyEvents
} from "./hooks/email-client"
import {useEmailClientSnapshotRemoteState} from "./hooks/email-client/use-email-client-snapshot-remote-state"
import {useErpSnapshotSurveyEvents} from "./hooks/erp/use-erp-snapshot-survey-events"
import {useFilesAndDirectoriesSnapshotRemoteState} from "./hooks/files-and-directories/use-files-and-directories-snapshot-remote-state"
import {useFilesAndDirectoriesSnapshotState} from "./hooks/files-and-directories/use-files-and-directories-snapshot-state"
import {useFilesAndDirectoriesSnapshotStateActions} from "./hooks/files-and-directories/use-files-and-directories-snapshot-state-actions"
import {useFilesAndDirectoriesSnapshotSurveyEvents} from "./hooks/files-and-directories/use-files-and-directories-snapshot-survey-events"
import {useImageViewerSnapshotState, useImageViewerSnapshotSurveyEvents} from "./hooks/image-viewer/hooks"
import {useNotesSnapshotState, useNotesSnapshotStateActions, useNotesSnapshotSurveyEvents} from "./hooks/notes/hooks"
import {usePdfViewerSnapshotState, usePdfViewerSnapshotSurveyEvents} from "./hooks/pdf-viewer/hooks"
import {
  useReferenceBookToolSnapshotRemoteState,
  useReferenceBookToolSnapshotState,
  useReferenceBookToolSnapshotStateActions,
  useReferenceBookToolSnapshotSurveyEvents
} from "./hooks/reference-book"
import {
  useSpreadsheetViewerSnapshotState,
  useSpreadsheetViewerSnapshotStateActions,
  useSpreadsheetViewerSnapshotSurveyEvents
} from "./hooks/spreadsheet-viewer"
import {
  useTextDocumentsSnapshotState,
  useTextDocumentsSnapshotStateActions,
  useTextDocumentsSnapshotSurveyEvents
} from "./hooks/text-editor"
import {useScenarioSnapshot} from "./hooks/use-scenario-snapshot"
import {useVideoViewerSnapshotState, useVideoViewerSnapshotSurveyEvents} from "./hooks/video-viewer/hooks"

export interface SurveySnapshotProps extends CustomStyle {
  readonly customTaskbarStyles?: CSSInterpolation
  readonly scenarioId: UUID
  readonly surveyInvitationId: UUID
  readonly surveyId: UUID
  readonly placeholderConfig?: PlaceholderConfig
  readonly showPlaceholder?: boolean
  readonly isDisabled?: boolean
  readonly usePortalForTaskbarTooltips?: boolean
  readonly pollSurveyEvents?: boolean
}

export const ScenarioSnapshot: React.FC<SurveySnapshotProps> = ({
  customStyles,
  customTaskbarStyles,
  scenarioId,
  surveyId,
  surveyInvitationId,
  placeholderConfig,
  showPlaceholder = false,
  isDisabled,
  usePortalForTaskbarTooltips = false,
  pollSurveyEvents = false
}) => {
  const {
    dataLoading,
    scenario: scenarioOption,
    availableWindows,
    openWindows,
    minimizedWindows,
    openWindow,
    closeWindow,
    minimizeWindow,
    interventions,
    unreadEmailsCount
  } = useScenarioSnapshot(scenarioId, surveyInvitationId, surveyId, pollSurveyEvents)

  return scenarioOption
    .map(scenario => (
      <Desktop
        customStyles={customStyles}
        customDesktopBackgroundOverlayStyles={styles.desktopBackgroundOverlay}
        customDesktopPlaceholderStyles={styles.desktopBackgroundOverlay}
        customDesktopBackgroundOverlayBackgroundStyles={styles.desktopBackgroundOverlayBackground}
        customDesktopBackgroundPlaceholderContainerStyles={styles.desktopBackgroundOverlayPlaceholder}
        isHeaderVisible={false}
        abortScenarioFinishModal={noop}
        availableWindows={availableWindows}
        closeQuestionnaireEvent={noop}
        closeWindow={closeWindow}
        confirmScenarioFinishModal={noop}
        confirmScenarioTimeUpModal={noop}
        currentQuestionnaireId={Option.none()}
        isFinishModalVisible={false}
        isScenarioDurationExpired={false}
        isScenarioLoading={dataLoading}
        interventions={interventions}
        minimizedWindows={minimizedWindows}
        minimizeWindow={minimizeWindow}
        openedWindows={openWindows}
        scenario={scenario}
        sendCompletionMail={noop}
        isStartModalVisible={false}
        onStartScenario={noop}
        onClipboardEvent={noop}
        taskbar={
          <Taskbar
            customStyles={[styles.taskbar(showPlaceholder), customTaskbarStyles]}
            availableWindows={availableWindows}
            openedWindows={openWindows}
            onOpenWindow={openWindow}
            focussedWindow={last(findVisibleWindows(openWindows, minimizedWindows))}
            unreadEmailsCount={unreadEmailsCount}
            newEmailDownloadsCount={0}
            unreadMessageCount={0}
            isDisabled={isDisabled}
            usePortalForTooltips={usePortalForTaskbarTooltips}
          />
        }
        placeholderConfig={placeholderConfig}
        showPlaceholder={showPlaceholder}
        renderTool={renderTool()}
      />
    ))
    .orNull()
}

const renderTool = () =>
  createRenderTool({
    useCalculatorState: useCalculatorSnapshotState,
    useCalculatorSurveyEvents: useCalculatorSnapshotSurveyEvents,
    useEmailClientState: useEmailClientSnapshotState,
    useEmailClientRemoteState: useEmailClientSnapshotRemoteState,
    useEmailClientStateActions: useEmailClientSnapshotStateActions,
    useEmailClientSurveyEvents: useEmailClientSnapshotSurveyEvents,
    useErpSurveyEvents: useErpSnapshotSurveyEvents,
    useFilesAndDirectoriesState: useFilesAndDirectoriesSnapshotState,
    useFilesAndDirectoriesRemoteState: useFilesAndDirectoriesSnapshotRemoteState,
    useFilesAndDirectoriesStateActions: useFilesAndDirectoriesSnapshotStateActions,
    useFilesAndDirectoriesSurveyEvents: useFilesAndDirectoriesSnapshotSurveyEvents,
    useImageViewerState: useImageViewerSnapshotState,
    useImageViewerSurveyEvents: useImageViewerSnapshotSurveyEvents,
    useNotesState: useNotesSnapshotState,
    useNotesStateActions: useNotesSnapshotStateActions,
    useNotesSurveyEvents: useNotesSnapshotSurveyEvents,
    usePdfViewerState: usePdfViewerSnapshotState,
    usePdfViewerSurveyEvents: usePdfViewerSnapshotSurveyEvents,
    useReferenceBookToolState: useReferenceBookToolSnapshotState,
    useReferenceBookToolRemoteState: useReferenceBookToolSnapshotRemoteState,
    useReferenceBookToolStateActions: useReferenceBookToolSnapshotStateActions,
    useReferenceBookToolSurveyEvents: useReferenceBookToolSnapshotSurveyEvents,
    useSpreadsheetViewerState: useSpreadsheetViewerSnapshotState,
    useSpreadsheetViewerStateActions: useSpreadsheetViewerSnapshotStateActions,
    useSpreadsheetViewerSurveyEvents: useSpreadsheetViewerSnapshotSurveyEvents,
    useTextDocumentsState: useTextDocumentsSnapshotState,
    useTextDocumentsStateActions: useTextDocumentsSnapshotStateActions,
    useTextDocumentsSurveyEvents: useTextDocumentsSnapshotSurveyEvents,
    useVideoViewerState: useVideoViewerSnapshotState,
    useVideoViewerSurveyEvents: useVideoViewerSnapshotSurveyEvents,
    useChatComposer: () => chatComposer(useChatState, useChatRemoteState)
  })

const styles = {
  desktopBackgroundOverlay: css({
    height: `calc(100vh - ${headerHeight + subHeaderHeight}px)`
  }),
  desktopBackgroundOverlayPlaceholder: css({
    zIndex: zIndexToolbar + 1,
    bottom: boxHeightLarge
  }),
  desktopBackgroundOverlayBackground: css({
    zIndex: zIndexToolbar,
    opacity: 1,
    height: `calc(100% - ${boxHeightLarge}px)`
  }),
  taskbar: (showPlaceholder: boolean) =>
    css({
      zIndex: showPlaceholder ? zIndexToolbar + 1 : "initial"
    })
}
