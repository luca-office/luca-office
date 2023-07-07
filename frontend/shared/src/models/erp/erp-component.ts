import {ErpType} from "../../enums"
import {ErpComponentFragment} from "../../graphql/generated/ErpComponentFragment"

export type ErpComponent = Omit<ErpComponentFragment, "__typename"> & {
  type: ErpType.Component
}
