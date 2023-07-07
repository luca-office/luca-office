import {ErpComponent} from "../../../../models"
import {LucaTFunction} from "../../../../translations"
import {convertCentsToEuro, isDefined} from "../../../../utils"
import {getErpComponentLabel} from "../label/erp-component-label"
import {toDataString} from "./common"

export const getErpComponentClipboardString = (t: LucaTFunction, data: ErpComponent): string => {
  const erpComponentData = Object.keys(data)
    .map(key => key as keyof ErpComponent)
    .filter(key => !["type", "sampleCompanyId"].includes(key))
    .reduce((accumulator, key) => {
      const isCentValue =
        key === "purchasingPriceInCents" || key === "stockCostPerUnitInCents" || key === "stockCostTotalInCents"
      const label = getErpComponentLabel(t, key, false)
      const value = data[key]
      return {...accumulator, [label]: isCentValue && isDefined(value) ? convertCentsToEuro(value as number) : value}
    }, {})

  return toDataString(erpComponentData)
}
