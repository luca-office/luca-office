import {fakeTranslate} from "../../../../../tests/utils/translate-mock"
import {Option} from "../../../../utils/option"
import {mockEmails} from "../__mocks__/email"
import {ArrivalTimeProps, getArrivalTimeLabel} from "../arrival-time"

const email = mockEmails[0]
const arrivalTimeProps: ArrivalTimeProps = {
  email: email,
  scenarioStartedAt: Option.of(new Date("01.01.2020 12:00")),
  scenarioFictiveDate: Option.none(),
  t: fakeTranslate,
  isLabeledWithDay: false
}

describe("search", () => {
  it("returns the time label in the right format", () => {
    const arrivalTimeLabel = getArrivalTimeLabel(arrivalTimeProps)
    expect(arrivalTimeLabel).toEqual("12:00")
  })

  it("returns the time label with the day", () => {
    const arrivalTimeLabel = getArrivalTimeLabel({...arrivalTimeProps, isLabeledWithDay: true})
    expect(arrivalTimeLabel).toEqual("email__today (12:00)")
  })

  it("returns empty string on missing scenarioStartedAt", () => {
    const arrivalTimeLabel = getArrivalTimeLabel({...arrivalTimeProps, scenarioStartedAt: Option.none()})
    expect(arrivalTimeLabel).toEqual("")
  })

  it("returns correct label for past email with fictive date", () => {
    const arrivalTimeLabel = getArrivalTimeLabel({
      ...arrivalTimeProps,
      scenarioStartedAt: Option.of(new Date("01.01.2020 12:00:05")),
      scenarioFictiveDate: Option.of(new Date("01.05.2021")),
      email: {...arrivalTimeProps.email, receptionDelayInSeconds: 60 * 60 * -72}
    })
    expect(arrivalTimeLabel).toEqual("02.01.2021")
  })

  it("returns correct label for future email with fictive date", () => {
    const arrivalTimeLabel = getArrivalTimeLabel({
      ...arrivalTimeProps,
      scenarioStartedAt: Option.of(new Date("01.01.2020 12:00:05")),
      scenarioFictiveDate: Option.of(new Date("01.05.2021")),
      email: {...arrivalTimeProps.email, receptionDelayInSeconds: 60 * 60 * 10}
    })
    expect(arrivalTimeLabel).toEqual("22:00")
  })
  it("returns correct label for yesterday email with fictive date", () => {
    const arrivalTimeLabel = getArrivalTimeLabel({
      ...arrivalTimeProps,
      scenarioStartedAt: Option.of(new Date("01.01.2020 12:00:05")),
      scenarioFictiveDate: Option.of(new Date("01.05.2021")),
      email: {...arrivalTimeProps.email, receptionDelayInSeconds: 60 * 60 * -23}
    })
    expect(arrivalTimeLabel).toEqual("email__yesterday")
  })
})
