import {StringMap, TOptions} from "i18next"
import {isArray} from "lodash-es"
import {LucaI18nLangKey} from "../translations"
import {translations} from "../translations/langs/de"

export const getStoryTranslation = <TInterpolationMap extends Record<string, unknown> = StringMap>(
  key: LucaI18nLangKey | LucaI18nLangKey[],
  options?: TOptions<TInterpolationMap> | string
) => (isArray(key) ? translations[key[0]] : translations[key])
