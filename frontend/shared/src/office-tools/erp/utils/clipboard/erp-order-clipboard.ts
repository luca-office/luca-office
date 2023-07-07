import {DeliveryStatus} from "../../../../graphql/generated/globalTypes"
import {ErpOrder} from "../../../../models"
import {LucaTFunction} from "../../../../translations"
import {convertCentsToEuro, formatDate, isDefined, parseDateString} from "../../../../utils"
import {getDeliveryStatusLabel} from "../common"
import {getErpOrderLabel} from "../label/erp-order-label"
import {toDataString} from "./common"

export const getErpOrderClipboardString = (t: LucaTFunction, data: ErpOrder): string => {
  const erpOrderData = Object.keys(data)
    .map(key => key as keyof ErpOrder)
    .filter(key => !["type", "sampleCompanyId"].includes(key))
    .reduce((accumulator, key) => {
      const isCentValue = key === "deliveryChargeInCents" || key === "cashbackInCents" || key === "discountInCents"
      const isDateValue = key === "deliveryDate"
      const isDeliveryStatus = key === "deliveryStatus"

      const label = getErpOrderLabel(t, key, false)
      const value = data[key]
      const hasValue = isDefined(value)
      return {
        ...accumulator,
        [label]:
          isCentValue && hasValue
            ? convertCentsToEuro(value as number)
            : isDateValue && hasValue
            ? formatDate(parseDateString(value as string))
            : isDeliveryStatus
            ? getDeliveryStatusLabel(t, value as DeliveryStatus)
            : value
      }
    }, {})

  return toDataString(erpOrderData)
}
