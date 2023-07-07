import {ErpOrderItem} from "../../../../models"
import {LucaTFunction} from "../../../../translations"
import {convertCentsToEuro, isDefined} from "../../../../utils"
import {getErpOrderItemLabel} from "../label/erp-order-item-label"
import {toDataString} from "./common"

export const getErpOrderItemClipboardString = (t: LucaTFunction, data: ErpOrderItem): string => {
  const erpOrderItemData = Object.keys(data)
    .map(key => key as keyof ErpOrderItem)
    .filter(key => !["type", "sampleCompanyId"].includes(key))
    .reduce((accumulator, key) => {
      const isCentValue = key === "totalNetInCents"

      const label = getErpOrderItemLabel(t, key, false)
      const value = data[key]
      return {
        ...accumulator,
        [label]: isCentValue && isDefined(value) ? convertCentsToEuro(value as number) : value
      }
    }, {})

  return toDataString(erpOrderItemData)
}
