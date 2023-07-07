import {IconName} from "../../../enums"
import {ScoringType} from "../../../graphql/generated/globalTypes"

// eslint-disable-next-line consistent-return
export const getScoringTypeIconName = (scoringType: ScoringType) => {
  switch (scoringType) {
    case ScoringType.Analytical:
      return IconName.MultipleChoice
    case ScoringType.Holistic:
      return IconName.SingleChoice
  }
}
