import {MockedProvider} from "@apollo/client/testing"
import {act, renderHook} from "@testing-library/react-hooks"
import * as React from "react"
import wait from "waait"
import {
  automatedCodingCriteriaMock,
  automatedCodingItemMock,
  ratingsMock,
  scenarioAutomatedCodingItemRatingsMock,
  scenariosMock
} from "../../../../../../../graphql/__mocks__"
import {QuestionScoringType} from "../../../../../../../graphql/generated/globalTypes"
import {UseUpdateAutomatedCodingItemHook} from "../../../../../../../graphql/hooks"
import * as useUpdateAutomatedCodingItemHook from "../../../../../../../graphql/hooks/mutations/coding-model/use-update-automated-coding-item"
import {ScenarioCodingItemRating} from "../../../../../../../models"
import {Children} from "../../../../../../../styles"
import {Option} from "../../../../../../../utils"
import {scenarioAutomaticRatingTableResponsesMock} from "../../../__mocks__/scenario-automatic-rating-table-responses.mock"
import {useScenarioAutomaticRatingTable} from "../use-scenario-automatic-rating-table"

const codingItem = automatedCodingItemMock
const scenario = scenariosMock[0]
const scenarioCodingItemRating = {...scenarioAutomatedCodingItemRatingsMock[0], scenarioId: scenario.id}

const updateAutomatedCodingItemHookValuesDefault: UseUpdateAutomatedCodingItemHook = {
  updateAutomatedCodingItem: jest.fn(),
  updateAutomatedCodingItemLoading: false
}
const updateAutomatedCodingItemSpy = jest.spyOn(useUpdateAutomatedCodingItemHook, "useUpdateAutomatedCodingItem")

const getConnectedHook = () =>
  renderHook(
    () =>
      useScenarioAutomaticRatingTable({
        scenarioCodingItemRating: Option.of<ScenarioCodingItemRating>(scenarioCodingItemRating),
        scoringType: QuestionScoringType.Analytical,
        codingItem,
        surveyInvitationId: scenarioCodingItemRating.surveyInvitationId,
        scenario: scenario,
        codingCriteria: automatedCodingCriteriaMock,
        ratingId: Option.of(ratingsMock[0].id)
      }),
    {
      wrapper: ({children}: Children) => (
        <MockedProvider mocks={scenarioAutomaticRatingTableResponsesMock} addTypename={true}>
          <React.Fragment>{children}</React.Fragment>
        </MockedProvider>
      )
    }
  )

describe("use-scenario-manual-rating-table", () => {
  describe("actionLoading", () => {
    it("should default to be false", async () => {
      updateAutomatedCodingItemSpy.mockReturnValue(updateAutomatedCodingItemHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.actionLoading).toEqual(false)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("updateCriterionSelection", () => {
    it("should be a function", async () => {
      updateAutomatedCodingItemSpy.mockReturnValue(updateAutomatedCodingItemHookValuesDefault)
      const {result} = getConnectedHook()
      expect(typeof result.current.updateCriterionSelection).toEqual("function")
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("applyRatingChanges", () => {
    it("should be a function", async () => {
      updateAutomatedCodingItemSpy.mockReturnValue(updateAutomatedCodingItemHookValuesDefault)
      const {result} = getConnectedHook()
      expect(typeof result.current.applyRatingChanges).toEqual("function")
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("isSelected", () => {
    it("should be a function", async () => {
      updateAutomatedCodingItemSpy.mockReturnValue(updateAutomatedCodingItemHookValuesDefault)
      const {result} = getConnectedHook()
      expect(typeof result.current.isSelected).toEqual("function")
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("hasRatingChanged", () => {
    it("should default to be a false", async () => {
      updateAutomatedCodingItemSpy.mockReturnValue(updateAutomatedCodingItemHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.hasRatingChanged).toEqual(false)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("dataLoading", () => {
    it("should default to be a true", async () => {
      updateAutomatedCodingItemSpy.mockReturnValue(updateAutomatedCodingItemHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.dataLoading).toEqual(true)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("isComputerRaterSelection", () => {
    it("should return correct value", async () => {
      updateAutomatedCodingItemSpy.mockReturnValue(updateAutomatedCodingItemHookValuesDefault)
      const {result} = getConnectedHook()
      expect(typeof result.current.isComputerRaterSelection).toEqual("function")
      expect(result.current.isComputerRaterSelection(automatedCodingCriteriaMock[0])).toEqual(false)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
})
