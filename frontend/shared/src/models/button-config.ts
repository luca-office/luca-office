import {IconName} from "../enums"
import {LucaI18nLangKey} from "../translations"

export interface ButtonConfig {
  readonly labelKey: LucaI18nLangKey
  readonly onClick: () => void
  readonly disabled?: boolean
  readonly loading?: boolean
  readonly icon?: IconName
  readonly hide?: boolean
  readonly orlyTextKey?: LucaI18nLangKey
  readonly orlyConfirmKey?: LucaI18nLangKey
  readonly orlyTitleKey?: LucaI18nLangKey
  readonly tooltipKey?: LucaI18nLangKey
}
