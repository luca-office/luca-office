import {CSSInterpolation} from "@emotion/serialize"
import * as React from "react"
import {
  Card,
  CardContent,
  FormFieldLabel,
  MediaFilePreview,
  Overlay,
  ReadonlyActionField,
  Tooltip
} from "shared/components"
import {ViewerToolsType} from "shared/enums"
import {useDeleteFileFromSampleCompany} from "shared/graphql/hooks"
import {DirectoryNode, File} from "shared/models"
import {CustomStyle} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {iconForFile, Option, removeFileExtension} from "shared/utils"
import {InlineEditableHeaderContainer} from "../../../../components"
import {HintText} from "../../../../components/hint-text/hint-text"
import {DetailHeader} from "../../../common/files-and-directories/file-detail/detail-header/detail-header"
import {PreviewInfo, renderViewerToolForFile} from "../../../common/files-and-directories/file-detail/file-detail-utils"
import {PathActionField} from "../../../common/files-and-directories/file-detail/path-action-field/path-action-field"
import {MoveOverlay} from "../../../common/files-and-directories/move/move-overlay"
import {fileDetailStyles as styles} from "./file-detail.style"
import {FileDetailFooter} from "./file-detail-footer/file-detail-footer"
import {useFileDetail} from "./hooks/use-file-detail"

export interface FileDetailProps extends CustomStyle {
  readonly customContentStyles?: CSSInterpolation
  readonly disabled: boolean
  readonly isIntroFile: boolean
  readonly isLogoFile: boolean
  readonly file: File
  readonly parentDirectory: Option<DirectoryNode>
  readonly sampleCompanyId: UUID
  readonly scenarioId?: UUID
}

export const FileDetail: React.FC<FileDetailProps> = ({
  customContentStyles,
  customStyles,
  disabled,
  isIntroFile,
  isLogoFile,
  file,
  parentDirectory,
  sampleCompanyId,
  scenarioId
}) => {
  const {t} = useLucaTranslation()

  const {
    updateFile,
    deselectFile,
    filePreviewOption,
    setFilePreviewOption,
    isMoveOverlayVisible,
    showMoveOverlay,
    hideMoveOverlay,
    allDirectories,
    allFiles,
    dataLoading,
    isSampleCompanyPublished,
    isScenarioPublishedOrFinalized
  } = useFileDetail(sampleCompanyId, scenarioId)

  const closeViewerTool = () => setFilePreviewOption(Option.none())

  const closeBinary = () => setFilePreviewOption(Option.none())

  const onPreviewButtonClick = (viewerTool: ViewerToolsType) =>
    setFilePreviewOption(Option.of<PreviewInfo>({file, viewerTool}))

  return (
    <React.Fragment>
      <Card customStyles={customStyles}>
        <DetailHeader
          disabled={disabled || isSampleCompanyPublished}
          deleteHook={() => useDeleteFileFromSampleCompany(sampleCompanyId)}
          onDelete={deselectFile}
          entityId={file.id}
          title={file.name}
          icon={iconForFile(file)}
        />
        <div css={[styles.wrapper, customContentStyles]}>
          <CardContent customStyles={styles.content}>
            {(isIntroFile || isLogoFile) && (
              <HintText
                text={isIntroFile ? t("sample_company_details__intro_hint") : t("sample_company_details__logo_hint")}
                customStyles={styles.textHint}
              />
            )}
            <div css={styles.nameAndDirectoryWrapper}>
              <div>
                <FormFieldLabel textKey="files_and_directories__file_detail_name" />
                <Tooltip
                  title={t("sample_companies_files__disabled_tooltip")}
                  inactive={!disabled && !isSampleCompanyPublished}>
                  <InlineEditableHeaderContainer
                    onConfirm={name => updateFile({name}, file)}
                    customStyles={styles.subject}
                    disabled={disabled || isSampleCompanyPublished}
                    text={removeFileExtension(file.name)}
                  />
                </Tooltip>
              </div>
              <div>
                <FormFieldLabel textKey="files_and_directories__move_directory_label" />
                <ReadonlyActionField
                  customStyles={styles.actionField}
                  renderValue={() => (
                    <PathActionField
                      disabled={disabled || isSampleCompanyPublished}
                      tooltipLabel={t("sample_companies_files__disabled_tooltip")}
                      onMoveClick={showMoveOverlay}
                      t={t}
                      parentDirectory={parentDirectory}
                    />
                  )}
                  disabled={disabled || isSampleCompanyPublished}
                />
              </div>
            </div>
            <MediaFilePreview onPreviewButtonClick={onPreviewButtonClick} file={file} />
          </CardContent>
          {!!scenarioId && (
            <FileDetailFooter
              isScenarioPublished={isScenarioPublishedOrFinalized}
              scenarioId={scenarioId}
              file={file}
              disabled={disabled}
            />
          )}
        </div>
      </Card>
      {filePreviewOption
        .map(filePreview => (
          <Overlay>{renderViewerToolForFile(filePreview, closeViewerTool, closeBinary, t, sampleCompanyId)}</Overlay>
        ))
        .orNull()}
      {isMoveOverlayVisible && (
        <MoveOverlay
          file={Option.of(file)}
          directory={Option.none()}
          onFilesSuccessfullyMoved={hideMoveOverlay}
          onDismiss={hideMoveOverlay}
          name={file.name}
          parentDirectory={parentDirectory}
          dataLoading={dataLoading}
          directories={allDirectories}
          files={allFiles}
        />
      )}
    </React.Fragment>
  )
}
