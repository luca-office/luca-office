import {convertCentsToEuro, convertEuroToCents, roundNumber} from "../number"

describe("number", () => {
  describe("roundNumber", () => {
    it("correctly rounds number", () => {
      expect(roundNumber(16.667)).toEqual(16.67)
    })
    it("only rounds number if necessary", () => {
      expect(roundNumber(16)).toEqual(16)
    })
    it("correctly rounds to 2 decimal places", () => {
      expect(roundNumber(16.6321)).toEqual(16.63)
    })
  })
  describe("convertCentsToEuro", () => {
    it("correctly converts cents to euro", () => {
      expect(convertCentsToEuro(166)).toEqual(1.66)
      expect(convertCentsToEuro(16)).toEqual(0.16)
    })
    it("correctly rounds to 2 decimal places", () => {
      expect(convertCentsToEuro(16.777555)).toEqual(0.17)
    })
  })
  describe("convertEuroToCents", () => {
    it("correctly converts euro to cents", () => {
      expect(convertEuroToCents(1.66)).toEqual(166)
      expect(convertEuroToCents(0.16)).toEqual(16)
    })
    it("correctly rounds to 2 decimal places", () => {
      expect(convertEuroToCents(1.677755)).toEqual(167.78)
    })
  })
})
