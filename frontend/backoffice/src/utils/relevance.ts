import {Relevance} from "shared/graphql/generated/globalTypes"
import {LucaI18nLangKey} from "shared/translations"

export const translationKeyForRelevance = (relevance: Relevance): LucaI18nLangKey => {
  switch (relevance) {
    case Relevance.Irrelevant:
      return "relevance__irrelevant"
    case Relevance.PotentiallyHelpful:
      return "relevance__potentially_helpful"
    case Relevance.Required:
      return "relevance__required"
  }
}
