import {TimeUnit} from "shared/enums"
import {DurationOptionsConfig} from "../../scenarios/config/delays-config"

export const interventionTimeOptions: DurationOptionsConfig[] = [
  {value: TimeUnit.Second, labelKey: "unit__seconds_plural", selected: false},
  {value: TimeUnit.Minute, labelKey: "unit__minutes_plural", selected: true},
  {value: TimeUnit.Hour, labelKey: "unit__hours_plural"}
]
