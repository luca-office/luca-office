import * as React from "react"
import {useEffect} from "react"
import {BinaryViewerTool, OfficeTool, OfficeWindowType, ViewerToolsType} from "../../enums"
import {MimeType} from "../../graphql/generated/globalTypes"
import {
  Directory,
  File,
  MediaFile,
  SpreadsheetFile,
  TextDocumentFile,
  ViewDirectorySurveyEventPayload,
  ViewFileSurveyEventPayload
} from "../../models"
import {FilesAndDirectories} from "../../office-tools"
import {SpreadsheetState, TextDocumentsState} from "../../redux/state/data"
import {BinaryViewerState} from "../../redux/state/ui"
import {CustomStyle} from "../../styles"
import {useLucaTranslation} from "../../translations"
import {
  find,
  findPathToRoot,
  getParentDirectory,
  getViewerToolForMimeType,
  mapFileToMimeType,
  OpenBinaryEventProps,
  OpenSpreadsheetEventProps,
  OpenTextDocumentEventProps,
  Option
} from "../../utils"
import {combineFiles, filesAndDirsDownloadId} from "./utils/files-and-directories-utils"

export interface FilesAndDirectoriesState {
  readonly selectedDirectoryId: Option<UUID>
  readonly localSpreadsheets: SpreadsheetState
  readonly localTextDocuments: TextDocumentsState
  readonly selectedFileId: Option<UUID>
  readonly expandedDirectoryIds: Array<UUID>
  readonly availableEmailFileIds: Array<UUID>
  readonly topmostWindow: OfficeWindowType
  readonly openWindows: Array<OfficeWindowType>
}

export interface FilesAndDirectoriesRemoteState {
  readonly directories: Array<Directory>
  readonly files: Array<File>
  readonly sampleCompanyFiles: Array<File>
  readonly dataLoading: boolean
}

export interface FilesAndDirectoriesStateActions {
  readonly expandDirectories: (directoryIds: Array<string>) => void
  readonly selectDirectory: (directoryId: string) => void
  readonly selectFile: (fileId: string) => void
  readonly toggleExpandDirectory: (directoryId: string) => void
  readonly openBinary: (binaryId: string, url: string, viewerType: keyof BinaryViewerState, title?: string) => void
  readonly openSpreadsheet: (spreadsheetId: string, title?: string) => void
  readonly openTextDocument: (textDocumentId: string, title: string) => void
  readonly resetEmailFileDownloadCounter: () => void
}

export interface FilesAndDirectoriesSurveyEvents {
  readonly sendOpenToolEvent: (tool: OfficeWindowType) => void
  readonly sendRestoreToolEvent: (tool: OfficeWindowType) => void
  readonly sendViewDirectoryEvent: (payload: ViewDirectorySurveyEventPayload) => void
  readonly sendViewFileEvent: (payload: ViewFileSurveyEventPayload) => void
  readonly sendViewDownloadsDirectoryEvent: () => void
  readonly sendOpenImageBinaryEvent: (eventProps: OpenBinaryEventProps) => void
  readonly sendOpenPdfBinaryEvent: (eventProps: OpenBinaryEventProps) => void
  readonly sendOpenVideoBinaryEvent: (eventProps: OpenBinaryEventProps) => void
  readonly sendOpenSpreadsheetEvent: (eventProps: OpenSpreadsheetEventProps) => void
  readonly sendOpenTextDocumentEvent: (eventProps: OpenTextDocumentEventProps) => void
}

export interface FilesAndDirectoriesContainerProps extends CustomStyle {
  readonly onClose: () => void
  readonly onMinimize: () => void
  readonly scenarioId: UUID
  readonly sampleCompanyId: Option<UUID>
  readonly sampleCompanyTitle: Option<string>
  readonly useState: () => FilesAndDirectoriesState
  readonly useRemoteState: (scenarioId: UUID, sampleCompanyIdOption: Option<UUID>) => FilesAndDirectoriesRemoteState
  readonly useStateActions: () => FilesAndDirectoriesStateActions
  readonly useSurveyEvents: (scenarioId: UUID) => FilesAndDirectoriesSurveyEvents
}

export const FilesAndDirectoriesContainer: React.FC<FilesAndDirectoriesContainerProps> = ({
  customStyles,
  onClose,
  onMinimize,
  scenarioId,
  sampleCompanyId,
  sampleCompanyTitle,
  useState,
  useRemoteState,
  useStateActions,
  useSurveyEvents
}) => {
  const {t} = useLucaTranslation()
  const {
    expandedDirectoryIds,
    localSpreadsheets,
    localTextDocuments,
    selectedDirectoryId,
    selectedFileId,
    availableEmailFileIds,
    topmostWindow,
    openWindows
  } = useState()

  const {
    expandDirectories,
    openBinary,
    openSpreadsheet,
    openTextDocument,
    selectDirectory,
    selectFile,
    toggleExpandDirectory,
    resetEmailFileDownloadCounter
  } = useStateActions()

  const {
    sendOpenToolEvent,
    sendViewDirectoryEvent,
    sendViewFileEvent,
    sendViewDownloadsDirectoryEvent,
    sendOpenImageBinaryEvent,
    sendOpenPdfBinaryEvent,
    sendOpenSpreadsheetEvent,
    sendOpenVideoBinaryEvent,
    sendRestoreToolEvent,
    sendOpenTextDocumentEvent
  } = useSurveyEvents(scenarioId)

  const {dataLoading, directories, files, sampleCompanyFiles} = useRemoteState(scenarioId, sampleCompanyId)
  const allFiles = combineFiles(files, sampleCompanyFiles, availableEmailFileIds, localSpreadsheets, localTextDocuments)

  // when returning to window and download dir is open, reset count
  useEffect(() => {
    if (topmostWindow === OfficeTool.FileBrowser) {
      selectedDirectoryId.forEach(id => id === filesAndDirsDownloadId && resetEmailFileDownloadCounter())
    }
  }, [topmostWindow, availableEmailFileIds])

  const onSelect = (id: UUID) => {
    expandDirectories(findPathToRoot(id, directories, sampleCompanyFiles))
  }

  const onSelectDirectory = (id: UUID) => {
    selectDirectory(id)

    if (id === filesAndDirsDownloadId) {
      sendViewDownloadsDirectoryEvent()
      resetEmailFileDownloadCounter()
    } else {
      sendViewDirectoryEvent({
        directoryId: id,
        parentDirectoryId: getParentDirectory(id, directories, allFiles)
          .map(({id}) => id)
          .orUndefined(),
        scenarioId
      })
    }

    onSelect(id)
  }

  const onSelectFile = (id: UUID) => {
    selectFile(id)
    find(file => file.id === id, allFiles).forEach(file =>
      sendViewFileEvent({
        fileId: id,
        mimeType: mapFileToMimeType(file),
        directoryId: getParentDirectory(id, directories, allFiles)
          .map(({id}) => id)
          .filter(id => id !== filesAndDirsDownloadId)
          .orUndefined(),
        scenarioId
      })
    )
    onSelect(id)
  }

  const onExpandDirectory = (directoryNodeId: string) => {
    toggleExpandDirectory(directoryNodeId)

    if (directoryNodeId === filesAndDirsDownloadId) {
      resetEmailFileDownloadCounter()
    }
  }

  const onOpenFile = (file: MediaFile) => {
    switch (getViewerToolForMimeType(file.binaryFile.mimeType)) {
      case ViewerToolsType.Image:
        openWindows.includes(BinaryViewerTool.ImageViewer)
          ? sendRestoreToolEvent(BinaryViewerTool.ImageViewer)
          : sendOpenToolEvent(BinaryViewerTool.ImageViewer)

        sendOpenImageBinaryEvent({
          directoryId: file.directoryId === filesAndDirsDownloadId ? undefined : file.directoryId ?? undefined,
          fileId: file.id,
          binaryFileId: file.binaryFileId,
          binaryFileTitle: file.name,
          binaryFileUrl: file.binaryFileUrl
        })

        openBinary(file.binaryFileId, file.binaryFileUrl, "imageViewer", file.name)
        break
      case ViewerToolsType.Video:
        openWindows.includes(BinaryViewerTool.VideoPlayer)
          ? sendRestoreToolEvent(BinaryViewerTool.VideoPlayer)
          : sendOpenToolEvent(BinaryViewerTool.VideoPlayer)

        sendOpenVideoBinaryEvent({
          directoryId: file.directoryId === filesAndDirsDownloadId ? undefined : file.directoryId ?? undefined,
          fileId: file.id,
          binaryFileId: file.binaryFileId,
          binaryFileTitle: file.name,
          binaryFileUrl: file.binaryFileUrl
        })

        openBinary(file.binaryFileId, file.binaryFileUrl, "videoPlayer", file.name)
        break
      case ViewerToolsType.PDF:
        openWindows.includes(BinaryViewerTool.PDFViewer)
          ? sendRestoreToolEvent(BinaryViewerTool.PDFViewer)
          : sendOpenToolEvent(BinaryViewerTool.PDFViewer)

        sendOpenPdfBinaryEvent({
          directoryId: file.directoryId === filesAndDirsDownloadId ? undefined : file.directoryId ?? undefined,
          fileId: file.id,
          binaryFileId: file.binaryFileId,
          binaryFileTitle: file.name,
          binaryFileUrl: file.binaryFileUrl
        })

        openBinary(file.binaryFileId, file.binaryFileUrl, "pdfViewer", file.name)
        break
    }
  }

  const onOpenSpreadsheetFile = (file: SpreadsheetFile) => {
    sendOpenSpreadsheetEvent({
      directoryId: file.directoryId === filesAndDirsDownloadId ? undefined : file.directoryId ?? undefined,
      fileId: file.id,
      spreadsheetId: file.spreadsheetId,
      spreadsheetTitle: file.name
    })

    sendOpenToolEvent(OfficeTool.SpreadsheetEditor)
    openSpreadsheet(file.spreadsheetId, file.name)
  }

  const onOpenTextDocumentFile = (file: TextDocumentFile) => {
    sendOpenTextDocumentEvent({
      directoryId: file.directoryId === filesAndDirsDownloadId ? undefined : file.directoryId ?? undefined,
      fileId: file.id,
      textDocumentId: file.textDocumentId,
      textDocumentTitle: file.name
    })

    sendOpenToolEvent(BinaryViewerTool.TextEditor)
    openTextDocument(file.textDocumentId, file.name)
  }

  return (
    <FilesAndDirectories
      customStyles={customStyles}
      directories={directories}
      expandedDirectoryIds={expandedDirectoryIds}
      files={allFiles}
      isLoading={dataLoading}
      onClose={onClose}
      onExpandDirectory={onExpandDirectory}
      onMinimize={onMinimize}
      onOpenFile={onOpenFile}
      onOpenSpreadsheetFile={onOpenSpreadsheetFile}
      onOpenTextDocumentFile={onOpenTextDocumentFile}
      onSelectDirectory={onSelectDirectory}
      onSelectFile={onSelectFile}
      selectedDirectoryId={selectedDirectoryId}
      selectedFileId={selectedFileId}
      sampleCompanyTitle={sampleCompanyTitle.orUndefined()}
      t={t}
    />
  )
}
