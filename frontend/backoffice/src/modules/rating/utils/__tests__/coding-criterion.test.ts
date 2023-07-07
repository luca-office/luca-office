import {getScoreOfCodingCriteria, wasCodingCriterionRated} from "shared/components/rating/utils/coding-criterion"
import {codingCriteriaMock, scenarioRatingManualCriterionSelectionsMock} from "shared/graphql/__mocks__"
import {isAutomatedCodingCriterion} from "shared/utils"

describe("coding-criterion", () => {
  describe("getScoreOfCodingCriteria", () => {
    it("correctly returns score", () => {
      expect(getScoreOfCodingCriteria(codingCriteriaMock)).toEqual(40)
      expect(getScoreOfCodingCriteria(codingCriteriaMock.slice(2))).toEqual(9)
      expect(getScoreOfCodingCriteria([])).toEqual(0)
    })
  })
  describe("wasCodingCriterionRated", () => {
    it("correctly checks if codingCriterion was rated", () => {
      expect(
        wasCodingCriterionRated(
          isAutomatedCodingCriterion(codingCriteriaMock[0]),
          codingCriteriaMock[0].id,
          scenarioRatingManualCriterionSelectionsMock
        )
      ).toEqual(true)
      expect(
        wasCodingCriterionRated(
          isAutomatedCodingCriterion(codingCriteriaMock[1]),
          codingCriteriaMock[1].id,
          scenarioRatingManualCriterionSelectionsMock
        )
      ).toEqual(true)
      expect(
        wasCodingCriterionRated(
          isAutomatedCodingCriterion(codingCriteriaMock[2]),
          codingCriteriaMock[2].id,
          scenarioRatingManualCriterionSelectionsMock
        )
      ).toEqual(true)
      expect(
        wasCodingCriterionRated(
          isAutomatedCodingCriterion(codingCriteriaMock[3]),
          codingCriteriaMock[3].id,
          scenarioRatingManualCriterionSelectionsMock
        )
      ).toEqual(false)
    })
  })
})
