import {
  addSeconds,
  differenceInCalendarDays,
  getHours,
  getMinutes,
  getSeconds,
  isBefore,
  isSameDay,
  setHours,
  setMinutes,
  setSeconds,
  startOfDay,
  subDays,
  subSeconds
} from "date-fns"
import {LocalEmail} from "../../../models"
import {LucaTFunction} from "../../../translations"
import {formatDate, formatTime, Option} from "../../../utils"

export interface ArrivalTimeProps {
  readonly email: LocalEmail
  readonly scenarioStartedAt: Option<Date>
  readonly scenarioFictiveDate: Option<Date>
  readonly t: LucaTFunction
  readonly isLabeledWithDay?: boolean
}

export const getArrivalTimeLabel = ({
  email,
  t,
  isLabeledWithDay = false,
  scenarioStartedAt,
  scenarioFictiveDate
}: ArrivalTimeProps): string => {
  const addDayLabel = (label: string, time: string) => `${label} (${time})`

  const dateToCompareTo = scenarioStartedAt.map(startedAt => {
    return scenarioFictiveDate
      .map(fictiveDate => {
        const hours = getHours(startedAt)
        const minutes = getMinutes(startedAt)
        const seconds = getSeconds(startedAt)
        let adjustedFictiveDate = fictiveDate
        adjustedFictiveDate = setHours(adjustedFictiveDate, hours)
        adjustedFictiveDate = setMinutes(adjustedFictiveDate, minutes)
        adjustedFictiveDate = setSeconds(adjustedFictiveDate, seconds)

        return adjustedFictiveDate
      })
      .getOrElse(startedAt)
  })

  return dateToCompareTo
    .map(startDate => {
      if (email.receptionDelayInSeconds === 0) {
        const time = formatTime(startDate, false)
        return isLabeledWithDay ? addDayLabel(t("email__today"), time) : time
      } else if (email.receptionDelayInSeconds > 0) {
        const time = formatTime(addSeconds(startDate, email.receptionDelayInSeconds), false)
        return isLabeledWithDay ? addDayLabel(t("email__today"), time) : time
      } else {
        const arrivalDate = subSeconds(startDate, -email.receptionDelayInSeconds)

        if (isSameDay(arrivalDate, startDate)) {
          return isLabeledWithDay
            ? addDayLabel(t("email__today"), formatTime(arrivalDate, false))
            : formatTime(arrivalDate, false)
        } else if (differenceInCalendarDays(arrivalDate, startDate) === -1) {
          // is yesterday
          return isLabeledWithDay ? addDayLabel(t("email__yesterday"), formatDate(arrivalDate)) : t("email__yesterday")
        } else if (isBefore(arrivalDate, startOfDay(subDays(startDate, 1)))) {
          // before yesterday
          return formatDate(arrivalDate)
        } else {
          return formatTime(arrivalDate, false)
        }
      }
    })
    .getOrElse("")
}
