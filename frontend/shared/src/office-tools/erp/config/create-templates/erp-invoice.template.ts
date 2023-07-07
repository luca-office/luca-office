import {ErpType} from "../../../../enums"
import {PaymentStatus} from "../../../../graphql/generated/globalTypes"
import {ErpInvoice} from "../../../../models"
import {now} from "../../../../utils/date"

export interface ErpInvoiceTemplate extends Omit<ErpInvoice, "id" | "orderId"> {
  readonly id?: number
  readonly orderId?: number
}

const dateString = now().toISOString()

export const getErpInvoiceTemplate = (sampleCompanyId: UUID): ErpInvoiceTemplate => ({
  type: ErpType.Invoice,
  id: undefined,
  invoiceDate: dateString,
  dueDate: dateString,
  paymentTerms: "",
  amountPaidInCents: null,
  paymentStatus: PaymentStatus.Unpaid,
  reminderFeeInCents: null,
  defaultChargesInCents: null,
  note: null,
  sampleCompanyId,
  orderId: undefined,
  totalNetInCents: 0,
  totalGrossInCents: 0,
  taxAmountInCents: 0,
  binaryFileId: null,
  binaryFile: null
})
