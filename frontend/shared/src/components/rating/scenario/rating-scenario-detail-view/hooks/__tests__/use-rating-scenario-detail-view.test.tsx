import {MockedProvider} from "@apollo/client/testing"
import {act, renderHook} from "@testing-library/react-hooks"
import * as React from "react"
import wait from "waait"
import {
  codingCriteriaMock,
  codingDimensionsMock,
  codingModelsMock,
  ratingsMock,
  scenarioManualCodingItemRatingsMock,
  scenariosMock,
  surveyIdMock,
  surveyInvitationIdMock
} from "../../../../../../graphql/__mocks__"
import {UseCodingDimensionsLazyHook, UseRatingsHook} from "../../../../../../graphql/hooks"
import * as useCodingDimensionsLazyHook from "../../../../../../graphql/hooks/queries/coding-models/use-coding-dimensions-lazy"
import * as useRatingsHook from "../../../../../../graphql/hooks/queries/ratings/use-ratings"
import {Children} from "../../../../../../styles"
import {Option} from "../../../../../../utils"
import {UseCodingCriteriaByItemsListHook, UseScenarioCodingItemsByRatingsListHook} from "../../../../hooks"
import * as useCodingCriteriaByItemsListHook from "../../../../hooks/use-coding-criteria-by-items-list"
import * as useScenarioCodingItemsByRatingsListHook from "../../../../hooks/use-scenario-coding-items-by-ratings-list"
import {ratingScenarioDetailViewResponsesMock} from "../../__mocks__/rating-scenario-detail-view-responses.mock"
import {useRatingScenarioDetailView} from "../use-rating-scenario-detail-view"

const scenarioCodingItemRatingsHookValuesDefault: UseScenarioCodingItemsByRatingsListHook = {
  scenarioCodingItemRatings: scenarioManualCodingItemRatingsMock,
  scenarioCodingItemRatingsLoading: false,
  getScenarioCodingItemRatings: jest.fn(() => Promise.resolve(scenarioManualCodingItemRatingsMock))
}
const scenarioCodingItemRatingsStateSpy = jest.spyOn(
  useScenarioCodingItemsByRatingsListHook,
  "useScenarioCodingItemsByRatingsList"
)

const codingDimensionsLazyHookValuesDefault: UseCodingDimensionsLazyHook = {
  codingDimensions: codingDimensionsMock,
  codingDimensionsLoading: false,
  getCodingDimensions: jest.fn()
}
const codingDimensionsLazySpy = jest.spyOn(useCodingDimensionsLazyHook, "useCodingDimensionsLazy")

const codingCriteriaByItemsListHookValuesDefault: UseCodingCriteriaByItemsListHook = {
  codingCriteria: codingCriteriaMock,
  codingCriteriaLoading: false,
  getCodingCriteria: jest.fn()
}
const codingCriteriaByItemsListSpy = jest.spyOn(useCodingCriteriaByItemsListHook, "useCodingCriteriaByItemsList")

const ratingsHookValuesDefault: UseRatingsHook = {
  ratingsLoading: false,
  ratings: ratingsMock
}
const ratingsSpy = jest.spyOn(useRatingsHook, "useRatings")

const getConnectedHook = (selectedCodingEntityId?: UUID) =>
  renderHook(
    () =>
      useRatingScenarioDetailView({
        surveyId: surveyIdMock,
        scenario: {
          ...scenariosMock[0],
          codingModel: {...codingModelsMock[0], id: codingDimensionsMock[0].codingModelId}
        },
        selectedCodingEntityId,
        ratingId: Option.of(scenarioManualCodingItemRatingsMock[0].ratingId),
        surveyInvitationId: surveyInvitationIdMock,
        showDataForAllParticipants: false
      }),
    {
      wrapper: ({children}: Children) => (
        <MockedProvider mocks={ratingScenarioDetailViewResponsesMock} addTypename={true}>
          <React.Fragment>{children}</React.Fragment>
        </MockedProvider>
      )
    }
  )

describe("use-rating-scenario-detail-view", () => {
  describe("dataLoading", () => {
    it("should default to be defined", async () => {
      scenarioCodingItemRatingsStateSpy.mockReturnValue(scenarioCodingItemRatingsHookValuesDefault)
      codingDimensionsLazySpy.mockReturnValue(codingDimensionsLazyHookValuesDefault)
      codingCriteriaByItemsListSpy.mockReturnValue(codingCriteriaByItemsListHookValuesDefault)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.dataLoading).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("selectedCodingDimension", () => {
    it("should default to be defined", async () => {
      scenarioCodingItemRatingsStateSpy.mockReturnValue(scenarioCodingItemRatingsHookValuesDefault)
      codingDimensionsLazySpy.mockReturnValue(codingDimensionsLazyHookValuesDefault)
      codingCriteriaByItemsListSpy.mockReturnValue(codingCriteriaByItemsListHookValuesDefault)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.selectedCodingDimension).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("selectedCodingItem", () => {
    it("should default to be defined", async () => {
      scenarioCodingItemRatingsStateSpy.mockReturnValue(scenarioCodingItemRatingsHookValuesDefault)
      codingDimensionsLazySpy.mockReturnValue(codingDimensionsLazyHookValuesDefault)
      codingCriteriaByItemsListSpy.mockReturnValue(codingCriteriaByItemsListHookValuesDefault)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.selectedCodingItem).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("label", () => {
    it("should default to be defined", async () => {
      scenarioCodingItemRatingsStateSpy.mockReturnValue(scenarioCodingItemRatingsHookValuesDefault)
      codingDimensionsLazySpy.mockReturnValue(codingDimensionsLazyHookValuesDefault)
      codingCriteriaByItemsListSpy.mockReturnValue(codingCriteriaByItemsListHookValuesDefault)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.label).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("description", () => {
    it("should default to be defined", async () => {
      scenarioCodingItemRatingsStateSpy.mockReturnValue(scenarioCodingItemRatingsHookValuesDefault)
      codingDimensionsLazySpy.mockReturnValue(codingDimensionsLazyHookValuesDefault)
      codingCriteriaByItemsListSpy.mockReturnValue(codingCriteriaByItemsListHookValuesDefault)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.description).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("isOverviewPage", () => {
    it("should default to be defined", async () => {
      scenarioCodingItemRatingsStateSpy.mockReturnValue(scenarioCodingItemRatingsHookValuesDefault)
      codingDimensionsLazySpy.mockReturnValue(codingDimensionsLazyHookValuesDefault)
      codingCriteriaByItemsListSpy.mockReturnValue(codingCriteriaByItemsListHookValuesDefault)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.isOverviewPage).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("isAutomatedCodingItem", () => {
    it("should default to be defined", async () => {
      scenarioCodingItemRatingsStateSpy.mockReturnValue(scenarioCodingItemRatingsHookValuesDefault)
      codingDimensionsLazySpy.mockReturnValue(codingDimensionsLazyHookValuesDefault)
      codingCriteriaByItemsListSpy.mockReturnValue(codingCriteriaByItemsListHookValuesDefault)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.isAutomatedCodingItem).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("score", () => {
    it("should default to be defined", async () => {
      scenarioCodingItemRatingsStateSpy.mockReturnValue(scenarioCodingItemRatingsHookValuesDefault)
      codingDimensionsLazySpy.mockReturnValue(codingDimensionsLazyHookValuesDefault)
      codingCriteriaByItemsListSpy.mockReturnValue(codingCriteriaByItemsListHookValuesDefault)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.score).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("maxScore", () => {
    it("should default to be defined", async () => {
      scenarioCodingItemRatingsStateSpy.mockReturnValue(scenarioCodingItemRatingsHookValuesDefault)
      codingDimensionsLazySpy.mockReturnValue(codingDimensionsLazyHookValuesDefault)
      codingCriteriaByItemsListSpy.mockReturnValue(codingCriteriaByItemsListHookValuesDefault)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.maxScore).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("backgroundIcon", () => {
    it("should default to be defined", async () => {
      scenarioCodingItemRatingsStateSpy.mockReturnValue(scenarioCodingItemRatingsHookValuesDefault)
      codingDimensionsLazySpy.mockReturnValue(codingDimensionsLazyHookValuesDefault)
      codingCriteriaByItemsListSpy.mockReturnValue(codingCriteriaByItemsListHookValuesDefault)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.backgroundIcon).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("overviewEntityName", () => {
    it("should contain correct value", async () => {
      scenarioCodingItemRatingsStateSpy.mockReturnValue(scenarioCodingItemRatingsHookValuesDefault)
      codingDimensionsLazySpy.mockReturnValue(codingDimensionsLazyHookValuesDefault)
      codingCriteriaByItemsListSpy.mockReturnValue(codingCriteriaByItemsListHookValuesDefault)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.overviewEntityName).toEqual("rating_scenario__main_dimensions_label (3)")
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("overviewEntities", () => {
    it("should default to be defined", async () => {
      scenarioCodingItemRatingsStateSpy.mockReturnValue(scenarioCodingItemRatingsHookValuesDefault)
      codingDimensionsLazySpy.mockReturnValue(codingDimensionsLazyHookValuesDefault)
      codingCriteriaByItemsListSpy.mockReturnValue(codingCriteriaByItemsListHookValuesDefault)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.overviewEntities).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("scenarioCodingItemRating", () => {
    it("should default to be defined", async () => {
      scenarioCodingItemRatingsStateSpy.mockReturnValue(scenarioCodingItemRatingsHookValuesDefault)
      codingDimensionsLazySpy.mockReturnValue(codingDimensionsLazyHookValuesDefault)
      codingCriteriaByItemsListSpy.mockReturnValue(codingCriteriaByItemsListHookValuesDefault)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.scenarioCodingItemRating).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("codingCriteria", () => {
    it("should default to be defined", async () => {
      scenarioCodingItemRatingsStateSpy.mockReturnValue(scenarioCodingItemRatingsHookValuesDefault)
      codingDimensionsLazySpy.mockReturnValue(codingDimensionsLazyHookValuesDefault)
      codingCriteriaByItemsListSpy.mockReturnValue(codingCriteriaByItemsListHookValuesDefault)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.codingCriteria).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("scoringType", () => {
    it("should default to be defined", async () => {
      scenarioCodingItemRatingsStateSpy.mockReturnValue(scenarioCodingItemRatingsHookValuesDefault)
      codingDimensionsLazySpy.mockReturnValue(codingDimensionsLazyHookValuesDefault)
      codingCriteriaByItemsListSpy.mockReturnValue(codingCriteriaByItemsListHookValuesDefault)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.scoringType).toBeDefined()
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("createScenarioCodingItemRatingLoading", () => {
    it("has correct value", async () => {
      scenarioCodingItemRatingsStateSpy.mockReturnValue(scenarioCodingItemRatingsHookValuesDefault)
      codingDimensionsLazySpy.mockReturnValue(codingDimensionsLazyHookValuesDefault)
      codingCriteriaByItemsListSpy.mockReturnValue(codingCriteriaByItemsListHookValuesDefault)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.createScenarioCodingItemRatingLoading).toEqual(false)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("isRatingInProgress", () => {
    it("has correct value", async () => {
      scenarioCodingItemRatingsStateSpy.mockReturnValue(scenarioCodingItemRatingsHookValuesDefault)
      codingDimensionsLazySpy.mockReturnValue(codingDimensionsLazyHookValuesDefault)
      codingCriteriaByItemsListSpy.mockReturnValue(codingCriteriaByItemsListHookValuesDefault)
      ratingsSpy.mockReturnValue(ratingsHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.isRatingInProgress).toEqual(true)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
})
