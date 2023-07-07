import {act, renderHook} from "@testing-library/react-hooks"
import wait from "waait"
import {
  automatedCodingItemMock,
  codingCriteriaMock,
  scenarioRatingManualCriterionSelectionsMock
} from "../../../../graphql/__mocks__"
import {useScenarioRatingScore} from "../use-scenario-rating-score"

const selectedSurveyInvitationId = "42c640c2-4be9-4e39-a750-46a9416683e6"

const getConnectedHook = () =>
  renderHook(() =>
    useScenarioRatingScore({
      codingCriteria: codingCriteriaMock,
      criterionSelections: scenarioRatingManualCriterionSelectionsMock,
      codingItems: [automatedCodingItemMock],
      averageScoreForAllParticipants: false,
      scenarioCodingItemRatings: [
        {
          __typename: "ScenarioCodingItemRating",
          codingItemId: "21216195-12a4-4b95-9ef7-7e4e4f61a8fe",
          createdAt: new Date(1, 1, 2020).toISOString(),
          criterionSelections: scenarioRatingManualCriterionSelectionsMock,
          id: "eb4cc082-a110-4150-af13-9a878b7280b9",
          noCriterionFulfilled: false,
          modifiedAt: new Date(1, 1, 2020).toISOString(),
          surveyInvitationId: selectedSurveyInvitationId,
          ratingId: "4ec7072d-996b-40cd-8e75-39eb4675eff9"
        }
      ],
      selectedSurveyInvitationId
    })
  )

describe("use-scenario-rating-score", () => {
  describe("score", () => {
    it("should be correct", async () => {
      const {result} = getConnectedHook()
      expect(result.current.score).toEqual(39)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
  describe("maxScore", () => {
    it("should be correct", async () => {
      const {result} = getConnectedHook()
      expect(result.current.maxScore).toEqual(14)
      // Silence mock provider act warnings
      await act(() => wait(0))
    })
  })
})
