import {Payload} from "redux-first-router"
import {LucaI18nLangKey} from "../translations"

export interface NavigationConfig<TRoute> {
  readonly route: TRoute
  readonly payload?: Payload
  readonly labelKey?: LucaI18nLangKey
}
