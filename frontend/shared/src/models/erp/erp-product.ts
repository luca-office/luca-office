import {ErpType} from "../../enums"
import {ErpProductFragment} from "../../graphql/generated/ErpProductFragment"

export type ErpProduct = Omit<ErpProductFragment, "__typename"> & {type: ErpType.Product}
