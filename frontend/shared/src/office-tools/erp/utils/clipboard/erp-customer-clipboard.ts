import {Salutation} from "../../../../graphql/generated/globalTypes"
import {ErpCustomer} from "../../../../models"
import {LucaTFunction} from "../../../../translations"
import {getSalutationLabel} from "../common"
import {getErpCustomerLabel} from "../label/erp-customer-label"
import {toDataString} from "./common"

export const getErpCustomerClipboardString = (t: LucaTFunction, data: ErpCustomer): string => {
  const erpCustomerData = Object.keys(data)
    .map(key => key as keyof ErpCustomer)
    .filter(key => !["type", "sampleCompanyId"].includes(key))
    .reduce((accumulator, key) => {
      const label = getErpCustomerLabel(t, key, false)
      const value = data[key]
      return {...accumulator, [label]: key === "salutation" ? getSalutationLabel(t, value as Salutation) : value}
    }, {})

  return toDataString(erpCustomerData)
}
