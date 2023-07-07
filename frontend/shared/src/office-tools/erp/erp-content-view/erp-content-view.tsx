import {css} from "@emotion/react"
import * as React from "react"
import {Button, Checkbox, LoadingIndicator} from "../../../components"
import {IconName, Sorting} from "../../../enums"
import {ErpEntity} from "../../../models"
import {
  backgroundColorLight,
  boxHeightLarge,
  boxSizeLarge,
  CustomStyle,
  Flex,
  flex1,
  headerBoxShadow,
  spacing,
  spacingMedium,
  zIndex3
} from "../../../styles"
import {useLucaTranslation} from "../../../translations"
import {Option} from "../../../utils"
import {ErpCard} from "../erp-card/erp-card"
import {ErpTable, ErpTableCellData, ErpTableColumn, ErpTableRowData} from "../erp-table"
import {CellContent} from "./cell-content"
import {useErpContentView} from "./hooks/use-erp-content-view"
import {TablePlaceholder} from "./table-placeholder"

export interface ErpContentViewProps extends CustomStyle {
  readonly entities: Option<ErpEntity[]>
  readonly isLoadingEntities: boolean
  readonly columns: Option<ErpTableColumn[]>
  readonly label: string
  readonly onEntityDoubleClicked: (entity: ErpEntity, rowIndex: number) => void
  readonly onAddEntityClicked: () => void
  readonly isReadonly?: boolean
  readonly addButtonDisabled?: boolean
  readonly onChangeRowSelectionState?: (rowId: number, rowIndex: number, isSelected: boolean) => void
  readonly onChangeAllRowsSelectionState?: (rowsCount: number, isSelected: boolean) => void
  readonly onSortTable?: (columnName: string, columnIndex: number, sorting: Sorting) => void
  readonly onSelectCell?: (
    entityId: number,
    rowIndex: number,
    columnName: string,
    columnIndex: number,
    value: string
  ) => void
  readonly onCopyToClipboard?: (cellData: ErpTableCellData) => void
  readonly onSearchTable?: (query: string, resultsCount: number) => void
  readonly selectedEntityId: Option<number>
  readonly onSelectedFilterActiveChange?: (selectedRowsCount: number, isSelectedFilterActive: boolean) => void
}

export const ErpContentView = ({
  customStyles,
  entities: entitiesOption,
  isLoadingEntities,
  columns: columnsOption,
  label,
  onEntityDoubleClicked,
  onAddEntityClicked,
  isReadonly = false,
  addButtonDisabled = false,
  onChangeAllRowsSelectionState,
  onChangeRowSelectionState,
  onSortTable,
  onSelectCell,
  onCopyToClipboard,
  onSearchTable,
  selectedEntityId,
  onSelectedFilterActiveChange
}: ErpContentViewProps) => {
  const {t} = useLucaTranslation()
  const {
    visibleRows,
    onSearch,
    setCellData: setCellContent,
    cellData,
    selectedEntity,
    setSelectedEntity,
    isSelectedFilterActive,
    setIsSelectedFilterActive,
    updateSelectedEntityIds,
    searchQuery,
    selectedRowsCount
  } = useErpContentView(
    entitiesOption,
    columnsOption,
    onSearchTable,
    selectedEntityId.map(id => id.toString()).orUndefined()
  )

  const onCellSelected = (row: ErpTableRowData, data: ErpTableCellData) => {
    setCellContent(data)
    setSelectedEntity(data.entityId)

    onSelectCell?.(row.entityId, row.index, data.columnName, data.columnIndex, `${data.value}`)
  }

  const onRowDoubleClicked = () => {
    selectedEntity.forEach(entity => cellData && onEntityDoubleClicked(entity, cellData.rowIndex))
  }

  const handleSelectedFilterActiveChange = () => {
    onSelectedFilterActiveChange?.(selectedRowsCount, !isSelectedFilterActive)
    setIsSelectedFilterActive(!isSelectedFilterActive)
  }

  return (
    <div css={[styles.erpContentView, customStyles]}>
      <ErpCard
        title={label}
        onChangeSearch={onSearch}
        searchQuery={searchQuery}
        footerContent={
          !isReadonly ? (
            <Button
              icon={IconName.Add}
              customStyles={styles.addButton}
              onClick={onAddEntityClicked}
              disabled={addButtonDisabled}>
              {t("erp__cell_add_button")}
            </Button>
          ) : null
        }>
        {isLoadingEntities ? (
          <div css={styles.loadingIndicator}>
            <LoadingIndicator />
          </div>
        ) : (
          <>
            <div css={styles.cellContentHeader}>
              <Checkbox
                customStyles={styles.showSelectedCheckbox}
                checked={isSelectedFilterActive}
                onChange={handleSelectedFilterActiveChange}
                label={t("erp__show_selected_only")}
              />
              <div css={styles.rightHeaderSlot}>
                <CellContent
                  customStyles={styles.cellContent}
                  cellData={cellData}
                  onCopyToClipboard={onCopyToClipboard}
                />
                <Button
                  customStyles={styles.openButton}
                  icon={isReadonly ? IconName.DataSet : IconName.EditBordered}
                  disabled={selectedEntity.isEmpty()}
                  onClick={onRowDoubleClicked}>
                  {isReadonly ? t("erp_dataset__open") : t("erp_dataset__edit")}
                </Button>
              </div>
            </div>
            <div css={styles.tableContainer}>
              {visibleRows
                .flatMap(rows =>
                  columnsOption.map(columns => (
                    <ErpTable
                      rows={rows}
                      columns={columns}
                      onRowDoubleClicked={onRowDoubleClicked}
                      onCellSelected={onCellSelected}
                      onSortTable={onSortTable}
                      onChangeAllRowsSelectionState={onChangeAllRowsSelectionState}
                      onChangeRowSelectionState={onChangeRowSelectionState}
                      onChangeSelectedEntities={updateSelectedEntityIds}
                    />
                  ))
                )
                .getOrElse(
                  isReadonly ? (
                    <TablePlaceholder icon={IconName.LockClosed} subTitle={t("erp__table_locked")} />
                  ) : (
                    <TablePlaceholder subTitle={t("erp__table_placeholder")} />
                  )
                )}
            </div>
          </>
        )}
      </ErpCard>
    </div>
  )
}

const Size = {
  addButton: 216,
  openButton: 220
}

const styles = {
  erpContentView: css(Flex.column, {
    alignItems: "stretch",
    overflow: "hidden"
  }),
  tableContainer: css({
    flex: "0 0 auto",
    height: `calc(100% - ${boxSizeLarge}px)`
  }),
  addButton: css({
    width: Size.addButton
  }),
  loadingIndicator: css(Flex.row, {
    justifyContent: "center",
    alignItems: "center",
    padding: spacingMedium,
    height: "100%"
  }),
  cellContentHeader: css({
    flex: "0 0 auto",
    position: "relative",
    zIndex: zIndex3,
    display: "grid",
    gridTemplateColumns: "4fr 3fr",
    gridColumnGap: spacingMedium,
    alignItems: "center",
    height: boxHeightLarge,
    backgroundColor: backgroundColorLight,
    boxShadow: headerBoxShadow,
    padding: spacing(0, spacingMedium)
  }),
  openButton: css({
    whiteSpace: "nowrap",
    width: Size.openButton
  }),
  rightHeaderSlot: css(Flex.row, {
    justifyContent: "space-between"
  }),
  cellContent: css({
    flex: flex1,
    marginRight: spacingMedium
  }),
  showSelectedCheckbox: css({
    justifySelf: "start"
  })
}
