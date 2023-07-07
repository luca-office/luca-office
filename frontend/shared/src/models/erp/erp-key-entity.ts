import {ErpType} from "../../enums"
import {ErpEntityByType} from "./erp-entity"

export interface ErpKeyEntity<T extends ErpType> {
  readonly key: keyof ErpEntityByType<T>
  readonly id: number
  readonly type: ErpType
}
