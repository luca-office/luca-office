import React, {useContext} from "react"
import {ErpContext, ErpTableContentType, ErpTableEntity} from "./erp-table"
import {CellMemoized} from "./erp-table-cell"

export interface ErpTableRowData {
  readonly entityId: number
  readonly entity: ErpTableEntity
  readonly index: number
}

export interface ErpTableCellData {
  readonly id: string
  readonly rowIndex: number
  readonly entityId: number
  readonly value: string | number | null
  readonly contentType: ErpTableContentType
  readonly columnName: string
  readonly columnIndex: number
}

export interface ErpTableRowProps extends ErpTableRowData {
  readonly onDoubleClick?: (entityId: number, rowIndex: number) => void
}

export const Row = ({entityId, index, entity, onDoubleClick}: ErpTableRowProps) => {
  const {columns, selectedCellId, selectCell} = useContext(ErpContext)

  const cells = columns.map((column, colIndex) => {
    const isSelector = column.contentType === ErpTableContentType.Selector

    const cellData: ErpTableCellData = {
      id: `${entityId}-${column.propertyKey ?? "_selector"}`,
      rowIndex: index,
      entityId: entityId,
      value: column.propertyKey ? entity[column.propertyKey] : "_selector",
      contentType: column.contentType,
      columnIndex: colIndex,
      columnName: column.label
    }

    return (
      <CellMemoized
        key={cellData.id}
        {...cellData}
        isSelected={cellData.id === selectedCellId}
        columnType={column.type}
        onClick={!isSelector ? () => selectCell?.({index, entityId, entity})(cellData) : undefined}
      />
    )
  })

  return (
    <div key={entityId} css={styles.row} onDoubleClick={() => onDoubleClick?.(entityId, index)}>
      {cells}
    </div>
  )
}

const styles = {
  row: {
    display: "flex"
  }
}
