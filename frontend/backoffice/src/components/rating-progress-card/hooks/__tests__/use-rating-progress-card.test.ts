import {renderHook} from "@testing-library/react-hooks"
import {act} from "react-test-renderer"
import {ratingsMock, surveyIdMock, userAccountsMock} from "shared/graphql/__mocks__"
import {SurveyUserAccountsHook as UseSurveyUserAccountsHook, UseRatingsHook} from "shared/graphql/hooks"
import * as useRatingsHook from "shared/graphql/hooks/queries/ratings/use-ratings"
import * as useSurveyUserAccountsHook from "shared/graphql/hooks/queries/survey/use-survey-user-accounts"
import wait from "waait"
import {useRatingProgressCard} from "../use-rating-progress-card"

const ratingsHookValuesDefault: UseRatingsHook = {
  ratingsLoading: false,
  ratings: ratingsMock
}
const ratingsSpy = jest.spyOn(useRatingsHook, "useRatings")

const surveyUserAccountsHookValuesDefault: UseSurveyUserAccountsHook = {
  surveyUserAccountsLoading: false,
  surveyUserAccounts: userAccountsMock
}
const surveyUserAccountsSpy = jest.spyOn(useSurveyUserAccountsHook, "useSurveyUserAccounts")

const getConnectedHook = () => renderHook(() => useRatingProgressCard(surveyIdMock))

describe("use-rating-progress-card", () => {
  describe("ratersInProgressCount", () => {
    it("has correct value", async () => {
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      surveyUserAccountsSpy.mockReturnValue(surveyUserAccountsHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.ratersInProgressCount).toEqual(2)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("finishedRatersCount", () => {
    it("has correct value", async () => {
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      surveyUserAccountsSpy.mockReturnValue(surveyUserAccountsHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.finishedRatersCount).toEqual(1)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
})
