import {MockedProvider} from "@apollo/client/testing"
import {act, renderHook} from "@testing-library/react-hooks"
import {pick} from "lodash-es"
import React from "react"
import wait from "waait"
import {fakeTranslate} from "../../../../../../../tests/utils/translate-mock"
import {IconName, RaterMode} from "../../../../../../enums"
import {
  checkLoginMock,
  codingCriteriaMock,
  freetextQuestionRatingsMock,
  ratingsMock,
  scenarioManualCodingItemRatingsMock,
  surveyIdMock,
  userAccountsMock
} from "../../../../../../graphql/__mocks__"
import {QuestionScoringType} from "../../../../../../graphql/generated/globalTypes"
import {checkLoginQuery, ratingsQuery, surveyUserAccountsQuery} from "../../../../../../graphql/queries"
import {Children} from "../../../../../../styles"
import {Option} from "../../../../../../utils"
import * as useFreetextQuestionRatingsByRatingsListHook from "../../../../../rating/hooks/use-freetext-question-ratings-by-ratings-list"
import * as useScenarioCodingItemRatingsByRatingsListHook from "../../../../../rating/hooks/use-scenario-coding-item-ratings-by-ratings-list"
import * as useScenarioCodingItemsByRatingsListHook from "../../../../../rating/hooks/use-scenario-coding-items-by-ratings-list"
import {getCriterionRatingTableColumns} from "../../../../config"
import {
  UseFreetextQuestionRatingsByRatingsListHook,
  UseScenarioCodingItemRatingsByRatingsListHook,
  UseScenarioCodingItemsByRatingsListHook
} from "../../../../hooks"
import {useCriterionRatingTable, UseCriterionRatingTableParams} from "../use-criterion-rating-table"

const defaultParams: UseCriterionRatingTableParams = {
  criteria: codingCriteriaMock,
  scoringType: QuestionScoringType.Analytical,
  setNoCriterionFulfilled: jest.fn(),
  scoringTypeIcon: IconName.Scoring,
  isSelected: jest.fn(),
  readOnly: false,
  mode: RaterMode.FinalRater,
  surveyId: surveyIdMock,
  isScenario: false,
  showSelectionInput: true,
  useOnlyFinalScores: false,
  showRaterCount: false,
  showDataForAllParticipants: false
}

const scenarioCodingItemRatingsByRatingsListHookValuesDefault: UseScenarioCodingItemRatingsByRatingsListHook = {
  scenarioCodingItemRatings: scenarioManualCodingItemRatingsMock,
  scenarioCodingItemRatingsLoading: false,
  getScenarioCodingItemRatings: jest.fn()
}

const scenarioCodingItemRatingsByRatingsListSpy = jest.spyOn(
  useScenarioCodingItemRatingsByRatingsListHook,
  "useScenarioCodingItemRatingsByRatingsList"
)

const freetextQuestionHookValuesDefault: UseFreetextQuestionRatingsByRatingsListHook = {
  freetextQuestionRatings: freetextQuestionRatingsMock,
  freetextQuestionRatingsLoading: false,
  getFreetextQuestionRatings: jest.fn(() => Promise.resolve(freetextQuestionRatingsMock))
}

const freetextQuestionStateSpy = jest.spyOn(
  useFreetextQuestionRatingsByRatingsListHook,
  "useFreetextQuestionRatingsByRatingsList"
)

const scenarioCodingItemsByRatingsListHookValuesDefault: UseScenarioCodingItemsByRatingsListHook = {
  scenarioCodingItemRatings: scenarioManualCodingItemRatingsMock,
  scenarioCodingItemRatingsLoading: false,
  getScenarioCodingItemRatings: jest.fn(() => Promise.resolve(scenarioManualCodingItemRatingsMock))
}
const scenarioCodingItemsByRatingsListStateSpy = jest.spyOn(
  useScenarioCodingItemsByRatingsListHook,
  "useScenarioCodingItemsByRatingsList"
)

const getConnectedHook = (params?: Partial<UseCriterionRatingTableParams>) =>
  renderHook(() => useCriterionRatingTable({...defaultParams, ...params}), {
    wrapper: ({children}: Children) => (
      <MockedProvider
        mocks={[
          {
            request: {
              query: surveyUserAccountsQuery,
              variables: {surveyId: surveyIdMock}
            },
            result: {
              data: {
                userAccountsForSurvey: userAccountsMock
              }
            }
          },
          {
            request: {
              query: ratingsQuery,
              variables: {surveyId: surveyIdMock}
            },
            result: {
              data: {
                ratings: [
                  ...ratingsMock,
                  {
                    __typename: "Rating",
                    id: "74d0db90-9d26-4bcc-be25-c23ff463731c",
                    createdAt: new Date(2019, 10, 5).toISOString(),
                    modifiedAt: new Date(2019, 10, 15).toISOString(),
                    finalizedAt: new Date(2019, 10, 20).toISOString(),
                    surveyId: surveyIdMock,
                    userAccountId: userAccountsMock[0].id,
                    isFinalScore: true
                  }
                ]
              }
            }
          },
          {
            request: {
              query: checkLoginQuery
            },
            result: {
              data: {
                checkLogin: checkLoginMock
              }
            }
          }
        ]}
        addTypename={true}>
        <>{children}</>
      </MockedProvider>
    )
  })

describe("use-criterion-rating-table", () => {
  describe("dataLoading", () => {
    it("should be true", async () => {
      scenarioCodingItemRatingsByRatingsListSpy.mockReturnValue(scenarioCodingItemRatingsByRatingsListHookValuesDefault)
      freetextQuestionStateSpy.mockReturnValue(freetextQuestionHookValuesDefault)
      scenarioCodingItemsByRatingsListStateSpy.mockReturnValue(scenarioCodingItemsByRatingsListHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.dataLoading).toEqual(true)
      await act(() => wait(0))
    })
    it("should be false", async () => {
      scenarioCodingItemRatingsByRatingsListSpy.mockReturnValue(scenarioCodingItemRatingsByRatingsListHookValuesDefault)
      freetextQuestionStateSpy.mockReturnValue(freetextQuestionHookValuesDefault)
      scenarioCodingItemsByRatingsListStateSpy.mockReturnValue(scenarioCodingItemsByRatingsListHookValuesDefault)
      const {result, waitForNextUpdate} = getConnectedHook()
      await waitForNextUpdate()
      expect(result.current.dataLoading).toEqual(false)
      await act(() => wait(0))
    })
  })
  describe("isFinalRater", () => {
    it("should be false", async () => {
      scenarioCodingItemRatingsByRatingsListSpy.mockReturnValue(scenarioCodingItemRatingsByRatingsListHookValuesDefault)
      freetextQuestionStateSpy.mockReturnValue(freetextQuestionHookValuesDefault)
      scenarioCodingItemsByRatingsListStateSpy.mockReturnValue(scenarioCodingItemsByRatingsListHookValuesDefault)
      const {result} = getConnectedHook({mode: RaterMode.Rater})
      expect(result.current.isFinalRater).toEqual(false)
      await act(() => wait(0))
    })
    it("should be true", async () => {
      scenarioCodingItemRatingsByRatingsListSpy.mockReturnValue(scenarioCodingItemRatingsByRatingsListHookValuesDefault)
      freetextQuestionStateSpy.mockReturnValue(freetextQuestionHookValuesDefault)
      scenarioCodingItemsByRatingsListStateSpy.mockReturnValue(scenarioCodingItemsByRatingsListHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.isFinalRater).toEqual(true)
      await act(() => wait(0))
    })
  })
  describe("sortedEntities", () => {
    it("should default to be empty", async () => {
      scenarioCodingItemRatingsByRatingsListSpy.mockReturnValue(scenarioCodingItemRatingsByRatingsListHookValuesDefault)
      freetextQuestionStateSpy.mockReturnValue(freetextQuestionHookValuesDefault)
      scenarioCodingItemsByRatingsListStateSpy.mockReturnValue(scenarioCodingItemsByRatingsListHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.sortedEntities).toEqual([])
      await act(() => wait(0))
    })
    it("correctly sets value", async () => {
      const entities = codingCriteriaMock
        .slice(0, codingCriteriaMock.length - 1)
        .map(entity => ({...entity, automatedData: Option.none()}))
      scenarioCodingItemRatingsByRatingsListSpy.mockReturnValue(scenarioCodingItemRatingsByRatingsListHookValuesDefault)
      freetextQuestionStateSpy.mockReturnValue(freetextQuestionHookValuesDefault)
      scenarioCodingItemsByRatingsListStateSpy.mockReturnValue(scenarioCodingItemsByRatingsListHookValuesDefault)
      const {result, waitForNextUpdate} = getConnectedHook()
      await waitForNextUpdate()
      expect(JSON.stringify(result.current.sortedEntities)).toEqual(JSON.stringify(entities))
      await act(() => wait(0))
    })
  })
  describe("showNoCriterionFulfilledFooter", () => {
    it("should be true", async () => {
      scenarioCodingItemRatingsByRatingsListSpy.mockReturnValue(scenarioCodingItemRatingsByRatingsListHookValuesDefault)
      freetextQuestionStateSpy.mockReturnValue(freetextQuestionHookValuesDefault)
      scenarioCodingItemsByRatingsListStateSpy.mockReturnValue(scenarioCodingItemsByRatingsListHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.showNoCriterionFulfilledFooter).toBeDefined()
      await act(() => wait(0))
    })
    it("should be false (scoringType=holistic)", async () => {
      scenarioCodingItemRatingsByRatingsListSpy.mockReturnValue(scenarioCodingItemRatingsByRatingsListHookValuesDefault)
      freetextQuestionStateSpy.mockReturnValue(freetextQuestionHookValuesDefault)
      scenarioCodingItemsByRatingsListStateSpy.mockReturnValue(scenarioCodingItemsByRatingsListHookValuesDefault)
      const {result} = getConnectedHook({scoringType: QuestionScoringType.Holistic})
      expect(result.current.showNoCriterionFulfilledFooter).toBeDefined()
      await act(() => wait(0))
    })
    it("should be false (setNoCriterionFulfilled=undefined)", async () => {
      scenarioCodingItemRatingsByRatingsListSpy.mockReturnValue(scenarioCodingItemRatingsByRatingsListHookValuesDefault)
      freetextQuestionStateSpy.mockReturnValue(freetextQuestionHookValuesDefault)
      scenarioCodingItemsByRatingsListStateSpy.mockReturnValue(scenarioCodingItemsByRatingsListHookValuesDefault)
      const {result} = getConnectedHook({setNoCriterionFulfilled: undefined})
      expect(result.current.showNoCriterionFulfilledFooter).toBeDefined()
      await act(() => wait(0))
    })
  })
  describe("finishedRatersCount", () => {
    it("returns correct count", async () => {
      scenarioCodingItemRatingsByRatingsListSpy.mockReturnValue(scenarioCodingItemRatingsByRatingsListHookValuesDefault)
      freetextQuestionStateSpy.mockReturnValue(freetextQuestionHookValuesDefault)
      scenarioCodingItemsByRatingsListStateSpy.mockReturnValue(scenarioCodingItemsByRatingsListHookValuesDefault)
      const {result, waitForNextUpdate} = getConnectedHook()
      await waitForNextUpdate()
      expect(result.current.finishedRatersCount).toEqual(1)
      await act(() => wait(0))
    })
  })
  describe("totalRatersCount", () => {
    it("returns correct count", async () => {
      scenarioCodingItemRatingsByRatingsListSpy.mockReturnValue(scenarioCodingItemRatingsByRatingsListHookValuesDefault)
      freetextQuestionStateSpy.mockReturnValue(freetextQuestionHookValuesDefault)
      scenarioCodingItemsByRatingsListStateSpy.mockReturnValue(scenarioCodingItemsByRatingsListHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.totalRatersCount).toEqual(0)
      await act(() => wait(0))
    })
  })
  describe("noCriterionFulfilledCount", () => {
    it("returns correct count", async () => {
      scenarioCodingItemRatingsByRatingsListSpy.mockReturnValue(scenarioCodingItemRatingsByRatingsListHookValuesDefault)
      freetextQuestionStateSpy.mockReturnValue(freetextQuestionHookValuesDefault)
      scenarioCodingItemsByRatingsListStateSpy.mockReturnValue(scenarioCodingItemsByRatingsListHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.noCriterionFulfilledCount).toEqual(0)
      await act(() => wait(0))
    })
  })
  describe("columns", () => {
    it("returns correct columns", async () => {
      scenarioCodingItemRatingsByRatingsListSpy.mockReturnValue(scenarioCodingItemRatingsByRatingsListHookValuesDefault)
      freetextQuestionStateSpy.mockReturnValue(freetextQuestionHookValuesDefault)
      scenarioCodingItemsByRatingsListStateSpy.mockReturnValue(scenarioCodingItemsByRatingsListHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.columns.toString()).toEqual(
        getCriterionRatingTableColumns({
          t: fakeTranslate,
          getRatingsCount: jest.fn(),
          finishedRatersCount: userAccountsMock.length,
          showAdditionalRaterInfos: defaultParams.mode === RaterMode.FinalRater,
          scoringType: defaultParams.scoringType,
          readOnly: defaultParams.readOnly,
          scoringTypeIcon: defaultParams.scoringTypeIcon,
          isSelected: defaultParams.isSelected,
          showSelectionInput: defaultParams.showSelectionInput,
          participantsCount: 3,
          showRaterCount: defaultParams.showRaterCount,
          showDataForAllParticipants: defaultParams.showDataForAllParticipants,
          ...pick(defaultParams, ["scoringTypeIcon", "updateCriterionSelection", "isSelected"])
        }).toString()
      )
      await act(() => wait(0))
    })
  })
  describe("showAdditionalRaterInfos", () => {
    it("should contain correct value", async () => {
      scenarioCodingItemRatingsByRatingsListSpy.mockReturnValue(scenarioCodingItemRatingsByRatingsListHookValuesDefault)
      freetextQuestionStateSpy.mockReturnValue(freetextQuestionHookValuesDefault)
      scenarioCodingItemsByRatingsListStateSpy.mockReturnValue(scenarioCodingItemsByRatingsListHookValuesDefault)
      const {result} = getConnectedHook()
      expect(result.current.showAdditionalRaterInfos).toEqual(false)
      await act(() => wait(0))
    })
  })
})
