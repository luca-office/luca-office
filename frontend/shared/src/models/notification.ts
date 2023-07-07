import {TOptions} from "i18next"
import {NotificationSeverity} from "../enums"
import {LucaI18nLangKey} from "../translations"

export interface AppNotification {
  readonly messageKey: LucaI18nLangKey
  readonly messageKeyLangOptions?: TOptions
  readonly severity: NotificationSeverity
  readonly titleKey?: LucaI18nLangKey
  readonly autoHideDurationInMillis?: number
}
