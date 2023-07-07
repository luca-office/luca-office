import {ErpType} from "../../enums"
import {ErpEntity} from "./erp-entity"
import {ErpKeyEntity} from "./erp-key-entity"

interface ErpStackEntityBase {
  readonly index: number
}

export interface ErpStackEntity extends ErpStackEntityBase {
  readonly data: ErpEntity
  readonly foreignKeys: ErpKeyEntity<ErpType>[]
}
