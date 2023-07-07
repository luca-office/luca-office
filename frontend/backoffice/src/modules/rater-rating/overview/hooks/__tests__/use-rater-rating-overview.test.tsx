import {MockedProvider} from "@apollo/client/testing"
import {act, renderHook} from "@testing-library/react-hooks"
import React from "react"
import {checkLoginMock, ratingsMock, surveysMock, userAccountMock} from "shared/graphql/__mocks__"
import {checkLoginQuery, surveysForUserAccountQuery} from "shared/graphql/queries"
import {Children} from "shared/styles"
import wait from "waait"
import {UseRatingsBySurveysHook} from "../../../hooks"
import * as useRatingsBySurveysHook from "../../../hooks/use-ratings-by-surveys"
import {useRaterRatingOverview} from "../use-rater-rating-overview"

const ratingsBySurveysHookValuesDefault: UseRatingsBySurveysHook = {
  ratingsLoading: false,
  ratings: ratingsMock,
  getRatings: jest.fn(() => Promise.resolve(ratingsMock))
}
const ratingsBySurveysSpy = jest.spyOn(useRatingsBySurveysHook, "useRatingsBySurveys")

const getConnectedHook = () =>
  renderHook(() => useRaterRatingOverview(), {
    wrapper: ({children}: Children) => (
      <MockedProvider
        mocks={[
          {
            request: {
              query: checkLoginQuery
            },
            result: {
              data: {
                checkLogin: checkLoginMock
              }
            }
          },
          {
            request: {
              query: surveysForUserAccountQuery,
              variables: {userAccountId: userAccountMock.id}
            },
            result: {
              data: {
                surveysForUserAccount: surveysMock
              }
            }
          }
        ]}
        addTypename={true}>
        <>{children}</>
      </MockedProvider>
    )
  })

describe("use-rater-rating-overview", () => {
  describe("dataLoading", () => {
    it("should be defined", async () => {
      ratingsBySurveysSpy.mockReturnValue(ratingsBySurveysHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.dataLoading).toBeDefined()
      await act(() => wait(0))
    })
  })
  describe("userAccount", () => {
    it("should be defined", async () => {
      ratingsBySurveysSpy.mockReturnValue(ratingsBySurveysHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.userAccount).toBeDefined()
      await act(() => wait(0))
    })
  })
  describe("surveys", () => {
    it("should be defined", async () => {
      ratingsBySurveysSpy.mockReturnValue(ratingsBySurveysHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.surveys).toBeDefined()
      await act(() => wait(0))
    })
  })
})
