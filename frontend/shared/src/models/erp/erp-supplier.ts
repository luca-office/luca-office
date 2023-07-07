import {ErpType} from "../../enums"
import {ErpSupplierFragment} from "../../graphql/generated/ErpSupplierFragment"

export type ErpSupplier = Omit<ErpSupplierFragment, "__typename"> & {type: ErpType.Supplier}
