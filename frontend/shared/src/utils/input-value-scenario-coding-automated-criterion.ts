import {ApolloClient} from "@apollo/client"
import {indexToCellName} from "../components"
import {toFile} from "../converters"
import {FileType, IconName} from "../enums"
import {FileQuery, FileQueryVariables} from "../graphql/generated/FileQuery"
import {fileQuery} from "../graphql/queries"
import {AutomatedCodingCriterionMetadata, File, InputValueScenarioCodingAutomatedCriterion} from "../models"
import {LucaTFunction} from "../translations"
import {iconForFile} from "./file-utils"
import {getViewerToolsTypeMappingByOfficeToolName} from "./office-tool"
import {Option} from "./option"

const getFile = (client: ApolloClient<unknown>, fileId: UUID): Promise<Option<File>> =>
  client
    .query<FileQuery, FileQueryVariables>({query: fileQuery, variables: {id: fileId}})
    .then(result => Option.of(result.data?.file).map(toFile))

export const getInputValueScenarioCodingAutomatedCriterionData = (
  t: LucaTFunction,
  client: ApolloClient<unknown>,
  criterion: InputValueScenarioCodingAutomatedCriterion
): Promise<AutomatedCodingCriterionMetadata> => {
  if (criterion.fileId === null) {
    const viewerToolsTypeMapping = getViewerToolsTypeMappingByOfficeToolName(criterion.officeTool)
    return Promise.resolve({
      name: t("rating__input_in_file", {input: criterion.value, fileName: t(viewerToolsTypeMapping.label)}),
      icon: viewerToolsTypeMapping.icon
    })
  }

  return getFile(client, criterion.fileId).then(fileOption =>
    fileOption
      .map(file => {
        if (file.fileType === FileType.Media) {
          return {
            name: t("rating__input_in_file", {input: criterion.value, fileName: file.name}),
            icon: iconForFile(file)
          }
        }
        if (file.fileType === FileType.TextDocument) {
          return {
            name: t("rating__input_in_file", {input: criterion.value, fileName: file.name}),
            icon: iconForFile(file)
          }
        }

        const isWholeTable = criterion.spreadsheetColumnIndex === null || criterion.spreadsheetRowIndex === null

        return {
          name: t("rating__input_in_spreadsheet", {
            input: criterion.value,
            fileName: file.name,
            size: isWholeTable
              ? t("coding_models__automated_item_input_value_preview_spreadsheet_whole_table")
              : t("coding_models__automated_item_input_value_preview_spreadsheet_specific_cell", {
                  cellName: `(${indexToCellName({
                    rowIndex: criterion.spreadsheetRowIndex ?? 0,
                    columnIndex: criterion.spreadsheetColumnIndex ?? 0
                  })})`
                })
          }),
          icon: IconName.File
        }
      })
      .getOrElse({name: "", icon: IconName.File})
  )
}
