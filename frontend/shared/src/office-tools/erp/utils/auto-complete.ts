import {ErpType} from "../../../enums"
import {ErpEntityByType, ErpKeyEntity} from "../../../models"
import {find} from "../../../utils"
import {UseErpForeignKeysHook} from "../hooks"

export const getAutoCompleteList = <T extends ErpType>(
  autoCompleteLists: TypeOf<UseErpForeignKeysHook, "foreignKeys">,
  foreignKeys: ErpKeyEntity<T>[],
  key: keyof ErpEntityByType<T>
): string[] =>
  find(foreignKey => foreignKey.key === key, foreignKeys)
    .map(foreignKey => autoCompleteLists[foreignKey.type] ?? [])
    .getOrElse([])
