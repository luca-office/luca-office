import {css} from "@emotion/react"
import * as React from "react"
import {ButtonVariant, FileType, ViewerToolsType} from "../../enums"
import {MimeType} from "../../graphql/generated/globalTypes"
import {File} from "../../models"
import {backgroundColor, flex1, spacing, spacingHuge, spacingLarge, spacingMedium, spacingSmall} from "../../styles"
import {useLucaTranslation} from "../../translations"
import {
  getLanguageKeyViewerTool,
  getLanguageKeyViewerToolPreposition,
  getViewerToolForMimeType,
  iconForFile,
  mimeTypeForFile
} from "../../utils"
import {Button, Icon, ImageView, PdfView, SpreadsheetFilePreview, TextDocumentPreview, VideoView} from ".."

export interface MediaFilePreviewProps {
  readonly file: File
  readonly onPreviewButtonClick: (viewerTool: ViewerToolsType, file?: File) => void
  readonly showInlinePreview?: boolean
  readonly openButtonDisabled?: boolean
}

export const MediaFilePreview: React.FC<MediaFilePreviewProps> = ({
  file,
  onPreviewButtonClick,
  openButtonDisabled,
  showInlinePreview
}) => {
  const {t} = useLucaTranslation()

  return (
    <div css={styles.preview}>
      {showInlinePreview ? (
        renderMediaPreview(file)
      ) : (
        <div css={styles.content}>
          <Icon color={backgroundColor} customStyles={styles.icon} name={iconForFile(file)} />

          <Button
            customStyles={styles.viewerButton}
            disabled={openButtonDisabled}
            onClick={() =>
              onPreviewButtonClick?.(
                getViewerToolForMimeType(mimeTypeForFile(file).getOrElse(MimeType.Spreadsheet)),
                file
              )
            }
            icon={iconForFile(file)}
            variant={ButtonVariant.Primary}>
            {t("files_and_directories__open_in_viewer", {
              preposition: t(
                getLanguageKeyViewerToolPreposition(mimeTypeForFile(file).getOrElse(MimeType.Spreadsheet))
              ),
              viewerTool: t(getLanguageKeyViewerTool(mimeTypeForFile(file).getOrElse(MimeType.Spreadsheet)))
            })}
          </Button>
        </div>
      )}
    </div>
  )
}

const renderMediaPreview = (file: File) => {
  if (file.fileType === FileType.Media) {
    const viewerToolType = getViewerToolForMimeType(file.binaryFile.mimeType)
    switch (viewerToolType) {
      case ViewerToolsType.Image:
        return <ImageView url={file.binaryFileUrl} customStyles={styles.preview} />
      case ViewerToolsType.Video:
        return <VideoView url={file.binaryFileUrl} customStyles={styles.preview} />
      case ViewerToolsType.PDF:
        return <PdfView customStyles={styles.pdfPreview} binaryUrl={file.binaryFileUrl} />

      default:
        return null
    }
  } else if (file.fileType === FileType.Spreadsheet) {
    return <SpreadsheetFilePreview spreadsheet={file.spreadsheet} />
  } else {
    return <TextDocumentPreview content={file.textDocument.content} />
  }
}

const styles = {
  preview: css({
    flex: "1 1 auto",
    marginTop: spacingSmall,
    overflow: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "column",
    width: "100%"
  }),
  icon: css({
    flex: "1 1 auto",
    display: "flex",
    justifyContent: "center",
    marginBottom: spacingLarge,
    width: "auto",
    path: {
      strokeWidth: "0.1"
    }
  }),
  content: css({
    flex: flex1,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center"
  }),
  viewerButton: css({
    marginRight: spacingSmall,
    flexShrink: 0,
    alignSelf: "center",
    width: "auto",
    padding: spacing(0, spacingMedium)
  }),
  pdfPreview: css({
    height: "100%"
  })
}
