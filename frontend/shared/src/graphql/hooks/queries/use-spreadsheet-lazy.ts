import {useLazyQuery} from "@apollo/client"
import {WatchQueryFetchPolicy} from "@apollo/client/core"
import {Spreadsheet} from "../../../models"
import {Option} from "../../../utils"
import {SpreadsheetQuery, SpreadsheetQueryVariables} from "../../generated/SpreadsheetQuery"
import {spreadsheetQuery} from "../../queries"

export interface UseSpreadsheetLazyHook {
  readonly spreadsheet: Option<Spreadsheet>
  readonly spreadsheetLoading: boolean
  readonly getSpreadsheet: (spreadsheetId: UUID) => void
}

export const useSpreadsheetLazy = (
  fetchPolicy?: WatchQueryFetchPolicy,
  onQueryCompleted?: (spreadsheet: Option<Spreadsheet>) => void
): UseSpreadsheetLazyHook => {
  const [getSpreadsheet, {data, loading}] = useLazyQuery<SpreadsheetQuery, SpreadsheetQueryVariables>(
    spreadsheetQuery,
    fetchPolicy
      ? {
          fetchPolicy,
          onCompleted: queryData => onQueryCompleted && onQueryCompleted(Option.of<Spreadsheet>(queryData.spreadsheet))
        }
      : undefined
  )

  return {
    spreadsheet: Option.of<Spreadsheet>(data?.spreadsheet),
    spreadsheetLoading: loading,
    getSpreadsheet: (spreadsheetId: UUID) => getSpreadsheet({variables: {id: spreadsheetId}})
  }
}
