import {LucaTFunction} from "../../../../translations"
import {getAccordionLabelByKey} from "../common"

export const getReferencingKeysClipboardString = (t: LucaTFunction, data: Record<string, number[]>): string => {
  const dataKeys = Object.keys(data)
  const hasMultipleKeys = dataKeys.length > 1
  const labels = dataKeys.map(key => getAccordionLabelByKey(t, key))
  const label = labels.join(",")

  const idsCount = dataKeys.reduce((accumulator, key) => {
    const length = data[key].length
    return length > accumulator ? length : accumulator
  }, 0)
  const indices = [...Array(idsCount)].map((_, index) => index)
  const referencingKeyValues = indices.reduce(
    (accumulator, index) => [...accumulator, dataKeys.map(key => data[key][index])],
    [] as number[][]
  )

  return `${t("erp_dataset__foreign_key")}:{${label}: ${
    !referencingKeyValues.length
      ? "[]"
      : hasMultipleKeys
      ? referencingKeyValues.map(values => `[${values.join(",")}]`).join(", ")
      : `[${referencingKeyValues.map(values => values.join(",")).join(", ")}]`
  }}`
}
