import {LucaI18nLangKey} from "../translations"

export interface NoCriterionFulfilledConfig {
  readonly labelKey?: LucaI18nLangKey
  readonly descriptionKey?: LucaI18nLangKey
  readonly selectedQuestionIdForFinalRating?: UUID
}
