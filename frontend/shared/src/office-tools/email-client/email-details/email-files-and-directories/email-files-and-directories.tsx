import {css} from "@emotion/react"
import * as React from "react"
import {Button, FileExplorer, FilesAndDirectoriesDetailEmpty, OfficeWindow} from "../../../../components"
import {IconName, NodeType, ViewerToolsType} from "../../../../enums"
import {Directory, File, MediaFile, SpreadsheetFile, TextDocumentFile, TreeNodeType} from "../../../../models"
import {
  backgroundColorLight,
  boxHeightLarge,
  cardBottomColor,
  CustomStyle,
  Flex,
  flex1,
  insetShadow,
  spacing,
  spacingHuge,
  spacingMedium,
  spacingTiny
} from "../../../../styles"
import {LucaTFunction} from "../../../../translations"
import {createTree, find, Option} from "../../../../utils"
import {DirectoryDetail} from "../../../files-and-directories/directory-detail/directory-detail"
import {FileDetail} from "../../../files-and-directories/file-detail/file-detail"
import {
  filesAndDirsDownloadId,
  isSampleCompanyRootDirectory
} from "../../../files-and-directories/utils/files-and-directories-utils"

export interface EmailFilesAndDirectoriesProps extends CustomStyle {
  readonly directories: Directory[]
  readonly expandedDirectoryIds: UUID[]
  readonly files: File[]
  readonly isLoading: boolean
  readonly onClose: () => void
  readonly onOpenFile: (file: MediaFile) => void
  readonly onOpenSpreadsheetFile: (spreadsheet: SpreadsheetFile) => void
  readonly onOpenTextDocumentFile: (textDocument: TextDocumentFile) => void
  readonly onExpandDirectory: (directoryNodeId: string) => void
  readonly onSelectDirectory: (id: UUID) => void
  readonly onSelectFile: (id: UUID) => void
  readonly onSelectFileForUpload: (file: File) => void
  readonly sampleCompanyTitle?: string
  readonly selectedDirectoryId: Option<UUID>
  readonly selectedFileId: Option<UUID>
  readonly t: LucaTFunction
}

export const EmailFilesAndDirectories: React.FC<EmailFilesAndDirectoriesProps> = ({
  customStyles,
  directories,
  expandedDirectoryIds,
  files,
  isLoading,
  onClose,
  onExpandDirectory,
  onSelectDirectory,
  onSelectFile,
  sampleCompanyTitle,
  selectedDirectoryId,
  selectedFileId,
  onSelectFileForUpload,
  onOpenFile,
  onOpenSpreadsheetFile,
  onOpenTextDocumentFile,
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
    files
  )

  const sampleCompanyRootDirectoryId = directories.find(dir => isSampleCompanyRootDirectory(dir))?.id

  const onSelectNode = (node: TreeNodeType) =>
    (node.type === NodeType.Directory ? onSelectDirectory : onSelectFile)(node.id)

  return (
    <OfficeWindow
      toolType={ViewerToolsType.FilesAndDirectories}
      label={t("files_and_directories__email__upload__title")}
      onClose={onClose}
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
            <div css={styles.fileDetailWrapper}>
              <FileDetail
                customStyles={styles.fileDetail}
                t={t}
                file={file}
                openFile={onOpenFile}
                openSpreadsheet={onOpenSpreadsheetFile}
                openTextDocument={onOpenTextDocumentFile}
                isPreview={false}
              />
              <div css={styles.fileDetailUploadWrapper}>
                <div css={styles.fileDetailUpload}>
                  {t("files_and_directories__email__upload__text")}
                  <Button onClick={() => onSelectFileForUpload(file)}>{t("add_button")}</Button>
                </div>
              </div>
            </div>
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
  window: css(Flex.column, {
    width: "80vw",
    height: "70vh"
  }),
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
  }),
  fileDetailWrapper: css(Flex.column, {overflowY: "auto"}),
  fileDetail: css({
    flex: flex1,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  }),
  fileDetailUploadWrapper: css({
    boxSizing: "border-box",
    background: cardBottomColor,
    height: 96,
    padding: spacingMedium
  }),
  fileDetailUpload: css(Flex.row, {
    boxSizing: "border-box",
    height: boxHeightLarge,
    padding: spacingMedium,
    borderRadius: spacingTiny,
    background: backgroundColorLight,
    justifyContent: "space-between",
    boxShadow: insetShadow
  })
}
