import {CSSInterpolation} from "@emotion/serialize"
import * as React from "react"
import {
  Card,
  CardContent,
  FormFieldLabel,
  MediaFilePreview,
  Overlay,
  Tooltip,
  UpdateTextDocument
} from "shared/components"
import {FileType, InterventionGroupType, ViewerToolsType} from "shared/enums"
import {FileUpdate, InterventionType} from "shared/graphql/generated/globalTypes"
import {useDeleteFileFromScenario} from "shared/graphql/hooks"
import {DirectoryNode, File, SpreadsheetCellContentIntervention} from "shared/models"
import {filesAndDirsDownloadId} from "shared/office-tools/files-and-directories/utils/files-and-directories-utils"
import {CustomStyle, Flex} from "shared/styles"
import {LucaI18nLangKey} from "shared/translations"
import {addFileExtension, fileExtensionForFile, iconForFile, Option, removeFileExtension} from "shared/utils"
import {InlineEditableHeaderContainer} from "../../../../components"
import {HintText} from "../../../../components/hint-text/hint-text"
import {CellInterventionSpreadsheetFooterContainer} from "../../../../modules/scenario-interventions/spreadsheet-cell-content/spreadsheet-viewer-cell-intervention-footer/spreadsheet-viewer-cell-intervention-footer-container"
import {DetailHeader} from "../../../common/files-and-directories/file-detail/detail-header/detail-header"
import {renderViewerToolForFile} from "../../../common/files-and-directories/file-detail/file-detail-utils"
import {
  CreateFileOpeningInterventionModalContainer,
  CreateTextDocumentContentInterventionModalContainer
} from "../../../scenario-interventions"
import {MoveOverlay} from "../.."
import {
  ChooseTextDocumentInterventionTypeModalContainer,
  TextDocumentInterventionType
} from "../choose-textdocument-intervention-type-modal/choose-textdocument-intervention-type-modal"
import {detailViewStyles} from "../detail-styles"
import {fileDetailStyle as styles} from "./file-detail.style"
import {FileDetailAction} from "./file-detail-action/file-detail-action"
import {FileDetailFooter} from "./file-detail-footer/file-detail-footer"
import {useFileDetail} from "./hooks/use-file-detail"
import {SpreadsheetEditorContainer} from "./spreadsheet-editor-container/spreadsheet-editor-container"

interface Props extends CustomStyle {
  readonly disabled: boolean
  readonly file: File
  readonly interventionCount: number
  readonly parentDirectory: Option<DirectoryNode>
  readonly scenarioId: UUID
  readonly emailId: UUID | null
  readonly customContentStyles?: CSSInterpolation
  readonly sampleCompanyId?: UUID
  readonly interventionGroupType?: InterventionGroupType
  readonly tooltipTitleKey?: LucaI18nLangKey
  readonly spreadsheetCellContentInterventions: SpreadsheetCellContentIntervention[]
}

export const FileDetail: React.FC<Props> = ({
  customContentStyles,
  customStyles,
  disabled,
  file,
  parentDirectory,
  sampleCompanyId,
  interventionCount,
  interventionGroupType,
  scenarioId,
  emailId,
  tooltipTitleKey = "files_and_directories__disabled_tooltip",
  spreadsheetCellContentInterventions
}) => {
  const {
    allDirectories,
    allFiles,
    dataLoading,
    deselectFile,
    expandDirectoryId,
    isCreateInterventionModalVisible,
    isChooseTextDocumentsInterventionTypeModelVisible,
    isUpdateDirectoryOverlayVisible,
    isCreateTextDocumentsInterventionModalVisible,
    navigateToIntervention,
    navigateToSampleCompany,
    previewInfoOption,
    scenarioDurationInSeconds,
    selectedInterventionCellIndex,
    setSelectedInterventionCellIndex,
    setIsCreateInterventionModalVisible,
    setIsUpdateDirectoryOverlayVisible,
    setPreviewInfoOption,
    setIsChooseTextDocumentsInterventionTypeModelVisible,
    setIsCreateTextDocumentsInterventionModalVisible,
    t,
    updateFile,
    updateInProgress
  } = useFileDetail(scenarioId, file.id, sampleCompanyId)

  const emailDefined = emailId !== null

  const handleUpdate = (update: Partial<FileUpdate>, file: File) => {
    if (updateInProgress) {
      return Promise.reject()
    }

    const binaryFileId =
      file.fileType === FileType.Media
        ? update.binaryFileId !== undefined
          ? update.binaryFileId
          : file.binaryFileId
        : null

    return updateFile(file.id, {
      name: update.name !== undefined ? addFileExtension(update.name, fileExtensionForFile(file)) : file.name,
      binaryFileId,
      relevance: update.relevance !== undefined ? update.relevance : file.relevance,
      tags: update.tags !== undefined ? update.tags : file.tags,
      directoryId: file.directoryId === filesAndDirsDownloadId ? null : update.directoryId ?? file.directoryId
    })
  }

  const closeViewerTool = () => setPreviewInfoOption(Option.none())

  const closeBinary = () => setPreviewInfoOption(Option.none())

  const onPreviewButtonClick = (viewerTool: ViewerToolsType) => setPreviewInfoOption(Option.of({file, viewerTool}))

  // refresh file
  React.useEffect(() => {
    previewInfoOption.map(preview => {
      if (preview.file.id === file.id) {
        setPreviewInfoOption(Option.of({file, viewerTool: preview.viewerTool}))
      }
    })
  }, [file])

  const onCreateInterventionClick = () => {
    if (file.fileType === FileType.TextDocument) {
      setIsChooseTextDocumentsInterventionTypeModelVisible(true)
    } else {
      setIsCreateInterventionModalVisible(true)
    }
  }

  const onTextDocumentInterventionTypeConfirm = (type: TextDocumentInterventionType) => {
    setIsChooseTextDocumentsInterventionTypeModelVisible(false)
    if (type === InterventionType.FileOpening) {
      setIsCreateInterventionModalVisible(true)
    } else {
      setIsCreateTextDocumentsInterventionModalVisible(true)
    }
  }

  return (
    <>
      <Card customStyles={customStyles}>
        <DetailHeader
          disabled={disabled}
          deleteHook={() => useDeleteFileFromScenario(scenarioId)}
          onDelete={deselectFile}
          entityId={file.id}
          title={file.name}
          icon={iconForFile(file)}
        />
        <div css={[styles.wrapper, customContentStyles]}>
          <CardContent customStyles={detailViewStyles.content}>
            {sampleCompanyId && (
              <HintText
                text={t("files_and_directories__sample_company_file_hint")}
                customStyles={detailViewStyles.hintText}
              />
            )}
            {emailDefined && (
              <HintText
                text={t("files_and_directories__downloads_mail_detail_hint")}
                customStyles={detailViewStyles.hintText}
              />
            )}
            <div css={detailViewStyles.nameAndDirectoryWrapper}>
              <div>
                <div css={Flex.row}>
                  <FormFieldLabel textKey={"files_and_directories__file_detail_name"} />
                </div>
                <Tooltip title={t(tooltipTitleKey)} inactive={!disabled}>
                  <InlineEditableHeaderContainer
                    onConfirm={name => handleUpdate({name}, file)}
                    customStyles={styles.subject}
                    disabled={disabled}
                    text={removeFileExtension(file.name)}
                  />
                </Tooltip>
              </div>
              <div>
                <FileDetailAction
                  disabled={disabled}
                  sampleCompanyId={sampleCompanyId}
                  navigateToSampleCompany={navigateToSampleCompany}
                  parentDirectory={parentDirectory}
                  scenarioId={scenarioId}
                  setIsUpdateDirectoryOverlayVisible={setIsUpdateDirectoryOverlayVisible}
                  tooltipTitleKey={tooltipTitleKey}
                  emailId={emailId}
                />
              </div>
            </div>

            <MediaFilePreview file={file} onPreviewButtonClick={onPreviewButtonClick} />
          </CardContent>
          <FileDetailFooter
            onCreateInterventionClick={onCreateInterventionClick}
            disabled={disabled}
            navigateToIntervention={navigateToIntervention}
            tooltipTitleKey={tooltipTitleKey}
            updateFile={update => handleUpdate(update, file)}
            file={file}
            interventionCount={interventionCount}
          />
        </div>
      </Card>
      {previewInfoOption
        .map(info => (
          <Overlay>
            {info.file.fileType === FileType.Spreadsheet ? (
              <SpreadsheetEditorContainer
                file={info.file}
                onClose={closeViewerTool}
                onCloseBinary={closeBinary}
                scenarioId={scenarioId}
                onSelectCell={setSelectedInterventionCellIndex}
                renderCustomFooter={sheet => (
                  <CellInterventionSpreadsheetFooterContainer
                    scenarioId={scenarioId}
                    fileId={file.id}
                    disabled={disabled}
                    spreadsheetId={sheet.id}
                    scenarioMaxDurationInSeconds={scenarioDurationInSeconds}
                    selectedCellIndex={selectedInterventionCellIndex}
                    spreadsheetCellContentInterventions={spreadsheetCellContentInterventions}
                  />
                )}
              />
            ) : info.file.fileType === FileType.TextDocument ? (
              <UpdateTextDocument file={info.file} onClose={closeViewerTool} />
            ) : (
              renderViewerToolForFile(info, closeViewerTool, closeBinary, t)
            )}
          </Overlay>
        ))
        .orNull()}

      {isUpdateDirectoryOverlayVisible && (
        <MoveOverlay
          file={Option.of(file)}
          directory={Option.none()}
          onFilesSuccessfullyMoved={targetDirectoryIds => {
            setIsUpdateDirectoryOverlayVisible(false)
            targetDirectoryIds.forEach(directoryId => expandDirectoryId(directoryId))
          }}
          onDismiss={() => setIsUpdateDirectoryOverlayVisible(false)}
          name={file.name}
          parentDirectory={parentDirectory}
          dataLoading={dataLoading}
          directories={allDirectories}
          files={allFiles}
        />
      )}

      {isCreateInterventionModalVisible && (
        <CreateFileOpeningInterventionModalContainer
          scenarioMaxDurationInSeconds={scenarioDurationInSeconds}
          onDismiss={() => setIsCreateInterventionModalVisible(false)}
          file={file}
          scenarioId={scenarioId}
        />
      )}
      {isCreateTextDocumentsInterventionModalVisible && (
        <CreateTextDocumentContentInterventionModalContainer
          scenarioMaxDurationInSeconds={scenarioDurationInSeconds}
          onDismiss={() => setIsCreateInterventionModalVisible(false)}
          file={file}
          scenarioId={scenarioId}
        />
      )}

      {isChooseTextDocumentsInterventionTypeModelVisible && (
        <ChooseTextDocumentInterventionTypeModalContainer
          onConfirm={onTextDocumentInterventionTypeConfirm}
          onDismiss={() => setIsChooseTextDocumentsInterventionTypeModelVisible(false)}
        />
      )}
    </>
  )
}
