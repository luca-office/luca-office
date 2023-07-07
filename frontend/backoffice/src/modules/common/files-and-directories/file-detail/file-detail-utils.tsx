import * as React from "react"
import {ImageViewer, PdfViewer, Text, UpdateTextDocument, VideoViewer} from "shared/components"
import {FileType, ViewerToolsType} from "shared/enums"
import {File} from "shared/models"
import {LucaTFunction} from "shared/translations"
import {Option} from "shared/utils"
import {fileDetailStyle as styles} from "../../../files-and-directories/detail/file-detail/file-detail.style"
import {SampleCompanySpreadsheetEditorContainer} from "./sample-company-spreadsheet-editor-container/sample-company-spreadsheet-editor-container"

export interface PreviewInfo {
  readonly file: File
  readonly viewerTool: ViewerToolsType
}

export const renderViewerToolForFile = (
  previewInfo: PreviewInfo,
  onClose: () => void,
  onCloseBinary: () => void,
  t: LucaTFunction,
  sampleCompanyId?: UUID
) => {
  if (previewInfo.file.fileType === FileType.Media) {
    const {id, name, binaryFileUrl} = previewInfo.file
    const binaries = [{id, title: name, path: binaryFileUrl}]

    switch (previewInfo.viewerTool) {
      case ViewerToolsType.Image:
        return (
          <ImageViewer
            customStyles={styles.viewerTool}
            onClose={onClose}
            binaries={binaries}
            onCloseImage={onCloseBinary}
          />
        )
      case ViewerToolsType.Video:
        return (
          <VideoViewer
            customStyles={styles.viewerTool}
            onClose={onClose}
            binaries={binaries}
            onCloseVideo={onCloseBinary}
          />
        )
      case ViewerToolsType.PDF:
        return (
          <PdfViewer
            customStyles={styles.viewerTool}
            onClose={onClose}
            binaries={binaries}
            closeBinary={onCloseBinary}
            selectedBinaryId={Option.of(binaries[0].id)}
          />
        )

      default:
        return <Text customStyles={styles.viewerToolPlaceholder}>{t("files_and_directories__viewer_not_found")}</Text>
    }
  } else if (previewInfo.file.fileType === FileType.TextDocument) {
    return <UpdateTextDocument file={previewInfo.file} onClose={onClose} />
  } else
    return sampleCompanyId ? (
      <SampleCompanySpreadsheetEditorContainer
        customStyles={[styles.viewerTool, styles.spreadsheetViewer]}
        file={previewInfo.file}
        onClose={onClose}
        onCloseBinary={onCloseBinary}
        sampleCompanyId={sampleCompanyId}
      />
    ) : null
}
