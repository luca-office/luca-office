import {ErpType, Sorting} from "../../enums"

export interface ErpSurveyEvents {
  readonly sendErpExpandDirectory: (directoryName: string) => void
  readonly sendErpCollapseDirectory: (directoryName: string) => void
  readonly sendErpSelectTable: (tableType: ErpType | undefined, tableName: string, isDisabled: boolean) => void
  readonly sendErpSelectRow: (tableType: ErpType, rowId: number, rowIndex: number) => void
  readonly sendErpDeselectRow: (tableType: ErpType, rowId: number, rowIndex: number) => void
  readonly sendErpSelectAllRows: (tableType: ErpType, rowsCount: number) => void
  readonly sendErpDeselectAllRows: (tableType: ErpType, rowsCount: number) => void
  readonly sendErpSelectCell: (
    tableType: ErpType,
    rowId: number,
    rowIndex: number,
    columnName: string,
    columnIndex: number,
    value: string
  ) => void
  readonly sendErpCopyCellContentToClipboard: (
    tableType: ErpType,
    rowId: number,
    rowIndex: number,
    columnName: string,
    columnIndex: number,
    value: string
  ) => void
  readonly sendErpSearchTable: (tableType: ErpType, query: string, resultsCount: number) => void
  readonly sendErpUpdateShowOnlySelectedRows: (tableType: ErpType, selectedRowsCount: number, value: boolean) => void
  readonly sendErpSortTable: (tableType: ErpType, columnName: string, columnIndex: number, sorting: Sorting) => void
  readonly sendErpOpenRow: (tableType: ErpType, rowId: number, rowIndex: number) => void
  readonly sendErpCloseRow: (tableType: ErpType, rowId: number, rowIndex: number) => void
  readonly sendErpOpenAttachment: (tableType: ErpType, rowId: number, rowIndex: number, binaryFileId: UUID) => void
  readonly sendErpCopyCoreDataToClipboard: (tableType: ErpType, rowId: number, rowIndex: number, value: string) => void
  readonly sendErpCopyCoreDataAndReferencesToClipboard: (
    tableType: ErpType,
    rowId: number,
    rowIndex: number,
    value: string
  ) => void
  readonly sendErpCopyReferenceToClipboard: (
    tableType: ErpType,
    rowId: number,
    rowIndex: number,
    columnName: string,
    value: string
  ) => void
  readonly sendErpNavigateToReference: (
    tableType: ErpType,
    rowId: number,
    targetTableType: ErpType,
    targetRowId: number
  ) => void
  readonly sendErpNavigateBack: (
    tableType: ErpType,
    rowId: number,
    targetTableType: ErpType,
    targetRowId: number
  ) => void
}
