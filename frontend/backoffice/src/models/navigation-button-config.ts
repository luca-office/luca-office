import {Payload} from "redux-first-router"
import {LucaI18nLangKey} from "shared/translations"
import {Route} from "../routes"

export interface NavigationButtonConfig {
  readonly route: Route
  readonly payload: Payload
  readonly labelKey?: LucaI18nLangKey
}
