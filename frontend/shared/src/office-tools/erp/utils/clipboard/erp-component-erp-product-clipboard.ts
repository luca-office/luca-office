import {ErpComponentErpProduct} from "../../../../models"
import {LucaTFunction} from "../../../../translations"
import {getErpComponentForProductLabel} from "../label/erp-component-erp-product-label"
import {toDataString} from "./common"

export const getErpComponentErpProductClipboardString = (t: LucaTFunction, data: ErpComponentErpProduct): string => {
  const erpComponentErpProductData = Object.keys(data)
    .map(key => key as keyof ErpComponentErpProduct)
    .filter(key => !["id", "sampleCompanyId", "type"].includes(key))
    .reduce((accumulator, key) => {
      const label = getErpComponentForProductLabel(t, key, false)
      const value = data[key]
      return {...accumulator, [label]: value}
    }, {})

  return toDataString(erpComponentErpProductData)
}
