import {MockedProvider} from "@apollo/client/testing"
import {renderHook} from "@testing-library/react-hooks"
import * as React from "react"
import {act} from "react-test-renderer"
import wait from "waait"
import {
  codingCriteriaMock,
  ratingsMock,
  scenarioManualCodingItemRatingsMock
} from "../../../../../../../graphql/__mocks__"
import {QuestionScoringType} from "../../../../../../../graphql/generated/globalTypes"
import {Children} from "../../../../../../../styles"
import {Option} from "../../../../../../../utils"
import {scenarioManualRatingTableResponsesMock} from "../../../__mocks__/scenario-manual-rating-table-responses.mock"
import {useScenarioManualRatingTable} from "../use-scenario-manual-rating-table"

const scenarioCodingItemRating = scenarioManualCodingItemRatingsMock[0]

const getConnectedHook = () =>
  renderHook(
    () =>
      useScenarioManualRatingTable({
        scenarioCodingItemRating: Option.of(scenarioCodingItemRating),
        scoringType: QuestionScoringType.Analytical,
        codingCriteria: codingCriteriaMock,
        ratingId: Option.of(ratingsMock[0].id)
      }),
    {
      wrapper: ({children}: Children) => (
        <MockedProvider mocks={scenarioManualRatingTableResponsesMock} addTypename={true}>
          <React.Fragment>{children}</React.Fragment>
        </MockedProvider>
      )
    }
  )

describe("use-scenario-manual-rating-table", () => {
  describe("actionLoading", () => {
    it("should be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.actionLoading).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("noCriterionFulfilled", () => {
    it("should be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.noCriterionFulfilled).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("isSelected", () => {
    it("should be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.isSelected).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("hasRatingChanged", () => {
    it("should be defined", async () => {
      const {result} = getConnectedHook()
      expect(result.current.hasRatingChanged).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
})
