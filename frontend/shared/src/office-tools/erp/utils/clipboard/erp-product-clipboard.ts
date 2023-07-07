import {ErpProduct} from "../../../../models"
import {LucaTFunction} from "../../../../translations"
import {convertCentsToEuro, isDefined} from "../../../../utils"
import {getErpProductLabel} from "../label/erp-product-label"
import {toDataString} from "./common"

export const getErpProductClipboardString = (t: LucaTFunction, data: ErpProduct): string => {
  const erpProductData = Object.keys(data)
    .map(key => key as keyof ErpProduct)
    .filter(key => !["type", "sampleCompanyId"].includes(key))
    .reduce((accumulator, key) => {
      const isCentValue =
        key === "netPriceInCents" || key === "stockCostPerUnitInCents" || key === "stockCostTotalInCents"

      const label = getErpProductLabel(t, key, false)
      const value = data[key]
      return {
        ...accumulator,
        [label]: isCentValue && isDefined(value) ? convertCentsToEuro(value as number) : value
      }
    }, {})

  return toDataString(erpProductData)
}
