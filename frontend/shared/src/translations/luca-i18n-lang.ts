// de is the reference/default language
import {translations} from "./langs/de"
import {translations as translationsBackoffice} from "./langs/backoffice/de"
import {translations as translationsPlayer} from "./langs/player/de"
import {translations as translationsShared} from "./langs/shared/de"

export type LucaI18nLang = typeof translations
export type LucaI18nLangBackoffice = typeof translationsBackoffice
export type LucaI18nLangPlayer = typeof translationsPlayer
export type LucaI18nLangShared = typeof translationsShared

export type LucaI18nLangKey = keyof LucaI18nLang
