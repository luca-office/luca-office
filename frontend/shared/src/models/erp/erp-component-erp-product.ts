import {ErpType} from "../../enums"
import {ErpComponentErpProductFragment} from "../../graphql/generated/ErpComponentErpProductFragment"

export type ErpComponentErpProduct = Omit<ErpComponentErpProductFragment, "__typename"> & {
  type: ErpType.ComponentProduct
}
