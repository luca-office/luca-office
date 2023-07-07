import {orderBy} from "lodash-es"
import {Option} from "../../utils"
import {ColumnProps} from "./table"

export enum TableSortState {
  ASCENDING = "asc",
  DESCENDING = "desc"
}

export interface SortInfo<T> {
  readonly columnKey: keyof T
  readonly sortState: TableSortState
}

export const sortTableEntities = <TEntity>(
  sortInfoOption: Option<SortInfo<TEntity>>,
  entities: TEntity[],
  columns: ColumnProps<TEntity>[]
): TEntity[] => {
  const findCustomSortFunctionForColumn = (sortInfo: SortInfo<TEntity>) => {
    const column = columns.find(
      column => column.sortConfig?.customSort !== undefined && column.sortConfig?.key === sortInfo.columnKey
    )

    return column?.sortConfig?.customSort
  }

  return sortInfoOption
    .map(sortInfo => {
      const iterateeToSortBy = findCustomSortFunctionForColumn(sortInfo) ?? sortInfo.columnKey
      const sortOrders = sortStateToSortOrder(sortInfo.sortState)

      return orderBy<TEntity>(entities, [iterateeToSortBy], [sortOrders])
    })
    .getOrElse(entities)
}

const sortStateToSortOrder = (sortState: TableSortState) => {
  switch (sortState) {
    case TableSortState.ASCENDING:
      return "asc"
    case TableSortState.DESCENDING:
      return "desc"
    default:
      return false
  }
}
