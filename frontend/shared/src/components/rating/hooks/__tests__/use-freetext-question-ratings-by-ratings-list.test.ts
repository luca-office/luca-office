import * as apolloClient from "@apollo/client"
import {renderHook} from "@testing-library/react-hooks"
import {act as actRenderer} from "react-test-renderer"
import wait from "waait"
import {makeFakeClient} from "../../../../../tests/react-apollo/apollo-fake-client"
import {freetextQuestionRatingsMock, ratingsMock} from "../../../../graphql/__mocks__"
import {FreetextQuestionRating} from "../../../../models"
import {useFreetextQuestionRatingsByRatingsList} from "../use-freetext-question-ratings-by-ratings-list"

const fakeClient = makeFakeClient({})
fakeClient.query = jest.fn(
  () =>
    new Promise(resolve => {
      setTimeout(() => resolve({data: {freetextQuestionRatings: freetextQuestionRatingsMock}}), 100)
    })
) as any

const apolloClientSpy = jest.spyOn(apolloClient, "useApolloClient")

const getConnectedHook = () => renderHook(() => useFreetextQuestionRatingsByRatingsList())

describe("use-freetext-question-ratings-by-ratings-list", () => {
  describe("freetextQuestionRatings", () => {
    it("should default to be empty", async () => {
      apolloClientSpy.mockReturnValue(fakeClient)
      const {result} = getConnectedHook()
      expect(result.current.freetextQuestionRatings).toEqual([])
      // Silence mock provider act warnings
      await actRenderer(() => wait(0))
    })
    it("should fetch values", async () => {
      apolloClientSpy.mockReturnValue(fakeClient)
      const {result, waitForNextUpdate} = getConnectedHook()
      actRenderer(() => (result.current.getFreetextQuestionRatings(ratingsMock) as unknown) as Promise<void>)
      await waitForNextUpdate()
      expect(result.current.freetextQuestionRatings).toEqual(
        ratingsMock.reduce(
          accumulator => [...accumulator, ...freetextQuestionRatingsMock],
          [] as FreetextQuestionRating[]
        )
      )
      // Silence mock provider act warnings
      await actRenderer(() => wait(0))
    })
  })
  describe("freetextQuestionRatingsLoading", () => {
    it("should default to be false", async () => {
      apolloClientSpy.mockReturnValue(fakeClient)
      const {result} = getConnectedHook()
      expect(result.current.freetextQuestionRatingsLoading).toEqual(false)
      // Silence mock provider act warnings
      await actRenderer(() => wait(0))
    })
    it("is true while fetching data", async () => {
      apolloClientSpy.mockReturnValue(fakeClient)
      const {result} = getConnectedHook()
      actRenderer(() => (result.current.getFreetextQuestionRatings(ratingsMock) as unknown) as Promise<void>)
      expect(result.current.freetextQuestionRatingsLoading).toEqual(true)
      // Silence mock provider act warnings
      await actRenderer(() => wait(0))
    })
  })
  describe("getFreetextQuestionRatings", () => {
    it("should be a function", async () => {
      apolloClientSpy.mockReturnValue(fakeClient)
      const {result} = getConnectedHook()
      expect(typeof result.current.getFreetextQuestionRatings).toEqual("function")
      // Silence mock provider act warnings
      await actRenderer(() => wait(0))
    })
  })
})
