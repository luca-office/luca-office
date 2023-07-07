import i18n from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import {initReactI18next} from "react-i18next"
import {find} from "../utils"
import {translations as deTranslations} from "./langs/de"
import {translations as enTranslations} from "./langs/en"
import {translations as esTranslations} from "./langs/es"
import {USER_PREFERENCES_LANGUAGE_ITEM_KEY} from "./luca-i18n-persistence"

export const FALLBACK_LANGUAGE = "de-DE"

export const initLucaI18n = () => {
  const locale = navigator.language
  const decimalSeparator = find(({type}) => type === "decimal", Intl.NumberFormat(locale).formatToParts(1.1))

  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      detection: {
        lookupLocalStorage: USER_PREFERENCES_LANGUAGE_ITEM_KEY
      },
      fallbackLng: FALLBACK_LANGUAGE,
      interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
        format: (value, format, lng) => {
          switch (format) {
            case "translate":
              return i18n.t(value)
            case "number":
              return Intl.NumberFormat(lng).format(value)
            case "number_en":
              return decimalSeparator.map(({value: separator}) => `${value}`.replace(separator, ".")).getOrElse(value)
            default:
              return value
          }
        }
      },
      resources: {
        de: {translation: deTranslations},
        en: {translation: enTranslations},
        es: {translation: esTranslations}
      }
    })
}
