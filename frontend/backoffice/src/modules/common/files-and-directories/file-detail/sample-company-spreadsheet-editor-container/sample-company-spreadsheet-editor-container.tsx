import * as React from "react"
import {useSampleCompany, useUpdateSpreadsheet} from "shared/graphql/hooks"
import {SpreadsheetFile} from "shared/models"
import {CustomStyle} from "shared/styles"
import {isDefined} from "shared/utils"
import {SpreadsheetEditorContainer} from "../spreadsheet-editor-container/spreadsheet-editor-container"

export interface SpreadsheetEditorContainerProps extends CustomStyle {
  readonly file: SpreadsheetFile
  readonly onClose: () => void
  readonly onCloseBinary: () => void
  readonly sampleCompanyId: UUID
}

export const SampleCompanySpreadsheetEditorContainer: React.FC<SpreadsheetEditorContainerProps> = ({
  customStyles,
  file,
  sampleCompanyId,
  onClose,
  onCloseBinary
}) => {
  const {sampleCompany: sampleCompanyOption} = useSampleCompany(sampleCompanyId)
  const {updateSpreadsheet} = useUpdateSpreadsheet({sampleCompanyId})

  return (
    <SpreadsheetEditorContainer
      customStyles={customStyles}
      file={file}
      readonly={sampleCompanyOption.exists(({publishedAt}) => isDefined(publishedAt))}
      onClose={onClose}
      onCloseBinary={onCloseBinary}
      updateSpreadsheet={updateSpreadsheet}
    />
  )
}
