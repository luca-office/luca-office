import {Salutation} from "../../../../graphql/generated/globalTypes"
import {ErpSupplier} from "../../../../models"
import {LucaTFunction} from "../../../../translations"
import {getSalutationLabel} from "../common"
import {getErpSupplierLabel} from "../label/erp-supplier-label"
import {toDataString} from "./common"

export const getErpSupplierClipboardString = (t: LucaTFunction, data: ErpSupplier): string => {
  const erpSupplierData = Object.keys(data)
    .map(key => key as keyof ErpSupplier)
    .filter(key => !["type", "sampleCompanyId"].includes(key))
    .reduce((accumulator, key) => {
      const isSalutation = key === "salutation"

      const label = getErpSupplierLabel(t, key, false)
      const value = data[key]
      return {
        ...accumulator,
        [label]: isSalutation ? getSalutationLabel(t, value as Salutation) : value
      }
    }, {})

  return toDataString(erpSupplierData)
}
