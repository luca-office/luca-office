import {Sorting} from "../../../enums"
import {
  DeliveryStatus,
  EmploymentMode,
  FamilyStatus,
  PaymentStatus,
  Salutation
} from "../../../graphql/generated/globalTypes"
import {backgroundColorBright, foreignKeyColor, primaryKeyColor} from "../../../styles"
import {LucaTFunction} from "../../../translations"
import {convertCentsToEuro, formatDate, parseDateString} from "../../../utils"
import {
  getDeliveryStatusLabel,
  getEmploymentModeLabel,
  getFamilyStatusLabel,
  getPaymentStatusLabel,
  getSalutationLabel
} from "../utils"
import {ErpTableColumnType, ErpTableContentType} from "./erp-table"
import {ErpTableSortConfig} from "./erp-table-header"
import {ErpTableRowProps} from "./erp-table-row"

export const backgroundColorByColumnType = (type: ErpTableColumnType) => {
  switch (type) {
    case ErpTableColumnType.PrimaryKey:
      return primaryKeyColor
    case ErpTableColumnType.ForeignKey:
      return foreignKeyColor
    case ErpTableColumnType.Default:
    case ErpTableColumnType.Selector:
    default:
      return backgroundColorBright
  }
}

export const nextSortDirection = (currentSorting: Sorting) =>
  currentSorting === Sorting.None
    ? Sorting.Ascending
    : currentSorting === Sorting.Ascending
    ? Sorting.Descending
    : Sorting.None

type SortRowProps = Omit<ErpTableRowProps, "index" | "vStyle">

export const compareFnBySortConfig = (sortConfig: ErpTableSortConfig) => {
  switch (sortConfig.contentType) {
    case ErpTableContentType.Number:
    case ErpTableContentType.Currency:
      return (a: SortRowProps, b: SortRowProps) =>
        sortConfig.sorting === Sorting.Ascending
          ? ((a.entity[sortConfig.propertyKey] as unknown) as number) -
            ((b.entity[sortConfig.propertyKey] as unknown) as number)
          : ((b.entity[sortConfig.propertyKey] as unknown) as number) -
            ((a.entity[sortConfig.propertyKey] as unknown) as number)
    case ErpTableContentType.Date:
      return (a: SortRowProps, b: SortRowProps) =>
        sortConfig.sorting === Sorting.Ascending
          ? new Date(((a.entity[sortConfig.propertyKey] ?? "") as unknown) as string).getTime() -
            new Date(((b.entity[sortConfig.propertyKey] ?? "") as unknown) as string).getTime()
          : new Date(((b.entity[sortConfig.propertyKey] ?? "") as unknown) as string).getTime() -
            new Date(((a.entity[sortConfig.propertyKey] ?? "") as unknown) as string).getTime()
    case ErpTableContentType.TextArray:
      return (a: SortRowProps, b: SortRowProps) =>
        sortConfig.sorting === Sorting.Ascending
          ? (((a.entity[sortConfig.propertyKey] ?? []) as unknown) as Array<string>)
              .join(",")
              .localeCompare((((b.entity[sortConfig.propertyKey] ?? []) as unknown) as Array<string>).join(","))
          : (((b.entity[sortConfig.propertyKey] ?? []) as unknown) as Array<string>)
              .join(",")
              .localeCompare((((a.entity[sortConfig.propertyKey] ?? []) as unknown) as Array<string>).join(","))
    case ErpTableContentType.Text:
    case ErpTableContentType.BinaryFile:
    default:
      return (a: SortRowProps, b: SortRowProps) => {
        return sortConfig.sorting === Sorting.Ascending
          ? (((a.entity[sortConfig.propertyKey] ?? "") as unknown) as string).localeCompare(
              ((b.entity[sortConfig.propertyKey] ?? "") as unknown) as string
            )
          : (((b.entity[sortConfig.propertyKey] ?? "") as unknown) as string).localeCompare(
              ((a.entity[sortConfig.propertyKey] ?? "") as unknown) as string
            )
      }
  }
}

export const formatCellValue = (
  contentType: ErpTableContentType,
  value: string | Array<string> | number | null,
  t: LucaTFunction
) => {
  switch (contentType) {
    case ErpTableContentType.BinaryFile:
      return value ? t("erp__table_attachment_available") : t("erp__table_attachment_not_available")
    case ErpTableContentType.Currency: {
      if (value === null) {
        return ""
      } else {
        const numberValue = Number(value)
        return `${numberValue > 0 ? convertCentsToEuro(numberValue) : numberValue} €`
      }
    }
    case ErpTableContentType.Date:
      return value ? formatDate(parseDateString(String(value))) : ""
    case ErpTableContentType.Salutation:
      return value ? getSalutationLabel(t, value as Salutation) : ""
    case ErpTableContentType.EmploymentMode:
      return value ? getEmploymentModeLabel(t, value as EmploymentMode) : ""
    case ErpTableContentType.FamilyStatus:
      return value ? getFamilyStatusLabel(t, value as FamilyStatus) : ""
    case ErpTableContentType.PaymentStatus:
      return value ? getPaymentStatusLabel(t, value as PaymentStatus) : ""
    case ErpTableContentType.DeliveryStatus:
      return value ? getDeliveryStatusLabel(t, value as DeliveryStatus) : ""
    case ErpTableContentType.TextArray:
      return value ? (value as Array<string>).join(", ") : ""
    case ErpTableContentType.Text:
    case ErpTableContentType.Number:
    default:
      return `${value ?? ""}`
  }
}
