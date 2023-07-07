import {convertSecondsToTimeString, fillTwoPlaces} from "../date"

describe("dates-fill-two-places", () => {
  it("fills number to two digits", () => {
    expect(fillTwoPlaces(0)).toEqual("00")
    expect(fillTwoPlaces(1)).toEqual("01")
    expect(fillTwoPlaces(11)).toEqual("11")
    expect(fillTwoPlaces(100)).toEqual("100")
  })
})

describe("dates-convert-seconds-to-time-string", () => {
  it("creates time remaining string from seconds", () => {
    expect(convertSecondsToTimeString(0)).toEqual("00:00")
    expect(convertSecondsToTimeString(100)).toEqual("01:40")
    expect(convertSecondsToTimeString(120)).toEqual("02:00")
    expect(convertSecondsToTimeString(3599)).toEqual("59:59")
    expect(convertSecondsToTimeString(60 * 60)).toEqual("01:00:00")
  })
})
