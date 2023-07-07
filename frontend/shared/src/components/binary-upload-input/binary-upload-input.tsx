import * as React from "react"
import {ButtonVariant, IconName, UploadFileType, ViewerToolsType} from "../../enums"
import {MimeType} from "../../graphql/generated/globalTypes"
import {BinaryFile, UploadBinary} from "../../models"
import {fontColorLight, TextSize} from "../../styles"
import {LucaI18nLangKey, useLucaTranslation} from "../../translations"
import {
  addTypename,
  convertBinaryFileToBinary,
  convertFileToBase64,
  getIconNameFromMimeType,
  getLanguageKeyViewerTool,
  getLanguageKeyViewerToolPreposition,
  Option
} from "../../utils"
import {Button} from "../button/button"
import {Icon} from "../icon/icon"
import {ImageViewer} from "../image-viewer/image-viewer"
import {Overlay} from "../overlay/overlay"
import {Paper} from "../paper/paper"
import {PdfViewer} from "../pdf-viewer/pdf-viewer"
import {Tooltip} from "../tooltip/tooltip"
import {Text} from "../typography/typography"
import {UploadFileModal} from "../upload-file-modal/upload-file-modal"
import {binaryUploadInputStyles as styles} from "./binary-upload-input.styles"
import {useBinaryUploadInput} from "./hooks/use-binary-upload-input"

export interface BinaryUploadInputProps {
  readonly binaryFile?: BinaryFile
  readonly disabled?: boolean
  readonly onUpload: (uploadBinary: UploadBinary) => void
  readonly onDelete: () => void
  readonly uploadTooltipTitleKey?: LucaI18nLangKey
  readonly acceptedFileTypes?: (UploadFileType.PDF | UploadFileType.Graphic)[]
  readonly onOpenBinary?: (binaryFileId: UUID) => void
  readonly onCloseBinary?: (binaryFileId: UUID) => void
  readonly placeholderColor?: string
}

export const BinaryUploadInput: React.FC<BinaryUploadInputProps> = ({
  binaryFile,
  disabled = false,
  onUpload,
  uploadTooltipTitleKey = "binary_input__upload_title",
  onDelete,
  acceptedFileTypes = [UploadFileType.PDF, UploadFileType.Graphic],
  onOpenBinary,
  onCloseBinary,
  placeholderColor = fontColorLight
}) => {
  const {t} = useLucaTranslation()

  const {
    isUploadModalVisible,
    showUploadModal,
    hideUploadModal,
    binary: binaryOption,
    updateBinary,
    resetBinary,
    viewerTool: viewerToolOption,
    isBinaryViewerVisible,
    showBinaryViewer,
    hideBinaryViewer
  } = useBinaryUploadInput({defaultBinaryFile: binaryFile, onOpenBinary, onCloseBinary})

  const onBinariesSuccessfullyUploaded = (binaries: UploadBinary[], files: File[]) => {
    const uploadedBinary = binaries[0]
    convertFileToBase64(files[0]).then(base64 => {
      const uploadedBinaryFile = addTypename({...uploadedBinary.data, url: base64}, "BinaryFile") as BinaryFile
      onUpload(uploadedBinary)
      updateBinary(uploadedBinaryFile)
      hideUploadModal()
    })
  }

  const onDeleteBinary = () => {
    onDelete()
    resetBinary()
  }

  const binaryInput = (
    <div css={styles.binaryInputWrapper} className={"binary-input"}>
      <div css={styles.binaryInput}>
        <Icon name={IconName.File} color={placeholderColor} />
        <Text customStyles={styles.binaryInputLabel(placeholderColor)} size={TextSize.Medium}>
          {t("binary_input__placeholder_label")}
        </Text>
      </div>
      <Tooltip title={t(uploadTooltipTitleKey)}>
        <Button variant={ButtonVariant.IconOnly} icon={IconName.Upload} onClick={showUploadModal} disabled={disabled} />
      </Tooltip>
    </div>
  )

  const renderViewerToolForFile = (binary: BinaryFile, viewerTools: ViewerToolsType) => {
    switch (viewerTools) {
      case ViewerToolsType.Image:
        return (
          <ImageViewer
            customStyles={styles.viewerTool}
            onClose={hideBinaryViewer}
            onCloseImage={hideBinaryViewer}
            binaries={[convertBinaryFileToBinary(binary)]}
          />
        )
      case ViewerToolsType.PDF:
        return (
          <PdfViewer
            customStyles={styles.viewerTool}
            onClose={hideBinaryViewer}
            closeBinary={hideBinaryViewer}
            binaries={[convertBinaryFileToBinary(binary)]}
            selectedBinaryId={Option.of(binary.id)}
          />
        )
      default:
        return <Text customStyles={styles.viewerToolPlaceholder}>{t("files_and_directories__viewer_not_found")}</Text>
    }
  }

  const renderBinaryPaper = (filename: string, mimeType: MimeType) => (
    <Paper customStyles={styles.binaryPaper} onClick={showBinaryViewer}>
      <Icon name={getIconNameFromMimeType(mimeType)} />
      <Text customStyles={styles.binaryPaperLabel} size={TextSize.Medium}>
        {filename}
      </Text>
      {disabled ? (
        <Text
          customStyles={[styles.binaryPaperSelectable, styles.binaryPreviewLabel]}
          size={TextSize.Medium}
          onClick={showBinaryViewer}>
          {t("files_and_directories__open_in_viewer", {
            preposition: t(getLanguageKeyViewerToolPreposition(mimeType)),
            viewerTool: t(getLanguageKeyViewerTool(mimeType))
          })}
        </Text>
      ) : (
        <Icon customStyles={styles.binaryPaperSelectable} name={IconName.Close} onClick={onDeleteBinary} />
      )}
    </Paper>
  )

  return (
    <React.Fragment>
      {binaryOption.map(({filename, mimeType}) => renderBinaryPaper(filename, mimeType)).getOrElse(binaryInput)}
      {isUploadModalVisible && (
        <UploadFileModal
          acceptedFileTypes={acceptedFileTypes}
          onBinariesSuccessfullyUploaded={onBinariesSuccessfullyUploaded}
          onDismiss={hideUploadModal}
          isLimitedToSingleItem={true}
        />
      )}
      {isBinaryViewerVisible &&
        binaryOption
          .flatMap(binary =>
            viewerToolOption.map(viewerTool => <Overlay>{renderViewerToolForFile(binary, viewerTool)}</Overlay>)
          )
          .orNull()}
    </React.Fragment>
  )
}
