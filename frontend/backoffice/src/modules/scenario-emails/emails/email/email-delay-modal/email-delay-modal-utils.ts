import {TimeUnit} from "shared/enums"
import {LucaI18nLangKey} from "shared/translations"
import {
  convertDaysToHours,
  convertHoursToMinutes,
  convertMillisecondsToSeconds,
  convertMinutesToSeconds,
  convertMonthsToWeeks,
  convertWeeksToDays,
  convertYearsToMonths
} from "shared/utils"
import {EmailTemporalStage} from "./hooks/use-email-delay-modal"

export const getReceptionDelayInSeconds = (type: TimeUnit, delay: number) => {
  let currentType = type
  let currentDelay = parseInt(`${delay}`, 10)

  while (currentType !== TimeUnit.Second) {
    if (currentType === TimeUnit.Year) {
      currentType = TimeUnit.Month
      currentDelay = convertYearsToMonths(currentDelay)
    }
    if (currentType === TimeUnit.Month) {
      currentType = TimeUnit.Week
      currentDelay = convertMonthsToWeeks(currentDelay)
    }
    if (currentType === TimeUnit.Week) {
      currentType = TimeUnit.Day
      currentDelay = convertWeeksToDays(currentDelay)
    }
    if (currentType === TimeUnit.Day) {
      currentType = TimeUnit.Hour
      currentDelay = convertDaysToHours(currentDelay)
    }
    if (currentType === TimeUnit.Hour) {
      currentType = TimeUnit.Minute
      currentDelay = convertHoursToMinutes(currentDelay)
    }
    if (currentType === TimeUnit.Minute) {
      currentType = TimeUnit.Second
      currentDelay = convertMinutesToSeconds(currentDelay)
    }
    if (currentType === TimeUnit.Millisecond) {
      currentType = TimeUnit.Second
      currentDelay = convertMillisecondsToSeconds(currentDelay)
    }
  }

  return currentDelay
}

export const getTimeUnitLabel = (temporalStage: EmailTemporalStage): LucaI18nLangKey => {
  switch (temporalStage) {
    case EmailTemporalStage.Future:
      return "email__future_label"
    case EmailTemporalStage.Present:
      return "email__present_label"
    case EmailTemporalStage.Past:
      return "email__past_label"
  }
}
