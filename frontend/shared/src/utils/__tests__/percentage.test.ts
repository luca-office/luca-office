import {fakeTranslateWithOptions} from "../../../tests/utils/translate-mock"
import {getPercentage} from "../percentage"

describe("percentage", () => {
  describe("getPercentage", () => {
    it("returns correct percentage", () => {
      expect(getPercentage(fakeTranslateWithOptions, 8, 10)).toEqual('percentage{"percentage":80}')
      expect(getPercentage(fakeTranslateWithOptions, 6, 13)).toEqual('percentage{"percentage":46.15}')
      expect(getPercentage(fakeTranslateWithOptions, 2, 25)).toEqual('percentage{"percentage":8}')
    })
  })
})
