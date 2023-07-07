import * as React from "react"
import {UploadFileType as FileType} from "shared/enums"
import {ReferenceBookContentType} from "shared/graphql/generated/globalTypes"
import {CreateReferenceBookContentProps} from "shared/graphql/hooks"
import {ReferenceBookArticleContent, UploadBinary} from "shared/models"
import {Option} from "shared/utils"
import {UploadFileModal} from "../../../../components"

export interface ReferenceBookBinaryContentModalContainerProps
  extends Pick<CreateReferenceBookContentProps, "createReferenceBookContent"> {
  readonly contentType:
    | ReferenceBookContentType.ImageContent
    | ReferenceBookContentType.VideoContent
    | ReferenceBookContentType.PdfContent
  readonly onDismiss: () => void
  readonly onSuccess: (data?: Option<ReferenceBookArticleContent>[]) => void
  readonly referenceBookChapterId: UUID
  readonly selectedArticleId: Option<UUID>
}

export const ReferenceBookBinaryContentModalContainer: React.FC<ReferenceBookBinaryContentModalContainerProps> = ({
  contentType,
  createReferenceBookContent,
  onDismiss,
  onSuccess,
  selectedArticleId
}) => {
  const isImageContent = contentType === ReferenceBookContentType.ImageContent
  const isVideoContent = contentType === ReferenceBookContentType.VideoContent
  const [isUploading, setIsUploading] = React.useState<boolean>(false)

  const handleCreateReferenceBookContents = (uploadedBinaries: UploadBinary[]) =>
    selectedArticleId.forEach(selectedArticleId => {
      setIsUploading(true)
      Promise.all(
        uploadedBinaries.map(binary =>
          createReferenceBookContent({
            contentType,
            referenceBookArticleId: selectedArticleId,
            ...{
              [isImageContent ? "imageBinaryFileId" : isVideoContent ? "videoBinaryFileId" : "pdfBinaryFileId"]: binary
                .data.id
            }
          })
        )
      )
        .then(data => {
          setIsUploading(false)
          onSuccess(data)
        })
        .catch(err => {
          setIsUploading(false)
          console.error(err)
        })
    })

  return (
    <UploadFileModal
      disabled={isUploading}
      onDismiss={onDismiss}
      acceptedFileTypes={isImageContent ? [FileType.Graphic] : isVideoContent ? [FileType.Video] : [FileType.PDF]}
      onBinariesSuccessfullyUploaded={handleCreateReferenceBookContents}
    />
  )
}
