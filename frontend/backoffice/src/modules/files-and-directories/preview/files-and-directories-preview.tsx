import {noop} from "lodash-es"
import * as React from "react"
import {
  AutomatedCriterionFilesAndDirectoriesConfig,
  FilesAndDirectories,
  FilesAndDirectoriesProps
} from "shared/office-tools"
import {CustomStyle} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {useFilesAndDirectoriesPreview} from "./hooks/use-files-and-directories-preview"

export interface FilesAndDirectoriesPreviewProps extends CustomStyle {
  readonly onClose: () => void
  readonly automatedCriterionConfig?: AutomatedCriterionFilesAndDirectoriesConfig
  readonly scenarioId: UUID
}

export const FilesAndDirectoriesPreview: React.FC<FilesAndDirectoriesPreviewProps> = props => {
  const {onClose, scenarioId, customStyles, automatedCriterionConfig} = props
  const {t} = useLucaTranslation()

  const filesAndDirectoriesProps: FilesAndDirectoriesProps = {
    ...useFilesAndDirectoriesPreview(scenarioId),
    onClose,
    t,
    onOpenFile: noop,
    onOpenSpreadsheetFile: noop,
    onOpenTextDocumentFile: noop,
    isPreview: true,
    automatedCriterionConfig,
    customStyles
  }

  return <FilesAndDirectories {...filesAndDirectoriesProps} />
}
