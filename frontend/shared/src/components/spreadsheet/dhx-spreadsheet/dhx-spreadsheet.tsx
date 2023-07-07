import "../../../assets/dhx-spreadsheet/spreadsheet.css"
import {CSSInterpolation} from "@emotion/serialize"
import {max, maxBy} from "lodash-es"
import * as React from "react"
import OutsideClickHandler from "react-outside-click-handler"
import {i18n, Spreadsheet as SpreadsheetInstance} from "../../../assets/dhx-spreadsheet/spreadsheet"
import {SpreadsheetCellType} from "../../../graphql/generated/globalTypes"
import {CellIndex, CellRange, SerializedCell, Spreadsheet, SpreadsheetCell} from "../../../models"
import {CustomStyle} from "../../../styles"
import {LucaTFunction} from "../../../translations"
import {DhxCellStyle} from "./dhx-types"
import {
  batchStyleChanges,
  defaultSpreadsheetColumnsCount,
  defaultSpreadsheetRowsCount,
  getCellIndex,
  getCellRange,
  getCellValueWithFormula,
  getFormulaExamples,
  isCellRangeName,
  serializeCells,
  toDhxData,
  toSpreadsheetCellType
} from "./dhx-utils"
import {spreadsheetLabelsDe} from "./i18n/locale-de"

export interface SpreadsheetStyleChange {
  readonly rowIndex: number
  readonly columnIndex: number
  readonly style: DhxCellStyle
}

export type SpreadsheetStyleChangeWithId = SpreadsheetStyleChange & {id: UUID}

interface Props extends CustomStyle {
  readonly readonly: boolean
  readonly rowsCount?: number
  readonly columnsCount?: number
  readonly spreadsheet: Spreadsheet
  readonly onCellValueChange?: (rowIndex: number, columnIndex: number, value: string) => void
  readonly onCellTypeChange?: (
    rowIndex: number,
    columnIndex: number,
    cellType: SpreadsheetCellType,
    value: string
  ) => void
  readonly onSelectCell?: (index: CellIndex) => void
  readonly onSelectCellRange?: (range: CellRange) => void
  readonly onInit?: (spreadsheetApi: SpreadsheetApi) => void
  readonly onCellStyleChange?: (changes: Array<SpreadsheetStyleChange>) => void
  readonly t: LucaTFunction
}

export interface SpreadsheetApi {
  readonly serialize: () => SerializedCell[]
}

export class DhxSpreadsheet extends React.Component<Props> {
  private ref: HTMLDivElement | null = null
  private spreadsheetInstance: SpreadsheetInstance | null = null

  shouldComponentUpdate(nextProps: Props) {
    return nextProps.spreadsheet.id !== this.props.spreadsheet.id
  }

  componentDidMount() {
    const {
      spreadsheet,
      readonly,
      rowsCount = defaultSpreadsheetRowsCount,
      columnsCount = defaultSpreadsheetColumnsCount,
      onInit
    } = this.props

    if (this.ref !== null) {
      i18n.setLocale("spreadsheet", spreadsheetLabelsDe)
      const spreadsheetInstance = this.createSpreadsheetInstance(this.ref, readonly, rowsCount, columnsCount)

      this.initializeCells(spreadsheetInstance, spreadsheet.cells)
      this.registerEventHandlers(spreadsheetInstance, readonly)

      if (onInit !== undefined) {
        onInit({
          serialize: () => serializeCells(spreadsheetInstance)
        })
      }

      this.spreadsheetInstance = spreadsheetInstance
    }
  }

  componentDidUpdate(prevProps: Props) {
    const prevSpreadsheet = prevProps.spreadsheet
    const spreadsheet = this.props.spreadsheet

    const cells: Array<SpreadsheetCell> = []

    const maxColIndexPrev = maxBy(prevSpreadsheet.cells, "columnIndex")?.columnIndex ?? 0
    const maxRowIndexPrev = maxBy(prevSpreadsheet.cells, "rowIndex")?.rowIndex ?? 0
    const maxColIndexCurrent = maxBy(spreadsheet.cells, "columnIndex")?.columnIndex ?? 0
    const maxRowIndexCurrent = maxBy(spreadsheet.cells, "rowIndex")?.rowIndex ?? 0

    const maxColIndex = max([maxColIndexPrev, maxColIndexCurrent]) ?? 0
    const maxRowIndex = max([maxRowIndexPrev, maxRowIndexCurrent]) ?? 0

    const newCellsMap = spreadsheet.cells.reduce((cellsMap, cell) => {
      return {...cellsMap, [`${cell.rowIndex}:${cell.columnIndex}`]: cell}
    }, {} as Record<string, SpreadsheetCell>)

    for (let rowIndex = 0; rowIndex <= maxRowIndex; rowIndex++) {
      for (let colIndex = 0; colIndex <= maxColIndex; colIndex++) {
        const emptyCell = {
          __typename: "SpreadsheetCell",
          cellType: SpreadsheetCellType.General,
          columnIndex: colIndex,
          id: "",
          rowIndex: rowIndex,
          spreadsheetId: "",
          style: null,
          value: ""
        }

        cells.push(newCellsMap[`${emptyCell.rowIndex}:${emptyCell.columnIndex}`] ?? emptyCell)
      }
    }

    if (this.spreadsheetInstance !== null) {
      this.initializeCells(this.spreadsheetInstance, cells)
    }
  }

  componentWillUnmount() {
    this.spreadsheetInstance?.destructor()
  }

  render() {
    return (
      <div css={[styles.wrapper, this.props.customStyles]}>
        {/* if endEdit is not called, a cell in edit mode will steal focus from background */}
        <OutsideClickHandler onOutsideClick={() => this.spreadsheetInstance?.endEdit()}>
          <div ref={element => (this.ref = element)} css={styles.dhxSpreadsheet} />
        </OutsideClickHandler>
      </div>
    )
  }

  private createSpreadsheetInstance = (
    element: HTMLElement,
    readonly: boolean,
    rowsCount: number,
    columnsCount: number
  ) => {
    const spreadsheetInstance = new SpreadsheetInstance(element, {
      rowsCount: rowsCount,
      colsCount: columnsCount,
      toolbarBlocks: readonly ? [] : ["undo", "clear", "format", "colors"],
      formats: [{name: "Währung", id: "currency", mask: "#,##0.00[$ €]", example: "1,500.31 €"}],
      multiSheets: false,
      dateFormat: "%d.%m.%Y"
    })

    spreadsheetInstance.contextMenu.data.removeAll()

    return spreadsheetInstance
  }

  private initializeCells = (spreadsheetInstance: SpreadsheetInstance, cells: SpreadsheetCell[]) => {
    spreadsheetInstance.parse(toDhxData(cells))
  }

  private registerEventHandlers = (spreadsheetInstance: SpreadsheetInstance, readonly: boolean) => {
    const getValueWithFormula = (cellName: string, value: any): string => {
      const sanitizedValue = value ?? ""
      const cellValueWithFormula = getCellValueWithFormula(spreadsheetInstance.getFormula(cellName), sanitizedValue)
      return cellValueWithFormula !== "=" ? cellValueWithFormula : sanitizedValue.toString()
    }

    spreadsheetInstance.events.on("AfterSelectionSet", (cellNameOrCellRangeName: string) => {
      const onSelectCell = this.props.onSelectCell
      const onSelectCellRange = this.props.onSelectCellRange

      if (isCellRangeName(cellNameOrCellRangeName)) {
        onSelectCellRange?.(getCellRange(spreadsheetInstance, cellNameOrCellRangeName))
      } else {
        onSelectCell?.(getCellIndex(spreadsheetInstance, cellNameOrCellRangeName))
      }
    })

    spreadsheetInstance.events.on("AfterFormatChange", (cellName: string) => {
      const onTypeChange = this.props.onCellTypeChange

      if (onTypeChange !== undefined) {
        const format = spreadsheetInstance.getFormat(cellName)
        const value = spreadsheetInstance.getValue(cellName)
        const updatedValue = getValueWithFormula(cellName, value)
        const {rowIndex, columnIndex} = getCellIndex(spreadsheetInstance, cellName)

        onTypeChange(rowIndex, columnIndex, toSpreadsheetCellType(format), updatedValue)
      }
    })

    spreadsheetInstance.events.on("AfterValueChange", (cellName: string, value: any) => {
      const onValueChange = this.props.onCellValueChange

      const updatedValue = getValueWithFormula(cellName, value)
      const evaluatedValue = spreadsheetInstance.getValue(cellName)
      const isInvalidFormula = evaluatedValue === "#ERROR" || evaluatedValue === "#REF!"

      if (/\d,\d/.test(updatedValue) || isInvalidFormula) {
        const text = this.props.t("spreadsheet_editor__error_alert_text")
        const message = `${text}\n${getFormulaExamples().join("\n")}`
        window.alert(message)
      }

      if (onValueChange !== undefined) {
        const {rowIndex, columnIndex} = getCellIndex(spreadsheetInstance, cellName)
        onValueChange(rowIndex, columnIndex, updatedValue)
      }
    })

    spreadsheetInstance.events.on(
      "AfterStyleChange",
      batchStyleChanges((changes: Record<string, DhxCellStyle>) => {
        const batchedChanges: Array<SpreadsheetStyleChange> = Object.keys(changes).map(cellName => {
          const {rowIndex, columnIndex} = getCellIndex(spreadsheetInstance, cellName)
          return {rowIndex, columnIndex, style: changes[cellName] ?? null}
        })

        this.props.onCellStyleChange?.(batchedChanges)
      })
    )
    if (readonly) {
      spreadsheetInstance.events.on("beforeEditStart", () => {
        return false
      })
      spreadsheetInstance.events.on("beforeValueChange", () => {
        return false
      })
      spreadsheetInstance.events.on("beforeStyleChange", () => {
        return false
      })
      spreadsheetInstance.events.on("beforeColumnDelete", () => {
        return false
      })
      spreadsheetInstance.events.on("beforeRowDelete", () => {
        return false
      })
      spreadsheetInstance.events.on("beforeColumnAdd", () => {
        return false
      })
      spreadsheetInstance.events.on("beforeRowAdd", () => {
        return false
      })
    }
  }
}

const styles: {[key: string]: CSSInterpolation} = {
  wrapper: {
    display: "flex",
    flexDirection: "column",

    // div is created by OutsideClickHandler
    "> div": {
      flex: "1 1 auto",
      display: "flex",
      flexDirection: "column"
    }
  },
  dhxSpreadsheet: {
    flex: "1 1 auto"
  }
}
