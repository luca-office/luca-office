import {ErpType} from "../../enums"
import {ErpEmployeeFragment} from "../../graphql/generated/ErpEmployeeFragment"

export type ErpEmployee = Omit<ErpEmployeeFragment, "__typename"> & {type: ErpType.Employee}
