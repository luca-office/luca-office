import {css} from "@emotion/react"
import * as React from "react"
import {FileExplorer, FilesAndDirectoriesDetailEmpty, OfficeWindow} from "../../components"
import {IconName, NodeType, ViewerToolsType} from "../../enums"
import {Directory, File, MediaFile, Spreadsheet, SpreadsheetFile, TextDocumentFile, TreeNodeType} from "../../models"
import {CustomStyle, Flex, spacing, spacingHuge, spacingMedium} from "../../styles"
import {LucaTFunction} from "../../translations"
import {createTree, find, Option} from "../../utils"
import {DirectoryDetail} from "./directory-detail/directory-detail"
import {FileDetail} from "./file-detail/file-detail"
import {filesAndDirsDownloadId, isSampleCompanyRootDirectory} from "./utils/files-and-directories-utils"

export enum AutomatedCriterionFilesAndDirectoriesConfigType {
  DocumentView = "DocumentView",
  InputValue = "InputValue"
}

export interface AutomatedCriterionFilesAndDirectoriesConfig {
  readonly onSpreadsheetClick?: (fileId: UUID, spreadsheet: Spreadsheet) => void
  readonly onFileClick?: (fileId: UUID) => void
  readonly codingCriterionType: AutomatedCriterionFilesAndDirectoriesConfigType
}

export interface FilesAndDirectoriesProps extends CustomStyle {
  readonly directories: Directory[]
  readonly expandedDirectoryIds: UUID[]
  readonly files: File[]
  readonly isLoading: boolean
  readonly isPreview?: boolean
  readonly onClose: () => void
  readonly onExpandDirectory: (directoryNodeId: string) => void
  readonly onMinimize?: () => void
  readonly onOpenFile: (file: MediaFile) => void
  readonly onOpenSpreadsheetFile: (spreadsheet: SpreadsheetFile) => void
  readonly onOpenTextDocumentFile: (textDocument: TextDocumentFile) => void
  readonly onSelectDirectory: (id: UUID) => void
  readonly onSelectFile: (id: UUID) => void
  readonly sampleCompanyTitle?: string
  readonly selectedDirectoryId: Option<UUID>
  readonly selectedFileId: Option<UUID>
  readonly t: LucaTFunction
  readonly automatedCriterionConfig?: AutomatedCriterionFilesAndDirectoriesConfig
}

export const FilesAndDirectories: React.FC<FilesAndDirectoriesProps> = ({
  customStyles,
  directories,
  expandedDirectoryIds,
  files,
  isLoading,
  isPreview = false,
  onClose,
  onExpandDirectory,
  onMinimize,
  onOpenFile,
  onOpenSpreadsheetFile,
  onOpenTextDocumentFile,
  onSelectDirectory,
  onSelectFile,
  sampleCompanyTitle,
  selectedDirectoryId,
  selectedFileId,
  automatedCriterionConfig,
  t
}) => {
  const selectedDirectory = find(directory => selectedDirectoryId.contains(directory.id), directories)
  const selectedFile = find(file => selectedFileId.contains(file.id), files)
  const subdirectoriesInSelectedDirectory = selectedDirectoryId
    .map(directoryId => directories.filter(directory => directory.parentDirectoryId === directoryId))
    .getOrElse([])
  const filesInSelectedDirectory = selectedDirectoryId
    .map(directoryId => files.filter(file => file.directoryId === directoryId))
    .getOrElse([])

  const tree = createTree(
    directories.map(dir => (isSampleCompanyRootDirectory(dir) ? {...dir, name: sampleCompanyTitle ?? ""} : dir)),
    files,
    automatedCriterionConfig?.codingCriterionType === AutomatedCriterionFilesAndDirectoriesConfigType.InputValue
  )

  const sampleCompanyRootDirectoryId = directories.find(dir => isSampleCompanyRootDirectory(dir))?.id

  const onSelectNode = (node: TreeNodeType) =>
    (node.type === NodeType.Directory ? onSelectDirectory : onSelectFile)(node.id)

  return (
    <OfficeWindow
      toolType={ViewerToolsType.FilesAndDirectories}
      onClose={onClose}
      onMinimize={onMinimize}
      customStyles={[styles.window, customStyles]}>
      <div css={styles.content}>
        <FileExplorer
          isLoading={isLoading}
          tree={tree}
          renderCustomDirectoryIcon={node =>
            node.id === filesAndDirsDownloadId
              ? IconName.Download
              : sampleCompanyRootDirectoryId === node.id
              ? IconName.Database
              : IconName.Folder
          }
          prependSort={Option.of(sampleCompanyRootDirectoryId)
            .map(id => [filesAndDirsDownloadId, id])
            .getOrElse([filesAndDirsDownloadId])}
          selectedNodeId={selectedDirectoryId.orElse(selectedFileId)}
          onSelectNode={onSelectNode}
          onExpandDirectory={onExpandDirectory}
          expandedDirectoryIds={expandedDirectoryIds}
          customStyles={{card: styles.fileExplorer}}
        />
        {selectedFile
          .map(file => (
            <FileDetail
              t={t}
              file={file}
              automatedCriterionConfig={automatedCriterionConfig}
              openFile={onOpenFile}
              openSpreadsheet={onOpenSpreadsheetFile}
              openTextDocument={onOpenTextDocumentFile}
              isPreview={isPreview}
            />
          ))
          .orNull()}
        {selectedDirectory
          .map(directory => (
            <DirectoryDetail
              t={t}
              directory={directory}
              subdirectories={subdirectoriesInSelectedDirectory}
              files={filesInSelectedDirectory}
              onSelectDirectory={onSelectDirectory}
              onSelectFile={onSelectFile}
            />
          ))
          .orNull()}
        {selectedDirectory.isEmpty() && selectedFile.isEmpty() ? <FilesAndDirectoriesDetailEmpty t={t} /> : null}
      </div>
    </OfficeWindow>
  )
}

const Size = {
  fileExplorer: 350
}

const styles = {
  window: Flex.column,
  content: css({
    flex: "1 1 auto",
    display: "grid",
    gap: spacingMedium,
    gridTemplateColumns: `${Size.fileExplorer}px 3fr`,
    padding: spacing(spacingMedium, spacingHuge),
    overflow: "hidden"
  }),
  fileExplorer: css({
    overflow: "hidden"
  })
}
