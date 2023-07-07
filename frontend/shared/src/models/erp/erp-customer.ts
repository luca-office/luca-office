import {ErpType} from "../../enums"
import {ErpCustomerFragment} from "../../graphql/generated/ErpCustomerFragment"

export type ErpCustomer = Omit<ErpCustomerFragment, "__typename"> & {type: ErpType.Customer}
