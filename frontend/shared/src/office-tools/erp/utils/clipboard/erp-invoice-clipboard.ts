import {PaymentStatus} from "../../../../graphql/generated/globalTypes"
import {ErpInvoice} from "../../../../models"
import {LucaTFunction} from "../../../../translations"
import {convertCentsToEuro, formatDate, isDefined, parseDateString} from "../../../../utils"
import {getPaymentStatusLabel} from "../common"
import {getErpInvoiceLabel} from "../label/erp-invoice-label"
import {toDataString} from "./common"

export const getErpInvoiceClipboardString = (t: LucaTFunction, data: ErpInvoice): string => {
  const erpInvoiceData = Object.keys(data)
    .map(key => key as keyof ErpInvoice)
    .filter(key => !["type", "sampleCompanyId"].includes(key))
    .reduce((accumulator, key) => {
      const isCentValue =
        key === "totalNetInCents" ||
        key === "totalGrossInCents" ||
        key === "taxAmountInCents" ||
        key === "amountPaidInCents" ||
        key === "reminderFeeInCents" ||
        key === "defaultChargesInCents"
      const isDateValue = key === "invoiceDate" || key === "dueDate"
      const isPaymentStatus = key === "paymentStatus"

      const label = getErpInvoiceLabel(t, key, false)
      const value = data[key]
      const hasValue = isDefined(value)
      return {
        ...accumulator,
        [label]:
          isCentValue && hasValue
            ? convertCentsToEuro(value as number)
            : isDateValue && hasValue
            ? formatDate(parseDateString(value as string))
            : isPaymentStatus
            ? getPaymentStatusLabel(t, value as PaymentStatus)
            : value
      }
    }, {})

  return toDataString(erpInvoiceData)
}
