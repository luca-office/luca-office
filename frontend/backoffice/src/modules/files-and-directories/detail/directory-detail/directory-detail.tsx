import {CSSInterpolation} from "@emotion/serialize"
import partial from "lodash-es/partial"
import * as React from "react"
import {IconName} from "shared/enums"
import {useDeleteFileFromScenario} from "shared/graphql/hooks"
import {DirectoryNode, File} from "shared/models"
import {CustomStyle} from "shared/styles"
import {LucaI18nLangKey} from "shared/translations"
import {Option} from "shared/utils"
import {useDeleteDirectoryFromScenario} from "../../../../graphql/hooks/mutations/directory/delete-directory"
import {Directory} from "../../../../models"
import {DirectoryDetail as DirectoryDetailComponent} from "../../../common/files-and-directories/directory-detail/directory-detail"
import {CreateDirectoryModalContainer} from "../../create-directory/create-directory-modal-container"
import {useDirectoryDetail} from "./hooks/use-directory-detail"

interface Props extends CustomStyle {
  readonly customContentStyles?: CSSInterpolation
  readonly directory: Directory
  readonly disabled: boolean
  readonly files: File[]
  readonly parentDirectory: Option<DirectoryNode>
  readonly scenarioId: UUID
  readonly subdirectories: Directory[]
  readonly sampleCompanyId?: UUID
  readonly tooltipTitleKey?: LucaI18nLangKey
  readonly customDirectoryIcon?: IconName
}

export const DirectoryDetail: React.FC<Props> = ({
  customContentStyles,
  customDirectoryIcon,
  customStyles,
  directory,
  disabled,
  files,
  sampleCompanyId,
  parentDirectory,
  scenarioId,
  subdirectories,
  tooltipTitleKey
}) => {
  const {
    allDirectories,
    allFiles,
    createFilesFromBinaries,
    dataLoading,
    deselectDirectory,
    expandDirectoryId,
    handleCreateSubdirectory,
    hideCreateFileOverlay,
    hideCreateSubdirectoryOverlay,
    isCreateFileOverlayVisible,
    isCreateSubdirectoryOverlayVisible,
    isUpdateDirectoryOverlayVisible,
    navigateToSampleCompany,
    selectDirectory,
    selectFile,
    setIsUpdateDirectoryOverlayVisible,
    showCreateFileOverlay,
    showCreateSubdirectoryOverlay,
    updateDirectory,
    updateInProgress,
    createTextDocumentFile
  } = useDirectoryDetail(scenarioId, sampleCompanyId)

  const renderCreateDirectoryModal = () => (
    <CreateDirectoryModalContainer
      parentDirectoryId={Option.of(directory.id)}
      scenarioId={scenarioId}
      onConfirm={subdirectoryId => handleCreateSubdirectory(directory.id, subdirectoryId)}
      onDismiss={hideCreateSubdirectoryOverlay}
      titleKey="files_and_directories__create_sub_directory_modal_title"
    />
  )

  return (
    <DirectoryDetailComponent
      sampleCompanyId={sampleCompanyId}
      customStyles={customStyles}
      customContentStyles={customContentStyles}
      customDirectoryIcon={customDirectoryIcon}
      disabled={disabled}
      navigateToSampleCompany={navigateToSampleCompany}
      directoryConfig={{
        directory,
        parentDirectory,
        subdirectories,
        allDirectories,
        updateDirectory,
        selectDirectory,
        deselectDirectory,
        expandDirectoryId,
        deleteDirectoryHook: partial(useDeleteDirectoryFromScenario, scenarioId),
        renderCreateDirectoryModal
      }}
      fileConfig={{
        files,
        allFiles,
        selectFile,
        deleteFileHook: partial(useDeleteFileFromScenario, scenarioId),
        createFilesFromBinaries
      }}
      createFileOverlayConfig={{
        isCreateFileOverlayVisible,
        showCreateFileOverlay,
        hideCreateFileOverlay
      }}
      createSubdirectoryOverlayConfig={{
        isCreateSubdirectoryOverlayVisible,
        showCreateSubdirectoryOverlay
      }}
      updateDirectoryOverlayConfig={{
        isUpdateDirectoryOverlayVisible,
        setIsUpdateDirectoryOverlayVisible
      }}
      tooltipConfig={{
        tooltipTitleKey
      }}
      updateInProgress={updateInProgress}
      dataLoading={dataLoading}
      createTextDocument={createTextDocumentFile}
    />
  )
}
