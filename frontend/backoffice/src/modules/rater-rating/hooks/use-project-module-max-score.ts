import * as React from "react"
import {
  getCodingItemsFromCodingDimensions,
  getMaxScoreOfAllCodingItems,
  getMaxScoreOfAllQuestions
} from "shared/components/rating/utils"
import {ProjectModuleType, QuestionScoringType} from "shared/graphql/generated/globalTypes"
import {CodingDimension} from "shared/models"
import {RatingProjectModule} from "../models"

export interface UseProjectModuleMaxScoreHook {
  readonly maxScore: number
}

export const useProjectModuleMaxScore = (
  ratingProjectModule: RatingProjectModule,
  codingDimensions: CodingDimension[]
): UseProjectModuleMaxScoreHook => {
  const dimensions = React.useMemo(
    () =>
      ratingProjectModule.moduleType === ProjectModuleType.Scenario
        ? codingDimensions.filter(
            codingDimension => codingDimension.codingModelId === ratingProjectModule.scenario?.codingModel?.id
          )
        : [],
    [ratingProjectModule, codingDimensions]
  )
  const maxScore = React.useMemo(
    () =>
      ratingProjectModule.moduleType === ProjectModuleType.Questionnaire
        ? getMaxScoreOfAllQuestions(
            ratingProjectModule.questionnaire?.questions.filter(
              question => question.scoringType !== QuestionScoringType.None
            ) ?? []
          )
        : getMaxScoreOfAllCodingItems(getCodingItemsFromCodingDimensions(dimensions)),
    [ratingProjectModule, dimensions]
  )

  return {maxScore}
}
