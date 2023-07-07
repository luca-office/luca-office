import {IconName} from "shared/enums"
import {AutomatedCodingItemRule, ScoringType} from "shared/graphql/generated/globalTypes"
import {AutomatedCodingItem, CodingDimension, CodingItem} from "shared/models"
import {LucaI18nLangKey} from "shared/translations"
import {find, flatten, Option} from "shared/utils"

export const itemNameForScoringType = (scoringType: ScoringType) => {
  switch (scoringType) {
    case ScoringType.Analytical:
      return IconName.MultipleChoice
    case ScoringType.Holistic:
      return IconName.SingleChoice
  }
}

export const languageKeyForScoringType = (scoringType: ScoringType): LucaI18nLangKey => {
  switch (scoringType) {
    case ScoringType.Analytical:
      return "coding_models__create_item_label_rating_type_analytic_title"
    case ScoringType.Holistic:
      return "coding_models__create_item_label_rating_type_holistic_title"
  }
}

export const findDimensionIdByItemId = (itemId: UUID, codingDimensions: CodingDimension[]) => {
  const allItems = flatten(codingDimensions.map(dimension => dimension.items))
  return find(item => item.id === itemId, allItems).map(item => item.dimensionId)
}

export const findItemById = (itemId: UUID, codingDimensions: CodingDimension[]): Option<CodingItem> => {
  const allItems: CodingItem[] = flatten(codingDimensions.map(dimension => dimension.items))
  return find<CodingItem>(item => item.id === itemId, allItems)
}
