import {IconName, RatingStatus} from "shared/enums"
import {fakeTranslate} from "sharedTests/utils/translate-mock"
import {getRatingStatus, getRatingStatusIcon, getRatingStatusLabel} from "../rating-status"

describe("rating-status", () => {
  describe("getRatingStatus", () => {
    it("returns correct status (survey in progress)", () => {
      expect(getRatingStatus(true, 12, 8)).toEqual(RatingStatus.SurveyInProgress)
    })
    it("returns correct status (rating in progress)", () => {
      expect(getRatingStatus(false, 12, 8)).toEqual(RatingStatus.RatingInProgress)
    })
    it("returns correct status (completed)", () => {
      expect(getRatingStatus(false, 12, 12)).toEqual(RatingStatus.Completed)
    })
  })
  describe("getRatingStatusIcon", () => {
    it("returns correct icon (survey in progress)", () => {
      expect(getRatingStatusIcon(RatingStatus.SurveyInProgress)).toEqual(IconName.Sandglass)
    })
    it("returns correct icon (rating in progress)", () => {
      expect(getRatingStatusIcon(RatingStatus.RatingInProgress)).toEqual(IconName.EditBordered)
    })
    it("returns correct icon (completed)", () => {
      expect(getRatingStatusIcon(RatingStatus.Completed)).toEqual(IconName.Check)
    })
  })
  describe("getRatingStatusLabel", () => {
    it("returns correct label (survey in progress)", () => {
      expect(getRatingStatusLabel(fakeTranslate, RatingStatus.SurveyInProgress)).toEqual(
        "rater_rating__status_survey_in_progress"
      )
    })
    it("returns correct label (rating in progress)", () => {
      expect(getRatingStatusLabel(fakeTranslate, RatingStatus.RatingInProgress)).toEqual(
        "rater_rating__status_rating_in_progress"
      )
    })
    it("returns correct label (completed)", () => {
      expect(getRatingStatusLabel(fakeTranslate, RatingStatus.Completed)).toEqual(
        "rater_rating__status_rating_completed"
      )
    })
  })
})
