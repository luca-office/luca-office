import {css} from "@emotion/react"
import * as React from "react"
import {useRef} from "react"
import {HeadingLevel, IconName} from "../../enums"
import {SpreadsheetCellType} from "../../graphql/generated/globalTypes"
import {CellIndex, CellRange, SerializedCell, Spreadsheet} from "../../models"
import {
  backgroundColorLight,
  CustomStyle,
  Flex,
  spacing,
  spacingMedium,
  spacingSmall,
  spacingTinier,
  TextSize
} from "../../styles"
import {useLucaTranslation} from "../../translations"
import {Button, Heading, Icon, indexToCellName, Text, Tooltip} from ".."
import {DhxSpreadsheet, SpreadsheetApi, SpreadsheetStyleChange} from "./dhx-spreadsheet/dhx-spreadsheet"
import {
  defaultSpreadsheetColumnsCount,
  defaultSpreadsheetRowsCount,
  getFormulaExamples,
  getSheetDimensions
} from "./dhx-spreadsheet/dhx-utils"

export interface SpreadsheetEditorProps extends CustomStyle {
  readonly spreadsheet: Spreadsheet
  readonly readonly: boolean
  readonly rowsCount?: number
  readonly columnsCount?: number
  readonly isSaveLoading?: boolean
  readonly onCellValueChange?: (rowIndex: number, columnIndex: number, value: string) => void
  readonly onCellTypeChange?: (
    rowIndex: number,
    columnIndex: number,
    cellType: SpreadsheetCellType,
    value: string
  ) => void
  readonly onCellStyleChange?: (changes: Array<SpreadsheetStyleChange>) => void
  readonly onSelectCell?: (index: CellIndex) => void
  readonly onSelectCellRange?: (range: CellRange) => void
  readonly onSaveButtonClick?: (serializedCells: SerializedCell[]) => void
  readonly renderCustomFooter?: (spreadsheet: Spreadsheet, onSelectCell: (index: CellIndex) => void) => JSX.Element
}

export const SpreadsheetEditor: React.FC<SpreadsheetEditorProps> = props => {
  const {t} = useLucaTranslation()
  const {
    columnsCount: defaultColumnsCount = defaultSpreadsheetColumnsCount,
    customStyles,
    readonly,
    rowsCount: defaultRowsCount = defaultSpreadsheetRowsCount,
    spreadsheet,
    isSaveLoading,
    onCellValueChange,
    onCellTypeChange,
    onSelectCell,
    onSelectCellRange,
    onSaveButtonClick,
    renderCustomFooter,
    onCellStyleChange
  } = props
  const spreadsheetApiRef = useRef<SpreadsheetApi | null>(null)
  const [selectedCellName, updateSelectedCellName] = React.useState("A1")
  const {rowsCount, columnsCount} = getSheetDimensions(spreadsheet.cells, defaultColumnsCount, defaultRowsCount)

  const onSelectCellHandler = (index: CellIndex) => {
    updateSelectedCellName(indexToCellName(index))
    onSelectCell?.(index)
  }

  const saveButtonFooter =
    onSaveButtonClick !== undefined ? (
      <div css={styles.footer}>
        <Button
          isLoading={isSaveLoading}
          onClick={() => {
            const serializedCells = spreadsheetApiRef.current?.serialize()
            onSaveButtonClick(serializedCells ?? [])
          }}>
          {t("spreadsheet_editor__save_button")}
        </Button>
      </div>
    ) : null

  return (
    <div css={[styles.wrapper, customStyles]}>
      <DhxSpreadsheet
        spreadsheet={spreadsheet}
        rowsCount={rowsCount}
        columnsCount={columnsCount}
        readonly={readonly}
        customStyles={styles.dhxSpreadsheet}
        onCellValueChange={onCellValueChange}
        onCellTypeChange={onCellTypeChange}
        onSelectCell={onSelectCellHandler}
        onSelectCellRange={onSelectCellRange}
        onCellStyleChange={onCellStyleChange}
        onInit={spreadsheetApi => (spreadsheetApiRef.current = spreadsheetApi)}
        t={t}
      />
      {!readonly && (
        <>
          <div css={styles.selectedCellView}>
            <Text size={TextSize.Small} key={selectedCellName}>
              {selectedCellName}
            </Text>
          </div>
          <div css={styles.tooltipView}>
            <Tooltip
              title=""
              customTooltipStyles={styles.tooltip}
              placement="left"
              renderCustomContent={() => (
                <>
                  <Heading level={HeadingLevel.h3} customStyles={styles.tooltipHeader}>
                    {t("spreadsheet_editor__error_alert_text")}
                  </Heading>
                  <div css={styles.tooltipContentExamples}>
                    {getFormulaExamples().map((example, index) => (
                      <div key={index}>{example}</div>
                    ))}
                  </div>
                </>
              )}>
              <Icon customStyles={styles.tooltipViewIcon} name={IconName.Information} />
            </Tooltip>
          </div>
        </>
      )}
      {renderCustomFooter?.(spreadsheet, onSelectCellHandler)}
      {onSaveButtonClick !== undefined ? saveButtonFooter : null}
    </div>
  )
}

const Sizes = {
  selectionIndicatorWidth: 120
}

const styles = {
  wrapper: css({
    position: "relative",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "80vh"
  }),
  dhxSpreadsheet: css({
    width: "100%",
    height: "100%",
    flex: 1,

    ".editLine_wrapper": {
      marginLeft: Sizes.selectionIndicatorWidth - 1, // -1 to clear out the border
      width: `calc(100% - ${Sizes.selectionIndicatorWidth}px)`
    },

    ".dhx_header-fixed-cols": {
      zIndex: 21 // default was 999 -> problem with our modal, this is the smallest number possible
    }
  }),
  selectedCellView: css(Flex.row, {
    position: "absolute",
    justifyContent: "center",
    top: 45,
    left: 0,
    width: 120,
    height: 32,
    background: backgroundColorLight,
    boxShadow: "inset 0px 0px 4px 0px rgba(0, 0, 0, 0.16)"
  }),
  tooltipView: css(Flex.row, {
    position: "absolute",
    justifyContent: "center",
    top: 4,
    right: 4,
    width: 32,
    height: 38
  }),
  tooltipViewIcon: css({
    width: 18,
    height: 18
  }),
  tooltip: css({
    maxWidth: 450
  }),
  tooltipHeader: css({
    color: "white",
    marginBottom: spacingTinier,
    whiteSpace: "initial"
  }),
  tooltipContentExamples: css(Flex.column, {
    flexWrap: "wrap",
    marginTop: spacingSmall,
    maxHeight: 150
  }),
  footer: css({
    display: "flex",
    justifyContent: "flex-end",
    padding: spacing(spacingSmall, spacingMedium),
    backgroundColor: backgroundColorLight
  })
}
