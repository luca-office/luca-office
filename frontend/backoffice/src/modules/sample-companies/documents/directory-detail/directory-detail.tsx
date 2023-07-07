import {CSSInterpolation} from "@emotion/serialize"
import partial from "lodash-es/partial"
import * as React from "react"
import {useDeleteFileFromSampleCompany} from "shared/graphql/hooks"
import {DirectoryNode, File} from "shared/models"
import {CustomStyle} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {Option} from "shared/utils"
import {useDeleteDirectoryFromSampleCompany} from "../../../../graphql/hooks/mutations/directory/delete-directory"
import {Directory} from "../../../../models"
import {DirectoryDetail as DirectoryDetailComponent} from "../../../common/files-and-directories/directory-detail/directory-detail"
import {CreateDirectoryModal} from "../create-directory/create-directory-modal"
import {useDirectoryDetail} from "./hooks/use-directory-detail"

interface Props extends CustomStyle {
  readonly customContentStyles?: CSSInterpolation
  readonly directory: Directory
  readonly files: File[]
  readonly parentDirectory: Option<DirectoryNode>
  readonly sampleCompanyId: UUID
  readonly subdirectories: Directory[]
  readonly isRootDirectorySelected: boolean
  readonly scenarioId?: UUID
}

export const DirectoryDetail: React.FC<Props> = ({
  customContentStyles,
  customStyles,
  directory,
  files,
  parentDirectory,
  sampleCompanyId,
  subdirectories,
  isRootDirectorySelected,
  scenarioId
}) => {
  const {t} = useLucaTranslation()

  const {
    updateDirectory,
    updateInProgress,
    selectDirectory,
    selectFile,
    deselectDirectory,
    isCreateFileOverlayVisible,
    isCreateSubdirectoryOverlayVisible,
    showCreateFileOverlay,
    hideCreateFileOverlay,
    showCreateSubdirectoryOverlay,
    hideCreateSubdirectoryOverlay,
    handleCreateSubdirectory,
    createFilesFromBinaries,
    isUpdateDirectoryOverlayVisible,
    setIsUpdateDirectoryOverlayVisible,
    allDirectories,
    allFiles,
    dataLoading,
    sampleCompany,
    isPublished,
    createTextDocumentFile
  } = useDirectoryDetail(sampleCompanyId, scenarioId)

  const isContentListEntityDisabled = (entityId: UUID) =>
    sampleCompany
      .map(({profileFileId, logoFileId}) => entityId === profileFileId || entityId === logoFileId)
      .getOrElse(false)

  const renderCreateDirectoryModal = () => (
    <CreateDirectoryModal
      parentDirectoryId={Option.of(directory.id)}
      sampleCompanyId={sampleCompanyId}
      onConfirm={subdirectoryId => handleCreateSubdirectory(directory.id, subdirectoryId)}
      onDismiss={hideCreateSubdirectoryOverlay}
      titleKey="sample_company_details__create_sub_directory_modal_title"
    />
  )

  return (
    <DirectoryDetailComponent
      customStyles={customStyles}
      customContentStyles={customContentStyles}
      disabled={isPublished}
      directoryConfig={{
        directory,
        parentDirectory,
        subdirectories,
        allDirectories,
        updateDirectory,
        selectDirectory,
        deselectDirectory,
        directoryLabel: isRootDirectorySelected
          ? sampleCompany.map(({name}) => t("sample_company_details__directory_label", {name})).orUndefined()
          : t("sample_company_details__directory_label", {name: directory.name}),
        deleteDirectoryHook: partial(useDeleteDirectoryFromSampleCompany, sampleCompanyId),
        renderCreateDirectoryModal
      }}
      fileConfig={{
        files,
        allFiles,
        selectFile,
        deleteFileHook: partial(useDeleteFileFromSampleCompany, sampleCompanyId),
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
      disabledConfig={{
        isMoveDisabled: true,
        isCreateSubDirectoryDisabled: false,
        isContentListEntityDisabled,
        isLabelDisabled: isRootDirectorySelected,
        isDeleteDisabled: isRootDirectorySelected
      }}
      tooltipConfig={{
        disabledTooltipLabel: t("sample_companies_files__disabled_tooltip")
      }}
      updateInProgress={updateInProgress}
      dataLoading={dataLoading}
      showRelevance={false}
      createTextDocument={createTextDocumentFile}
    />
  )
}
