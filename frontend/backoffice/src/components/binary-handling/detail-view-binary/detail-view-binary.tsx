import * as React from "react"
import {BinaryViewer, Button, ContentImage, ContentVideo, Overlay, Paper, UploadFileModalProps} from "shared/components"
import {BinaryType, ButtonVariant, IconName} from "shared/enums"
import {MimeType} from "shared/graphql/generated/globalTypes"
import {BinaryFile, UploadBinary} from "shared/models"
import {errorColor} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {Option, toBinaryType, uploadBinary} from "shared/utils"
import {UploadFileModal} from "../../upload-file-modal/upload-file-modal"
import {BinaryFormPlaceholder, BinaryFormPlaceholderProps} from "../binary-form-placeholder/binary-form-placeholder"
import {BinaryUpdateModal} from "../binary-update-modal/binary-update-modal"
import {DetailViewBinaryStyles as styles} from "./detail-view-binary.styles"

export interface DetailViewBinaryProps
  extends Pick<UploadFileModalProps, "onBinariesSuccessfullyUploaded">,
    Pick<UploadFileModalProps, "acceptedFileTypes">,
    Pick<BinaryFormPlaceholderProps, "createText">,
    Pick<BinaryFormPlaceholderProps, "placeholderText"> {
  readonly label: string
  readonly onDeleteBinary: (id: UUID) => void
  readonly readonly: boolean
  readonly binaryFile?: BinaryFile
  readonly onUpdate?: (binaries: UploadBinary[]) => void
}

/**
 * used to display and edit an image or video in a detail view card
 */
export const DetailViewBinary: React.FunctionComponent<DetailViewBinaryProps> = ({
  acceptedFileTypes,
  binaryFile,
  createText,
  label,
  onBinariesSuccessfullyUploaded,
  onDeleteBinary,
  placeholderText,
  readonly,
  onUpdate
}) => {
  const {t} = useLucaTranslation()
  const [showUploadModal, setShowUploadModal] = React.useState<boolean>(false)
  const [showEditModal, setShowEditModal] = React.useState<boolean>(false)
  const [showBinaryViewerModal, setShowBinaryViewerModal] = React.useState<boolean>(false)

  const binaryTypeOption = Option.of(binaryFile).map(binary => toBinaryType(binary.mimeType))

  const handleBinaryUpdate = (file: File) =>
    !!onUpdate &&
    uploadBinary(file).then(binary => {
      onUpdate([binary])
      setShowEditModal(false)
    })

  const handleDeleteBinary = (binary: BinaryFile) => {
    onDeleteBinary(binary.id)
    setShowEditModal(false)
  }

  const onUploadSuccess = (binaries: UploadBinary[], files: File[]) => {
    onBinariesSuccessfullyUploaded(binaries, files)
    setShowUploadModal(false)
  }

  const renderUpdateModal = (binary: BinaryFile) =>
    binaryTypeOption
      .map(binaryType => (
        <BinaryUpdateModal
          titleKey={
            binaryType === BinaryType.Image
              ? "edit__image"
              : binaryType === BinaryType.Video
              ? "edit__video"
              : "edit_button"
          }
          deleteButtonKey="delete_button"
          onDelete={() => handleDeleteBinary(binary)}
          onConfirm={handleBinaryUpdate}
          src={binary.url}
          onDismiss={() => setShowEditModal(false)}
          type={binaryType}
        />
      ))
      .orNull()

  const renderBinaryViewer = (binary: BinaryFile) =>
    binaryTypeOption
      .map(binaryType => (
        <Overlay>
          <BinaryViewer
            customStyles={styles.binaryViewer}
            binaries={[
              {
                id: binary.id,
                path: binary.url,
                title: binary.filename
              }
            ]}
            onCloseViewer={() => setShowBinaryViewerModal(false)}
            type={binaryType}
          />
        </Overlay>
      ))
      .orNull()

  const renderRemoveButton = (binary: BinaryFile) => (
    <div className={"remove-overlay"} css={styles.removeOverlay(readonly)}>
      <Button
        disabled={readonly}
        icon={IconName.Trash}
        iconColor={"white"}
        color={errorColor}
        customStyles={styles.deleteButton}
        variant={ButtonVariant.IconOnly}
        onClick={() => onDeleteBinary(binary.id)}
      />
    </div>
  )

  const renderVideo = (binary: BinaryFile) => (
    <ContentVideo videoUrl={binary.url} customStyles={styles.wrapper}>
      {renderRemoveButton(binary)}
    </ContentVideo>
  )

  const renderImage = (binary: BinaryFile) => (
    <ContentImage imageUrl={binary.url} wrapperStyle={styles.wrapper}>
      {renderRemoveButton(binary)}
    </ContentImage>
  )

  const renderBinaryContent = () =>
    binaryFile ? (
      <div css={styles.binaryContentWrapper}>
        {binaryFile.mimeType === MimeType.VideoMp4 ? renderVideo(binaryFile) : renderImage(binaryFile)}
        {!!onUpdate && (
          <div css={styles.editControl}>
            <Button
              customStyles={styles.editControlButton}
              onClick={() => (readonly ? setShowBinaryViewerModal(true) : setShowEditModal(true))}>
              {readonly
                ? binaryTypeOption
                    .map(binaryType =>
                      binaryType === BinaryType.Image
                        ? t("preview__image")
                        : binaryType === BinaryType.Video
                        ? t("preview__video")
                        : t("preview__general")
                    )
                    .getOrElse(t("preview__general"))
                : t("edit_button")}
            </Button>
          </div>
        )}
      </div>
    ) : (
      <BinaryFormPlaceholder onClick={() => setShowUploadModal(true)} {...{createText, placeholderText, readonly}} />
    )

  return (
    <div className="detail-view-binary">
      <div css={[styles.content, styles.contentWidth]}>
        <Paper customStyles={styles.paper(!!binaryFile)} title={label} label={label}>
          {renderBinaryContent()}
        </Paper>
      </div>
      {showUploadModal && (
        <UploadFileModal
          isLimitedToSingleItem
          disabled={readonly}
          onDismiss={() => setShowUploadModal(false)}
          acceptedFileTypes={acceptedFileTypes}
          onBinariesSuccessfullyUploaded={onUploadSuccess}
        />
      )}
      {showEditModal && binaryFile && renderUpdateModal(binaryFile)}
      {showBinaryViewerModal && binaryFile && renderBinaryViewer(binaryFile)}
    </div>
  )
}
