import {partial} from "lodash-es"
import * as React from "react"
import {ErpType} from "../../../../enums"
import {LucaTFunction} from "../../../../translations"
import {ErpDataSetAccordion} from "../../common/erp-data-set-overlay/erp-data-set-accordion/erp-data-set-accordion"
import {UseErpReferencingPrimaryKeysHook} from "../../hooks"
import {getReferencingKeysClipboardString} from "../clipboard"

export interface GetErpReferencingKeyAccordionsParams {
  readonly t: LucaTFunction
  readonly navigateToEntity: (erpType: ErpType, ids: number[]) => void
  readonly referencingPrimaryKeys: TypeOf<UseErpReferencingPrimaryKeysHook, "primaryKeys">
  readonly onCopyAll: (dataString: string) => void
  readonly onCopySingleToClipboard?: () => void
}

export const getErpReferencingKeyAccordions = ({
  t,
  navigateToEntity,
  referencingPrimaryKeys,
  onCopyAll,
  onCopySingleToClipboard
}: GetErpReferencingKeyAccordionsParams): React.ReactNode => {
  const types = Object.keys(referencingPrimaryKeys).map(key => key as ErpType)

  const navigateTo = (type: ErpType, ids: number[]) => navigateToEntity(type, ids)
  const handleCopyAll = (data: Record<string, number[]>) => onCopyAll(getReferencingKeysClipboardString(t, data))

  return types.length ? (
    <React.Fragment>
      {types.map((type, index) => {
        const data = referencingPrimaryKeys[type] ?? {}
        return (
          <ErpDataSetAccordion
            key={`erp_accordion_${type}_${index}`}
            type={type}
            data={data}
            onClick={partial(navigateTo, type)}
            onCopyToClipboard={onCopySingleToClipboard}
            onCopyAll={() => handleCopyAll(data)}
          />
        )
      })}
    </React.Fragment>
  ) : null
}
