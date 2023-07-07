/* eslint-disable max-lines */
import {keyBy} from "lodash-es"
import * as React from "react"
import {useEffect} from "react"
import {SpreadsheetViewer} from "../../components"
import {
  SpreadsheetStyleChange,
  SpreadsheetStyleChangeWithId
} from "../../components/spreadsheet/dhx-spreadsheet/dhx-spreadsheet"
import {SpreadsheetCellType} from "../../graphql/generated/globalTypes"
import {useFilesForSampleCompany, useFilesForScenario} from "../../graphql/hooks"
import {useSpreadsheetLazy} from "../../graphql/hooks/queries/use-spreadsheet-lazy"
import {
  CellIndex,
  CellRange,
  LocalSpreadsheet,
  SelectSpreadsheetCellEventPayload,
  SelectSpreadsheetCellRangeEventPayload,
  SelectSpreadsheetEventPayload,
  Spreadsheet,
  SpreadsheetCell,
  UpdateCellStyleSurveyEventPayload,
  UpdateCellTypeSurveyEventPayload,
  UpdateCellValueSurveyEventPayload,
  ViewerSpreadsheet
} from "../../models"
import {SpreadsheetState} from "../../redux/state/data"
import {CustomStyle} from "../../styles"
import {createUUID, find, getFileBySpreadsheetId, mergeRemoteFilesWithLocalSpreadsheets, Option} from "../../utils"

export interface SpreadsheetViewerState {
  readonly spreadsheets: Array<ViewerSpreadsheet>
  readonly selectedSpreadsheetId: Option<UUID>
  readonly localSpreadsheets: SpreadsheetState
  readonly isReadOnly: boolean
}

export interface SpreadsheetViewerStateActions {
  readonly initializeSpreadsheet: (spreadsheetId: UUID, spreadsheet: LocalSpreadsheet) => void
  readonly selectSpreadsheet: (spreadsheetId: UUID) => void
  readonly closeSpreadsheet: (spreadsheetId: UUID) => void
  readonly createValue: (spreadsheetId: UUID, cell: SpreadsheetCell) => void
  readonly changeValue: (spreadsheetId: UUID, cellId: UUID, value: string) => void
  readonly changeType: (spreadsheetId: UUID, cellId: UUID, value: SpreadsheetCellType) => void
  readonly changeStyleBatched: (spreadsheetId: UUID, changes: Array<SpreadsheetStyleChangeWithId>) => void
  readonly createCellBatched: (SpreadsheetId: UUID, cells: Array<SpreadsheetCell>) => void
}

export interface SpreadsheetViewerSurveyEvents {
  readonly sendSelectCellEvent: (payload: SelectSpreadsheetCellEventPayload) => void
  readonly sendRangeSelectionEvent: (payload: SelectSpreadsheetCellRangeEventPayload) => void
  readonly sendUpdateCellValueEvent: (eventProps: UpdateCellValueSurveyEventPayload) => void
  readonly sendUpdateCellTypeEvent: (eventProps: UpdateCellTypeSurveyEventPayload) => void
  readonly sendCloseSpreadsheetEvent: (spreadsheetId: UUID) => void
  readonly sendUpdateCellStyleEvent: (payload: UpdateCellStyleSurveyEventPayload) => void
  readonly sendSelectSpreadsheetEvent: (payload: SelectSpreadsheetEventPayload) => void
}

interface Props extends CustomStyle {
  readonly scenarioId: UUID
  readonly sampleCompanyIdOption: Option<UUID>
  readonly onClose: () => void
  readonly onMinimize?: () => void
  readonly useState: () => SpreadsheetViewerState
  readonly useStateActions: () => SpreadsheetViewerStateActions
  readonly useSurveyEvents: () => SpreadsheetViewerSurveyEvents
}

export const SpreadsheetViewerContainer: React.FC<Props> = ({
  customStyles,
  scenarioId,
  sampleCompanyIdOption,
  onClose,
  onMinimize,
  useState,
  useStateActions,
  useSurveyEvents
}) => {
  const {localSpreadsheets, selectedSpreadsheetId, spreadsheets, isReadOnly} = useState()

  const {
    closeSpreadsheet,
    initializeSpreadsheet,
    selectSpreadsheet,
    changeValue,
    createValue,
    changeType,
    changeStyleBatched,
    createCellBatched
  } = useStateActions()

  const {
    sendUpdateCellValueEvent,
    sendUpdateCellTypeEvent,
    sendSelectCellEvent,
    sendRangeSelectionEvent,
    sendCloseSpreadsheetEvent,
    sendUpdateCellStyleEvent,
    sendSelectSpreadsheetEvent
  } = useSurveyEvents()

  const onSpreadsheetLoaded = (spreadsheetOption: Option<Spreadsheet>) =>
    spreadsheetOption.forEach(spreadsheet =>
      initializeSpreadsheet(spreadsheet.id, {...spreadsheet, cells: keyBy(spreadsheet.cells, "id")})
    )

  const {spreadsheetLoading, getSpreadsheet} = useSpreadsheetLazy("cache-and-network", onSpreadsheetLoaded)
  const {files: filesForScenarioOption, filesLoading: filesForScenarioLoading} = useFilesForScenario(scenarioId)
  const {files: filesForSampleCompanyOption, filesLoading: filesForSampleCompanyLoading} = useFilesForSampleCompany(
    sampleCompanyIdOption.getOrElse(""),
    sampleCompanyIdOption.isEmpty()
  )

  useEffect(() => {
    selectedSpreadsheetId.forEach(id => localSpreadsheets[id] === undefined && getSpreadsheet(id))
  }, [selectedSpreadsheetId.orNull()])

  const files = React.useMemo(
    () =>
      mergeRemoteFilesWithLocalSpreadsheets(localSpreadsheets, [
        ...filesForScenarioOption.getOrElse([]),
        ...filesForSampleCompanyOption.getOrElse([])
      ]),
    [localSpreadsheets, filesForScenarioOption.orNull(), filesForSampleCompanyOption.orNull()]
  )

  const selectedSpreadsheet = find(spreadsheet => spreadsheet.id === selectedSpreadsheetId.orNull(), spreadsheets)

  const onCellTypeChange = (rowIndex: number, columnIndex: number, cellType: SpreadsheetCellType, value: string) =>
    selectedSpreadsheet.forEach(spreadsheet => {
      const spreadsheetId = spreadsheet.id
      const fileId = getFileBySpreadsheetId(files, spreadsheetId)
        .map(file => file.id)
        .orNull()
      const existingCell = spreadsheet.cells.find(
        cell => cell.rowIndex === rowIndex && cell.columnIndex === columnIndex
      )

      if (existingCell !== undefined && existingCell.cellType !== cellType) {
        changeType(spreadsheetId, existingCell.id, cellType)

        if (fileId !== null) {
          sendUpdateCellTypeEvent({
            fileId,
            spreadsheetId,
            rowIndex: existingCell.rowIndex,
            columnIndex: existingCell.columnIndex,
            cellId: existingCell.id,
            value,
            cellType
          })
        }
      }
    })

  const onValueChange = (rowIndex: number, columnIndex: number, value: string) =>
    selectedSpreadsheet.forEach(spreadsheet => {
      const spreadsheetId = spreadsheet.id
      const fileId = getFileBySpreadsheetId(files, spreadsheetId)
        .map(file => file.id)
        .orNull()
      const existingCell = spreadsheet.cells.find(
        cell => cell.rowIndex === rowIndex && cell.columnIndex === columnIndex
      )

      if (existingCell !== undefined) {
        changeValue(spreadsheetId, existingCell.id, value)

        if (fileId !== null) {
          sendUpdateCellValueEvent({
            fileId,
            spreadsheetId: existingCell.spreadsheetId,
            rowIndex: existingCell.rowIndex,
            columnIndex: existingCell.columnIndex,
            cellId: existingCell.id,
            cellType: existingCell.cellType,
            value
          })
        }
      } else {
        const cellId = createUUID()
        const cell: SpreadsheetCell = {
          __typename: "SpreadsheetCell",
          id: cellId,
          spreadsheetId,
          cellType: SpreadsheetCellType.General,
          rowIndex,
          columnIndex,
          value: value,
          style: null
        }

        createValue(spreadsheetId, cell)

        if (fileId !== null) {
          sendUpdateCellValueEvent({
            fileId,
            spreadsheetId: cell.spreadsheetId,
            rowIndex: cell.rowIndex,
            columnIndex: cell.columnIndex,
            cellId,
            cellType: cell.cellType,
            value
          })
        }
      }
    })

  const onSelectCell = ({rowIndex, columnIndex}: CellIndex) =>
    selectedSpreadsheet.forEach(spreadsheet => {
      find(cell => cell.rowIndex === rowIndex && cell.columnIndex === columnIndex, spreadsheet.cells).map(
        existingCell => {
          getFileBySpreadsheetId(files, spreadsheet.id)
            .map(file => file.id)
            .forEach(fileId => {
              sendSelectCellEvent({
                cellId: existingCell.id,
                columnIndex,
                rowIndex,
                fileId,
                spreadsheetId: spreadsheet.id
              })
            })
        }
      )
    })

  const onSelectCellRange = (range: CellRange) =>
    selectedSpreadsheet.forEach(spreadsheet => {
      getFileBySpreadsheetId(files, spreadsheet.id)
        .map(file => file.id)
        .forEach(fileId => {
          sendRangeSelectionEvent({
            startCellRowIndex: range.start.rowIndex,
            startCellColumnIndex: range.start.columnIndex,
            endCellRowIndex: range.end.rowIndex,
            endCellColumnIndex: range.end.columnIndex,
            fileId,
            spreadsheetId: spreadsheet.id
          })
        })
    })

  const onCellStyleChange = (changes: Array<SpreadsheetStyleChange>) => {
    selectedSpreadsheet.forEach(spreadsheet => {
      const fileId = getFileBySpreadsheetId(files, spreadsheet.id)
        .map(file => file.id)
        .orNull()

      if (!fileId) return

      const changeMap = changes.reduce((cellsMap, change) => {
        return {...cellsMap, [`${change.rowIndex}:${change.columnIndex}`]: change}
      }, {} as Record<string, SpreadsheetStyleChange>)

      const existingCellsToUpdate = spreadsheet.cells.filter(
        cell => changeMap[`${cell.rowIndex}:${cell.columnIndex}`] !== undefined
      )

      existingCellsToUpdate.forEach(cell => {
        sendUpdateCellStyleEvent({
          cellId: cell.id,
          columnIndex: cell.columnIndex,
          rowIndex: cell.rowIndex,
          style: changeMap[`${cell.rowIndex}:${cell.columnIndex}`].style,
          fileId,
          spreadsheetId: spreadsheet.id
        })
      })

      const cellMap = spreadsheet.cells.reduce((cellMap, cell) => {
        return {...cellMap, [`${cell.rowIndex}:${cell.columnIndex}`]: cell}
      }, {} as Record<string, SpreadsheetCell>)

      const cellUpdates = changes
        .filter(change => cellMap[`${change.rowIndex}:${change.columnIndex}`] !== undefined)
        .map(change => ({...change, id: cellMap[`${change.rowIndex}:${change.columnIndex}`].id}))

      changeStyleBatched(spreadsheet.id, cellUpdates)

      const cellCreations: Array<SpreadsheetCell> = changes
        .filter(change => cellMap[`${change.rowIndex}:${change.columnIndex}`] === undefined)
        .map(change => {
          const cellId = createUUID()

          // not very clean to have a side effect inside a map function, but ist soo convenient here!
          sendUpdateCellStyleEvent({
            cellId,
            columnIndex: change.columnIndex,
            rowIndex: change.rowIndex,
            style: change.style,
            fileId,
            spreadsheetId: spreadsheet.id
          })

          return {
            __typename: "SpreadsheetCell",
            id: cellId,
            spreadsheetId: spreadsheet.id,
            cellType: SpreadsheetCellType.General,
            rowIndex: change.rowIndex,
            columnIndex: change.columnIndex,
            value: "",
            style: JSON.stringify(change.style)
          }
        })

      createCellBatched(spreadsheet.id, cellCreations)
    })
  }

  const onCloseSpreadsheet = (spreadsheetId: UUID) => {
    closeSpreadsheet(spreadsheetId)
    sendCloseSpreadsheetEvent(spreadsheetId)
  }

  useEffect(() => {
    selectedSpreadsheetId.forEach(id => {
      const spreadsheet = spreadsheets.find(sheet => sheet.id === id)
      const fileOption = getFileBySpreadsheetId(files, id)

      fileOption.forEach(file => {
        if (spreadsheet !== undefined) {
          sendSelectSpreadsheetEvent({
            spreadsheetId: spreadsheet.id,
            spreadsheetTitle: spreadsheet.title,
            scenarioId,
            fileId: file.id,
            directoryId: file.directoryId
          })
        }
      })
    })
  }, [selectedSpreadsheetId.orNull()])

  return (
    <SpreadsheetViewer
      readonly={isReadOnly}
      isLoading={filesForSampleCompanyLoading || filesForScenarioLoading || spreadsheetLoading}
      customStyles={customStyles}
      onMinimize={onMinimize}
      onCloseViewer={onClose}
      onCloseSpreadsheet={onCloseSpreadsheet}
      activeSpreadsheetId={selectedSpreadsheetId.orUndefined()}
      setActiveSpreadsheetId={selectSpreadsheet}
      spreadsheets={spreadsheets}
      onCellValueChange={onValueChange}
      onCellTypeChange={onCellTypeChange}
      onSelectCell={onSelectCell}
      onSelectCellRange={onSelectCellRange}
      onCellStyleChange={onCellStyleChange}
    />
  )
}
