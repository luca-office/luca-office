import {round} from "lodash-es"
import {LucaTFunction} from "../translations"

export const getPercentage = (t: LucaTFunction, count: number, totalCount: number): string => {
  const percentage = totalCount !== 0 ? round((count * 100) / totalCount, 2) : 0
  return t("percentage", {percentage})
}
