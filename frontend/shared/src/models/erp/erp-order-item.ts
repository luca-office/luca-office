import {ErpType} from "../../enums"
import {ErpOrderItemFragment} from "../../graphql/generated/ErpOrderItemFragment"

export type ErpOrderItem = Omit<ErpOrderItemFragment, "__typename"> & {type: ErpType.OrderItem}
