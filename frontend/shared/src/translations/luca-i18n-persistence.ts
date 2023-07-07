import {LucaAppLanguage} from "../models"

export const USER_PREFERENCES_LANGUAGE_ITEM_KEY = "luca_i18n_language"

export const getStoredSelectedLanguage = async (): Promise<string | null> =>
  await localStorage.getItem(USER_PREFERENCES_LANGUAGE_ITEM_KEY)

export const setStoredSelectedLanguage = async (language: LucaAppLanguage): Promise<void> =>
  await localStorage.setItem(USER_PREFERENCES_LANGUAGE_ITEM_KEY, language)
