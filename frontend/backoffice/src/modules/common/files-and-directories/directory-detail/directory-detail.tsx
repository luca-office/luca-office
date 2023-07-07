import {CSSInterpolation} from "@emotion/serialize"
import React, {Dispatch, Fragment, SetStateAction} from "react"
import {Card, CardContent, FormFieldLabel, Heading, ReadonlyActionField, Tooltip} from "shared/components"
import {HeadingLevel, IconName, UploadFileType as FileType} from "shared/enums"
import {TextDocumentCreation} from "shared/graphql/generated/globalTypes"
import {DeleteEntityHook, Directory, DirectoryNode, File, UploadBinary} from "shared/models"
import {TextDocumentCreationInfo} from "shared/models/text-document-creation-info"
import {CustomStyle, FontWeight} from "shared/styles"
import {LucaI18nLangKey, useLucaTranslation} from "shared/translations"
import {Option} from "shared/utils"
import {InlineEditableHeaderContainer, UploadFileModal} from "../../../../components"
import {HintText} from "../../../../components/hint-text/hint-text"
import {DirectoryUpdate} from "../../../../graphql/generated/globalTypes"
import {detailViewStyles} from "../../../files-and-directories/detail/detail-styles"
import {DirectoryContentList} from "../directory-content-list/directory-content-list"
import {DetailHeader} from "../file-detail/detail-header/detail-header"
import {PathActionField} from "../file-detail/path-action-field/path-action-field"
import {MoveOverlay} from "../move/move-overlay"

interface DirectoryConfig {
  readonly directory: Directory
  readonly parentDirectory: Option<DirectoryNode>
  readonly subdirectories: Directory[]
  readonly allDirectories: Directory[]
  readonly updateDirectory: (id: UUID, update: DirectoryUpdate) => Promise<Option<Directory>>
  readonly selectDirectory: (directoryId: UUID) => void
  readonly deselectDirectory: () => void
  readonly expandDirectoryId?: (id: UUID) => void
  readonly directoryLabel?: string
  readonly deleteDirectoryHook: () => DeleteEntityHook
  readonly renderCreateDirectoryModal: () => React.ReactNode
}

interface FileConfig {
  readonly files: File[]
  readonly allFiles: File[]
  readonly selectFile: (fileId: UUID) => void
  readonly deleteFileHook: () => DeleteEntityHook
  readonly createFilesFromBinaries: (uploadedBinaries: UploadBinary[], directoryId: UUID) => void
}

interface CreateFileOverlayConfig {
  readonly isCreateFileOverlayVisible: boolean
  readonly showCreateFileOverlay: () => void
  readonly hideCreateFileOverlay: () => void
}

interface CreateSubdirectoryOverlayConfig {
  readonly isCreateSubdirectoryOverlayVisible: boolean
  readonly showCreateSubdirectoryOverlay: () => void
}

interface UpdateDirectoryOverlayConfig {
  readonly isUpdateDirectoryOverlayVisible: boolean
  readonly setIsUpdateDirectoryOverlayVisible: Dispatch<SetStateAction<boolean>>
}

interface DisabledConfig {
  readonly isMoveDisabled?: boolean
  readonly isCreateSubDirectoryDisabled?: boolean
  readonly isContentListEntityDisabled?: (entityId: UUID) => boolean
  readonly isLabelDisabled?: boolean
  readonly isDeleteDisabled?: boolean
}

interface TooltipConfig {
  readonly disabledTooltipLabel?: string
  readonly tooltipTitleKey?: LucaI18nLangKey
}

export interface DirectoryDetailProps extends CustomStyle {
  readonly createFileOverlayConfig: CreateFileOverlayConfig
  readonly createSubdirectoryOverlayConfig: CreateSubdirectoryOverlayConfig
  readonly dataLoading: boolean
  readonly directoryConfig: DirectoryConfig
  readonly disabled: boolean
  readonly fileConfig: FileConfig
  readonly updateDirectoryOverlayConfig: UpdateDirectoryOverlayConfig
  readonly updateInProgress: boolean
  readonly customContentStyles?: CSSInterpolation
  readonly disabledConfig?: DisabledConfig
  readonly navigateToSampleCompany?: () => void
  readonly sampleCompanyId?: UUID
  readonly showRelevance?: boolean
  readonly tooltipConfig?: TooltipConfig
  readonly customDirectoryIcon?: IconName
  readonly createTextDocument?: (textDocumentCreationInfo: TextDocumentCreationInfo) => void
}

export const DirectoryDetail: React.FC<DirectoryDetailProps> = ({
  createFileOverlayConfig,
  createSubdirectoryOverlayConfig,
  customContentStyles,
  customDirectoryIcon,
  customStyles,
  dataLoading,
  directoryConfig,
  disabled,
  disabledConfig,
  fileConfig,
  sampleCompanyId,
  showRelevance,
  tooltipConfig,
  updateDirectoryOverlayConfig,
  updateInProgress,
  navigateToSampleCompany,
  createTextDocument
}) => {
  const {t} = useLucaTranslation()

  const {
    directory,
    parentDirectory,
    subdirectories,
    allDirectories,
    updateDirectory,
    selectDirectory,
    deselectDirectory,
    expandDirectoryId,
    directoryLabel,
    deleteDirectoryHook,
    renderCreateDirectoryModal
  } = directoryConfig
  const {files, allFiles, selectFile, deleteFileHook, createFilesFromBinaries} = fileConfig
  const {isCreateFileOverlayVisible, showCreateFileOverlay, hideCreateFileOverlay} = createFileOverlayConfig
  const {isCreateSubdirectoryOverlayVisible, showCreateSubdirectoryOverlay} = createSubdirectoryOverlayConfig
  const {isUpdateDirectoryOverlayVisible, setIsUpdateDirectoryOverlayVisible} = updateDirectoryOverlayConfig

  const isMoveDisabled = disabledConfig?.isMoveDisabled ?? false
  const isCreateSubDirectoryDisabled = disabledConfig?.isCreateSubDirectoryDisabled ?? false
  const isContentListEntityDisabled = disabledConfig?.isContentListEntityDisabled
  const isLabelDisabled = disabledConfig?.isLabelDisabled ?? false
  const isDeleteDisabled = disabledConfig?.isDeleteDisabled ?? false

  const disabledTooltipLabel = tooltipConfig?.disabledTooltipLabel
  const tooltipTitleKey = tooltipConfig?.tooltipTitleKey ?? "files_and_directories__disabled_tooltip"

  const handleUpdate = (update: Partial<DirectoryUpdate>) => {
    if (updateInProgress) {
      return Promise.reject()
    }
    return updateDirectory(directory.id, {
      name: update.name ? update.name : directory.name,
      parentDirectoryId: update.parentDirectoryId ? update.parentDirectoryId : directory.parentDirectoryId
    })
  }

  const createTextDocumentInDirectory = (textDocument: TextDocumentCreation, title: string) => {
    createTextDocument?.({textDocument, title, directoryId: directory.id})
  }

  return (
    <Fragment>
      <Card customStyles={customStyles}>
        <DetailHeader
          deleteHook={deleteDirectoryHook}
          onDelete={deselectDirectory}
          entityId={directory.id}
          title={directory.name}
          icon={customDirectoryIcon || IconName.Folder}
          disabled={disabled || isDeleteDisabled}
        />

        <CardContent customStyles={[detailViewStyles.content, customContentStyles]}>
          {sampleCompanyId && (
            <HintText
              text={t("files_and_directories__sample_company_directory_hint")}
              customStyles={detailViewStyles.hintText}
            />
          )}
          <div css={detailViewStyles.nameAndDirectoryWrapper}>
            <div>
              <FormFieldLabel textKey="files_and_directories__rename_directory_label" />
              <Tooltip title={disabledTooltipLabel ?? t(tooltipTitleKey)} inactive={!disabled}>
                <InlineEditableHeaderContainer
                  disabled={disabled || isLabelDisabled}
                  onConfirm={name => handleUpdate({name})}
                  customStyles={detailViewStyles.directoryNameInput}
                  text={directory.name}
                />
              </Tooltip>
            </div>
            <div>
              <FormFieldLabel
                textKey={
                  sampleCompanyId
                    ? "files_and_directories__sample_company_label"
                    : "files_and_directories__move_directory_label"
                }
              />
              <ReadonlyActionField
                customStyles={detailViewStyles.actionField}
                renderValue={() =>
                  sampleCompanyId ? (
                    directory.name
                  ) : (
                    <PathActionField
                      onMoveClick={() => setIsUpdateDirectoryOverlayVisible(true)}
                      t={t}
                      disabled={disabled || isMoveDisabled}
                      tooltipLabel={disabledTooltipLabel ?? t(tooltipTitleKey)}
                      parentDirectory={parentDirectory}
                      directoryLabel={directoryLabel}
                    />
                  )
                }
                disabled={!sampleCompanyId && (disabled || isMoveDisabled)}
                onClick={sampleCompanyId ? navigateToSampleCompany : undefined}
                buttonLabel={sampleCompanyId ? t("files_and_directories__sample_company_button") : undefined}
              />
            </div>
          </div>

          <Heading
            level={HeadingLevel.h3}
            fontWeight={FontWeight.Bold}
            customStyles={detailViewStyles.contentListHeading}>
            {t("files_and_directories__directory_content_list_heading")} ({subdirectories.length + files.length})
          </Heading>
          <DirectoryContentList
            customStyles={detailViewStyles.contentList}
            directories={subdirectories}
            files={files}
            onClickDirectory={selectDirectory}
            onClickFile={selectFile}
            onCreateFile={showCreateFileOverlay}
            onCreateSubdirectory={showCreateSubdirectoryOverlay}
            disabled={disabled}
            tooltipLabel={t(tooltipTitleKey)}
            deleteDirectoryHook={deleteDirectoryHook}
            deleteFileHook={deleteFileHook}
            isCreateSubDirectoryDisabled={isCreateSubDirectoryDisabled}
            isTableEntityDisabled={isContentListEntityDisabled}
            showRelevance={showRelevance}
          />
        </CardContent>
      </Card>

      {isCreateFileOverlayVisible ? (
        <UploadFileModal
          acceptedFileTypes={[FileType.Graphic, FileType.Video, FileType.PDF, FileType.TableCalculation]}
          onBinariesSuccessfullyUploaded={binaries => {
            hideCreateFileOverlay()
            createFilesFromBinaries(binaries, directory.id)
          }}
          onDismiss={hideCreateFileOverlay}
          createTextDocument={createTextDocumentInDirectory}
        />
      ) : null}

      {isCreateSubdirectoryOverlayVisible && renderCreateDirectoryModal()}

      {isUpdateDirectoryOverlayVisible && (
        <MoveOverlay
          onDismiss={() => setIsUpdateDirectoryOverlayVisible(false)}
          file={Option.none()}
          parentDirectory={parentDirectory}
          name={directory.name}
          directory={Option.of(directory)}
          onFilesSuccessfullyMoved={targetDirectoryIds => {
            if (expandDirectoryId) {
              targetDirectoryIds.forEach(directoryId => expandDirectoryId(directoryId))
            }
            setIsUpdateDirectoryOverlayVisible(false)
          }}
          directories={allDirectories}
          files={allFiles}
          dataLoading={dataLoading}
        />
      )}
    </Fragment>
  )
}
