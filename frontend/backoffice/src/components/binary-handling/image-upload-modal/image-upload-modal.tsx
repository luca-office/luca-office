import {css} from "@emotion/react"
import * as React from "react"
import {useState} from "react"
import {Modal} from "shared/components"
import {spacingMedium} from "shared/styles"
import {LucaI18nLangKey} from "shared/translations"

export interface ImageUploadModalProps {
  readonly onConfirm: (file: File) => void
  readonly onDismiss: () => void
  readonly title: string
  readonly buttonLabelKey: LucaI18nLangKey
}

export const ImageUploadModal: React.FC<ImageUploadModalProps> = ({onConfirm, onDismiss, title, buttonLabelKey}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | ArrayBuffer | null>(null)

  const handleConfirm = () => {
    if (selectedFile) {
      onConfirm(selectedFile)
    }
  }

  return (
    <Modal
      customStyles={styles.modal}
      onConfirm={handleConfirm}
      onDismiss={onDismiss}
      confirmButtonDisabled={selectedFile === null}
      confirmButtonKey={buttonLabelKey}
      title={title}>
      <div css={styles.editor}>
        <input
          type="file"
          accept="image/*"
          onChange={event => {
            const files = event.currentTarget.files

            if (files && files[0]) {
              const selectedFile = files[0]
              const reader = new FileReader()
              reader.onloadend = () => {
                setImagePreviewUrl(reader.result)
                setSelectedFile(selectedFile)
              }
              reader.readAsDataURL(selectedFile)
            }
          }}
        />
      </div>
      {imagePreviewUrl && (
        <div css={styles.imageWrapper}>
          <img css={styles.image} alt="image Preview" src={imagePreviewUrl.toString()} />
        </div>
      )}
    </Modal>
  )
}

const styles = {
  modal: css({
    width: 600
  }),
  editor: css({
    marginBottom: spacingMedium
  }),
  imageWrapper: css({
    display: "flex",
    marginTop: spacingMedium,
    marginBottom: spacingMedium,
    justifyContent: "center"
  }),
  image: css({
    width: "70%",
    objectFit: "contain"
  })
}
