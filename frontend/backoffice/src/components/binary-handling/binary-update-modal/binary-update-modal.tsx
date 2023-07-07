import * as React from "react"
import {FileDropzone, LocalFileChip, Modal, PdfView} from "shared/components"
import {BinaryType, UploadFileType as FileType} from "shared/enums"
import {CustomStyle} from "shared/styles"
import {LucaI18nLangKey, useLucaTranslation} from "shared/translations"
import {convertFileToBase64, getAcceptedFileExtensions, getIconNameFromFileType, Option} from "shared/utils"
import {BinaryEntry} from "./binary-entry"
import {binaryUpdateModalStyle as styles} from "./binary-update-modal.style"
import {getDeleteButtonKey, getTitleKey} from "./utils/binary-update-modal-utils"

export interface BinaryUpdateModalProps extends CustomStyle {
  readonly disabled?: boolean
  readonly onConfirm: (file: File) => void
  readonly onDelete?: () => void
  readonly onDismiss: () => void
  readonly src: string
  readonly type: BinaryType
  readonly titleKey?: LucaI18nLangKey
  readonly deleteButtonKey?: LucaI18nLangKey
}

export const BinaryUpdateModal: React.FC<BinaryUpdateModalProps> = ({
  customStyles,
  disabled = false,
  onConfirm,
  onDelete,
  onDismiss,
  titleKey,
  deleteButtonKey,
  src: currentSrc,
  type
}) => {
  const {t} = useLucaTranslation()

  const [swapFile, setSwapFile] = React.useState<Option<File>>(Option.none())
  const [src, setSrc] = React.useState<string>(currentSrc)

  const isImage = type === BinaryType.Image
  const isPdf = type === BinaryType.PDF
  const fileType = isImage ? FileType.Graphic : isPdf ? FileType.PDF : FileType.Video

  const handleFileSelection = (files: File[]) => {
    const file = files[0]
    convertFileToBase64(file)
      .then(base64 => setSrc(base64))
      .catch(() => setSrc(currentSrc))
      .finally(() => setSwapFile(Option.of(file)))
  }

  const resetSwapFile = () => {
    setSwapFile(Option.none())
    setSrc(currentSrc)
  }

  const handleConfirm = () => swapFile.forEach(onConfirm)

  const renderImagePreview = () => (
    <div data-testid="image-preview" css={[styles.binaryPreview, styles.image(src)]} className={"image"} />
  )

  const renderVideoPreview = () => (
    <div data-testid="video-preview" css={[styles.binaryPreview, styles.videoWrapper]} className={"video"}>
      <video css={styles.video} src={src} controls={true} controlsList={"nodownload"} disablePictureInPicture={true} />
    </div>
  )

  const renderPdfPreview = () => <PdfView binaryUrl={src} customStyles={[styles.binaryPreview, styles.pdfView]} />

  const renderPreview = () => {
    switch (type) {
      case BinaryType.Image:
        return renderImagePreview()
      case BinaryType.Video:
        return renderVideoPreview()
      case BinaryType.PDF:
        return renderPdfPreview()
    }
  }

  return (
    <Modal
      customStyles={[styles.modal, customStyles]}
      confirmButtonDisabled={swapFile.isEmpty() || disabled}
      deleteButtonDisabled={disabled}
      onConfirm={handleConfirm}
      onDismiss={onDismiss}
      onDelete={onDelete}
      deleteButtonKey={getDeleteButtonKey(deleteButtonKey, fileType)}
      title={t(getTitleKey(titleKey, fileType))}>
      <BinaryEntry className={"binary-preview"} headerKey={"file__preview__label"}>
        {renderPreview()}
      </BinaryEntry>
      <BinaryEntry className={"binary-swap"} customStyles={styles.binarySwap} headerKey={"file__swap__label"}>
        <div css={styles.fileDropZone}>
          {swapFile
            .map(file => (
              <div css={{display: "flex"}}>
                <LocalFileChip
                  iconName={getIconNameFromFileType(fileType)}
                  title={file.name}
                  onCloseClick={resetSwapFile}
                />
              </div>
            ))
            .getOrElse(
              <FileDropzone
                accept={getAcceptedFileExtensions(fileType)}
                onFilesAccepted={handleFileSelection}
                multiple={false}
              />
            )}
        </div>
      </BinaryEntry>
    </Modal>
  )
}
