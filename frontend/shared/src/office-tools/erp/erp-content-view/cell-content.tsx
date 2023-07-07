import {css} from "@emotion/react"
import React from "react"
import {TextInput} from "../../../components"
import {InputType} from "../../../enums"
import {
  DeliveryStatus,
  EmploymentMode,
  FamilyStatus,
  PaymentStatus,
  Salutation
} from "../../../graphql/generated/globalTypes"
import {borderRadius, CustomStyle, headerBoxShadow, spacingCard} from "../../../styles"
import {LucaTFunction, useLucaTranslation} from "../../../translations"
import {convertCentsToEuro, formatDate, parseDateString} from "../../../utils"
import {ErpTableCellData, ErpTableContentType} from "../erp-table"
import {
  getDeliveryStatusLabel,
  getEmploymentModeLabel,
  getFamilyStatusLabel,
  getPaymentStatusLabel,
  getSalutationLabel
} from "../utils"

export interface CellContentProps extends CustomStyle {
  readonly cellData: ErpTableCellData | undefined
  readonly onCopyToClipboard?: (cellData: ErpTableCellData) => void
}

export const CellContent: React.FC<CellContentProps> = ({cellData, onCopyToClipboard, customStyles}) => {
  const {t} = useLucaTranslation()

  return (
    <TextInput
      customStyles={[styles.textInput, customStyles]}
      customInputContainerStyles={styles.inputContainer}
      customInputStyles={styles.input}
      type={InputType.text}
      value={cellData ? formatCellContent(cellData, t) : ""}
      showCopyToClipboard={true}
      onCopyToClipboard={() => cellData && onCopyToClipboard?.(cellData)}
      isClearable={false}
      readOnly={true}
      placeholder={t("erp__no_cell_selected")}
    />
  )
}

const formatCellContent = (data: ErpTableCellData, t: LucaTFunction) => {
  if (data.value === null && data.contentType !== ErpTableContentType.BinaryFile) {
    return ""
  }

  switch (data.contentType) {
    case ErpTableContentType.BinaryFile:
      return !data.value ? t("erp__table_attachment_not_available") : t("erp__table_attachment_available")
    case ErpTableContentType.Salutation:
      return getSalutationLabel(t, data.value as Salutation)
    case ErpTableContentType.EmploymentMode:
      return getEmploymentModeLabel(t, data.value as EmploymentMode)
    case ErpTableContentType.FamilyStatus:
      return getFamilyStatusLabel(t, data.value as FamilyStatus)
    case ErpTableContentType.PaymentStatus:
      return getPaymentStatusLabel(t, data.value as PaymentStatus)
    case ErpTableContentType.DeliveryStatus:
      return getDeliveryStatusLabel(t, data.value as DeliveryStatus)
    case ErpTableContentType.Date:
      return formatDate(parseDateString(data.value as string))
    case ErpTableContentType.Currency:
      return `${convertCentsToEuro(data.value as number)} €`
    default:
      return data.value ?? ""
  }
}

const styles = {
  textInput: css({
    borderRadius: borderRadius
  }),
  inputContainer: css({
    boxShadow: headerBoxShadow,
    border: "none",
    marginRight: 0
  }),
  input: css({
    paddingLeft: spacingCard
  })
}
