import {CSSInterpolation} from "@emotion/serialize"
import React from "react"
import {Text} from "../../../components"
import {
  backgroundColorDarker,
  border,
  headerBoxShadow,
  primaryColor,
  spacing,
  spacingSmall,
  spacingTiny,
  TextSize
} from "../../../styles"
import {useLucaTranslation} from "../../../translations"
import {columnWidth, selectorColumnWidth} from "./constants"
import {ErpTableColumnType, ErpTableContentType} from "./erp-table"
import {RowSelector} from "./erp-table-row-selector"
import {backgroundColorByColumnType, formatCellValue} from "./utils"

interface ErpTableCellProps {
  readonly entityId: number
  readonly rowIndex: number
  readonly contentType: ErpTableContentType
  readonly columnType: ErpTableColumnType
  readonly value: string | Array<string> | number | null
  readonly isSelected: boolean
  readonly onClick?: () => void
}

const Cell: React.FC<ErpTableCellProps> = props => {
  const {onClick, isSelected, contentType, rowIndex, value, entityId, columnType} = props
  const {t} = useLucaTranslation()
  const formattedValue = formatCellValue(contentType, value, t)
  const isSelector = contentType === ErpTableContentType.Selector
  const css = [
    cellStyles(columnType),
    isSelected ? styles.selected : undefined,
    isSelector ? styles.selector : undefined
  ]

  return (
    <div css={css} title={isSelector ? undefined : formattedValue} onClick={onClick}>
      {isSelector ? (
        <RowSelector entityId={entityId} rowIndex={rowIndex} isSelectAllSelector={false} />
      ) : (
        <Text size={TextSize.Medium} css={styles.text}>
          {formattedValue}
        </Text>
      )}
    </div>
  )
}

const cellStyles = (columnType: ErpTableColumnType): CSSInterpolation => ({
  flex: "0 0 auto",
  width: columnWidth,
  padding: spacing(spacingTiny, spacingSmall),
  boxSizing: "border-box",
  border: border(1, backgroundColorDarker),
  textAlign: "right",
  backgroundColor: backgroundColorByColumnType(columnType)
})

const styles: Record<string, CSSInterpolation> = {
  selected: {
    borderColor: primaryColor
  },
  selector: {
    width: selectorColumnWidth,
    position: "relative",
    boxShadow: headerBoxShadow
  },
  text: {
    overflow: "hidden",
    whiteSpace: "nowrap"
  }
}

const arePropsEqual = (previous: ErpTableCellProps, current: ErpTableCellProps) =>
  previous.isSelected === current.isSelected && previous.value === current.value

export const CellMemoized = React.memo(Cell, arePropsEqual)
