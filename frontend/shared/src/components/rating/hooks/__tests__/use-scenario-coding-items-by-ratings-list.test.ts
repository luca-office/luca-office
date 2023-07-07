import * as apolloClient from "@apollo/client"
import {renderHook} from "@testing-library/react-hooks"
import {act} from "react-test-renderer"
import wait from "waait"
import {makeFakeClient} from "../../../../../tests/react-apollo/apollo-fake-client"
import {ratingsMock, scenarioManualCodingItemRatingsMock} from "../../../../graphql/__mocks__"
import {ScenarioCodingItemRating} from "../../../../models"
import {useScenarioCodingItemsByRatingsList} from "../use-scenario-coding-items-by-ratings-list"

const fakeClient = makeFakeClient({})
fakeClient.query = jest.fn(
  () =>
    new Promise(resolve => {
      setTimeout(() => resolve({data: {scenarioCodingItemRatings: scenarioManualCodingItemRatingsMock}}), 100)
    })
) as any

const apolloClientSpy = jest.spyOn(apolloClient, "useApolloClient")

const getConnectedHook = () => renderHook(() => useScenarioCodingItemsByRatingsList())

describe("use-scenario-coding-items-by-ratings-list", () => {
  describe("scenarioCodingItemRatings", () => {
    it("should default to be empty", async () => {
      apolloClientSpy.mockReturnValue(fakeClient)
      const {result} = getConnectedHook()
      expect(result.current.scenarioCodingItemRatings).toEqual([])
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
    it("should fetch values", async () => {
      apolloClientSpy.mockReturnValue(fakeClient)
      const {result, waitForNextUpdate} = getConnectedHook()
      act(() => result.current.getScenarioCodingItemRatings(ratingsMock) as Promise<any>)
      await waitForNextUpdate()
      expect(result.current.scenarioCodingItemRatings).toEqual(
        ratingsMock.reduce(
          accumulator => [...accumulator, ...scenarioManualCodingItemRatingsMock],
          [] as ScenarioCodingItemRating[]
        )
      )
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("scenarioCodingItemRatingsLoading", () => {
    it("should default to be false", async () => {
      apolloClientSpy.mockReturnValue(fakeClient)
      const {result} = getConnectedHook()
      expect(result.current.scenarioCodingItemRatingsLoading).toEqual(false)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
    it("is true while fetching data", async () => {
      apolloClientSpy.mockReturnValue(fakeClient)
      const {result} = getConnectedHook()
      act(() => result.current.getScenarioCodingItemRatings(ratingsMock) as Promise<any>)
      expect(result.current.scenarioCodingItemRatingsLoading).toEqual(true)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("getScenarioCodingItemRatings", () => {
    it("should be a function", async () => {
      apolloClientSpy.mockReturnValue(fakeClient)
      const {result} = getConnectedHook()
      expect(typeof result.current.getScenarioCodingItemRatings).toEqual("function")
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
})
