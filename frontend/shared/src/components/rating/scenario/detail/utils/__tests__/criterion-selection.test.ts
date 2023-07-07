import {
  automatedCodingCriteriaMock,
  codingCriteriaMock,
  scenarioAutomatedCodingItemRatingsMock,
  scenarioManualCodingItemRatingsMock
} from "../../../../../../graphql/__mocks__"
import {Option} from "../../../../../../utils"
import {
  getAutomatedCriterionSelection,
  getManualCriterionSelection,
  haveAutomatedCriterionSelectionsChanged,
  haveManualCriterionSelectionsChanged
} from "../criterion-selection"

describe("criterion-selection", () => {
  describe("haveManualCriterionSelectionsChanged", () => {
    it("correctly checks if criterion selections changed", () => {
      expect(
        haveManualCriterionSelectionsChanged(
          Option.of(scenarioManualCodingItemRatingsMock[0]),
          scenarioManualCodingItemRatingsMock[0].criterionSelections
        )
      ).toEqual(false)
      expect(
        haveManualCriterionSelectionsChanged(
          Option.of(scenarioManualCodingItemRatingsMock[0]),
          scenarioManualCodingItemRatingsMock[0].criterionSelections.slice(1)
        )
      ).toEqual(true)
    })
  })
  describe("haveAutomatedCriterionSelectionsChanged", () => {
    it("correctly checks if criterion selections changed", () => {
      expect(
        haveAutomatedCriterionSelectionsChanged(
          Option.of(scenarioAutomatedCodingItemRatingsMock[0]),
          scenarioAutomatedCodingItemRatingsMock[0].criterionSelections
        )
      ).toEqual(false)
      expect(
        haveAutomatedCriterionSelectionsChanged(
          Option.of(scenarioAutomatedCodingItemRatingsMock[0]),
          scenarioAutomatedCodingItemRatingsMock[0].criterionSelections.slice(1)
        )
      ).toEqual(true)
    })
  })
  describe("getManualCriterionSelection", () => {
    it("correctly returns criterion selection", () => {
      expect(
        getManualCriterionSelection(
          scenarioManualCodingItemRatingsMock[0].criterionSelections.slice(1),
          codingCriteriaMock[0]
        ).orNull()
      ).toBeNull()
      expect(
        getManualCriterionSelection(
          scenarioManualCodingItemRatingsMock[0].criterionSelections,
          codingCriteriaMock[0]
        ).orNull()
      ).toEqual(scenarioManualCodingItemRatingsMock[0].criterionSelections[0])
    })
  })
  describe("getAutomatedCriterionSelection", () => {
    it("correctly returns criterion selection", () => {
      expect(
        getAutomatedCriterionSelection(
          scenarioAutomatedCodingItemRatingsMock[0].criterionSelections.slice(1),
          automatedCodingCriteriaMock[0]
        ).orNull()
      ).toBeNull()
      expect(
        getAutomatedCriterionSelection(
          scenarioAutomatedCodingItemRatingsMock[0].criterionSelections,
          automatedCodingCriteriaMock[0]
        ).orNull()
      ).toEqual(scenarioAutomatedCodingItemRatingsMock[0].criterionSelections[0])
    })
  })
})
