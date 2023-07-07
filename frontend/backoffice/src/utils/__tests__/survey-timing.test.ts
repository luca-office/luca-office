import {format} from "date-fns"
import {IconName} from "shared/enums"
import {surveysMock} from "shared/graphql/__mocks__"
import {formatDate, formatDateFromString} from "shared/utils"
import {fakeTranslate, fakeTranslateWithOptions} from "sharedTests/utils/translate-mock"
import {SurveyTiming} from "../../enums"
import {
  getSurveyDurationLabel,
  getSurveyListIcon,
  getSurveyTimingHeadline,
  getSurveyTimingLabel,
  getSurveyTimingStatus,
  isSurveyDeletable
} from "../survey-timing"

const mockedSurvey = surveysMock[0]

jest.mock("shared/utils", () => ({
  now: () => new Date("2021-02-23T19:25:08.043Z"),
  formatDate: (date: Date) => format(date, "dd.MM.yyyy"),
  formatDateFromString: (date: string) => date
}))
describe("survey-timing", () => {
  it("can getSurveyTimingStatus", () => {
    expect(getSurveyTimingStatus(null, "2021-02-23T19:25:08.043Z")).toEqual(SurveyTiming.Undefined)
    expect(getSurveyTimingStatus("2021-02-23T19:25:08.043Z", null)).toEqual(SurveyTiming.Undefined)
    expect(getSurveyTimingStatus("2021-02-21T19:25:08.043Z", "2021-02-23T19:25:08.043Z")).toEqual(SurveyTiming.Present)
    expect(getSurveyTimingStatus("2021-02-23T19:25:08.043Z", "2021-02-24T19:25:08.043Z")).toEqual(SurveyTiming.Future)
    expect(getSurveyTimingStatus("2021-02-19T19:25:08.043Z", "2021-02-21T19:25:08.043Z")).toEqual(SurveyTiming.Past)
  })

  it("can getSurveyTimingLabel", () => {
    // future
    // has correct translation key
    const futureIncomplete = getSurveyTimingLabel(fakeTranslateWithOptions, {
      ...mockedSurvey,
      startsAt: "2021-02-24T19:25:08.043Z",
      endsAt: "2021-02-25T19:25:08.043Z",
      isCompleted: false
    })
    expect(futureIncomplete).toContain("dashboard__details_time_future")
    // has correct option value
    expect(futureIncomplete).toContain(formatDateFromString("2021-02-24T19:25:08.043Z"))
    // has correct option key
    expect(futureIncomplete).toContain("date")
    // future, completed > all
    expect(
      getSurveyTimingLabel(fakeTranslate, {
        ...mockedSurvey,
        startsAt: "2021-02-24T19:25:08.043Z",
        endsAt: "2021-02-25T19:25:08.043Z",
        isCompleted: true
      })
    ).toContain("dashboard__details_time_ended")
    // present
    expect(
      getSurveyTimingLabel(fakeTranslate, {
        ...mockedSurvey,
        startsAt: "2021-02-19T19:25:08.043Z",
        endsAt: "2021-02-25T19:25:08.043Z",
        isCompleted: false
      })
    ).toContain("dashboard__details_time_running")
    // present, completed > all
    expect(
      getSurveyTimingLabel(fakeTranslate, {
        ...mockedSurvey,
        startsAt: "2021-02-19T19:25:08.043Z",
        endsAt: "2021-02-25T19:25:08.043Z",
        isCompleted: true
      })
    ).toContain("dashboard__details_time_ended")
    // past, completed > all
    expect(
      getSurveyTimingLabel(fakeTranslate, {
        ...mockedSurvey,
        startsAt: "2021-02-19T19:25:08.043Z",
        endsAt: "2021-02-21T19:25:08.043Z",
        isCompleted: false
      })
    ).toContain("dashboard__details_time_ended")
    expect(
      getSurveyTimingLabel(fakeTranslate, {
        ...mockedSurvey,
        startsAt: "2021-02-19T19:25:08.043Z",
        endsAt: "2021-02-21T19:25:08.043Z",
        isCompleted: true
      })
    ).toContain("dashboard__details_time_ended")
    // undef, completed > all
    expect(
      getSurveyTimingLabel(fakeTranslate, {
        ...mockedSurvey,
        startsAt: null,
        endsAt: null,
        isCompleted: true
      })
    ).toContain("dashboard__details_time_ended")
  })

  it("can getSurveyTimingHeadline", () => {
    // undefined
    expect(getSurveyTimingHeadline(fakeTranslate, null, "2021-02-25T19:25:08.043Z", false)).toContain(
      "dashboard__details_time_undefined"
    )
    expect(getSurveyTimingHeadline(fakeTranslate, null, null, false)).toContain("dashboard__details_time_undefined")
    expect(getSurveyTimingHeadline(fakeTranslate, "2021-02-25T19:25:08.043Z", null, false)).toContain(
      "dashboard__details_time_undefined"
    )
    // completed (undefined)
    expect(getSurveyTimingHeadline(fakeTranslate, "2021-02-25T19:25:08.043Z", null, true)).toContain(
      "dashboard__details_time_ended"
    )
    expect(getSurveyTimingHeadline(fakeTranslate, null, null, true)).toContain("dashboard__details_time_ended")
    // future
    // has correct translation key (1 day ahead)
    const futureIncomplete = getSurveyTimingHeadline(
      fakeTranslateWithOptions,
      "2021-02-24T19:25:08.043Z",
      "2021-02-25T19:25:08.043Z",
      false
    )
    expect(futureIncomplete).toContain("dashboard__title_time_future")
    // has correct option value
    expect(futureIncomplete).toContain(formatDate(new Date("2021-02-24T19:25:08.043Z")))
    expect(futureIncomplete).toContain("dashboard__title_day_to")
    // has correct option key
    expect(futureIncomplete).toContain("date")
    expect(futureIncomplete).toContain("remainingTime")
    // has correct translation key (>1 day ahead)
    const futureIncompleteMulti = getSurveyTimingHeadline(
      fakeTranslateWithOptions,
      "2021-02-26T19:25:08.043Z",
      "2021-02-27T19:25:08.043Z",
      false
    )
    expect(futureIncompleteMulti).toContain("dashboard__title_time_future")
    // has correct option value
    expect(futureIncompleteMulti).toContain(formatDate(new Date("2021-02-26T19:25:08.043Z")))
    expect(futureIncompleteMulti).toContain("dashboard__title_days_to")
    // has correct option key
    expect(futureIncompleteMulti).toContain("date")
    expect(futureIncompleteMulti).toContain("remainingTime")

    // present
    // has correct translation key (>1 day ahead)
    const presentIncompleteMulti = getSurveyTimingHeadline(
      fakeTranslateWithOptions,
      "2021-02-22T19:25:08.043Z",
      "2021-02-27T19:25:08.043Z",
      false
    )
    expect(presentIncompleteMulti).toContain("dashboard__title_time_running")
    // has correct option value
    expect(presentIncompleteMulti).toContain("4") //differenceInDays
    expect(presentIncompleteMulti).toContain("dashboard__title_days_remaining")
    // has correct option key
    expect(presentIncompleteMulti).toContain("remainingTime")
    expect(presentIncompleteMulti).toContain("days")
    // has correct translation key (1 day ahead)
    const presentIncompleteTomorrow = getSurveyTimingHeadline(
      fakeTranslateWithOptions,
      "2021-02-22T19:25:08.043Z",
      "2021-02-24T19:25:08.043Z",
      false
    )
    expect(presentIncompleteTomorrow).toContain("dashboard__title_time_running")
    // has correct option value
    expect(presentIncompleteTomorrow).toContain("dashboard__title_day_remaining")
    // has correct option key
    expect(presentIncompleteTomorrow).toContain("remainingTime")
    // has correct translation key (today)
    const presentIncompleteToday = getSurveyTimingHeadline(
      fakeTranslateWithOptions,
      "2021-02-22T19:25:08.043Z",
      "2021-02-23T22:25:08.043Z",
      false
    )
    expect(presentIncompleteToday).toContain("dashboard__title_time_running")
    // has correct option value
    expect(presentIncompleteToday).toContain("dashboard__title_remaining_today")
    // has correct option key
    expect(presentIncompleteToday).toContain("remainingTime")

    // past
    // has correct translation key (>1 day ahead)
    const pastIncompleteMulti = getSurveyTimingHeadline(
      fakeTranslateWithOptions,
      "2021-02-21T19:25:08.043Z",
      "2021-02-22T19:25:08.043Z",
      false
    )
    expect(pastIncompleteMulti).toContain("dashboard__title_time_ended")
    // has correct option value
    expect(pastIncompleteMulti).toContain(formatDate(new Date("2021-02-22T19:25:08.043Z")))
    // has correct option key
    expect(pastIncompleteMulti).toContain("endDate")
    // has correct translation key (today)
    const pastIncompleteToday = getSurveyTimingHeadline(
      fakeTranslateWithOptions,
      "2021-02-21T19:25:08.043Z",
      "2021-02-23T19:25:08.043Z",
      true // if not marked as completed, this counts as running (see tests above)
    )
    expect(pastIncompleteToday).toContain("dashboard__title_time_ended")
    // has correct option value
    expect(pastIncompleteToday).toContain("dashboard__title_today")
    // has correct option key
    expect(pastIncompleteToday).toContain("endDate")
  })
  it("can getSurveyListIcon", () => {
    // incompleted dates
    expect(getSurveyListIcon(null, "2021-02-23T19:25:08.043Z", false)).toEqual(IconName.PaperSheet)
    expect(getSurveyListIcon("2021-02-23T19:25:08.043Z", null, false)).toEqual(IconName.PaperSheet)
    expect(getSurveyListIcon(null, null, false)).toEqual(IconName.PaperSheet)
    // incompleted dates, but marked as completed
    expect(getSurveyListIcon(null, "2021-02-23T19:25:08.043Z", true)).toEqual(IconName.PaperComplete)
    expect(getSurveyListIcon("2021-02-23T19:25:08.043Z", null, true)).toEqual(IconName.PaperComplete)
    expect(getSurveyListIcon(null, null, true)).toEqual(IconName.PaperComplete)
    // incompleted dates
    expect(getSurveyListIcon("2021-02-21T19:25:08.043Z", "2021-02-23T19:25:08.043Z", false)).toEqual(IconName.PaperEdit)
    expect(getSurveyListIcon("2021-02-23T19:25:08.043Z", "2021-02-24T19:25:08.043Z", false)).toEqual(IconName.PaperEdit)
    expect(getSurveyListIcon("2021-02-24T19:25:08.043Z", "2021-02-25T19:25:08.043Z", false)).toEqual(IconName.PaperEdit)
    expect(getSurveyListIcon("2021-02-19T19:25:08.043Z", "2021-02-21T19:25:08.043Z", false)).toEqual(
      IconName.PaperComplete
    )
  })
  it("can getSurveyDurationLabel", () => {
    // future (tomorrow)
    // has correct translation key
    const futureTomorrow = getSurveyDurationLabel(
      fakeTranslateWithOptions,
      "2021-02-24T19:25:08.043Z",
      "2021-02-25T19:25:08.043Z"
    )
    expect(futureTomorrow).toContain("dashboard__footer_timing_future")
    // has correct option value
    expect(futureTomorrow).toContain(formatDate(new Date("2021-02-24T19:25:08.043Z")))
    expect(futureTomorrow).toContain("dashboard__title_day_to")
    // has correct option key
    expect(futureTomorrow).toContain("date")
    expect(futureTomorrow).toContain("remainingTime")
    // future (days ahead)
    // has correct translation key
    const future = getSurveyDurationLabel(
      fakeTranslateWithOptions,
      "2021-02-26T19:25:08.043Z",
      "2021-02-27T19:25:08.043Z"
    )
    expect(future).toContain("dashboard__footer_timing_future")
    // has correct option value
    expect(future).toContain(formatDate(new Date("2021-02-26T19:25:08.043Z")))
    expect(future).toContain("dashboard__title_days_to")
    expect(future).toContain("2") // number of days
    // has correct option key
    expect(future).toContain("date")
    expect(future).toContain("days")
    expect(future).toContain("remainingTime")

    //undefined
    expect(getSurveyDurationLabel(fakeTranslateWithOptions, null, "2021-02-25T19:25:08.043Z")).toContain(
      "dashboard__details_time_undefined"
    )
    expect(getSurveyDurationLabel(fakeTranslateWithOptions, null, null)).toContain("dashboard__details_time_undefined")
    expect(getSurveyDurationLabel(fakeTranslateWithOptions, "2021-02-25T19:25:08.043Z", null)).toContain(
      "dashboard__details_time_undefined"
    )

    // present (lasting days)
    // has correct translation key
    const present = getSurveyDurationLabel(
      fakeTranslateWithOptions,
      "2021-02-21T19:25:08.043Z",
      "2021-02-27T19:25:08.043Z"
    )
    expect(present).toContain("dashboard__footer_timing_present")
    // has correct option value
    expect(present).toContain("dashboard__title_days_to")
    expect(present).toContain(formatDate(new Date("2021-02-27T19:25:08.043Z")))
    expect(present).toContain("4") // number of days
    // has correct option key
    expect(present).toContain("days")
    expect(present).toContain("remainingTime")
    // present (ending tomorrow)
    // has correct translation key
    const presentTomorrow = getSurveyDurationLabel(
      fakeTranslateWithOptions,
      "2021-02-21T19:25:08.043Z",
      "2021-02-24T19:25:08.043Z"
    )
    expect(presentTomorrow).toContain("dashboard__footer_timing_present")
    // has correct option value
    expect(presentTomorrow).toContain("dashboard__title_day_to")
    expect(presentTomorrow).toContain(formatDate(new Date("2021-02-24T19:25:08.043Z")))
    // has correct option key
    expect(presentTomorrow).toContain("remainingTime")
    // present (ending today)
    // has correct translation key
    const presentToday = getSurveyDurationLabel(
      fakeTranslateWithOptions,
      "2021-02-21T19:25:08.043Z",
      "2021-02-23T19:25:08.043Z"
    )
    expect(presentToday).toContain("dashboard__footer_timing_present")
    // has correct option value
    expect(presentToday).toContain("dashboard__title_days_today")
    expect(presentToday).toContain(formatDate(new Date("2021-02-23T19:25:08.043Z")))
    // has correct option key
    expect(presentToday).toContain("remainingTime")

    // past
    // has correct translation key
    const pastToday = getSurveyDurationLabel(
      fakeTranslateWithOptions,
      "2021-02-21T19:25:08.043Z",
      "2021-02-22T19:25:08.043Z"
    )
    expect(pastToday).toContain("dashboard__footer_timing_past")
    // has correct option value
    expect(pastToday).toContain(formatDateFromString("2021-02-22T19:25:08.043Z"))
    // has correct option key
    expect(pastToday).toContain("end")
  })
  it("can check isSurveyDeletable", () => {
    const futureSurvey = {
      ...surveysMock[0],
      inProgressParticipationsCount: 0,
      isCompleted: false,
      startsAt: "2099-02-22T19:25:08.043Z",
      endsAt: "2099-02-23T19:25:08.043Z",
      isTestSurvey: false
    }
    const completedSurvey = {...futureSurvey, isCompleted: true}
    const runningSurvey = {
      ...futureSurvey,
      startsAt: "2000-02-23T19:25:08.043Z"
    }
    const participatedSurvey = {
      ...futureSurvey,
      inProgressParticipationsCount: 4
    }
    expect(isSurveyDeletable(completedSurvey)).toBe(false)
    expect(isSurveyDeletable(runningSurvey)).toBe(false)
    expect(isSurveyDeletable(participatedSurvey)).toBe(false)
    expect(isSurveyDeletable(futureSurvey)).toBe(true)
    expect(isSurveyDeletable({...completedSurvey, isTestSurvey: true})).toBe(true)
    expect(isSurveyDeletable({...runningSurvey, isTestSurvey: true})).toBe(true)
    expect(isSurveyDeletable({...participatedSurvey, isTestSurvey: true})).toBe(true)
  })
})
