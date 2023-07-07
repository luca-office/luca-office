import {isEqual} from "lodash-es"
import debounce from "lodash-es/debounce"
import * as React from "react"
import {ErpEntity} from "../../../../models"
import {useLucaTranslation} from "../../../../translations"
import {Option} from "../../../../utils"
import {ErpTableCellData, ErpTableColumn, ErpTableRowData} from "../../erp-table"
import {formatCellValue} from "../../erp-table/utils"
import {erpEntityToTableRow} from "./utils"

export interface UseErpContentView<T> {
  readonly visibleRows: Option<Array<ErpTableRowData>>
  readonly onSearch: (query: string) => void
  readonly cellData: ErpTableCellData | undefined
  readonly setCellData: (data: ErpTableCellData) => void
  readonly selectedEntity: Option<T>
  readonly setSelectedEntity: (entityId: number) => void
  readonly isSelectedFilterActive: boolean
  readonly setIsSelectedFilterActive: (isActive: boolean) => void
  readonly updateSelectedEntityIds: (ids: Record<string, boolean>) => void
  readonly searchQuery?: string
  readonly selectedRowsCount: number
}

export const useErpContentView = <T extends ErpEntity>(
  entitiesOption: Option<Array<T>>,
  columnsOption: Option<Array<ErpTableColumn>>,
  onSearchTable?: (query: string, resultsCount: number) => void,
  defaultSearchQuery?: string
): UseErpContentView<T> => {
  const {t} = useLucaTranslation()

  const entitiesRef = React.useRef<T[]>([])

  const [query, setQuery] = React.useState<string>(defaultSearchQuery ?? "")
  const [cellData, setCellData] = React.useState<ErpTableCellData>()
  const [selectedEntity, setSelectedEntity] = React.useState<Option<T>>(Option.none())
  const [isSelectedFilterActive, setIsSelectedFilterActive] = React.useState(false)
  const [selectedEntityIds, updateSelectedEntityIds] = React.useState<Record<string, boolean>>({})

  if (!isEqual(entitiesRef.current, entitiesOption.getOrElse([]))) {
    entitiesRef.current = entitiesOption.getOrElse([])
  }

  const rows = React.useMemo(() => {
    return entitiesOption.map(entities => entities.map(erpEntityToTableRow)).getOrElse([])
  }, [entitiesRef.current])
  const columns = columnsOption.getOrElse([])

  const memoizedVisibleRows = React.useMemo(() => {
    const queryableRows = isSelectedFilterActive ? rows.filter(row => selectedEntityIds[row.entityId]) : rows

    if (!query) return queryableRows

    const newRowsOption = queryableRows.filter(row =>
      columns
        .map(column => formatCellValue(column.contentType, row.entity[column.propertyKey ?? "_selector"], t))
        .some(value => value.toLowerCase().includes(query.toLowerCase()))
    )

    onSearchTable?.(query, newRowsOption.length)

    return newRowsOption
  }, [query, rows, columns, isSelectedFilterActive, selectedEntityIds])

  const selectedRowsCount = Object.keys(selectedEntityIds).filter(
    rowId => rowId !== "_selector" && selectedEntityIds[rowId]
  ).length

  const onSearch = debounce((query: string) => {
    setQuery(query.toLowerCase())
  }, 500)

  const handleSetSelectedEntity = (entityId: number) => {
    const entity = entitiesOption.flatMap(entities => Option.of(entities.find(entity => entity.id === entityId)))
    setSelectedEntity(entity)
  }

  React.useEffect(() => {
    setCellData(undefined)
    setSelectedEntity(Option.none())
  }, [entitiesRef.current])

  return {
    visibleRows: entitiesOption.map(() => memoizedVisibleRows),
    onSearch,
    cellData,
    setCellData,
    selectedEntity,
    setSelectedEntity: handleSetSelectedEntity,
    isSelectedFilterActive,
    setIsSelectedFilterActive,
    updateSelectedEntityIds,
    searchQuery: query,
    selectedRowsCount
  }
}
