import {renderHook} from "@testing-library/react-hooks"
import {act} from "react-test-renderer"
import {ratingsMock, surveysMock, userAccountsMock} from "shared/graphql/__mocks__"
import {SurveyUserAccountsHook, UseRatingsHook} from "shared/graphql/hooks"
import * as useRatingsHook from "shared/graphql/hooks/queries/ratings/use-ratings"
import * as surveyUserAccountsHook from "shared/graphql/hooks/queries/survey/use-survey-user-accounts"
import wait from "waait"
import {useRatersCard} from "../use-raters-card"

const survey = surveysMock[0]

const ratingsHookValuesDefault: UseRatingsHook = {
  ratingsLoading: false,
  ratings: ratingsMock
}
const ratingsSpy = jest.spyOn(useRatingsHook, "useRatings")

const surveyUserAccountsHookValuesDefault: SurveyUserAccountsHook = {
  surveyUserAccountsLoading: false,
  surveyUserAccounts: userAccountsMock
}
const surveyUserAccountsSpy = jest.spyOn(surveyUserAccountsHook, "useSurveyUserAccounts")

const getConnectedHook = () => renderHook(() => useRatersCard(survey.id))

describe("use-raters-card", () => {
  describe("ratersCount", () => {
    it("should be defined", async () => {
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      surveyUserAccountsSpy.mockReturnValue(surveyUserAccountsHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.ratersCount).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("raterEntities", () => {
    it("should be defined", async () => {
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      surveyUserAccountsSpy.mockReturnValue(surveyUserAccountsHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.raterEntities).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("raterEmails", () => {
    it("should be defined", async () => {
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      surveyUserAccountsSpy.mockReturnValue(surveyUserAccountsHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.raterEmails).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("inviteOverlayVisible", () => {
    it("should be defined", async () => {
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      surveyUserAccountsSpy.mockReturnValue(surveyUserAccountsHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.inviteOverlayVisible).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("raters", () => {
    it("has correct value", async () => {
      const {result} = getConnectedHook()
      expect(result.current.raters).toEqual(userAccountsMock)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("ratings", () => {
    it("has correct value", async () => {
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      surveyUserAccountsSpy.mockReturnValue(surveyUserAccountsHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.ratings).toEqual([ratingsMock[1]])
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("isRatingFinalized", () => {
    it("has correct value", async () => {
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      surveyUserAccountsSpy.mockReturnValue(surveyUserAccountsHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.isRatingFinalized).toEqual(false)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
})
