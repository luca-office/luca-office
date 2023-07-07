import {useMutation} from "@apollo/client"
import {Option} from "../../../../utils"
import {DeleteSpreadsheetCell, DeleteSpreadsheetCellVariables} from "../../../generated/DeleteSpreadsheetCell"
import {deleteSpreadsheetCellMutation} from "../../../mutations"
import {filesForSampleCompanyQuery, filesForScenarioQuery} from "../../../queries"

export interface DeleteSpreadsheetCellProps {
  deleteSpreadsheetCell: (id: UUID) => Promise<Option<UUID>>
  deleteSpreadsheetCellLoading: boolean
}

interface UseDeleteSpreadsheetCellParams {
  readonly scenarioId?: UUID
  readonly sampleCompanyId?: UUID
}

export const useDeleteSpreadsheetCell = (params?: UseDeleteSpreadsheetCellParams): DeleteSpreadsheetCellProps => {
  const [deleteSpreadsheetCell, {loading}] = useMutation<DeleteSpreadsheetCell, DeleteSpreadsheetCellVariables>(
    deleteSpreadsheetCellMutation
  )

  return {
    deleteSpreadsheetCell: (id: UUID) =>
      new Promise<Option<UUID>>((resolve, reject) => {
        deleteSpreadsheetCell({
          variables: {id},
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
          .then(result => resolve(Option.of<UUID>(result.data?.deleteSpreadsheetCell)))
          .catch(reject)
      }),
    deleteSpreadsheetCellLoading: loading
  }
}
