import {LocalSpreadsheet} from "../../../models"

export type SpreadsheetState = {[spreadsheetId: string]: LocalSpreadsheet}

export const initialSpreadsheetState: SpreadsheetState = {}
