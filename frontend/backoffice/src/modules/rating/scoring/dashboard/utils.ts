import {isFuture, isToday} from "date-fns"
import {LucaTFunction} from "shared/translations"
import {formatDate} from "shared/utils"

export const getEndDateLabel = (date: Date, t: LucaTFunction) => {
  return isFuture(date)
    ? `${t("rating_overview__rating_end", {date: formatDate(date)})}`
    : `${t("rating_overview__rating_ended", {date: formatDate(date)})} ${
        isToday(date) ? `(${t("rating_overview__ended_today")})` : ""
      }`
}
