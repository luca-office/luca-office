import {UsageField} from "shared/graphql/generated/globalTypes"
import {SelectOption} from "shared/models"
import {LucaI18nLangKey, LucaTFunction} from "shared/translations"

export const getUsageFieldSelectOptions = (selectedValue: UsageField, t: LucaTFunction): SelectOption[] => {
  return Object.keys(UsageField).map(key => ({
    label: t(`projects__usage_field_${key}` as LucaI18nLangKey),
    value: key,
    selected: key === selectedValue
  }))
}
