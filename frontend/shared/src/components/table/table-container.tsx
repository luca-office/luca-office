import {CSSInterpolation} from "@emotion/serialize"
import React, {useState} from "react"
import {CustomStyle} from "../../styles"
import {Option} from "../../utils/option"
import {ErrorBoundary} from "../error-boundary/error-boundary"
import {SortInfo, sortTableEntities, TableSortState} from "./sort-utils"
import {ColumnProps, Table, TableSelectionStyle} from "./table"

export type EntityKey = string | number

export interface TableContainerProps<T> extends CustomStyle {
  readonly entities: T[]
  readonly columns: ColumnProps<T>[]
  readonly entityKey: (entity: T) => EntityKey
  readonly isEntitySelected?: (entity: T) => boolean
  readonly calculateCustomCellStyle?: (entity: T, key: EntityKey) => CSSInterpolation
  readonly onClick?: (entity: T) => void
  readonly onDoubleClick?: (entity: T) => void
  readonly placeHolderText?: string
  readonly customPlaceholder?: JSX.Element
  readonly customPlaceholderStyles?: CSSInterpolation
  readonly isBundled?: boolean
  readonly hideHeader?: boolean
  readonly customRowStyles?: (entity: T) => CSSInterpolation
  readonly customBodyRowStyles?: CSSInterpolation
  readonly customEntityWrapperStyles?: CSSInterpolation
  readonly customHeaderRowStyles?: CSSInterpolation
  readonly renderRowFooter?: (entity: T) => React.ReactNode
  readonly showFooter?: boolean
  readonly tableFooter?: React.ReactNode
  readonly customTableFooterStyles?: CSSInterpolation
  readonly showLoadingIndicator?: boolean
}

type TableSelectionProps =
  | {readonly isSelectionEnabled?: false; readonly onSelectionChange?: never; readonly selectionStyle?: never}
  | {
      readonly isSelectionEnabled: true
      readonly selectionStyle?: TableSelectionStyle
      readonly onSelectionChange: (entityIds: EntityKey[]) => void
    }

export const TableContainer = <T,>({
  entities,
  columns,
  isSelectionEnabled,
  onSelectionChange,
  selectionStyle,
  ...props
}: TableContainerProps<T> & TableSelectionProps) => {
  const [sortInfo, setSortInfo] = useState<Option<SortInfo<T>>>(Option.none())
  const [selections, setSelections] = useState<EntityKey[]>([])

  const sortedEntities = React.useMemo(
    () => sortTableEntities(sortInfo, entities, columns),
    [sortInfo.orUndefined(), entities, columns]
  )

  React.useEffect(() => {
    onSelectionChange?.(selections)
  }, [selections])

  const handleSortIconClick = (columnKey: keyof T) => {
    const isNewColumn = sortInfo.exists(info => info.columnKey !== columnKey)

    if (sortInfo.exists(info => info.sortState === TableSortState.DESCENDING && !isNewColumn)) {
      return setSortInfo(Option.none())
    }

    const newSortState = isNewColumn
      ? TableSortState.ASCENDING
      : sortInfo.exists(info => info.sortState === TableSortState.ASCENDING)
      ? TableSortState.DESCENDING
      : TableSortState.ASCENDING

    return setSortInfo(Option.of({columnKey, sortState: newSortState}))
  }

  const selectAll = () => setSelections(sortedEntities.map(entity => props.entityKey(entity)))

  const unselectAll = () => setSelections([])

  const changeSelection = (selected: boolean, key: EntityKey) => {
    setSelections(prevSelections => (selected ? [...prevSelections, key] : prevSelections.filter(k => k !== key)))
  }

  return (
    <ErrorBoundary>
      <Table
        {...props}
        sortInfo={sortInfo}
        sortedEntities={sortedEntities}
        columns={columns}
        onSortIconClicked={handleSortIconClick}
        isSelectable={isSelectionEnabled === true}
        selection={{
          selectAll,
          unselectAll,
          changeSelection,
          selectionStyle,
          selectedEntityKeys: selections
        }}
      />
    </ErrorBoundary>
  )
}
