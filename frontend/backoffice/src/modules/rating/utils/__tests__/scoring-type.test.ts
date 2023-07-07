import {getScoringTypeIconName} from "shared/components/rating/utils/scoring-type"
import {IconName} from "shared/enums"
import {ScoringType} from "shared/graphql/generated/globalTypes"

describe("scoring-type", () => {
  describe("getScoringTypeIconName", () => {
    it("returns correct icon for ScoringType.Analytical", () => {
      expect(getScoringTypeIconName(ScoringType.Analytical)).toEqual(IconName.MultipleChoice)
    })
    it("returns correct icon for ScoringType.Holistic", () => {
      expect(getScoringTypeIconName(ScoringType.Holistic)).toEqual(IconName.SingleChoice)
    })
  })
})
