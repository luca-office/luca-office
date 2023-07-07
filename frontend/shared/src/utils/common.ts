import {Relevance, Salutation} from "../graphql/generated/globalTypes"
import {LucaI18nLangKey, LucaTFunction} from "../translations"

export const isDefined = <T>(value: T | undefined | null): value is T => value !== undefined && value !== null

export const salutationToLanguageKey = (salutation: Salutation): LucaI18nLangKey => {
  switch (salutation) {
    case Salutation.Mr:
      return "mr"
    case Salutation.Mrs:
      return "mrs"
    case Salutation.NonBinary:
      return "non_binary"
  }
}

export const toPercent = (part: number, total: number) => (total > 0 ? Math.round((part * 100) / total) : 0)

export const getRelevanceCriteria = (t: LucaTFunction) => [
  {
    value: Relevance.PotentiallyHelpful,
    label: t("relevance__potentially_helpful")
  },
  {
    value: Relevance.Required,
    label: t("relevance__required")
  },
  {
    value: Relevance.Irrelevant,
    label: t("relevance__irrelevant")
  }
]
