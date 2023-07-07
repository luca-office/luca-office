import {css} from "@emotion/react"
import {noop, partial} from "lodash-es"
import * as React from "react"
import {Content, Desktop, DetailViewHeader, ProgressTimeClock, Taskbar} from "shared/components"
import {findVisibleWindows} from "shared/components/desktop/utils"
import {createRenderTool, useFilesAndDirectoriesRemoteState, useReferenceBookToolRemoteState} from "shared/office-tools"
import {useEmailClientRemoteState} from "shared/office-tools/email-client/hook/use-email-client-remote-state"
import {Flex, flex1, zIndex1} from "shared/styles"
import {last, Option} from "shared/utils"
import {AppState} from "../../../redux/state/app-state"
import {useScenarioPreview} from "./hooks/use-scenario-preview"
import {useCalculatorState, useCalculatorSurveyEvents} from "./office-tools/calculator"
import {chatComposer} from "./office-tools/chat"
import {useEmailClientState, useEmailClientStateActions, useEmailClientSurveyEvents} from "./office-tools/email-client"
import {useErpSurveyEvents} from "./office-tools/erp"
import {
  useFilesAndDirectoriesState,
  useFilesAndDirectoriesStateActions,
  useFilesAndDirectoriesSurveyEvents
} from "./office-tools/files-and-directories"
import {useImageViewerState, useImageViewerSurveyEvents} from "./office-tools/image-viewer/hooks"
import {useNotesState, useNotesStateActions, useNotesSurveyEvents} from "./office-tools/notes/hooks"
import {usePdfViewerState, usePdfViewerSurveyEvents} from "./office-tools/pdf-viewer/hooks"
import {
  useReferenceBookToolState,
  useReferenceBookToolStateActions,
  useReferenceBookToolSurveyEvents
} from "./office-tools/reference-book"
import {
  useSpreadsheetViewerState,
  useSpreadsheetViewerStateActions,
  useSpreadsheetViewerSurveyEvents
} from "./office-tools/spreadsheet-viewer"
import {
  useTextDocumentsState,
  useTextDocumentsStateActions,
  useTextDocumentsSurveyEvents
} from "./office-tools/text-editor"
import {useVideoViewerState, useVideoViewerSurveyEvents} from "./office-tools/video-viewer/hooks"

export interface ScenarioPreviewProps {
  readonly scenarioId: UUID
}

export const ScenarioPreview: React.FC<ScenarioPreviewProps> = ({scenarioId}) => {
  const {
    availableWindows,
    scenarioOption,
    isLoading,
    openWindow,
    navigateToScenarioDetail,
    abortScenarioFinishModal,
    closeQuestionnaireEvent,
    closeWindow,
    confirmScenarioFinishModal,
    confirmScenarioTimeUpModal,
    currentQuestionnaireId,
    interventions,
    isFinishModalVisible,
    isScenarioDurationExpired,
    isStartModalVisible,
    minimizeWindow,
    onStartScenario,
    sendCompletionMail,
    openWindows,
    minimizedWindows,
    unreadEmailsCount,
    newEmailDownloadsCount
  } = useScenarioPreview(scenarioId)

  const header = (
    <DetailViewHeader
      customStyles={styles.detailviewHeader}
      labelKey={"scenario_preview__header_label"}
      labelOptions={{name: scenarioOption.map(scenario => scenario.name).getOrElse("")}}
      navigationButtonConfig={{labelKey: "scenario_preview__back_button_label", onClick: navigateToScenarioDetail}}
      customContent={
        <div css={styles.progressContainer}>
          {scenarioOption
            .map(scenario => (
              <ProgressTimeClock
                fictiveDate={scenario.date ? new Date(scenario.date) : undefined}
                maxModuleTimeInSeconds={scenario.maxDurationInSeconds ?? undefined}
              />
            ))
            .orNull()}
        </div>
      }
    />
  )

  return (
    <Content
      customStyles={styles.contentContainerWrapper}
      subHeader={header}
      loading={isLoading}
      customContentContainerStyles={styles.contentContainer}
      isContentMissing={!isLoading && scenarioOption.isEmpty()}>
      {scenarioOption
        .map(scenario => (
          <Desktop
            customStyles={styles.desktop}
            scenario={scenario}
            isScenarioLoading={isLoading}
            abortScenarioFinishModal={abortScenarioFinishModal}
            availableWindows={availableWindows}
            closeQuestionnaireEvent={closeQuestionnaireEvent}
            closeWindow={closeWindow}
            confirmScenarioFinishModal={confirmScenarioFinishModal}
            confirmScenarioTimeUpModal={confirmScenarioTimeUpModal}
            currentQuestionnaireId={currentQuestionnaireId}
            interventions={interventions}
            isFinishModalVisible={isFinishModalVisible}
            isScenarioDurationExpired={isScenarioDurationExpired}
            scenarioDurationInSeconds={scenarioOption
              .flatMap(({maxDurationInSeconds}) => Option.of(maxDurationInSeconds))
              .orUndefined()}
            isStartModalVisible={isStartModalVisible}
            minimizeWindow={minimizeWindow}
            minimizedWindows={minimizedWindows}
            onStartScenario={onStartScenario}
            openedWindows={openWindows}
            sendCompletionMail={sendCompletionMail}
            isHeaderVisible={false}
            taskbar={
              <Taskbar
                availableWindows={availableWindows}
                openedWindows={openWindows}
                onOpenWindow={openWindow}
                focussedWindow={last(findVisibleWindows(openWindows, minimizedWindows))}
                unreadEmailsCount={unreadEmailsCount}
                unreadMessageCount={0}
                newEmailDownloadsCount={newEmailDownloadsCount}
              />
            }
            renderTool={renderTool({
              scenarioId: scenario.id,
              isQuestionnaireEventVisible: currentQuestionnaireId.isDefined()
            })}
            onClipboardEvent={noop}
          />
        ))
        .orNull()}
    </Content>
  )
}

const renderTool = ({
  scenarioId,
  isQuestionnaireEventVisible
}: {
  readonly scenarioId: UUID
  readonly isQuestionnaireEventVisible: boolean
}) =>
  createRenderTool({
    useCalculatorState,
    useCalculatorSurveyEvents: partial(useCalculatorSurveyEvents, scenarioId),
    useEmailClientState: partial(useEmailClientState, scenarioId),
    useEmailClientRemoteState: useEmailClientRemoteState<AppState>(state => state.playerPreview.player),
    useEmailClientStateActions,
    useEmailClientSurveyEvents: partial(useEmailClientSurveyEvents, scenarioId),
    useErpSurveyEvents: partial(useErpSurveyEvents, scenarioId),
    useFilesAndDirectoriesState,
    useFilesAndDirectoriesRemoteState,
    useFilesAndDirectoriesStateActions,
    useFilesAndDirectoriesSurveyEvents: partial(useFilesAndDirectoriesSurveyEvents, scenarioId),
    useImageViewerState,
    useImageViewerSurveyEvents: partial(useImageViewerSurveyEvents, scenarioId),
    useNotesState,
    useNotesStateActions,
    useNotesSurveyEvents: partial(useNotesSurveyEvents, scenarioId),
    usePdfViewerState,
    usePdfViewerSurveyEvents: partial(usePdfViewerSurveyEvents, scenarioId),
    useReferenceBookToolState,
    useReferenceBookToolRemoteState,
    useReferenceBookToolStateActions,
    useReferenceBookToolSurveyEvents: partial(useReferenceBookToolSurveyEvents, scenarioId),
    useSpreadsheetViewerState: partial(useSpreadsheetViewerState, isQuestionnaireEventVisible),
    useSpreadsheetViewerStateActions,
    useSpreadsheetViewerSurveyEvents: partial(useSpreadsheetViewerSurveyEvents, scenarioId),
    useVideoViewerState,
    useVideoViewerSurveyEvents: partial(useVideoViewerSurveyEvents, scenarioId),
    useTextDocumentsState,
    useTextDocumentsStateActions,
    useTextDocumentsSurveyEvents: partial(useTextDocumentsSurveyEvents, scenarioId),
    useChatComposer: chatComposer
  })

const styles = {
  desktop: css({
    height: "auto",
    flex: flex1
  }),
  progressContainer: css(Flex.row, {
    justifyContent: "flex-end"
  }),
  contentContainerWrapper: css({
    isolation: "isolate"
  }),
  detailviewHeader: css({
    zIndex: zIndex1
  }),
  contentContainer: css(Flex.column, {
    padding: 0
  })
}
