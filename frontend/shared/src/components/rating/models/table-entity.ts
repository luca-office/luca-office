import {IconName} from "../../../enums"
import {QuestionScoringType} from "../../../graphql/generated/globalTypes"

export interface TableEntity {
  readonly title: string
  readonly score: number
  readonly maxScore: number
  readonly averageScore: number
  readonly id: UUID
  readonly rated: boolean
  readonly iconName?: IconName
  readonly position: number
  readonly isEmptyDimension?: boolean
  readonly scoringType?: QuestionScoringType
}
