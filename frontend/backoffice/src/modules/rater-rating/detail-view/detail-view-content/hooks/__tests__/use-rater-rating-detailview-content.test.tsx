import {MockedProvider} from "@apollo/client/testing"
import {act, renderHook} from "@testing-library/react-hooks"
import React from "react"
import {surveyIdMock, surveyLightMock} from "shared/graphql/__mocks__"
import {surveyLightQuery} from "shared/graphql/queries"
import {Children} from "shared/styles"
import wait from "waait"
import {useRaterRatingDetailViewContent} from "../use-rater-rating-detail-view-content"

const getConnectedHook = () =>
  renderHook(() => useRaterRatingDetailViewContent(surveyIdMock), {
    wrapper: ({children}: Children) => (
      <MockedProvider
        mocks={[
          {
            request: {
              query: surveyLightQuery,
              variables: {id: surveyIdMock}
            },
            result: {
              data: {
                survey: surveyLightMock
              }
            }
          }
        ]}
        addTypename={true}>
        <>{children}</>
      </MockedProvider>
    )
  })

describe("use-rater-rating-detail-view-content", () => {
  describe("dataLoading", () => {
    it("should be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.dataLoading).toBeDefined()
      await act(() => wait(0))
    })
  })
  describe("survey", () => {
    it("should be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.survey).toBeDefined()
      await act(() => wait(0))
    })
  })
})
