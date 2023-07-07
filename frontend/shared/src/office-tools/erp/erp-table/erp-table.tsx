import {CSSInterpolation} from "@emotion/serialize"
import React, {useEffect, useMemo, useState} from "react"
import {Virtuoso} from "react-virtuoso"
import {Sorting} from "../../../enums"
import {ErpEntity} from "../../../models"
import {CustomStyle, zIndex1} from "../../../styles"
import {useLucaTranslation} from "../../../translations"
import {TablePlaceholder} from "../erp-content-view/table-placeholder"
import {virtualizationThreshold} from "./constants"
import {ErpTableSortConfig, Header} from "./erp-table-header"
import {ErpTableCellData, ErpTableRowData, Row} from "./erp-table-row"
import {compareFnBySortConfig, nextSortDirection} from "./utils"

export type ErpTableEntity = Record<string, string | number | null>

interface ErpTableProps extends CustomStyle {
  readonly columns: Array<ErpTableColumn>
  readonly rows: Array<ErpTableRowData>
  readonly onCellSelected?: (row: ErpTableRowData, cell: ErpTableCellData) => void
  readonly onRowDoubleClicked?: (entityId: number, rowIndex: number) => void
  readonly onChangeRowSelectionState?: (rowId: number, rowIndex: number, isSelected: boolean) => void
  readonly onChangeAllRowsSelectionState?: (rowsCount: number, isSelected: boolean) => void
  readonly onSortTable?: (columnName: string, columnIndex: number, sorting: Sorting) => void
  readonly onChangeSelectedEntities?: (selectedEntityIds: Record<string, boolean>) => void
}

export enum ErpTableColumnType {
  Default,
  PrimaryKey,
  ForeignKey,
  Selector
}

export enum ErpTableContentType {
  Text,
  Date,
  Number,
  Currency,
  Selector,
  BinaryFile,
  Salutation,
  EmploymentMode,
  FamilyStatus,
  PaymentStatus,
  DeliveryStatus,
  TextArray
}

export interface ErpTableColumn {
  readonly type: ErpTableColumnType
  readonly contentType: ErpTableContentType
  readonly label: string
  readonly propertyKey?: string
}

interface ErpContextProps {
  readonly columns: Array<ErpTableColumn>
  readonly entitiesCount: number
  readonly onSortTable?: (columnName: string, columnIndex: number, sorting: Sorting) => void
  readonly selectedCellId: string | null
  readonly selectedEntityIds: Record<number, boolean | undefined>
  readonly selectCell?: (rowData: ErpTableRowData) => (cell: ErpTableCellData) => void
  readonly selectEntity?: (entityId: number, rowIndex: number) => void
  readonly deselectEntity?: (entityId: number, rowIndex: number) => void
  readonly selectAllEntities?: () => void
  readonly deselectAllEntities?: () => void
}

export const ErpContext = React.createContext<ErpContextProps>({
  columns: [],
  entitiesCount: 0,
  selectedCellId: null,
  selectedEntityIds: {}
})

export const ErpTable = (props: ErpTableProps) => {
  const {
    columns,
    rows,
    onCellSelected,
    onRowDoubleClicked,
    onChangeAllRowsSelectionState,
    onChangeRowSelectionState,
    onSortTable,
    onChangeSelectedEntities
  } = props
  const {t} = useLucaTranslation()

  const [selectedCellId, updateSelectedCellId] = useState<string | null>(null)
  const [selectedEntityIds, updateSelectedEntityIds] = useState<Record<number, boolean>>({})
  const [sortConfig, updateSortConfig] = useState<ErpTableSortConfig | null>(null)

  useEffect(() => {
    onChangeSelectedEntities?.(selectedEntityIds)
  }, [selectedEntityIds])

  const updateSingleRowSelection = (entityId: number, rowIndex: number, isSelected: boolean) => {
    updateSelectedEntityIds(previousState => ({...previousState, [entityId]: isSelected}))
    onChangeRowSelectionState?.(entityId, rowIndex, isSelected)
  }

  const updateAllRowsSelection = (isSelected: boolean) => {
    updateSelectedEntityIds(isSelected ? Object.fromEntries(rows.map(row => [row.entityId, true])) : {})
    onChangeAllRowsSelectionState?.(entitiesCount, isSelected)
  }

  const selectEntity = (entityId: number, rowIndex: number) => updateSingleRowSelection(entityId, rowIndex, true)
  const deselectEntity = (entityId: number, rowIndex: number) => updateSingleRowSelection(entityId, rowIndex, false)
  const selectAllEntities = () => updateAllRowsSelection(true)
  const deselectAllEntities = () => updateAllRowsSelection(false)

  const selectCell = (row: ErpTableRowData) => (cell: ErpTableCellData) => {
    updateSelectedCellId(cell.id)
    onCellSelected?.(row, cell)
  }

  const handleOnSort = (propertyKey: string, contentType: ErpTableContentType, columnIndex: number) => {
    const updatedSorting = nextSortDirection(sortConfig?.sorting ?? Sorting.None)
    updateSortConfig({
      sorting: updatedSorting,
      propertyKey: propertyKey as keyof ErpEntity,
      contentType: contentType
    })
    onSortTable?.(propertyKey, columnIndex, updatedSorting)
  }

  const columnsInternal = useMemo<ErpTableColumn[]>(() => {
    const rowDigitsLength = `${rows.length}`.length
    return [
      {
        type: ErpTableColumnType.Selector,
        contentType: ErpTableContentType.Selector,
        label: "0".padStart(rowDigitsLength < 3 ? 3 : rowDigitsLength, "0")
      },
      ...columns
    ]
  }, [rows, columns])

  const sortedRows = useMemo(() => {
    if (sortConfig === null || sortConfig.sorting === Sorting.None) {
      return rows
    }

    return [...rows].sort(compareFnBySortConfig(sortConfig))
  }, [rows, sortConfig])

  const entitiesCount = sortedRows.length
  const isTableEmpty = entitiesCount === 0

  const header = (
    <div css={styles.header}>
      {columnsInternal.map((column, index) => (
        <Header
          key={index}
          propertyKey={column.propertyKey}
          label={column.label}
          columnType={column.type}
          contentType={column.contentType}
          isSelector={column.contentType === ErpTableContentType.Selector}
          sortConfig={sortConfig}
          onSort={(propertyKey, contentType) => handleOnSort(propertyKey, contentType, index)}
        />
      ))}
    </div>
  )

  const virtualizedContent = (
    <Virtuoso
      totalCount={entitiesCount + 1}
      topItemCount={1}
      itemContent={index => {
        if (index === 0) {
          return header
        } else {
          const {index: fixedIndex, entity, entityId} = sortedRows[index - 1]
          return <Row index={fixedIndex} entityId={entityId} entity={entity} onDoubleClick={onRowDoubleClicked} />
        }
      }}
    />
  )

  const normalContent = (
    <div css={styles.normalContentWrapper}>
      <div css={styles.normalContentHeader}>{header}</div>
      {sortedRows.map((row, index) => (
        <Row
          key={row.entityId}
          index={index}
          onDoubleClick={onRowDoubleClicked}
          entityId={row.entityId}
          entity={row.entity}
        />
      ))}
    </div>
  )

  const content = entitiesCount < virtualizationThreshold ? normalContent : virtualizedContent

  return isTableEmpty ? (
    <TablePlaceholder title={t("erp__no_data")} subTitle={t("erp__no_data_create_or_import")} />
  ) : (
    <ErpContext.Provider
      value={{
        entitiesCount,
        columns: columnsInternal,
        onSortTable,
        selectedCellId,
        selectedEntityIds,
        selectCell,
        selectEntity,
        deselectEntity,
        selectAllEntities,
        deselectAllEntities
      }}>
      {content}
    </ErpContext.Provider>
  )
}

const styles: Record<string, CSSInterpolation> = {
  header: {
    display: "flex"
  },
  normalContentWrapper: {
    height: "100%",
    overflow: "auto"
  },
  normalContentHeader: {
    position: "sticky",
    top: 0,
    zIndex: zIndex1
  }
}
