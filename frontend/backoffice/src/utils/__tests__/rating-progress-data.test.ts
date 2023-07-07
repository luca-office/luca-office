import {chartCompleteColor, chartIncompleteColor} from "shared/styles"
import {fakeTranslate} from "sharedTests/utils/translate-mock"
import {getRatingProgressData} from "../rating-progress-data"

describe("rating-progress-data", () => {
  describe("getRatingProgressData", () => {
    it("returns correct data", () => {
      expect(getRatingProgressData({t: fakeTranslate, ongoingCount: 6, finishedCount: 12})).toEqual([
        {
          color: chartIncompleteColor,
          key: "ongoing",
          title: "dashboard__progress_chart_rating_ongoing",
          value: 6
        },
        {
          color: chartCompleteColor,
          key: "finished",
          title: "dashboard__progress_chart_rating_finished",
          value: 12
        }
      ])
    })
  })
})
