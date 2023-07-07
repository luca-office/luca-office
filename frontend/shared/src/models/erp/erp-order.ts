import {ErpType} from "../../enums"
import {ErpOrderFragment} from "../../graphql/generated/ErpOrderFragment"

export type ErpOrder = Omit<ErpOrderFragment, "__typename"> & {type: ErpType.Order}
