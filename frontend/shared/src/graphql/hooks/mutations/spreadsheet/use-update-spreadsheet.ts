import {useMutation} from "@apollo/client"
import {Spreadsheet} from "../../../../models"
import {Option} from "../../../../utils"
import {SpreadsheetCellCreation} from "../../../generated/globalTypes"
import {UpdateSpreadsheet, UpdateSpreadsheetVariables} from "../../../generated/UpdateSpreadsheet"
import {updateSpreadsheetMutation} from "../../../mutations"
import {filesForSampleCompanyQuery, filesForScenarioQuery} from "../../../queries"

export interface UpdateSpreadsheetProps {
  readonly updateSpreadsheet: (id: UUID, creations: SpreadsheetCellCreation[]) => Promise<Option<Spreadsheet>>
  readonly updateSpreadsheetLoading: boolean
}

interface UseUpdateSpreadsheetParams {
  readonly scenarioId?: UUID
  readonly sampleCompanyId?: UUID
}

export const useUpdateSpreadsheet = (params?: UseUpdateSpreadsheetParams): UpdateSpreadsheetProps => {
  const [updateSpreadsheet, {loading}] = useMutation<UpdateSpreadsheet, UpdateSpreadsheetVariables>(
    updateSpreadsheetMutation
  )

  return {
    updateSpreadsheet: (id: UUID, cellCreations: SpreadsheetCellCreation[]) =>
      new Promise((resolve, reject) => {
        updateSpreadsheet({
          variables: {id, cellCreations},
          ...(params !== undefined && {
            ...(params.scenarioId !== undefined && {
              refetchQueries: [{query: filesForScenarioQuery, variables: {scenarioId: params.scenarioId}}]
            }),
            ...(params.sampleCompanyId && {
              refetchQueries: [
                {query: filesForSampleCompanyQuery, variables: {sampleCompanyId: params.sampleCompanyId}}
              ]
            })
          })
        })
          .then(result => resolve(Option.of<Spreadsheet>(result.data?.updateSpreadsheet)))
          .catch(reject)
      }),
    updateSpreadsheetLoading: loading
  }
}
