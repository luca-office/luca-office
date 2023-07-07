import {TimeUnit} from "shared/enums"
import {LucaI18nLangKey} from "shared/translations"

export interface DurationOptionsConfig {
  readonly value: string
  readonly labelKey: LucaI18nLangKey
  readonly selected?: boolean
}

export const receptionDelayOptionsConfig: DurationOptionsConfig[] = [
  {value: TimeUnit.Second, labelKey: "unit__seconds_plural", selected: true},
  {value: TimeUnit.Minute, labelKey: "unit__minutes_plural"},
  {value: TimeUnit.Hour, labelKey: "unit__hours_plural"},
  {value: TimeUnit.Day, labelKey: "unit__days_plural"},
  {value: TimeUnit.Week, labelKey: "unit__weeks_plural"},
  {value: TimeUnit.Month, labelKey: "unit__months_plural"},
  {value: TimeUnit.Year, labelKey: "unit__years_plural"}
]

export const scenarioDurationOptionsConfig: DurationOptionsConfig[] = [
  {value: TimeUnit.Minute, labelKey: "unit__minutes_plural", selected: true},
  {value: TimeUnit.Hour, labelKey: "unit__hours_plural"}
]

export const MAX_RECEPTION_DELAY = 2147483647
