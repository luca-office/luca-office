import * as React from "react"
import {InputType} from "../../../../enums"
import {PaymentStatus} from "../../../../graphql/generated/globalTypes"
import {ErpInvoice} from "../../../../models"
import {ErpInputParams} from "../../../../models/erp/erp-input-params"
import {getPaymentStatusLabel} from "../common"
import {getBinaryFileIdInput, getCentInput, getDatePicker, getSelect, getTextInput} from "./common-input"

export const getErpInvoiceInput = ({
  t,
  key,
  formMethods,
  disabled,
  navigateToEntity,
  autoCompleteList,
  binaryFile,
  showPrimaryKeyPlaceholder,
  onOpenAttachment,
  onCopyToClipboard,
  sectionScrollSubject,
  isCreating,
  isFloat
}: ErpInputParams<ErpInvoice>): React.ReactNode => {
  switch (key) {
    case "id":
      return getTextInput<ErpInvoice>({
        t,
        key,
        formMethods,
        type: InputType.number,
        isPrimaryKey: true,
        disabled: true,
        navigateToEntity,
        autoCompleteList,
        showPrimaryKeyPlaceholder,
        onCopyToClipboard,
        isCreating,
        isFloat
      })
    case "totalNetInCents":
    case "totalGrossInCents":
    case "taxAmountInCents":
      return getCentInput<ErpInvoice>({
        t,
        key,
        formMethods,
        disabled,
        onCopyToClipboard,
        isFloat
      })
    case "orderId":
      return getTextInput<ErpInvoice>({
        t,
        key,
        formMethods,
        type: InputType.number,
        disabled,
        navigateToEntity,
        autoCompleteList,
        showPrimaryKeyPlaceholder,
        onCopyToClipboard,
        isCreating,
        isFloat
      })
    case "amountPaidInCents":
    case "reminderFeeInCents":
    case "defaultChargesInCents":
      return getCentInput<ErpInvoice>({
        t,
        key,
        formMethods,
        required: false,
        disabled,
        onCopyToClipboard,
        isFloat
      })
    case "paymentTerms":
      return getTextInput<ErpInvoice>({
        t,
        key,
        formMethods,
        type: InputType.text,
        disabled,
        navigateToEntity,
        autoCompleteList,
        showPrimaryKeyPlaceholder,
        onCopyToClipboard,
        isCreating,
        isFloat
      })
    case "note":
      return getTextInput<ErpInvoice>({
        t,
        key,
        formMethods,
        type: InputType.text,
        required: false,
        disabled,
        navigateToEntity,
        autoCompleteList,
        showPrimaryKeyPlaceholder,
        onCopyToClipboard,
        isCreating,
        isFloat
      })
    case "invoiceDate":
    case "dueDate":
      return getDatePicker<ErpInvoice>({key, formMethods, disabled, onCopyToClipboard, sectionScrollSubject})
    case "paymentStatus":
      return getSelect<ErpInvoice>({
        key,
        formMethods,
        options: [
          {
            value: PaymentStatus.Paid,
            label: getPaymentStatusLabel(t, PaymentStatus.Paid)
          },
          {
            value: PaymentStatus.Unpaid,
            label: getPaymentStatusLabel(t, PaymentStatus.Unpaid)
          }
        ],
        disabled,
        onCopyToClipboard
      })
    case "sampleCompanyId":
      return getTextInput<ErpInvoice>({
        t,
        key,
        formMethods,
        type: InputType.text,
        disabled: true,
        navigateToEntity,
        autoCompleteList,
        showPrimaryKeyPlaceholder,
        onCopyToClipboard,
        isCreating,
        isFloat
      })
    case "binaryFileId":
      return getBinaryFileIdInput<ErpInvoice>({
        binaryFile: binaryFile.orUndefined(),
        formMethods,
        required: false,
        disabled,
        onOpenAttachment
      })
    default:
      return null
  }
}
