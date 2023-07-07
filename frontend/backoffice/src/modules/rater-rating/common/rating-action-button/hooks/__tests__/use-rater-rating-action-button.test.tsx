import {MockedProvider} from "@apollo/client/testing"
import {act, renderHook} from "@testing-library/react-hooks"
import React from "react"
import {ratingsMock, surveyIdMock, userAccountMock} from "shared/graphql/__mocks__"
import {finalizeRatingMutation} from "shared/graphql/mutations"
import {ratingsQuery} from "shared/graphql/queries"
import {Children} from "shared/styles"
import wait from "waait"
import {useRaterRatingActionButton} from "../use-rater-rating-action-button"

const rating = ratingsMock[0]

const getConnectedHook = () =>
  renderHook(() => useRaterRatingActionButton(surveyIdMock, userAccountMock.id), {
    wrapper: ({children}: Children) => (
      <MockedProvider
        mocks={[
          {
            request: {
              query: ratingsQuery,
              variables: {surveyId: surveyIdMock}
            },
            result: {
              data: {
                ratings: ratingsMock
              }
            }
          },
          {
            request: {
              query: finalizeRatingMutation,
              variables: {id: rating.id}
            },
            result: {
              data: {
                finalizeRating: rating
              }
            }
          }
        ]}
        addTypename={true}>
        <>{children}</>
      </MockedProvider>
    )
  })

describe("use-rater-rating-action-button", () => {
  describe("dataLoading", () => {
    it("should be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.dataLoading).toBeDefined()
      await act(() => wait(0))
    })
  })
  describe("actionLoading", () => {
    it("should be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.actionLoading).toBeDefined()
      await act(() => wait(0))
    })
  })
  describe("isFinalized", () => {
    it("should be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.isFinalized).toBeDefined()
      await act(() => wait(0))
    })
  })
  describe("isOrlyVisible", () => {
    it("should contain correct value", async () => {
      const {result} = getConnectedHook()
      expect(result.current.isOrlyVisible).toEqual(false)
      await act(() => wait(0))
    })
  })
  describe("showOrly", () => {
    it("should be a function", async () => {
      const {result} = getConnectedHook()
      expect(typeof result.current.showOrly).toEqual("function")
      await act(() => wait(0))
    })
  })
  describe("onConfirm", () => {
    it("should be a function", async () => {
      const {result} = getConnectedHook()
      expect(typeof result.current.onConfirm).toEqual("function")
      await act(() => wait(0))
    })
  })
  describe("onCancel", () => {
    it("should be a function", async () => {
      const {result} = getConnectedHook()
      expect(typeof result.current.onCancel).toEqual("function")
      await act(() => wait(0))
    })
  })
})
