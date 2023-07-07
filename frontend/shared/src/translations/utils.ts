import {IconName} from "../enums"

export const iconNameOfLanguageKey = {
  en: IconName.English,
  de: IconName.German,
  es: IconName.Spanish
}

export type LanugageKeys = keyof typeof iconNameOfLanguageKey
