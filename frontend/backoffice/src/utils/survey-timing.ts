import {differenceInDays, isAfter, isBefore, parseJSON} from "date-fns"
import {IconName} from "shared/enums"
import {SurveyExecutionType} from "shared/graphql/generated/globalTypes"
import {Survey, SurveyLight} from "shared/models"
import {LucaTFunction} from "shared/translations"
import {formatDate, formatDateFromString, isDefined, now} from "shared/utils"
import {SurveyTiming} from "../enums"

/**
 * calculate status of survey timing
 * @param startsAt - survey start date
 * @param endsAt - survey end date
 */
export const getSurveyTimingStatus = (startsAt: string | null, endsAt: string | null): SurveyTiming => {
  if (!startsAt || !endsAt) {
    return SurveyTiming.Undefined
  }

  const today = now()
  const hasStarted = isBefore(parseJSON(startsAt), today)
  const hasEnded = endsAt && isAfter(today, parseJSON(endsAt))

  if (!hasStarted) {
    return SurveyTiming.Future
  } else if (!hasEnded) {
    return SurveyTiming.Present
  } else {
    return SurveyTiming.Past
  }
}

export const getManualSurveyTimingStatus = (survey: SurveyLight): SurveyTiming => {
  const isCompleted = survey.manualPeriod?.end !== null
  const hasStarted = survey.manualPeriod?.start !== null

  if (!hasStarted) {
    return SurveyTiming.Future
  } else if (!isCompleted) {
    return SurveyTiming.Present
  } else {
    return SurveyTiming.Past
  }
}

export const getSurveyTimingLabel = (t: LucaTFunction, survey: Survey) => {
  const {startsAt, endsAt, isCompleted, executionType, manualPeriod} = survey

  const isAutomaticAsynchronous = executionType === SurveyExecutionType.AutomaticAsynchronous

  const status = isAutomaticAsynchronous
    ? getSurveyTimingStatus(survey.startsAt, survey.endsAt)
    : getManualSurveyTimingStatus(survey)

  if (isCompleted) {
    return t("dashboard__details_time_ended")
  }
  if ((isAutomaticAsynchronous && (!startsAt || !endsAt)) || (!isAutomaticAsynchronous && manualPeriod === null)) {
    return t("dashboard__details_time_undefined")
  }

  switch (status) {
    case SurveyTiming.Present:
      return t("dashboard__details_time_running")
    case SurveyTiming.Future:
      return t(isAutomaticAsynchronous ? "dashboard__details_time_future" : "dashboard__details_time_future_manual", {
        date: startsAt ? formatDateFromString(startsAt) : undefined
      })
    case SurveyTiming.Past:
      return t("dashboard__details_time_ended")
    default:
      return t("dashboard__details_time_undefined")
  }
}

/**
 * display survey timing labels (status)
 * @param t - translation fn
 * @param startsAt - survey start date
 * @param endsAt - survey end date
 * @param isCompleted - survey finished
 */
export const getSurveyTimingHeadline = (
  t: LucaTFunction,
  startsAt: string | null,
  endsAt: string | null,
  isCompleted: boolean
) => {
  const status = getSurveyTimingStatus(startsAt, endsAt)
  const getEndingTimeLabel = () => {
    if (endsAt) {
      const endsAtDate = parseJSON(endsAt)
      // do not use isToday here as it will break tests by using Date internally
      const endsToday = differenceInDays(now(), endsAtDate) === 0

      return t("dashboard__title_time_ended", {
        endDate: endsToday ? t("dashboard__title_today") : formatDate(endsAtDate)
      })
    }
    return t("dashboard__details_time_ended")
  }

  if (isCompleted) {
    return getEndingTimeLabel()
  }
  if (!startsAt || !endsAt) {
    return t("dashboard__details_time_undefined")
  }

  const endsAtDate = parseJSON(endsAt)
  const startsAtDate = parseJSON(startsAt)
  const differenceToStart = Math.abs(differenceInDays(now(), startsAtDate))
  const differenceToEnd = Math.abs(differenceInDays(now(), endsAtDate))
  // do not use isTomorrow here as it will break tests by using Date internally
  const endsTomorrow = differenceToEnd === 1
  const startsTomorrow = differenceToStart === 1

  switch (status) {
    case SurveyTiming.Present:
      return t("dashboard__title_time_running", {
        remainingTime: endsTomorrow
          ? t("dashboard__title_day_remaining")
          : differenceToEnd > 0
          ? t("dashboard__title_days_remaining", {
              days: differenceToEnd
            })
          : t("dashboard__title_remaining_today")
      })
    case SurveyTiming.Future:
      return t("dashboard__title_time_future", {
        remainingTime: startsTomorrow
          ? t("dashboard__title_day_to")
          : t("dashboard__title_days_to", {days: differenceToStart}),
        date: formatDate(startsAtDate)
      })
    case SurveyTiming.Past:
      return getEndingTimeLabel()
    default:
      return t("dashboard__details_time_undefined")
  }
}

export const getManualSurveyTimingHeadline = (t: LucaTFunction, survey: SurveyLight) => {
  const status = getManualSurveyTimingStatus(survey)
  const endDate = isDefined(survey.manualPeriod?.end) ? formatDate(new Date(survey.manualPeriod!.end)) : undefined

  switch (status) {
    case SurveyTiming.Present:
      return t("dashboard__title_time_running_without_time")
    case SurveyTiming.Future:
      return t("dashboard__title_time_future_manual_survey")
    case SurveyTiming.Past:
      return t("dashboard__title_time_ended", {endDate})
    default:
      return t("dashboard__details_time_undefined")
  }
}

/**
 * display survey timing icons (status)
 * @param startsAt - survey start date
 * @param endsAt - survey end date
 * @param isFinished - survey completed
 */
export const getSurveyListIcon = (startsAt: string | null, endsAt: string | null, isFinished: boolean) => {
  if (isFinished || (endsAt && isBefore(parseJSON(endsAt), now()))) {
    return IconName.PaperComplete
  } else if (!startsAt || !endsAt) {
    return IconName.PaperSheet
  } else {
    return IconName.PaperEdit
  }
}

/**
 * Display correct timing status on survey detail & dashboard footer
 * @param t - translation function
 * @param startsAt - survey date
 * @param endsAt - survey date
 */
export const getSurveyDurationLabel = (t: LucaTFunction, startsAt: string | null, endsAt: string | null) => {
  const status = getSurveyTimingStatus(startsAt, endsAt)

  if (!startsAt || !endsAt) {
    return t("dashboard__details_time_undefined")
  }

  const endsAtDate = parseJSON(endsAt)
  const startsAtDate = parseJSON(startsAt)
  const remainingDaysToEnd = Math.abs(differenceInDays(endsAtDate, now()))
  const remainingDaysToStart = Math.abs(differenceInDays(startsAtDate, now()))
  const endsToday = remainingDaysToEnd === 0

  switch (status) {
    case SurveyTiming.Present:
      return t("dashboard__footer_timing_present", {
        date: formatDate(endsAtDate),
        remainingTime: endsToday
          ? t("dashboard__title_days_today")
          : remainingDaysToEnd === 1
          ? t("dashboard__title_day_to")
          : t("dashboard__title_days_to", {days: remainingDaysToEnd})
      })
    case SurveyTiming.Future:
      return t("dashboard__footer_timing_future", {
        date: formatDate(startsAtDate),
        remainingTime:
          remainingDaysToStart === 1
            ? t("dashboard__title_day_to")
            : t("dashboard__title_days_to", {days: remainingDaysToStart})
      })
    case SurveyTiming.Past:
      return endsToday
        ? t("dashboard__footer_timing_past_today")
        : t("dashboard__footer_timing_past", {
            end: formatDateFromString(endsAt)
          })
    default:
      return t("dashboard__details_time_undefined")
  }
}

export const getSurveyParticipantsLabel = (
  t: LucaTFunction,
  status: SurveyTiming,
  invitationsCount: number,
  completedCount: number
) => {
  switch (status) {
    case SurveyTiming.Future:
      return t("dashboard__footer_invited", {invitationsCount})
    case SurveyTiming.Present:
    case SurveyTiming.Past:
    case SurveyTiming.Undefined:
    default:
      return t("dashboard__footer_completed", {invitationsCount, completedCount})
  }
}

export const isSurveyDeletable = (survey: SurveyLight) =>
  survey.isTestSurvey ||
  (!survey.isCompleted &&
    !survey.inProgressParticipationsCount &&
    getSurveyTimingStatus(survey.startsAt, survey.endsAt) === SurveyTiming.Future)
