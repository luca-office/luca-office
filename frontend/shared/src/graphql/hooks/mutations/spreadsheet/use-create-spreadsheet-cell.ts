import {useMutation} from "@apollo/client"
import {SpreadsheetCell} from "../../../../models"
import {Option} from "../../../../utils"
import {CreateSpreadsheetCell, CreateSpreadsheetCellVariables} from "../../../generated/CreateSpreadsheetCell"
import {SpreadsheetCellCreation} from "../../../generated/globalTypes"
import {createSpreadsheetCellMutation} from "../../../mutations"
import {filesForSampleCompanyQuery, filesForScenarioQuery} from "../../../queries"

export interface CreateSpreadsheetCellProps {
  createSpreadsheetCell: (creation: SpreadsheetCellCreation) => Promise<Option<SpreadsheetCell>>
  createSpreadsheetCellLoading: boolean
}

interface UseCreateSpreadsheetCellParams {
  readonly scenarioId?: UUID
  readonly sampleCompanyId?: UUID
}

export const useCreateSpreadsheetCell = (params?: UseCreateSpreadsheetCellParams): CreateSpreadsheetCellProps => {
  const [createSpreadsheetCell, {loading}] = useMutation<CreateSpreadsheetCell, CreateSpreadsheetCellVariables>(
    createSpreadsheetCellMutation
  )

  return {
    createSpreadsheetCell: (creation: SpreadsheetCellCreation) =>
      new Promise<Option<SpreadsheetCell>>((resolve, reject) => {
        createSpreadsheetCell({
          variables: {creation},
          ...(!!params && {
            ...(params.scenarioId && {
              refetchQueries: [{query: filesForScenarioQuery, variables: {scenarioId: params.scenarioId}}]
            }),
            ...(params.sampleCompanyId && {
              refetchQueries: [
                {query: filesForSampleCompanyQuery, variables: {sampleCompanyId: params.sampleCompanyId}}
              ]
            })
          })
        })
          .then(result => resolve(Option.of<SpreadsheetCell>(result.data?.createSpreadsheetCell)))
          .catch(reject)
      }),
    createSpreadsheetCellLoading: loading
  }
}
