import {ErpType} from "../../enums"
import {ErpInvoiceFragment} from "../../graphql/generated/ErpInvoiceFragment"

export type ErpInvoice = Omit<ErpInvoiceFragment, "__typename"> & {type: ErpType.Invoice}
