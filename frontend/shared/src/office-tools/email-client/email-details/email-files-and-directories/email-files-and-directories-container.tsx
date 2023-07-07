import * as React from "react"
import {BinaryViewerTool, OfficeTool, ViewerToolsType} from "../../../../enums"
import {File, MediaFile, SpreadsheetFile, TextDocumentFile} from "../../../../models"
import {useLucaTranslation} from "../../../../translations"
import {findPathToRoot, getViewerToolForMimeType, Option} from "../../../../utils"
import {
  FilesAndDirectoriesRemoteState,
  FilesAndDirectoriesState,
  FilesAndDirectoriesStateActions,
  FilesAndDirectoriesSurveyEvents
} from "../../../files-and-directories"
import {combineFiles, filesAndDirsDownloadId} from "../../../files-and-directories/utils/files-and-directories-utils"
import {EmailFilesAndDirectories} from "./email-files-and-directories"

export interface EmailFilesAndDirectoriesConfig {
  readonly sampleCompanyTitle: Option<string>
  readonly scenarioId: UUID
  readonly useFilesAndDirectoriesState: () => FilesAndDirectoriesState
  readonly useFilesAndDirectoriesStateActions: () => FilesAndDirectoriesStateActions
  readonly useFilesAndDirectoriesRemoteState: () => FilesAndDirectoriesRemoteState
  readonly useSurveyEvents: (scenarioId: UUID) => FilesAndDirectoriesSurveyEvents
}

export interface EmailFilesAndDirectoriesContainerProps {
  readonly filesAndDirectoriesConfig: EmailFilesAndDirectoriesConfig
  readonly onClose: () => void
  readonly onSelectFileForUpload: (file: File) => void
}

export const EmailFilesAndDirectoriesContainer: React.FC<EmailFilesAndDirectoriesContainerProps> = ({
  filesAndDirectoriesConfig,
  onClose,
  onSelectFileForUpload
}) => {
  const {t} = useLucaTranslation()
  const {
    expandedDirectoryIds,
    localSpreadsheets,
    localTextDocuments,
    selectedDirectoryId,
    selectedFileId,
    availableEmailFileIds,
    openWindows
  } = filesAndDirectoriesConfig.useFilesAndDirectoriesState()

  const {
    sendOpenToolEvent,
    sendOpenImageBinaryEvent,
    sendOpenPdfBinaryEvent,
    sendOpenSpreadsheetEvent,
    sendOpenVideoBinaryEvent,
    sendRestoreToolEvent,
    sendOpenTextDocumentEvent
  } = filesAndDirectoriesConfig.useSurveyEvents(filesAndDirectoriesConfig.scenarioId)

  const {
    expandDirectories,
    selectDirectory,
    selectFile,
    toggleExpandDirectory,
    openBinary,
    openSpreadsheet,
    openTextDocument
  } = filesAndDirectoriesConfig.useFilesAndDirectoriesStateActions()

  const {
    dataLoading,
    directories,
    files,
    sampleCompanyFiles
  } = filesAndDirectoriesConfig.useFilesAndDirectoriesRemoteState()

  const onSelect = (id: UUID) => {
    expandDirectories(findPathToRoot(id, directories, sampleCompanyFiles))
  }

  const onSelectDirectory = (id: UUID) => {
    selectDirectory(id)
    onSelect(id)
  }

  const onSelectFile = (id: UUID) => {
    selectFile(id)
    onSelect(id)
  }

  const onExpandDirectory = (directoryNodeId: string) => {
    toggleExpandDirectory(directoryNodeId)
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
    <EmailFilesAndDirectories
      directories={directories}
      expandedDirectoryIds={expandedDirectoryIds}
      files={combineFiles(files, sampleCompanyFiles, availableEmailFileIds, localSpreadsheets, localTextDocuments)}
      onClose={onClose}
      isLoading={dataLoading}
      onExpandDirectory={onExpandDirectory}
      onSelectDirectory={onSelectDirectory}
      onSelectFile={onSelectFile}
      selectedDirectoryId={selectedDirectoryId}
      selectedFileId={selectedFileId}
      sampleCompanyTitle={filesAndDirectoriesConfig.sampleCompanyTitle.orUndefined()}
      onSelectFileForUpload={onSelectFileForUpload}
      onOpenFile={onOpenFile}
      onOpenTextDocumentFile={onOpenTextDocumentFile}
      onOpenSpreadsheetFile={onOpenSpreadsheetFile}
      t={t}
    />
  )
}
