import {ErpType} from "../../../src/enums"
import {ErpInvoiceFragment} from "../../../src/graphql/generated/ErpInvoiceFragment"
import {PaymentStatus} from "../../../src/graphql/generated/globalTypes"
import {ErpInvoice} from "../../../src/models"
import {sampleCompanyIdMock} from "./common"

export const erpInvoicesMockGraphQl: ErpInvoiceFragment[] = [
  {
    __typename: "ErpInvoice",
    id: 1,
    invoiceDate: "2020-08-13 11:33:58.655000 +00:00",
    dueDate: "2021-08-13 11:34:03.289000 +00:00",
    paymentTerms: "PIA",
    amountPaidInCents: 0,
    paymentStatus: PaymentStatus.Unpaid,
    reminderFeeInCents: 5000,
    defaultChargesInCents: 0,
    note: null,
    totalNetInCents: 60,
    totalGrossInCents: 60,
    taxAmountInCents: 60,
    sampleCompanyId: sampleCompanyIdMock,
    orderId: 1,
    binaryFileId: null,
    binaryFile: null
  },
  {
    __typename: "ErpInvoice",
    id: 2,
    invoiceDate: "2020-08-13 11:33:58.655000 +00:00",
    dueDate: "2021-08-13 11:34:03.289000 +00:00",
    paymentTerms: "Net 90",
    amountPaidInCents: 15000,
    paymentStatus: PaymentStatus.Unpaid,
    reminderFeeInCents: 7500,
    defaultChargesInCents: 5000,
    note: null,
    totalNetInCents: 90,
    totalGrossInCents: 90,
    taxAmountInCents: 90,
    sampleCompanyId: sampleCompanyIdMock,
    orderId: 2,
    binaryFileId: null,
    binaryFile: null
  },
  {
    __typename: "ErpInvoice",
    id: 3,
    invoiceDate: "2020-08-13 11:33:58.655000 +00:00",
    dueDate: "2021-08-13 11:34:03.289000 +00:00",
    paymentTerms: "EOM",
    amountPaidInCents: 5000,
    paymentStatus: PaymentStatus.Unpaid,
    reminderFeeInCents: 0,
    defaultChargesInCents: 0,
    note: null,
    totalNetInCents: 120,
    totalGrossInCents: 120,
    taxAmountInCents: 120,
    sampleCompanyId: sampleCompanyIdMock,
    orderId: 3,
    binaryFileId: null,
    binaryFile: null
  }
]

export const erpInvoicesMock: ErpInvoice[] = [
  {
    type: ErpType.Invoice,
    id: 1,
    invoiceDate: "2020-08-13 11:33:58.655000 +00:00",
    dueDate: "2021-08-13 11:34:03.289000 +00:00",
    paymentTerms: "PIA",
    amountPaidInCents: 0,
    paymentStatus: PaymentStatus.Unpaid,
    reminderFeeInCents: 5000,
    defaultChargesInCents: 0,
    note: null,
    totalNetInCents: 60,
    totalGrossInCents: 60,
    taxAmountInCents: 60,
    sampleCompanyId: sampleCompanyIdMock,
    orderId: 1,
    binaryFileId: null,
    binaryFile: null
  },
  {
    type: ErpType.Invoice,
    id: 2,
    invoiceDate: "2020-08-13 11:33:58.655000 +00:00",
    dueDate: "2021-08-13 11:34:03.289000 +00:00",
    paymentTerms: "Net 90",
    amountPaidInCents: 15000,
    paymentStatus: PaymentStatus.Unpaid,
    reminderFeeInCents: 7500,
    defaultChargesInCents: 5000,
    note: null,
    totalNetInCents: 90,
    totalGrossInCents: 90,
    taxAmountInCents: 90,
    sampleCompanyId: sampleCompanyIdMock,
    orderId: 2,
    binaryFileId: null,
    binaryFile: null
  },
  {
    type: ErpType.Invoice,
    id: 3,
    invoiceDate: "2020-08-13 11:33:58.655000 +00:00",
    dueDate: "2021-08-13 11:34:03.289000 +00:00",
    paymentTerms: "EOM",
    amountPaidInCents: 5000,
    paymentStatus: PaymentStatus.Unpaid,
    reminderFeeInCents: 0,
    defaultChargesInCents: 0,
    note: null,
    totalNetInCents: 120,
    totalGrossInCents: 120,
    taxAmountInCents: 120,
    sampleCompanyId: sampleCompanyIdMock,
    orderId: 3,
    binaryFileId: null,
    binaryFile: null
  }
]
