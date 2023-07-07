import {CSSInterpolation} from "@emotion/serialize"
import * as React from "react"
import {IconName} from "../../enums"
import {CustomStyle} from "../../styles"
import {Option} from "../../utils"
import {CardFooter} from "../card"
import {Checkbox} from "../checkbox/checkbox"
import {ContentLoadingIndicator} from "../content-loading-indicator/content-loading-indicator"
import {RadioButton} from "../radio-button/radio-button"
import {SortButton} from "../sort-button/sort-button"
import {SortInfo} from "./sort-utils"
import {tableStyles as styles} from "./table.style"
import {EntityKey, TableContainerProps} from "./table-container"

export type TableSelectionStyle = "check" | "radio" | "radio-check"

export type SelectableTable =
  | {readonly isSelectable?: boolean; readonly selection?: never}
  | {readonly isSelectable: boolean; readonly selection?: TableSelectionProps}

export interface TableProps<T> extends Omit<TableContainerProps<T>, "entities"> {
  readonly onSortIconClicked: (columnKey: keyof T) => void
  readonly sortInfo: Option<SortInfo<T>>
  readonly sortedEntities: T[]
}

export type SelectableTableProps<T> = TableProps<T> & SelectableTable

export interface TableSelectionProps {
  readonly selectedEntityKeys: EntityKey[]
  readonly selectAll: () => void
  readonly unselectAll: () => void
  readonly changeSelection: (isSelected: boolean, key: EntityKey) => void
  readonly selectionStyle?: TableSelectionStyle
}

export interface ColumnSortConfig<T> {
  readonly customSort?: (a: T) => void
  readonly isSortable: boolean
  readonly toolTipText?: string
  readonly key: keyof T
}

export interface ColumnProps<T> extends CustomStyle {
  readonly key: string | number
  readonly header: React.ReactNode | string
  readonly content: (entity: T, index?: number) => React.ReactNode | string
  readonly customHeaderStyles?: CSSInterpolation
  readonly sortConfig?: ColumnSortConfig<T>
}

const getSelectionControl = (
  style: TableSelectionStyle,
  isSelected: boolean,
  onChange: (isSelected: boolean) => void,
  headerControl?: boolean
) => {
  if (style === "check") {
    return (
      <Checkbox
        customStyles={styles.rowSelectButton}
        checked={isSelected}
        onChange={event => onChange(event.target.checked)}
      />
    )
  } else if (style === "radio") {
    return (
      <RadioButton
        customStyles={styles.rowSelectButton}
        selected={isSelected}
        onChange={selected => onChange(selected)}
      />
    )
  } else if (style === "radio-check") {
    return (
      <RadioButton
        withSelectedIcon={headerControl ? IconName.Minimize : IconName.Check}
        customStyles={styles.rowSelectButton}
        selected={isSelected}
        onChange={selected => onChange(selected)}
      />
    )
  } else {
    console.warn("no control defined for selected style")
    return null
  }
}

export const Table = <T,>({
  columns,
  customStyles,
  entityKey,
  hideHeader,
  isEntitySelected,
  calculateCustomCellStyle,
  onClick,
  onDoubleClick,
  placeHolderText,
  customPlaceholder,
  customPlaceholderStyles,
  customRowStyles,
  customBodyRowStyles,
  customEntityWrapperStyles,
  customHeaderRowStyles,
  renderRowFooter,
  isBundled = false,
  showFooter,
  tableFooter,
  customTableFooterStyles,
  onSortIconClicked,
  sortInfo,
  sortedEntities,
  isSelectable = false,
  selection,
  showLoadingIndicator = false
}: SelectableTableProps<T>) => {
  const sectionStyle = selection?.selectionStyle ?? "check"
  return (
    <React.Fragment>
      <div css={[styles.container, customStyles, isBundled && styles.bundled]}>
        {!hideHeader && (
          <div css={[styles.headerRow, customHeaderRowStyles]}>
            {isSelectable &&
              selection &&
              getSelectionControl(
                sectionStyle,
                sectionStyle === "radio-check"
                  ? selection?.selectedEntityKeys.length > 0
                  : selection?.selectedEntityKeys.length === sortedEntities.length,
                isSelected => (isSelected ? selection?.selectAll() : selection?.unselectAll()),
                true
              )}
            {columns.map(column =>
              column.header ? (
                <div
                  key={column.key}
                  css={[
                    styles.headerCell(!!column.sortConfig?.isSortable),
                    column.customStyles,
                    column.customHeaderStyles
                  ]}>
                  {column.header}
                  {column.sortConfig?.isSortable && (
                    <SortButton
                      customStyles={styles.sortButton}
                      toolTipText={column.sortConfig.toolTipText}
                      tableSortState={sortInfo
                        .filter(info => info.columnKey === column.sortConfig?.key)
                        .map(i => i.sortState)}
                      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                      onClick={() => onSortIconClicked(column.sortConfig!.key)}
                    />
                  )}
                </div>
              ) : null
            )}
          </div>
        )}
        <div css={[styles.entityWrapper, customEntityWrapperStyles]}>
          {showLoadingIndicator ? (
            <ContentLoadingIndicator />
          ) : sortedEntities.length ? (
            sortedEntities.map((entity, index) => {
              const key = entityKey(entity)
              const isSelected = selection?.selectedEntityKeys.includes(key) ?? false
              const onChange = (key: EntityKey) => (isSelected: boolean) => selection?.changeSelection(isSelected, key)

              return (
                <div key={key} css={[styles.bodyRow(isSelectable, isSelected), customBodyRowStyles]}>
                  {isSelectable && selection && getSelectionControl(sectionStyle, isSelected, onChange(key))}
                  <div
                    css={[
                      styles.rowContent(isSelectable),
                      isEntitySelected ? isEntitySelected(entity) && styles.selectedRowContent : undefined,
                      customRowStyles ? customRowStyles(entity) : undefined,
                      onClick || onDoubleClick ? styles.rowClickable : undefined
                    ]}
                    onClick={() => onClick?.(entity)}
                    onDoubleClick={onDoubleClick ? () => onDoubleClick(entity) : undefined}
                    className={"entity-row"}>
                    {columns.map(column => {
                      const customStyle = calculateCustomCellStyle?.(entity, column.key)

                      return (
                        <div key={column.key} css={[styles.bodyCell, column.customStyles, customStyle]}>
                          {column.content(entity, index)}
                        </div>
                      )
                    })}
                  </div>
                  {renderRowFooter && <div css={styles.rowActions}>{renderRowFooter(entity)}</div>}
                </div>
              )
            })
          ) : (
            <div css={[styles.placeholder, customPlaceholderStyles]} className={"table-placeholder"}>
              {customPlaceholder ?? placeHolderText}
            </div>
          )}
        </div>
      </div>
      {showFooter && <CardFooter customStyles={[styles.footer, customTableFooterStyles]}>{tableFooter}</CardFooter>}
    </React.Fragment>
  )
}
