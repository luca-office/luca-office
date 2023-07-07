import {CSSInterpolation} from "@emotion/serialize"
import React from "react"
import {Icon, Text, Tooltip} from "../../../components"
import {IconName, Sorting} from "../../../enums"
import {
  backgroundColorDarker,
  border,
  FontWeight,
  foreignKeyIconColor,
  headerBoxShadow,
  primaryKeyIconColor,
  spacing,
  spacingMedium,
  spacingSmall,
  spacingTiny,
  TextSize
} from "../../../styles"
import {useLucaTranslation} from "../../../translations"
import {columnWidth, selectorColumnWidth} from "./constants"
import {ErpTableColumnType, ErpTableContentType, ErpTableEntity} from "./erp-table"
import {RowSelector} from "./erp-table-row-selector"
import {backgroundColorByColumnType} from "./utils"

interface ErpTableHeaderProps<T extends ErpTableEntity> {
  readonly label: string
  readonly columnType: ErpTableColumnType
  readonly contentType: ErpTableContentType
  readonly isSelector: boolean
  readonly propertyKey?: keyof T
  readonly sortConfig: ErpTableSortConfig | null
  readonly onSort: (propertyKey: string, contentType: ErpTableContentType) => void
}
export interface ErpTableSortConfig {
  readonly propertyKey: string
  readonly contentType: ErpTableContentType
  readonly sorting: Sorting
}

export const Header = <T extends ErpTableEntity>({
  columnType,
  label,
  propertyKey,
  contentType,
  isSelector,
  sortConfig,
  onSort
}: ErpTableHeaderProps<T>) => {
  const {t} = useLucaTranslation()
  const css = [headerStyle(columnType), isSelector ? styles.selector : undefined]

  const sortIcon =
    sortConfig?.propertyKey === propertyKey
      ? sortConfig?.sorting === Sorting.Ascending
        ? IconName.TriangleUp
        : sortConfig?.sorting === Sorting.Descending
        ? IconName.TriangleDown
        : IconName.TriangleRight
      : IconName.TriangleRight

  const keyIcon =
    columnType === ErpTableColumnType.PrimaryKey ? (
      <Tooltip
        title={t("erp__table_primary_key")}
        icon={IconName.Key}
        iconColor={primaryKeyIconColor}
        withPortal={true}
        text={t("erp__table_primary_key_tooltip_text")}>
        <Icon color={primaryKeyIconColor} name={IconName.KeyFilled} />
      </Tooltip>
    ) : columnType === ErpTableColumnType.ForeignKey ? (
      <Tooltip
        title={t("erp__table_foreign_key")}
        icon={IconName.Key}
        withPortal={true}
        iconColor={foreignKeyIconColor}
        text={t("erp__table_foreign_key_tooltip_text")}>
        <Icon color={foreignKeyIconColor} name={IconName.KeyFilled} />
      </Tooltip>
    ) : null

  const sortRows = () => propertyKey !== undefined && onSort(propertyKey as string, contentType)

  return (
    <div css={css}>
      {contentType === ErpTableContentType.Selector ? (
        <RowSelector rowIndex={-1} entityId={-1} isSelectAllSelector={true} />
      ) : (
        <>
          {keyIcon}
          <Text customStyles={styles.label} size={TextSize.Medium} title={isSelector ? undefined : label}>
            {label}
          </Text>
          <Icon customStyles={styles.sortIcon} name={sortIcon} onClick={sortRows} />
        </>
      )}
    </div>
  )
}

const headerStyle = (columnType: ErpTableColumnType): CSSInterpolation => ({
  flex: "0 0 auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: columnWidth,
  padding: spacing(spacingTiny, spacingSmall),
  boxSizing: "border-box",
  border: border(1, backgroundColorDarker, "solid"),
  borderTop: 0,
  backgroundColor: backgroundColorByColumnType(columnType),
  boxShadow: headerBoxShadow
})

const styles: Record<string, CSSInterpolation> = {
  selector: {
    width: selectorColumnWidth
  },
  keyIcon: {
    flex: "0 0 auto"
  },
  label: {
    flex: "0 1 auto",
    margin: spacing(0, spacingMedium),
    fontWeight: FontWeight.Bold,
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis"
  },
  sortIcon: {
    flex: "0 0 auto",
    cursor: "pointer"
  }
}
