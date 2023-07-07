import {MockedProvider} from "@apollo/client/testing"
import {act, renderHook} from "@testing-library/react-hooks"
import * as React from "react"
import {ratingsMock, surveyIdMock, userAccountMock} from "shared/graphql/__mocks__"
import {ratingsQuery} from "shared/graphql/queries"
import {Children} from "shared/styles"
import wait from "waait"
import {useRating} from "../use-rating"

const getConnectedHook = () =>
  renderHook(() => useRating(surveyIdMock, userAccountMock.id), {
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
          }
        ]}
        addTypename={true}>
        <React.Fragment>{children}</React.Fragment>
      </MockedProvider>
    )
  })

describe("use-rating", () => {
  describe("rating", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.rating).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("ratingLoading", () => {
    it("should default to be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.ratingLoading).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
})
