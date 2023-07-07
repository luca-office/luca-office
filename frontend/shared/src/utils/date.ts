import {format, isValid, parseJSON} from "date-fns"
import {TimeUnit} from "../enums"

export const now = () => new Date()

export const formatTime = (date: Date | number, isSecondsVisible = true) =>
  isSecondsVisible ? format(date, "HH:mm:ss") : format(date, "HH:mm")

export const formatDate = (date: Date) => format(date, "dd.MM.yyyy")

export const formatDateForBackend = (date: Date) => date.toISOString()

export const formatDateFromString = (dateString: string) => {
  const date = parseDateString(dateString)
  if (isValid(date)) {
    return formatDate(date)
  } else {
    console.warn("could not parse date", dateString)
    return "invalid date"
  }
}

export const secondsToGivenTimeUnit = (
  timeUnit: TimeUnit.Hour | TimeUnit.Minute | TimeUnit.Second,
  receptionDelayInSeconds: number
): number => {
  switch (timeUnit) {
    case TimeUnit.Hour:
      return receptionDelayInSeconds / 3600
    case TimeUnit.Minute:
      return convertSecondsToMinutes(receptionDelayInSeconds)
    case TimeUnit.Second:
      return receptionDelayInSeconds
  }
}

export const convertMillisecondsToSeconds = (milliseconds: number) => Math.round(milliseconds / 1000)

export const convertSecondsToMinutes = (seconds: number, useFloor = false) =>
  useFloor ? Math.floor(seconds / 60) : Math.round(seconds / 60)

export const convertMinutesToHours = (minutes: number, useFloor = false) =>
  useFloor ? Math.floor(minutes / 60) : Math.round(minutes / 60)

export const convertHoursToDays = (hours: number) => Math.round(hours / 24)

export const convertDaysToWeeks = (hours: number) => Math.round(hours / 7)

export const fillTwoPlaces = (num: number) => (num < 10 ? `0${num}` : `${num}`)

export const convertSecondsToTimeString = (seconds: number) => {
  const absoluteSeconds = Math.abs(seconds)
  const minutes = convertSecondsToMinutes(absoluteSeconds, true)
  const hours = convertMinutesToHours(minutes, true)

  const outputHours = hours
  const outputMinutes = minutes - convertHoursToMinutes(outputHours)
  const outputSeconds =
    absoluteSeconds -
    (convertMinutesToSeconds(outputMinutes) + convertMinutesToSeconds(convertHoursToMinutes(outputHours)))

  return `${outputHours ? `${fillTwoPlaces(outputHours)}:` : ""}${fillTwoPlaces(outputMinutes)}:${fillTwoPlaces(
    outputSeconds
  )}`
}

/**
 * By using 4.345 one gets an approximate value for months.
 * See: https://www.wolframalpha.com/input/?i=month+to+week
 * @param weeks
 */
export const convertWeeksToMonths = (weeks: number) => Math.round(weeks / 4.345)

/**
 * Returns the value approximated to two decimal places
 * @param months
 */
export const convertMonthsToYears = (months: number) => Math.round((months / 12 + Number.EPSILON) * 100) / 100

export const convertMinutesToSeconds = (minutes: number | string) => Math.round(parseInt(`${minutes}`, 10) * 60)

export const convertHoursToMinutes = (hours: number | string) => Math.round(parseInt(`${hours}`, 10) * 60)

export const convertDaysToHours = (days: number | string) => Math.round(parseInt(`${days}`, 10) * 24)

export const convertWeeksToDays = (weeks: number | string) => Math.round(parseInt(`${weeks}`, 10) * 7)

/**
 * By using 4.345 one gets an approximate value for weeks.
 * See: https://www.wolframalpha.com/input/?i=month+to+week
 * @param months
 */
export const convertMonthsToWeeks = (months: number | string) => Math.round(parseInt(`${months}`, 10) * 4.345)

export const convertYearsToMonths = (years: number | string) => Math.round(parseInt(`${years}`, 10) * 12)

export const serialize = (date: Date) => date.toISOString()

export const parseDateString = (dateString: string): Date => parseJSON(dateString)

export const toUTCMilliseconds = (date: Date): number =>
  Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds()
  )

export const getDifferenceInMilliseconds = (sourceDate: Date, targetDate: Date): number => {
  const sourceUtc = toUTCMilliseconds(sourceDate)
  const targetUtc = toUTCMilliseconds(targetDate)
  return targetUtc - sourceUtc
}
