import * as React from "react"
import {DetailViewHeader, FileExplorer, FilesAndDirectoriesDetailEmpty, Overlay} from "shared/components"
import {IconName} from "shared/enums"
import {ButtonConfig} from "shared/models"
import {filesAndDirsDownloadId} from "shared/office-tools/files-and-directories/utils/files-and-directories-utils"
import {useLucaTranslation} from "shared/translations"
import {find, getParentDirectory, Option} from "shared/utils"
import {interventionTypeToGroupType} from "../scenario-interventions/utils"
import {CreateDirectoryModalContainer} from "./create-directory/create-directory-modal-container"
import {DirectoryDetail} from "./detail/directory-detail/directory-detail"
import {EmailFilesDirectoryDetail} from "./detail/directory-detail/email-directory-detail"
import {FileDetail} from "./detail/file-detail/file-detail"
import {filesDirectoriesStyles as styles} from "./files-and-directories.style"
import {useFilesAndDirectories} from "./hooks/use-files-and-directories"
import {FilesAndDirectoriesPreview} from "./preview/files-and-directories-preview"

export interface FilesAndDirectoriesProps {
  readonly scenarioId: UUID
  readonly selectedDirectoryId: Option<UUID>
  readonly selectedFileId: Option<UUID>
}

export const FilesAndDirectories: React.FC<FilesAndDirectoriesProps> = ({
  scenarioId,
  selectedDirectoryId,
  selectedFileId
}) => {
  const {t} = useLucaTranslation()

  const {
    scenario,
    isLoading,
    directories,
    files,
    fileOpeningInterventions,
    onSelectNode,
    onExpandDirectory,
    isCreateDirectoryModalVisible,
    showCreateDirectoryModal,
    hideCreateDirectoryModal,
    navigateToScenarioDetail,
    isPreviewVisible,
    setPreviewVisibility,
    isDirectoryReadonly,
    sampleCompanyId,
    sampleCompanyDirectoryId,
    getIconForRootDirectory,
    isFileReadonly,
    fileExplorerTree,
    expandedDirectoryIds,
    spreadsheetCellContentInterventions,
    textDocumentContentInterventions
  } = useFilesAndDirectories({
    scenarioId,
    selectedDirectoryId,
    selectedFileId
  })

  const createMainDirectoryModal = (
    <CreateDirectoryModalContainer
      parentDirectoryId={Option.none()}
      scenarioId={scenarioId}
      onConfirm={hideCreateDirectoryModal}
      onDismiss={hideCreateDirectoryModal}
      titleKey="files_and_directories__create_main_directory_modal_title"
    />
  )

  const navigationButtonConfig: ButtonConfig = {
    labelKey: "scenario_details__header_label",
    onClick: navigateToScenarioDetail
  }

  const operationButtonConfig: ButtonConfig = {
    labelKey: "preview",
    onClick: () => setPreviewVisibility(true)
  }

  const subdirectories = selectedDirectoryId
    .map(directoryId => directories.filter(directory => directory.parentDirectoryId === directoryId))
    .getOrElse([])

  const filesInSelectedDirectory = selectedDirectoryId
    .map(directoryId => files.filter(file => file.directoryId === directoryId))
    .getOrElse([])

  const selectedDirectory = find(directory => selectedDirectoryId.contains(directory.id), directories)

  const selectedFile = find(file => selectedFileId.contains(file.id), files)

  const isScenarioReadOnly =
    scenario.isEmpty() ||
    scenario.exists(scenario => scenario.finalizedAt !== null) ||
    scenario.exists(scenario => scenario.publishedAt !== null)

  return (
    <div css={styles.wrapper}>
      <DetailViewHeader
        labelKey={"files_and_directories__title"}
        navigationButtonConfig={navigationButtonConfig}
        operationButtonConfig={operationButtonConfig}
      />

      <div css={styles.content}>
        <FileExplorer
          tree={fileExplorerTree}
          isLoading={isLoading}
          expandedDirectoryIds={expandedDirectoryIds}
          selectedNodeId={selectedDirectoryId.orElse(selectedFileId)}
          onSelectNode={onSelectNode}
          onExpandDirectory={onExpandDirectory}
          isCreateDirectoryButtonVisible={!isScenarioReadOnly && !isLoading}
          onCreateDirectory={showCreateDirectoryModal}
          customStyles={{card: styles.card, cardContent: styles.cardContent}}
          renderCustomDirectoryIcon={node => getIconForRootDirectory(node.id)}
          prependSort={Option.of(sampleCompanyDirectoryId)
            .map(id => [filesAndDirsDownloadId, id])
            .getOrElse([filesAndDirsDownloadId])}
          countSubDirectoryFiles={false}
        />
        {selectedFile
          .map(file => {
            const isReadOnly = isFileReadonly(file)
            const interventionType = fileOpeningInterventions.find(intervention => intervention.fileId === file.id)
              ?.interventionType

            const interventionsCount =
              fileOpeningInterventions.filter(intervention => intervention.fileId === file.id).length +
              spreadsheetCellContentInterventions.filter(intervention => intervention.fileId === file.id).length +
              textDocumentContentInterventions.filter(intervention => intervention.file.id === file.id).length

            return (
              <FileDetail
                interventionGroupType={interventionType ? interventionTypeToGroupType(interventionType) : undefined}
                disabled={isReadOnly || isScenarioReadOnly}
                tooltipTitleKey={
                  isReadOnly ? "files_and_directories__readonly_tooltip" : "files_and_directories__disabled_tooltip"
                }
                parentDirectory={getParentDirectory(file.id, directories, files)}
                scenarioId={scenarioId}
                interventionCount={interventionsCount}
                file={file}
                sampleCompanyId={sampleCompanyId}
                customStyles={styles.card}
                customContentStyles={styles.cardContent}
                spreadsheetCellContentInterventions={spreadsheetCellContentInterventions}
                emailId={file.emailId}
              />
            )
          })
          .orNull()}

        {selectedDirectory
          .map(directory => {
            const isReadOnly = isDirectoryReadonly(directory)
            const parentDir = getParentDirectory(directory.id, directories, files)

            return directory.id === filesAndDirsDownloadId ? (
              <EmailFilesDirectoryDetail
                customStyles={styles.card}
                scenarioId={scenarioId}
                directory={directory}
                parentDirectory={parentDir}
                files={filesInSelectedDirectory}
              />
            ) : (
              <DirectoryDetail
                disabled={isReadOnly || isScenarioReadOnly}
                tooltipTitleKey={
                  isReadOnly ? "files_and_directories__readonly_tooltip" : "files_and_directories__disabled_tooltip"
                }
                scenarioId={scenarioId}
                parentDirectory={parentDir}
                directory={directory}
                subdirectories={subdirectories}
                files={filesInSelectedDirectory}
                sampleCompanyId={sampleCompanyId}
                customStyles={styles.card}
                customContentStyles={styles.cardContent}
                customDirectoryIcon={sampleCompanyId ? IconName.Trunk : undefined}
              />
            )
          })
          .orNull()}
        {selectedDirectoryId.isEmpty() && selectedFileId.isEmpty() ? <FilesAndDirectoriesDetailEmpty t={t} /> : null}
      </div>

      {isCreateDirectoryModalVisible ? createMainDirectoryModal : null}

      {isPreviewVisible && (
        <Overlay>
          <FilesAndDirectoriesPreview
            customStyles={styles.preview}
            onClose={() => setPreviewVisibility(false)}
            scenarioId={scenarioId}
          />
        </Overlay>
      )}
    </div>
  )
}
